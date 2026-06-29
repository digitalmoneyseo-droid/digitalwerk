import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Layers3,
  Megaphone,
  Monitor,
  Palette,
  Search,
} from "lucide-react";
import { Navigation, type NavigateHandler } from "../components/Navigation";
import { siteContent } from "../data/siteContent";

type PageProps = {
  onNavigate: NavigateHandler;
};

function InternalLink({
  href,
  onNavigate,
  children,
  className = "",
}: {
  href: string;
  onNavigate: NavigateHandler;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(href);
      }}
    >
      {children}
    </a>
  );
}

function CtaPair({ onNavigate }: { onNavigate: NavigateHandler }) {
  const content = siteContent.home.one;
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <InternalLink
        href="/kontakt"
        onNavigate={onNavigate}
        className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[oklch(0.18_0.025_260)] px-5 py-3 text-sm font-black text-white shadow-[0_12px_28px_oklch(0.18_0.035_260/0.18)] transition hover:-translate-y-0.5 hover:bg-[oklch(0.33_0.095_250)] active:translate-y-0"
      >
        {content.primaryCta}
        <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={17} aria-hidden="true" />
      </InternalLink>
      <InternalLink
        href="/leistungen/webdesign"
        onNavigate={onNavigate}
        className="inline-flex min-h-12 items-center justify-center rounded-full border border-[oklch(0.72_0.03_260)] bg-white px-5 py-3 text-sm font-black text-[oklch(0.2_0.03_260)] transition hover:-translate-y-0.5 hover:border-[oklch(0.44_0.12_245)] hover:bg-[oklch(0.975_0.012_250)] active:translate-y-0"
      >
        {content.secondaryCta}
      </InternalLink>
    </div>
  );
}

function HeroWebsiteCheck({ onNavigate }: { onNavigate: NavigateHandler }) {
  return (
    <div className="dw-hero-cards relative mx-auto h-[430px] w-full max-w-[660px] md:h-[520px]" aria-label="Website-Check Vorschau">
      <div className="absolute inset-0 overflow-hidden rounded-[28px] border border-[oklch(0.82_0.024_250)] bg-white shadow-[0_24px_70px_oklch(0.18_0.035_260/0.13)]">
        <img
          src="/images/signal-atlas.png"
          alt=""
          className="h-full w-full object-cover opacity-90"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,white_0%,rgb(255_255_255/0.82)_24%,transparent_62%),linear-gradient(0deg,rgb(255_255_255/0.76)_0%,transparent_36%)]" />
        <div className="absolute left-5 top-5 rounded-full border border-[oklch(0.78_0.03_245)] bg-white/88 px-3 py-1 text-xs font-black text-[oklch(0.34_0.09_245)] shadow-sm backdrop-blur">
          Digitalwerk Signalmap
        </div>
      </div>

      <div className="dw-card-rise absolute left-[7%] top-[24%] w-[74%] rounded-2xl border border-[oklch(0.84_0.022_250)] bg-white/94 p-5 shadow-[0_12px_34px_oklch(0.24_0.04_250/0.12)] backdrop-blur md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[oklch(0.94_0.045_250)] text-[oklch(0.48_0.16_250)]">
              <Monitor size={20} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-black text-[oklch(0.31_0.035_260)]">Website-Check</p>
              <p className="text-xs font-bold text-[oklch(0.48_0.035_260)]">Struktur, SEO und Anfrageweg</p>
            </div>
          </div>
          <span className="rounded-full bg-[oklch(0.94_0.055_145)] px-3 py-1 text-xs font-black text-[oklch(0.43_0.14_145)]">Klar</span>
        </div>
        <div className="mt-7 grid grid-cols-4 gap-2 text-center text-[10px] font-black uppercase text-[oklch(0.42_0.045_260)]">
          {["Website", "Suche", "Ads", "Anfrage"].map((item) => (
            <span key={item} className="rounded-lg border border-[oklch(0.87_0.024_250)] bg-[oklch(0.98_0.008_250)] px-2 py-2">
              {item}
            </span>
          ))}
        </div>
        <div className="mt-4 h-28 overflow-hidden rounded-xl bg-[linear-gradient(180deg,transparent_0_68%,oklch(0.94_0.038_245)_68%)]">
          <svg viewBox="0 0 420 130" className="h-full w-full" role="img" aria-label="Ruhige Liniengrafik zur Website-Entwicklung">
            <path d="M0 102 C 76 88, 122 88, 196 68 S 328 46, 420 30" fill="none" stroke="oklch(0.69 0.11 245)" strokeWidth="4" strokeLinecap="round" />
            <path d="M0 116 C 90 106, 144 104, 226 82 S 336 66, 420 48" fill="none" stroke="oklch(0.82 0.08 205)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onNavigate("/kontakt")}
        className="dw-card-rise absolute right-[3%] top-[10%] w-[245px] rounded-2xl border border-[oklch(0.82_0.024_250)] bg-white/95 p-4 text-left shadow-[0_12px_32px_oklch(0.24_0.04_250/0.12)] backdrop-blur transition hover:border-[oklch(0.58_0.12_245)] active:scale-[0.99]"
        style={{ animationDelay: "120ms" }}
      >
        <span className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[oklch(0.94_0.05_150)] text-[oklch(0.45_0.15_150)]">
            <CheckCircle2 size={19} aria-hidden="true" />
          </span>
          <span>
            <span className="block font-display text-xl font-semibold text-[oklch(0.24_0.035_260)]">Erstberatung</span>
            <span className="mt-1 block text-xs font-bold text-[oklch(0.48_0.035_260)]">nächsten Schritt klären</span>
          </span>
        </span>
      </button>

      <button
        type="button"
        onClick={() => onNavigate("/leistungen/local-seo")}
        className="dw-card-rise absolute bottom-[16%] left-0 w-[210px] rounded-2xl border border-[oklch(0.82_0.024_250)] bg-white/95 p-4 text-left shadow-[0_12px_32px_oklch(0.24_0.04_250/0.12)] backdrop-blur transition hover:border-[oklch(0.58_0.12_245)] active:scale-[0.99]"
        style={{ animationDelay: "220ms" }}
      >
        <span className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[oklch(0.96_0.045_70)] text-[oklch(0.58_0.14_70)]">
            <Search size={19} aria-hidden="true" />
          </span>
          <span>
            <span className="block font-display text-xl font-semibold text-[oklch(0.24_0.035_260)]">SEO-Basis</span>
            <span className="mt-1 block text-xs font-bold text-[oklch(0.48_0.035_260)]">Google-Sichtbarkeit prüfen</span>
          </span>
        </span>
      </button>
    </div>
  );
}

const serviceIcons = [Monitor, Search, Megaphone, Layers3, Palette, Bot];

export function HomeOne({ onNavigate }: PageProps) {
  const content = siteContent.home.one;
  return (
    <main className="min-h-screen bg-[oklch(0.985_0.006_250)] text-[oklch(0.17_0.025_260)]">
      <Navigation tone="atlas" onNavigate={onNavigate} />

      <section className="relative overflow-hidden px-5 pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="dw-signal-field absolute inset-0" aria-hidden="true" />
        <div className="dw-page-spanning-line absolute bottom-0 left-0 right-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="page-rise max-w-[720px]">
            <p className="mb-5 inline-flex rounded-full border border-[oklch(0.82_0.03_245)] bg-white/72 px-4 py-2 text-sm font-black text-[oklch(0.32_0.075_245)]">
              {content.heroBadge}
            </p>
            <h1 className="text-balance font-display text-5xl font-semibold leading-[0.98] text-[oklch(0.2_0.035_260)] md:text-7xl">
              Websites und Marketing, die aus Besuchern{" "}
              <span className="font-editorial font-semibold italic text-[oklch(0.44_0.13_245)]">echte Anfragen</span> machen.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg font-semibold leading-8 text-[oklch(0.35_0.04_260)]">{content.lead}</p>
            <div className="mt-8">
              <CtaPair onNavigate={onNavigate} />
            </div>
            <dl className="mt-9 grid max-w-2xl grid-cols-3 gap-3 border-y border-[oklch(0.82_0.024_250)] py-4">
              {[
                ["01", "Angebot klären"],
                ["02", "Sichtbarkeit ordnen"],
                ["03", "Anfragen führen"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-utility text-xs font-bold text-[oklch(0.45_0.12_245)]">{value}</dt>
                  <dd className="mt-1 text-sm font-black leading-5 text-[oklch(0.24_0.035_260)]">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <HeroWebsiteCheck onNavigate={onNavigate} />
        </div>
      </section>

      <section className="border-y border-[oklch(0.88_0.018_250)] bg-white px-5 py-6">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-center gap-3 md:justify-between">
          {content.audienceLine.map((item) => (
            <span key={item} className="rounded-full border border-[oklch(0.88_0.018_250)] bg-[oklch(0.98_0.008_250)] px-4 py-2 text-sm font-black text-[oklch(0.31_0.035_260)]">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 md:py-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-6 md:grid-cols-[0.6fr_0.4fr] md:items-end">
            <h2 className="text-balance font-display text-4xl font-semibold leading-tight md:text-6xl">{content.serviceRunwayTitle}</h2>
            <p className="text-pretty text-base font-semibold leading-8 text-[oklch(0.36_0.04_260)]">{content.serviceRunwayLead}</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {content.services.map((service, index) => {
              const Icon = serviceIcons[index] ?? Monitor;
              return (
                <InternalLink
                  key={service.href}
                  href={service.href}
                  onNavigate={onNavigate}
                  className="group grid min-h-[260px] rounded-2xl border border-[oklch(0.84_0.022_250)] bg-white p-5 shadow-[0_8px_22px_oklch(0.2_0.03_250/0.055)] transition hover:-translate-y-1 hover:border-[oklch(0.52_0.12_245)] hover:shadow-[0_16px_38px_oklch(0.2_0.03_250/0.11)] active:translate-y-0"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[oklch(0.95_0.032_245)] text-[oklch(0.42_0.13_245)] transition group-hover:bg-[oklch(0.88_0.055_245)]">
                    <Icon size={23} aria-hidden="true" />
                  </span>
                  <h3 className="mt-7 font-display text-2xl font-semibold">{service.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[oklch(0.38_0.035_260)]">{service.text}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-black text-[oklch(0.36_0.11_245)]">
                    Mehr erfahren
                    <ArrowRight className="transition-transform group-hover:translate-x-1" size={15} aria-hidden="true" />
                  </span>
                </InternalLink>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.38fr_0.62fr]">
          <div>
            <h2 className="text-balance font-display text-4xl font-semibold leading-tight md:text-5xl">{content.projectTypesTitle}</h2>
            <p className="mt-5 text-pretty text-base font-semibold leading-8 text-[oklch(0.36_0.04_260)]">{content.projectTypesLead}</p>
          </div>
          <div className="grid gap-4">
            {content.projectTypes.map((project) => (
              <div key={project.title} className="grid gap-3 border-t border-[oklch(0.84_0.02_250)] py-6 md:grid-cols-[220px_1fr]">
                <h3 className="font-display text-2xl font-semibold">{project.title}</h3>
                <p className="text-sm font-semibold leading-7 text-[oklch(0.36_0.04_260)]">{project.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:py-24">
        <div className="mx-auto max-w-[1320px]">
          <h2 className="max-w-3xl text-balance font-display text-4xl font-semibold leading-tight md:text-5xl">{content.whyTitle}</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {content.whyItems.map((item) => (
              <div key={item.title} className="border-t border-[oklch(0.82_0.02_250)] py-6">
                <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[oklch(0.36_0.04_260)]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[oklch(0.18_0.025_260)] px-5 py-16 text-white md:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.34fr_0.66fr]">
          <h2 className="text-balance font-display text-4xl font-semibold leading-tight md:text-5xl">{content.processTitle}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {content.process.map((step, index) => (
              <div key={step.title} className="border-t border-white/18 py-6">
                <p className="text-sm font-black text-[oklch(0.78_0.1_205)]">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-5 font-display text-2xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-white/72">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[oklch(0.96_0.012_250)] px-5 py-16 md:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-8 border-y border-[oklch(0.78_0.03_250)] py-8 md:grid-cols-[0.7fr_0.3fr] md:items-center">
          <div>
            <h2 className="text-balance font-display text-4xl font-semibold leading-tight md:text-5xl">{content.finalCtaTitle}</h2>
            <p className="mt-5 max-w-2xl text-pretty text-base font-semibold leading-8 text-[oklch(0.36_0.04_260)]">{content.finalCtaLead}</p>
          </div>
          <InternalLink
            href="/kontakt"
            onNavigate={onNavigate}
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[oklch(0.18_0.025_260)] px-5 py-3 text-sm font-black text-white shadow-[0_12px_28px_oklch(0.18_0.035_260/0.18)] transition hover:-translate-y-0.5 hover:bg-[oklch(0.33_0.095_250)] active:translate-y-0"
          >
            Projekt besprechen
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={17} aria-hidden="true" />
          </InternalLink>
        </div>
      </section>
    </main>
  );
}
