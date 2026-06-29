import { siteContent, type Subpage } from "../data/siteContent";

export type PageFamily =
  | "search"
  | "paid"
  | "design"
  | "pricing"
  | "cases"
  | "method"
  | "agency"
  | "enterprise"
  | "contact"
  | "resource"
  | "plain";

export type PageDetail = (typeof siteContent.pageDetails)[keyof typeof siteContent.pageDetails];

export type CurrentPage = {
  href: string;
  title: string;
  category: string;
  intro: string;
  bullets: readonly string[];
};

export const familyThemes: Record<
  PageFamily,
  {
    accent: string;
    wash: string;
    dark: string;
  }
> = {
  search: {
    accent: "oklch(0.6 0.16 255)",
    wash: "oklch(0.988 0.005 255)",
    dark: "oklch(0.15 0.025 265)",
  },
  paid: {
    accent: "oklch(0.64 0.19 34)",
    wash: "oklch(0.985 0.008 52)",
    dark: "oklch(0.16 0.03 32)",
  },
  design: {
    accent: "oklch(0.6 0.13 190)",
    wash: "oklch(0.986 0.007 205)",
    dark: "oklch(0.15 0.025 220)",
  },
  pricing: {
    accent: "oklch(0.58 0.15 270)",
    wash: "oklch(0.99 0.004 270)",
    dark: "oklch(0.16 0.025 265)",
  },
  cases: {
    accent: "oklch(0.62 0.13 145)",
    wash: "oklch(0.988 0.006 145)",
    dark: "oklch(0.15 0.025 160)",
  },
  method: {
    accent: "oklch(0.66 0.14 82)",
    wash: "oklch(0.988 0.01 84)",
    dark: "oklch(0.15 0.025 80)",
  },
  agency: {
    accent: "oklch(0.5 0.12 245)",
    wash: "oklch(0.988 0.006 245)",
    dark: "oklch(0.15 0.025 245)",
  },
  enterprise: {
    accent: "oklch(0.58 0.12 190)",
    wash: "oklch(0.986 0.006 200)",
    dark: "oklch(0.12 0.025 210)",
  },
  contact: {
    accent: "oklch(0.62 0.14 320)",
    wash: "oklch(0.99 0.006 320)",
    dark: "oklch(0.16 0.03 320)",
  },
  resource: {
    accent: "oklch(0.55 0.12 230)",
    wash: "oklch(0.99 0.004 230)",
    dark: "oklch(0.15 0.025 230)",
  },
  plain: {
    accent: "oklch(0.58 0.15 270)",
    wash: "oklch(1 0 0)",
    dark: "oklch(0.16 0.025 265)",
  },
};

export const corePageConfigs: Record<
  string,
  {
    headline: string;
    lead: string;
    columns: readonly { title: string; text: string }[];
    proofTitle: string;
  }
> = {
  "/leistungen/local-seo": {
    headline: "Besser gefunden werden.",
    lead:
      "SEO ist keine einzelne Maßnahme. Für deutsche Unternehmen wird es wirksam, wenn Leistungsseiten, lokale Signale, technische Grundlage und Kontaktwege gemeinsam gedacht werden.",
    columns: [
      { title: "Suchintention", text: "Wir klären, welche Begriffe Menschen wirklich nutzen, wenn sie vergleichen, anrufen oder einen Termin buchen wollen." },
      { title: "Struktur", text: "Aus Leistungen, Standorten und Zielgruppen entsteht eine Seitenarchitektur, die Google und Besucher leichter verstehen." },
      { title: "Vertrauen", text: "Bewertungen, Profilinformationen, Belege, klare Kontaktwege und verständliche Texte unterstützen die Anfrageentscheidung." },
    ],
    proofTitle: "Woran bessere SEO-Arbeit sichtbar wird",
  },
  "/leistungen/paid-ads": {
    headline: "Mehr Wirkung pro Klick.",
    lead:
      "Budget allein löst kein Nachfrageproblem. Digitalwerk prüft Kanal, Zielgruppe, Anzeigenversprechen, Zielseite und Messung gemeinsam.",
    columns: [
      { title: "Kanalwahl", text: "Wir klären, ob Suche, Social, Video, Retargeting oder ein Mix der passende Weg für Angebot und Zielgruppe ist." },
      { title: "Landingpage", text: "Die Seite nach dem Klick muss das Anzeigenversprechen einlösen und den nächsten Schritt leicht machen." },
      { title: "Messung", text: "Conversions, Formulare, Anrufe und Entscheidungen werden so aufgesetzt, dass aus Daten echte Prioritäten werden." },
    ],
    proofTitle: "Woran bessere Kampagnen erkennbar werden",
  },
  "/leistungen/webdesign": {
    headline: "Schneller verstanden werden.",
    lead:
      "Gutes Webdesign macht Angebot, Zielgruppe, Belege und nächsten Schritt klar. Der visuelle Auftritt unterstützt diese Entscheidung, statt sie zu überdecken.",
    columns: [
      { title: "Aufbau", text: "Wir ordnen Inhalte, Seiten und Nutzungswege, bevor Farben und Komponenten entschieden werden." },
      { title: "Interface", text: "Typografie, Layout, mobile Führung und Interaktionen helfen Besuchern, sich sicher durch das Angebot zu bewegen." },
      { title: "Launch", text: "SEO-Grundlagen, Performance, Tracking und Content-Übergabe werden in den Relaunch eingebaut." },
    ],
    proofTitle: "Woran ein besserer Webauftritt sichtbar wird",
  },
};

export function normalizePath(pathname: string) {
  const clean = pathname.replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
}

export function getPageFamily(page: CurrentPage): PageFamily {
  if (page.href === "/preise") return "pricing";
  if (page.href === "/cases") return "cases";
  if (page.href === "/methode") return "method";
  if (page.href === "/agentur") return "agency";
  if (page.href === "/enterprise") return "enterprise";
  if (page.href === "/kontakt") return "contact";
  if (page.href.startsWith("/ressourcen")) return "resource";
  if (page.href.includes("ads") || page.category.includes("Paid") || page.category.includes("Retail")) return "paid";
  if (page.category.includes("Design") || page.category.includes("Marke") || page.category.includes("Social")) return "design";
  if (page.href.startsWith("/leistungen")) return "search";
  return "plain";
}

export function getSubpageByPath(pathname: string): Subpage | undefined {
  const path = normalizePath(pathname);
  return siteContent.subpages.find((page) => page.href === path);
}

export function getPageDetail(page: Subpage | CurrentPage | null): PageDetail | null {
  if (!page) return null;
  return siteContent.pageDetails[page.href as keyof typeof siteContent.pageDetails] ?? null;
}

export function getNotFoundPage(): CurrentPage {
  return {
    href: "",
    title: siteContent.subpageTemplate.notFoundTitle,
    category: siteContent.brand.descriptor,
    intro: siteContent.subpageTemplate.notFoundIntro,
    bullets: [siteContent.meta.defaultDescription],
  };
}
