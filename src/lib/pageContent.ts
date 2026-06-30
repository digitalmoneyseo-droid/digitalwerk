import { siteContent, type Subpage } from "../data/siteContent";

export type PageFamily = "search" | "paid" | "design" | "pricing" | "agency" | "contact" | "plain";

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
    accent: "oklch(0.44 0.14 255)",
    wash: "oklch(0.988 0.005 255)",
    dark: "oklch(0.15 0.025 265)",
  },
  paid: {
    accent: "oklch(0.45 0.14 34)",
    wash: "oklch(0.985 0.008 52)",
    dark: "oklch(0.16 0.03 32)",
  },
  design: {
    accent: "oklch(0.44 0.11 190)",
    wash: "oklch(0.986 0.007 205)",
    dark: "oklch(0.15 0.025 220)",
  },
  pricing: {
    accent: "oklch(0.43 0.13 270)",
    wash: "oklch(0.99 0.004 270)",
    dark: "oklch(0.16 0.025 265)",
  },
  agency: {
    accent: "oklch(0.5 0.12 245)",
    wash: "oklch(0.988 0.006 245)",
    dark: "oklch(0.15 0.025 245)",
  },
  contact: {
    accent: "oklch(0.44 0.12 320)",
    wash: "oklch(0.99 0.006 320)",
    dark: "oklch(0.16 0.03 320)",
  },
  plain: {
    accent: "oklch(0.43 0.13 270)",
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
  "/leistungen/webdesign": {
    headline: "Webdesign, das nicht nur gut aussieht, sondern Anfragen vorbereitet",
    lead:
      "Viele Websites sehen ordentlich aus, erklären aber Angebot, Nutzen und nächsten Schritt zu spät. Wir strukturieren Inhalte, Design und Kontaktwege so, dass Besucher schneller verstehen und leichter anfragen.",
    columns: [
      { title: "Struktur", text: "Klare Seitenarchitektur, UX-Texte und ein Kontaktweg, der ohne Umwege zur Anfrage führt." },
      { title: "Mobile UX", text: "Responsive Layouts für Smartphone, Tablet und Desktop mit sauberer Performance." },
      { title: "Launch", text: "SEO-Grundlagen, Tracking, Formulare und technische Checks werden vor Veröffentlichung geprüft." },
    ],
    proofTitle: "Woran besseres Webdesign sichtbar wird",
  },
  "/leistungen/local-seo": {
    headline: "Besser gefunden werden, wenn Nachfrage schon da ist.",
    lead:
      "SEO wird wirksam, wenn Leistungsseiten, lokale Signale, technische Grundlagen und verständliche Inhalte gemeinsam geplant werden.",
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
      "Paid Ads bringen schnelle Sichtbarkeit, wenn Zielgruppe, Anzeige, Landingpage und Tracking zusammenpassen.",
    columns: [
      { title: "Kanalwahl", text: "Wir klären, ob Suche, Social, Video, Retargeting oder ein Mix der passende Weg für Angebot und Zielgruppe ist." },
      { title: "Landingpage", text: "Die Seite nach dem Klick muss das Anzeigenversprechen einlösen und den nächsten Schritt leicht machen." },
      { title: "Messung", text: "Conversions, Formulare, Anrufe und Entscheidungen werden so aufgesetzt, dass aus Daten echte Prioritäten werden." },
    ],
    proofTitle: "Woran bessere Kampagnen erkennbar werden",
  },
  "/leistungen/ki-automatisierung": {
    headline: "KI, die konkrete Arbeit leichter macht.",
    lead:
      "Automatisierung lohnt sich, wenn sie wiederkehrende Fragen beantwortet, Informationen auffindbarer macht oder interne Abläufe beschleunigt.",
    columns: [
      { title: "Chatbots", text: "Assistenten für Website, Support oder Beratung mit klaren Grenzen und nachvollziehbaren Antworten." },
      { title: "Workflows", text: "Automatisierungen für wiederkehrende Aufgaben, damit Teams schneller reagieren und weniger manuell nacharbeiten." },
      { title: "KI-Sichtbarkeit", text: "Klare Inhalte, Quellen und FAQ-Strukturen, damit Expertise besser gefunden und verstanden wird." },
    ],
    proofTitle: "Woran sinnvolle Automatisierung sichtbar wird",
  },
};

export function normalizePath(pathname: string) {
  const clean = pathname.replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
}

export function getPageFamily(page: CurrentPage): PageFamily {
  if (page.href === "/preise") return "pricing";
  if (page.href === "/agentur") return "agency";
  if (page.href === "/kontakt") return "contact";
  if (page.href === "/leistungen/webdesign") return "design";
  if (page.href.includes("paid-ads") || page.category.includes("Kampagnen")) return "paid";
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
