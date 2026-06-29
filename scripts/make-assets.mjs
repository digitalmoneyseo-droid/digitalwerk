import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { deflateSync } from "node:zlib";

const outDir = join(process.cwd(), "public", "images");
mkdirSync(outDir, { recursive: true });

const width = 1200;
const height = 780;

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n += 1) {
  let c = n;
  for (let k = 0; k < 8; k += 1) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

function crc32(buffer) {
  let c = 0xffffffff;
  for (const value of buffer) c = crcTable[(c ^ value) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data = Buffer.alloc(0)) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  const crc = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function clamp(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function mix(a, b, t) {
  return a + (b - a) * t;
}

function noise(x, y, seed = 1) {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed * 37.719) * 43758.5453;
  return n - Math.floor(n);
}

function canvas(background) {
  const data = new Uint8Array(width * height * 4);
  const ctx = { data, width, height };
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const t = x / (width - 1);
      const u = y / (height - 1);
      const base = background(t, u, x, y);
      const grain = (noise(x, y, 7) - 0.5) * (base.grain ?? 0);
      set(ctx, x, y, base.r + grain, base.g + grain, base.b + grain, base.a ?? 255);
    }
  }
  return ctx;
}

function set(ctx, x, y, r, g, b, a = 255) {
  if (x < 0 || y < 0 || x >= ctx.width || y >= ctx.height) return;
  const i = (Math.floor(y) * ctx.width + Math.floor(x)) * 4;
  ctx.data[i] = clamp(r);
  ctx.data[i + 1] = clamp(g);
  ctx.data[i + 2] = clamp(b);
  ctx.data[i + 3] = clamp(a);
}

function blend(ctx, x, y, r, g, b, a = 255) {
  if (x < 0 || y < 0 || x >= ctx.width || y >= ctx.height) return;
  const i = (Math.floor(y) * ctx.width + Math.floor(x)) * 4;
  const alpha = Math.max(0, Math.min(1, a / 255));
  ctx.data[i] = clamp(ctx.data[i] * (1 - alpha) + r * alpha);
  ctx.data[i + 1] = clamp(ctx.data[i + 1] * (1 - alpha) + g * alpha);
  ctx.data[i + 2] = clamp(ctx.data[i + 2] * (1 - alpha) + b * alpha);
}

function rect(ctx, x, y, w, h, color, alpha = 255) {
  for (let yy = Math.max(0, Math.floor(y)); yy < Math.min(ctx.height, y + h); yy += 1) {
    for (let xx = Math.max(0, Math.floor(x)); xx < Math.min(ctx.width, x + w); xx += 1) {
      blend(ctx, xx, yy, color[0], color[1], color[2], alpha);
    }
  }
}

function circle(ctx, cx, cy, radius, color, alpha = 255, fill = true, thickness = 2) {
  const r2 = radius * radius;
  const inner = Math.max(0, radius - thickness);
  const inner2 = inner * inner;
  for (let y = Math.floor(cy - radius); y <= Math.ceil(cy + radius); y += 1) {
    for (let x = Math.floor(cx - radius); x <= Math.ceil(cx + radius); x += 1) {
      const d = (x - cx) ** 2 + (y - cy) ** 2;
      if ((fill && d <= r2) || (!fill && d <= r2 && d >= inner2)) {
        blend(ctx, x, y, color[0], color[1], color[2], alpha);
      }
    }
  }
}

function line(ctx, x0, y0, x1, y1, color, alpha = 255, thickness = 1) {
  const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
  for (let i = 0; i <= steps; i += 1) {
    const t = i / Math.max(1, steps);
    const x = mix(x0, x1, t);
    const y = mix(y0, y1, t);
    circle(ctx, x, y, thickness, color, alpha, true);
  }
}

function png(ctx) {
  const raw = Buffer.alloc((ctx.width * 4 + 1) * ctx.height);
  for (let y = 0; y < ctx.height; y += 1) {
    const rowStart = y * (ctx.width * 4 + 1);
    raw[rowStart] = 0;
    ctx.data.copy?.();
    for (let x = 0; x < ctx.width * 4; x += 1) {
      raw[rowStart + 1 + x] = ctx.data[y * ctx.width * 4 + x];
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(ctx.width, 0);
  ihdr.writeUInt32BE(ctx.height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND"),
  ]);
}

function save(name, draw) {
  const ctx = draw();
  writeFileSync(join(outDir, name), png(ctx));
}

save("signal-atlas.png", () => {
  const ctx = canvas((t, u) => ({
    r: mix(248, 225, u),
    g: mix(249, 236, u),
    b: mix(255, 252, t),
    grain: 8,
  }));
  for (let x = 60; x < width; x += 84) line(ctx, x, 40, x - 160, height - 40, [114, 93, 205], 28, 1);
  for (let y = 80; y < height; y += 86) line(ctx, 40, y, width - 40, y - 38, [44, 155, 197], 30, 1);
  circle(ctx, 615, 360, 260, [111, 87, 205], 24, true);
  circle(ctx, 615, 360, 220, [104, 71, 222], 120, false, 4);
  circle(ctx, 615, 360, 146, [22, 130, 159], 140, false, 3);
  for (let i = 0; i < 18; i += 1) {
    const angle = (Math.PI * 2 * i) / 18;
    const r = 90 + (i % 4) * 40;
    const x = 615 + Math.cos(angle) * r;
    const y = 360 + Math.sin(angle) * r * 0.64;
    line(ctx, 615, 360, x, y, [84, 72, 168], 90, 2);
    circle(ctx, x, y, 11 + (i % 3) * 3, i % 2 ? [229, 99, 97] : [38, 173, 183], 210);
  }
  rect(ctx, 120, 110, 270, 86, [255, 255, 255], 200);
  rect(ctx, 750, 560, 320, 92, [20, 23, 42], 230);
  for (let i = 0; i < 9; i += 1) rect(ctx, 778 + i * 30, 592 - (i % 4) * 11, 18, 34 + (i % 5) * 8, [146, 230, 212], 210);
  return ctx;
});

save("market-grid.png", () => {
  const ctx = canvas((t, u) => ({
    r: mix(248, 244, t * 0.3),
    g: mix(248, 241, u * 0.4),
    b: mix(244, 235, (1 - t) * 0.2),
    grain: 12,
  }));
  const colors = [[24, 26, 31], [236, 68, 64], [250, 189, 58], [43, 149, 183], [91, 200, 128], [111, 87, 205]];
  for (let y = 70; y < height - 70; y += 130) {
    for (let x = 75; x < width - 90; x += 160) {
      const c = colors[(x / 80 + y / 65) % colors.length | 0];
      rect(ctx, x + (y % 260 ? 22 : 0), y, 118, 88, c, 230);
      rect(ctx, x + 14, y + 15, 84, 12, [255, 255, 255], 165);
      rect(ctx, x + 14, y + 46, 54, 24, [255, 255, 255], 80);
    }
  }
  for (let i = 0; i < 10; i += 1) line(ctx, 80 + i * 118, 80, 34 + i * 130, height - 100, [24, 26, 31], 70, 2);
  circle(ctx, 880, 250, 132, [236, 68, 64], 160, false, 18);
  circle(ctx, 880, 250, 74, [250, 189, 58], 190, true);
  return ctx;
});

save("night-ops.png", () => {
  const ctx = canvas((t, u) => ({
    r: mix(7, 19, u),
    g: mix(8, 19, t),
    b: mix(15, 38, 1 - u),
    grain: 16,
  }));
  for (let x = 70; x < width; x += 92) line(ctx, x, 40, x + 80, height - 40, [78, 223, 238], 24, 1);
  for (let y = 68; y < height; y += 76) line(ctx, 40, y, width - 40, y + 30, [140, 93, 255], 22, 1);
  for (let i = 0; i < 34; i += 1) {
    const x = 80 + noise(i, 2, 3) * 1040;
    const y = 80 + noise(i, 3, 5) * 620;
    circle(ctx, x, y, 3 + noise(i, 5, 9) * 8, [92, 240, 224], 210);
    if (i > 0) line(ctx, x, y, 80 + noise(i - 1, 2, 3) * 1040, 80 + noise(i - 1, 3, 5) * 620, [102, 82, 220], 65, 2);
  }
  rect(ctx, 110, 500, 430, 112, [232, 252, 255], 24);
  for (let i = 0; i < 12; i += 1) {
    const x = 150 + i * 30;
    line(ctx, x, 584, x, 555 - noise(i, 8, 4) * 70, [251, 95, 116], 210, 6);
  }
  circle(ctx, 832, 358, 210, [110, 88, 230], 64, false, 8);
  circle(ctx, 832, 358, 128, [70, 230, 223], 78, false, 5);
  return ctx;
});

save("studio-wall.png", () => {
  const ctx = canvas((t, u) => ({
    r: mix(251, 234, u * 0.2),
    g: mix(251, 244, t * 0.3),
    b: mix(249, 250, (1 - t) * 0.25),
    grain: 18,
  }));
  const frames = [
    [92, 92, 300, 220, [32, 43, 66]],
    [430, 64, 210, 330, [235, 92, 83]],
    [680, 108, 380, 184, [48, 150, 176]],
    [150, 365, 300, 220, [110, 87, 205]],
    [520, 450, 510, 150, [20, 26, 38]],
  ];
  for (const [x, y, w, h, color] of frames) {
    rect(ctx, x + 14, y + 16, w, h, [24, 26, 31], 32);
    rect(ctx, x, y, w, h, color, 222);
    rect(ctx, x + 18, y + 18, w - 36, h - 36, [255, 255, 255], 52);
    line(ctx, x + 24, y + h - 30, x + w - 26, y + 36, [255, 255, 255], 80, 4);
  }
  for (let i = 0; i < 18; i += 1) {
    const x = 90 + i * 58;
    rect(ctx, x, 654 + (i % 2) * 14, 34, 34, i % 3 ? [235, 92, 83] : [48, 150, 176], 215);
  }
  return ctx;
});

save("orbit-commerce.png", () => {
  const ctx = canvas((t, u) => ({
    r: mix(28, 72, t * 0.5),
    g: mix(18, 26, u * 0.5),
    b: mix(65, 112, 1 - t * 0.4),
    grain: 14,
  }));
  circle(ctx, 600, 390, 286, [255, 120, 88], 70, false, 8);
  circle(ctx, 600, 390, 214, [112, 234, 207], 72, false, 5);
  circle(ctx, 600, 390, 145, [255, 232, 130], 82, false, 4);
  for (let i = 0; i < 26; i += 1) {
    const angle = i * 0.73;
    const rx = 155 + (i % 5) * 36;
    const ry = 82 + (i % 4) * 22;
    const x = 600 + Math.cos(angle) * rx;
    const y = 390 + Math.sin(angle) * ry;
    circle(ctx, x, y, 10 + (i % 4) * 5, i % 3 === 0 ? [255, 120, 88] : i % 3 === 1 ? [112, 234, 207] : [255, 232, 130], 225);
  }
  rect(ctx, 130, 116, 240, 62, [255, 255, 255], 32);
  rect(ctx, 824, 575, 250, 74, [255, 255, 255], 42);
  for (let i = 0; i < 8; i += 1) line(ctx, 180 + i * 54, 650, 220 + i * 72, 130, [255, 255, 255], 18, 2);
  return ctx;
});
