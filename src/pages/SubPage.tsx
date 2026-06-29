import type { CSSProperties, ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Layers3,
  Mail,
  Megaphone,
  Monitor,
  SearchCheck,
  Target,
} from "lucide-react";
import { Navigation, type NavigateHandler, type NavTone } from "../components/Navigation";
import { siteContent, type Subpage } from "../data/siteContent";

type SubPageProps = {
  page: Subpage | null;
  onNavigate: NavigateHandler;
  knownRoute?: boolean;
};

type PageFamily = "search" | "paid" | "design" | "pricing" | "cases" | "method" | "agency" | "enterprise" | "contact" | "resource" | "plain";
type PageDetail = (typeof siteContent.pageDetails)[keyof typeof siteContent.pageDetails];
type CurrentPage = {
  href: string;
  title: string;
  category: string;
  intro: string;
  bullets: readonly string[];
};

const familyThemes: Record<
  PageFamily,
  {
    tone: NavTone;
    accent: string;
    wash: string;
    dark: string;
  }
> = {
  search: {
    tone: "plain",
    accent: "oklch(0.6 0.16 255)",
    wash: "oklch(0.988 0.005 255)",
    dark: "oklch(0.15 0.025 265)",
  },
  paid: {
    tone: "plain",
    accent: "oklch(0.64 0.19 34)",
    wash: "oklch(0.985 0.008 52)",
    dark: "oklch(0.16 0.03 32)",
  },
  design: {
    tone: "plain",
    accent: "oklch(0.6 0.13 190)",
    wash: "oklch(0.986 0.007 205)",
    dark: "oklch(0.15 0.025 220)",
  },
  pricing: {
    tone: "plain",
    accent: "oklch(0.58 0.15 270)",
    wash: "oklch(0.99 0.004 270)",
    dark: "oklch(0.16 0.025 265)",
  },
  cases: {
    tone: "plain",
    accent: "oklch(0.62 0.13 145)",
    wash: "oklch(0.988 0.006 145)",
    dark: "oklch(0.15 0.025 160)",
  },
  method: {
    tone: "plain",
    accent: "oklch(0.66 0.14 82)",
    wash: "oklch(0.988 0.01 84)",
    dark: "oklch(0.15 0.025 80)",
  },
  agency: {
    tone: "plain",
    accent: "oklch(0.5 0.12 245)",
    wash: "oklch(0.988 0.006 245)",
    dark: "oklch(0.15 0.025 245)",
  },
  enterprise: {
    tone: "plain",
    accent: "oklch(0.58 0.12 190)",
    wash: "oklch(0.986 0.006 200)",
    dark: "oklch(0.12 0.025 210)",
  },
  contact: {
    tone: "plain",
    accent: "oklch(0.62 0.14 320)",
    wash: "oklch(0.99 0.006 320)",
    dark: "oklch(0.16 0.03 320)",
  },
  resource: {
    tone: "plain",
    accent: "oklch(0.55 0.12 230)",
    wash: "oklch(0.99 0.004 230)",
    dark: "oklch(0.15 0.025 230)",
  },
  plain: {
    tone: "plain",
    accent: "oklch(0.58 0.15 270)",
    wash: "oklch(1 0 0)",
    dark: "oklch(0.16 0.025 265)",
  },
};

const corePageConfigs: Record<
  string,
  {
    headline: string;
    lead: string;
    columns: readonly { title: string; text: string }[];
    proofTitle: string;
  }
> = {
  "/leistungen/local-seo": {
    headline: "Sichtbarkeit entsteht, wenn Suchintention, Standort und Vertrauen zusammenpassen.",
    lead:
      "SEO ist keine einzelne Maßnahme. Für deutsche Unternehmen wird es wirksam, wenn Leistungsseiten, lokale Signale, technische Grundlage und Kontaktwege gemeinsam gedacht werden.",
    columns: [
      { title: "Suchintention", text: "Wir klären, welche Begriffe Menschen wirklich nutzen, wenn sie vergleichen, anrufen oder einen Termin buchen wollen." },
      { title: "Struktur", text: "Aus Leistungen, Standorten und Zielgruppen entsteht eine Seitenarchitektur, die Google und Besucher leichter verstehen." },
      { title: "Vertrauen", text: "Bewertungen, Profilinformationen, Belege, klare Kontaktwege und verständliche Texte unterstützen die Anfrageentscheidung." },
    ],
    proofTitle: "Woran bessere SEO-Arbeit sichtbar wird",
  },
  "/leistungen/google-ads": {
    headline: "Google Ads funktioniert besser, wenn Anzeige und Landingpage dieselbe Entscheidung vorbereiten.",
    lead:
      "Budget allein löst kein Nachfrageproblem. Digitalwerk prüft Suchbegriffe, Anzeigenversprechen, Zielseite und Messung gemeinsam.",
    columns: [
      { title: "Suchbegriffe", text: "Wir trennen konkrete Nachfrage von zu breiter Streuung und ordnen Kampagnen nach Absicht, Angebot und Budget." },
      { title: "Landingpage", text: "Die Seite nach dem Klick muss das Anzeigenversprechen einlösen und den nächsten Schritt leicht machen." },
      { title: "Messung", text: "Conversions, Formulare, Anrufe und Entscheidungen werden so aufgesetzt, dass aus Daten echte Prioritäten werden." },
    ],
    proofTitle: "Woran bessere Kampagnen erkennbar werden",
  },
  "/leistungen/webdesign": {
    headline: "Eine Website muss nicht lauter werden. Sie muss schneller verstanden werden.",
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

export function SubPage({ page, onNavigate }: SubPageProps) {
  const template = siteContent.subpageTemplate;
  const labels = siteContent.pageDetailLabels;
  const detail = page ? siteContent.pageDetails[page.href as keyof typeof siteContent.pageDetails] : null;
  const current: CurrentPage =
    page ??
    {
      href: "",
      title: template.notFoundTitle,
      category: siteContent.brand.descriptor,
      intro: template.notFoundIntro,
      bullets: [siteContent.meta.defaultDescription],
    };
  const family = getPageFamily(current);
  const theme = familyThemes[family];
  const cssVars = {
    "--dw-accent": theme.accent,
    "--dw-wash": theme.wash,
    "--dw-dark": theme.dark,
  } as CSSProperties;

  return (
    <main className="min-h-screen bg-[var(--dw-wash)] text-[oklch(0.17_0.025_265)]" style={cssVars}>
      <Navigation tone={theme.tone} onNavigate={onNavigate} />

      <section className="relative overflow-hidden px-5 pb-14 pt-32 md:pt-40">
        <div className="dw-page-grid absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px]">
          <button
            type="button"
            onClick={() => onNavigate("/")}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[oklch(0.72_0.025_265)] bg-white px-4 py-2 text-sm font-black transition hover:-translate-x-0.5 hover:bg-[oklch(0.97_0.01_265)] active:scale-[0.97]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {template.backLabel}
          </button>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1.08fr)] lg:items-stretch">
            <div className="page-rise max-w-4xl">
              <h1 className="max-w-4xl text-balance font-display text-5xl font-semibold leading-[0.98] md:text-7xl">
                {current.title}
              </h1>
              <p className="mt-7 max-w-3xl text-pretty text-lg font-semibold leading-8 text-[oklch(0.35_0.04_265)]">{current.intro}</p>
              {detail ? <p className="mt-5 max-w-3xl text-pretty leading-7 text-[oklch(0.31_0.04_265)]">{detail.whyText}</p> : null}
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate("/kontakt")}
                  className="group inline-flex items-center gap-2 rounded-full bg-[var(--dw-dark)] px-5 py-3 text-sm font-black text-white shadow-[0_10px_24px_oklch(0.16_0.03_265/0.16)] transition hover:-translate-y-0.5 active:translate-y-0"
                >
                  {detail?.ctaLabel ?? template.ctaLabel}
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate("/preise")}
                  className="inline-flex items-center gap-2 rounded-full border border-current/20 bg-white px-5 py-3 text-sm font-black transition hover:-translate-y-0.5 hover:border-current/40 hover:bg-[oklch(0.98_0.006_265)] active:translate-y-0"
                >
                  Preise ansehen
                </button>
              </div>
            </div>

            <PageVisual family={family} current={current} detail={detail} />
          </div>
        </div>
      </section>

      <PageBody family={family} current={current} detail={detail} labels={labels} onNavigate={onNavigate} />
    </main>
  );
}

function getPageFamily(page: CurrentPage): PageFamily {
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

function PageVisual({ family, current, detail }: { family: PageFamily; current: CurrentPage; detail: PageDetail | null }) {
  if (family === "paid") return <PaidVisual current={current} detail={detail} />;
  if (family === "design") return <DesignVisual current={current} detail={detail} />;
  if (family === "pricing") return <PricingVisual />;
  if (family === "cases") return <CasesVisual />;
  if (family === "method") return <MethodVisual detail={detail} />;
  if (family === "agency") return <AgencyVisual detail={detail} />;
  if (family === "enterprise") return <EnterpriseVisual detail={detail} />;
  if (family === "contact") return <ContactVisual />;
  if (family === "resource") return <ResourceVisual current={current} />;
  return <SearchVisual current={current} detail={detail} />;
}

function SearchVisual({ current, detail }: { current: CurrentPage; detail: PageDetail | null }) {
  const rows = detail?.includes ?? current.bullets;
  return (
    <div className="dw-panel-enter rounded-[28px] border border-[oklch(0.82_0.022_265)] bg-white p-5 shadow-[0_18px_50px_oklch(0.18_0.03_265/0.1)]">
      <div className="grid gap-5 md:grid-cols-[0.86fr_1.14fr]">
        <div className="rounded-[22px] bg-[var(--dw-dark)] p-5 text-white">
          <SearchCheck className="text-[var(--dw-accent)]" size={32} aria-hidden="true" />
          <p className="mt-16 font-display text-3xl font-semibold leading-tight">Suchstruktur, die verstanden wird.</p>
        </div>
        <div className="grid content-center gap-3">
          {rows.slice(0, 4).map((item, index) => (
            <div key={item} className="grid grid-cols-[40px_1fr] gap-3 border-t border-[oklch(0.84_0.024_265)] pt-4">
              <span className="font-display text-2xl font-semibold text-[var(--dw-accent)]">{index + 1}</span>
              <p className="text-sm font-semibold leading-6 text-[oklch(0.32_0.04_265)]">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PaidVisual({ current, detail }: { current: CurrentPage; detail: PageDetail | null }) {
  const rows = detail?.includes ?? current.bullets;
  return (
    <div className="dw-panel-enter rounded-[28px] bg-[var(--dw-dark)] p-5 text-white shadow-[0_18px_58px_oklch(0.16_0.03_32/0.2)]">
      <div className="border-b border-white/16 pb-5">
        <div className="flex items-center justify-between gap-4">
          <p className="font-display text-3xl font-semibold">Kampagnenplan</p>
          <Megaphone className="text-[var(--dw-accent)]" size={26} aria-hidden="true" />
        </div>
        <p className="mt-3 max-w-lg text-sm font-semibold leading-6 text-white/70">
          Von der Suchabsicht bis zur Anfrage: Jeder Schritt bekommt eine klare Aufgabe.
        </p>
      </div>
      <div className="mt-6 grid gap-4">
        {rows.slice(0, 3).map((item) => (
          <div key={item} className="grid gap-3 rounded-2xl bg-white/[0.07] p-4 md:grid-cols-[170px_1fr]">
            <span className="text-sm font-black text-[var(--dw-accent)]">Prüfpunkt</span>
            <p className="text-sm font-semibold leading-6 text-white/78">{item}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs font-black text-white/78">
        {["Suchintention", "Anzeigenversprechen", "Zielseite"].map((item) => (
          <span key={item} className="rounded-xl border border-white/12 px-3 py-3">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function DesignVisual({ current, detail }: { current: CurrentPage; detail: PageDetail | null }) {
  const rows = detail?.includes ?? current.bullets;
  return (
    <div className="dw-panel-enter overflow-hidden rounded-[28px] border border-[oklch(0.82_0.022_265)] bg-white p-5 shadow-[0_18px_50px_oklch(0.18_0.03_210/0.1)]">
      <div className="rounded-[22px] bg-[linear-gradient(135deg,white,oklch(0.93_0.04_195))] p-5">
        <div className="flex items-center gap-2 border-b border-[oklch(0.84_0.024_265)] pb-4">
          <span className="h-3 w-3 rounded-full bg-[var(--dw-accent)]" />
          <span className="h-3 w-3 rounded-full bg-[oklch(0.86_0.05_80)]" />
          <span className="h-3 w-3 rounded-full bg-[oklch(0.86_0.05_330)]" />
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Monitor className="text-[var(--dw-accent)]" size={30} aria-hidden="true" />
            <p className="mt-14 font-display text-4xl font-semibold leading-tight">{current.title}</p>
          </div>
          <div className="grid gap-3">
            {rows.slice(0, 3).map((item) => (
              <p key={item} className="rounded-2xl bg-white p-4 text-sm font-semibold leading-6 shadow-sm">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingVisual() {
  return (
    <div className="dw-panel-enter rounded-[28px] border border-[oklch(0.82_0.022_265)] bg-white p-5 shadow-[0_18px_50px_oklch(0.18_0.03_265/0.1)]">
      <div className="grid gap-3">
        {siteContent.pricingModels.slice(0, 3).map((model) => (
          <div key={model.title} className="grid gap-2 border-b border-[oklch(0.86_0.025_265)] py-4 last:border-b-0 md:grid-cols-[1fr_auto]">
            <p className="font-display text-xl font-semibold">{model.title}</p>
            <p className="font-display text-xl font-semibold text-[var(--dw-accent)]">{model.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CasesVisual() {
  const items = siteContent.home.one.projectTypes;
  return (
    <div className="dw-panel-enter grid gap-3 rounded-[28px] bg-[var(--dw-dark)] p-5 text-white md:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="min-h-[190px] border border-white/14 p-4">
          <BriefcaseBusiness className="text-[var(--dw-accent)]" aria-hidden="true" />
          <p className="mt-16 text-pretty font-display text-2xl font-semibold leading-tight">{item.title}</p>
        </div>
      ))}
    </div>
  );
}

function MethodVisual({ detail }: { detail: PageDetail | null }) {
  const steps = detail?.process ?? siteContent.home.one.process.map((step) => step.title);
  return (
    <div className="dw-panel-enter rounded-[28px] border border-[oklch(0.82_0.022_265)] bg-white p-5">
      <div className="grid gap-3">
        {steps.map((step, index) => (
          <div key={step} className="grid grid-cols-[70px_1fr] items-center border-b border-[oklch(0.86_0.025_265)] py-4 last:border-b-0">
            <span className="font-display text-3xl font-semibold text-[var(--dw-accent)]">{String(index + 1).padStart(2, "0")}</span>
            <p className="font-display text-2xl font-semibold">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgencyVisual({ detail }: { detail: PageDetail | null }) {
  const items = detail?.outcomes ?? siteContent.home.one.whyItems.map((item) => item.title);
  return (
    <div className="dw-panel-enter rounded-[28px] border border-[oklch(0.82_0.022_265)] bg-white p-5 shadow-[0_18px_50px_oklch(0.18_0.03_245/0.1)]">
      <div className="rounded-[22px] bg-[linear-gradient(135deg,oklch(0.91_0.04_245),white_48%,oklch(0.91_0.04_190))] p-6">
        <p className="max-w-md font-editorial text-4xl font-semibold italic leading-tight text-[oklch(0.42_0.12_245)]">
          Ruhige Strategie. Saubere Umsetzung. Keine Show.
        </p>
        <div className="mt-10 grid gap-3">
          {items.slice(0, 3).map((item) => (
            <p key={item} className="rounded-full bg-white/75 px-4 py-3 text-sm font-black shadow-sm">
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function EnterpriseVisual({ detail }: { detail: PageDetail | null }) {
  const rows = detail?.includes ?? [];
  return (
    <div className="dw-panel-enter rounded-[28px] bg-[var(--dw-dark)] p-5 text-white shadow-[0_18px_58px_oklch(0.16_0.03_210/0.22)]">
      <div className="grid gap-3 md:grid-cols-3">
        {["Teams", "Daten", "Märkte"].map((item) => (
          <div key={item} className="min-h-[116px] rounded-2xl border border-white/12 bg-white/[0.06] p-4">
            <Layers3 className="text-[var(--dw-accent)]" aria-hidden="true" />
            <p className="mt-8 text-sm font-black">{item}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border border-white/12 bg-white/[0.055] p-4">
        {rows.slice(0, 3).map((item) => (
          <p key={item} className="border-b border-white/12 py-4 text-sm font-semibold leading-6 text-white/76 last:border-b-0">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function ContactVisual() {
  return (
    <div className="dw-panel-enter rounded-[28px] border border-[oklch(0.82_0.022_265)] bg-white p-5 shadow-[0_18px_50px_oklch(0.18_0.03_320/0.1)]">
      <div className="rounded-[22px] bg-[oklch(0.97_0.014_320)] p-6">
        <Mail className="text-[var(--dw-accent)]" size={30} aria-hidden="true" />
        <p className="mt-16 font-display text-4xl font-semibold leading-tight">Eine kurze Nachricht reicht für den Anfang.</p>
        <p className="mt-5 text-sm font-semibold leading-7 text-[oklch(0.35_0.04_265)]">{siteContent.brand.responseTime}</p>
      </div>
    </div>
  );
}

function ResourceVisual({ current }: { current: CurrentPage }) {
  return (
    <div className="dw-panel-enter rounded-[28px] border border-[oklch(0.82_0.022_265)] bg-white p-5">
      <div className="grid gap-3">
        {current.bullets.map((item) => (
          <p key={item} className="border-b border-[oklch(0.86_0.025_265)] py-4 font-display text-2xl font-semibold last:border-b-0">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function PageBody({
  family,
  current,
  detail,
  labels,
  onNavigate,
}: {
  family: PageFamily;
  current: CurrentPage;
  detail: PageDetail | null;
  labels: typeof siteContent.pageDetailLabels;
  onNavigate: NavigateHandler;
}) {
  const coreConfig = corePageConfigs[current.href];
  if (coreConfig && detail) return <CoreServiceBody current={current} detail={detail} config={coreConfig} labels={labels} onNavigate={onNavigate} />;
  if (family === "pricing") return <PricingBody onNavigate={onNavigate} />;
  if (family === "contact") return <ContactBody detail={detail} />;
  if (family === "cases") return <CasesBody onNavigate={onNavigate} />;
  if (family === "method") return <MethodBody detail={detail} onNavigate={onNavigate} />;
  if (family === "agency") return <AgencyBody detail={detail} onNavigate={onNavigate} />;
  if (family === "enterprise") return <EnterpriseBody detail={detail} onNavigate={onNavigate} />;
  if (family === "resource") return <ResourceBody current={current} detail={detail} labels={labels} />;
  return <GenericBody current={current} detail={detail} labels={labels} onNavigate={onNavigate} />;
}

function GenericBody({
  current,
  detail,
  labels,
  onNavigate,
}: {
  current: CurrentPage;
  detail: PageDetail | null;
  labels: typeof siteContent.pageDetailLabels;
  onNavigate: NavigateHandler;
}) {
  const includes = detail?.includes ?? current.bullets;
  const outcomes = detail?.outcomes ?? current.bullets;
  return (
    <>
      <SectionShell>
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.42fr_0.58fr]">
          <div>
            <h2 className="text-balance font-display text-4xl font-semibold leading-tight md:text-5xl">{detail?.whyTitle ?? current.title}</h2>
            <p className="mt-6 max-w-xl text-pretty text-base font-semibold leading-8 text-[oklch(0.34_0.04_265)]">{detail?.whyText ?? current.intro}</p>
            <button type="button" onClick={() => onNavigate("/kontakt")} className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--dw-dark)] px-5 py-3 text-sm font-black text-white shadow-[0_10px_24px_oklch(0.16_0.03_265/0.14)] transition hover:-translate-y-0.5 active:translate-y-0">
              {detail?.ctaLabel ?? "Projekt besprechen"}
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={16} aria-hidden="true" />
            </button>
          </div>
          <BorderList title={labels.includes} items={includes} />
        </div>
      </SectionShell>

      <SectionShell dark>
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.34fr_0.66fr]">
          <h2 className="text-balance font-display text-4xl font-semibold leading-tight md:text-5xl">{labels.outcomes}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {outcomes.map((item) => (
              <div key={item} className="border-t border-white/24 py-5">
                <p className="text-pretty text-sm font-semibold leading-7 text-white/76">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <ProcessAndFaq process={detail?.process ?? []} faq={detail?.faq ?? []} labels={labels} />
    </>
  );
}

function CoreServiceBody({
  current,
  detail,
  config,
  labels,
  onNavigate,
}: {
  current: CurrentPage;
  detail: PageDetail;
  config: (typeof corePageConfigs)[string];
  labels: typeof siteContent.pageDetailLabels;
  onNavigate: NavigateHandler;
}) {
  return (
    <>
      <SectionShell>
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.44fr_0.56fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <h2 className="max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-[oklch(0.32_0.075_250)] md:text-6xl">
              {config.headline}
            </h2>
            <p className="mt-6 max-w-xl text-pretty text-base font-semibold leading-8 text-[oklch(0.33_0.04_265)]">{config.lead}</p>
            <button
              type="button"
              onClick={() => onNavigate("/kontakt")}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--dw-dark)] px-5 py-3 text-sm font-black text-white shadow-[0_10px_24px_oklch(0.16_0.03_265/0.14)] transition hover:-translate-y-0.5 active:translate-y-0"
            >
              {detail.ctaLabel}
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={16} aria-hidden="true" />
            </button>
          </div>
          <div className="border-y border-[oklch(0.76_0.028_265)]">
            {config.columns.map((item) => (
              <div key={item.title} className="grid gap-4 border-b border-[oklch(0.86_0.024_265)] py-7 last:border-b-0 md:grid-cols-[180px_1fr]">
                <h3 className="font-display text-2xl font-semibold text-[oklch(0.22_0.035_265)]">{item.title}</h3>
                <p className="max-w-3xl text-pretty text-base font-semibold leading-8 text-[oklch(0.34_0.04_265)]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell dark>
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
          <h2 className="text-balance font-display text-4xl font-semibold leading-tight md:text-5xl">{labels.problems}</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {detail.problems.map((item) => (
              <div key={item} className="border-t border-white/24 py-5">
                <p className="text-pretty text-sm font-semibold leading-7 text-white/76">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.45fr_0.55fr]">
          <div>
            <h2 className="text-balance font-display text-4xl font-semibold leading-tight md:text-5xl">{config.proofTitle}</h2>
            <div className="mt-8 grid gap-3">
              {detail.outcomes.map((item) => (
                <div key={item} className="flex items-start gap-3 border-t border-[oklch(0.84_0.024_265)] pt-4">
                  <CheckCircle2 className="mt-1 shrink-0 text-[var(--dw-accent)]" size={20} aria-hidden="true" />
                  <p className="font-display text-xl font-semibold leading-tight text-[oklch(0.22_0.035_265)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <BorderList title={labels.includes} items={detail.includes} />
        </div>
      </SectionShell>

      <ProcessAndFaq process={detail.process} faq={detail.faq} labels={labels} />
    </>
  );
}

function PricingBody({ onNavigate }: { onNavigate: NavigateHandler }) {
  return (
    <SectionShell>
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
          <div>
            <h2 className="text-balance font-display text-4xl font-semibold leading-tight md:text-6xl">Richtwerte für typische Projektgrößen.</h2>
            <p className="mt-6 max-w-xl text-pretty text-base font-semibold leading-8 text-[oklch(0.34_0.04_265)]">
              Die Beträge sind Orientierung zzgl. MwSt. Externe Tools und Media-Budget werden separat geplant.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {siteContent.pricingModels.map((model) => (
              <div key={model.title} className="rounded-2xl border border-[oklch(0.84_0.024_265)] bg-white p-5">
                <p className="font-display text-2xl font-semibold">{model.title}</p>
                <p className="mt-6 font-display text-3xl font-semibold text-[var(--dw-accent)]">{model.price}</p>
                <p className="mt-4 text-sm font-semibold leading-7 text-[oklch(0.35_0.04_265)]">{model.text}</p>
              </div>
            ))}
          </div>
        </div>
        <button type="button" onClick={() => onNavigate("/kontakt")} className="group mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--dw-dark)] px-5 py-3 text-sm font-black text-white shadow-[0_10px_24px_oklch(0.16_0.03_265/0.14)] transition hover:-translate-y-0.5 active:translate-y-0">
          Budget einordnen lassen
          <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={16} aria-hidden="true" />
        </button>
      </div>
    </SectionShell>
  );
}

function CasesBody({ onNavigate }: { onNavigate: NavigateHandler }) {
  return (
    <SectionShell>
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.36fr_0.64fr]">
        <div>
          <h2 className="font-display text-4xl font-semibold leading-tight md:text-6xl">Keine erfundenen Zahlen. Echte Projektarten.</h2>
          <p className="mt-6 max-w-lg text-base font-semibold leading-8 text-[oklch(0.34_0.04_265)]">
            Freigegebene Cases brauchen Kontext. Bis dahin zeigen wir offen, welche Arbeiten sinnvoll als Startpunkt dienen.
          </p>
          <button type="button" onClick={() => onNavigate("/kontakt")} className="mt-8 rounded-full bg-[var(--dw-dark)] px-5 py-3 text-sm font-black text-white shadow-[0_10px_24px_oklch(0.16_0.03_265/0.14)] transition hover:-translate-y-0.5 active:translate-y-0">
            Eigenes Projekt besprechen
          </button>
        </div>
        <div className="grid gap-4">
          {siteContent.home.one.projectTypes.map((item) => (
            <div key={item.title} className="grid gap-3 border-t border-[oklch(0.84_0.024_265)] py-6 md:grid-cols-[250px_1fr]">
              <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
              <p className="text-sm font-semibold leading-7 text-[oklch(0.34_0.04_265)]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function MethodBody({ detail, onNavigate }: { detail: PageDetail | null; onNavigate: NavigateHandler }) {
  const steps = siteContent.home.one.process;
  return (
    <SectionShell dark>
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr]">
          <h2 className="text-balance font-display text-4xl font-semibold leading-tight md:text-6xl">Ein ruhiger Ablauf für bessere Entscheidungen.</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {steps.map((step, index) => (
              <div key={step.title} className="border-t border-white/20 py-6">
                <p className="text-sm font-black text-[var(--dw-accent)]">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-5 font-display text-3xl font-semibold">{step.title}</p>
                <p className="mt-3 text-sm font-semibold leading-7 text-white/74">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
        <button type="button" onClick={() => onNavigate("/kontakt")} className="mt-10 rounded-full bg-white px-5 py-3 text-sm font-black text-[var(--dw-dark)] transition hover:-translate-y-0.5 hover:bg-white/90 active:translate-y-0">
          {detail?.ctaLabel ?? "Methode kennenlernen"}
        </button>
      </div>
    </SectionShell>
  );
}

function AgencyBody({ detail, onNavigate }: { detail: PageDetail | null; onNavigate: NavigateHandler }) {
  return (
    <>
      <SectionShell>
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.42fr_0.58fr]">
          <div>
            <h2 className="text-balance font-display text-4xl font-semibold leading-tight text-[oklch(0.42_0.12_245)] md:text-6xl">
              Eine Agentur für Unternehmen, die klarer auftreten und besser verkaufen wollen.
            </h2>
            <button
              type="button"
              onClick={() => onNavigate("/kontakt")}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--dw-dark)] px-5 py-3 text-sm font-black text-white shadow-[0_10px_24px_oklch(0.16_0.03_265/0.14)] transition hover:-translate-y-0.5 active:translate-y-0"
            >
              {detail?.ctaLabel ?? "Erstgespräch anfragen"}
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={16} aria-hidden="true" />
            </button>
          </div>
          <BorderList title={siteContent.pageDetailLabels.includes} items={detail?.includes ?? []} />
        </div>
      </SectionShell>
      <SectionShell dark>
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.32fr_0.68fr]">
          <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">Was anders läuft</h2>
          <HorizontalRail>
            {(detail?.problems ?? []).map((item) => (
              <RailItem key={item} dark>
                {item}
              </RailItem>
            ))}
          </HorizontalRail>
        </div>
      </SectionShell>
    </>
  );
}

function EnterpriseBody({ detail, onNavigate }: { detail: PageDetail | null; onNavigate: NavigateHandler }) {
  return (
    <>
      <SectionShell dark>
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr]">
            <h2 className="text-balance font-display text-4xl font-semibold leading-tight md:text-6xl">Struktur für Marketing mit mehr beweglichen Teilen.</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {(detail?.includes ?? []).map((item) => (
                <div key={item} className="min-h-[190px] border-t-4 border-[var(--dw-accent)] bg-white/[0.075] p-5">
                  <p className="text-pretty text-sm font-semibold leading-7 text-white/76">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <button type="button" onClick={() => onNavigate("/kontakt")} className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[var(--dw-dark)] transition hover:-translate-y-0.5 hover:bg-white/90 active:translate-y-0">
            {detail?.ctaLabel ?? "Enterprise-Projekt besprechen"}
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={16} aria-hidden="true" />
          </button>
        </div>
      </SectionShell>
      <ProcessAndFaq process={detail?.process ?? []} faq={detail?.faq ?? []} labels={siteContent.pageDetailLabels} />
    </>
  );
}

function ContactBody({ detail }: { detail: PageDetail | null }) {
  return (
    <SectionShell>
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.4fr_0.6fr]">
        <div className="lg:sticky lg:top-28">
          <h2 className="font-display text-4xl font-semibold leading-tight text-[oklch(0.28_0.075_300)] md:text-6xl">Erzähl kurz, was sich verbessern soll.</h2>
          <p className="mt-6 max-w-xl text-pretty text-base font-semibold leading-8 text-[oklch(0.34_0.04_265)]">
            Wir melden uns mit einer ehrlichen Einschätzung und sagen klar, ob Website, Suchmaschinenoptimierung, Kampagnen, Social Media oder Branding zuerst Sinn ergibt.
          </p>
          <div className="mt-8 grid gap-4 border-y border-[oklch(0.78_0.03_265)] py-5 text-sm font-semibold leading-6 text-[oklch(0.31_0.04_265)]">
            <p>{siteContent.brand.addressLine}</p>
            <p>{siteContent.brand.responseTime}</p>
            <a className="font-black text-[var(--dw-accent)]" href={`mailto:${siteContent.brand.email}`}>
              {siteContent.brand.email}
            </a>
          </div>
        </div>
        <form
          className="rounded-2xl border border-[oklch(0.82_0.026_265)] bg-white p-4 shadow-[0_14px_40px_oklch(0.18_0.03_265/0.08)] md:p-6"
          action={`mailto:${siteContent.brand.email}`}
          method="post"
          encType="text/plain"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name" name="name" placeholder="Vor- und Nachname" required />
            <Field label="Unternehmen" name="unternehmen" placeholder="Firma oder Organisation" />
            <Field label="E-Mail" name="email" type="email" placeholder="name@unternehmen.de" required />
            <Field label="Website" name="website" placeholder="https://..." />
            <label className="grid gap-2 text-sm font-black text-[oklch(0.24_0.035_265)]">
              Thema
              <select name="thema" required className="min-h-12 rounded-xl border border-[oklch(0.82_0.024_265)] bg-white px-4 font-semibold outline-none transition hover:border-[oklch(0.66_0.05_265)] focus:border-[var(--dw-accent)]">
                <option value="">Bitte einordnen</option>
                <option>Webdesign / Relaunch</option>
                <option>SEO / lokale Sichtbarkeit</option>
                <option>Google Ads / Paid Media</option>
                <option>Social Media / Branding</option>
                <option>Noch unklar</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-black text-[oklch(0.24_0.035_265)]">
              Unternehmenstyp
              <select name="unternehmenstyp" className="min-h-12 rounded-xl border border-[oklch(0.82_0.024_265)] bg-white px-4 font-semibold outline-none transition hover:border-[oklch(0.66_0.05_265)] focus:border-[var(--dw-accent)]">
                <option>Lokales Unternehmen</option>
                <option>B2B</option>
                <option>E-Commerce</option>
                <option>Praxis / Kanzlei</option>
                <option>Mehrere Standorte</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-black text-[oklch(0.24_0.035_265)] md:col-span-2">
              Ausgangslage
              <textarea
                name="ausgangslage"
                required
                className="min-h-36 rounded-xl border border-[oklch(0.82_0.024_265)] px-4 py-3 font-semibold leading-7 outline-none transition hover:border-[oklch(0.66_0.05_265)] focus:border-[var(--dw-accent)]"
                placeholder="Was soll sich verbessern? Mehr lokale Anfragen, bessere Kampagnen, Relaunch, Tracking, Markenauftritt..."
              />
            </label>
          </div>
          <div className="mt-6 flex flex-col gap-3 border-t border-[oklch(0.86_0.025_265)] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm font-semibold leading-6 text-[oklch(0.36_0.04_265)]">
              Mit dem Absenden öffnet sich dein E-Mail-Programm. Pflichtfelder sind Name, E-Mail, Thema und Ausgangslage.
            </p>
            <button type="submit" className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--dw-dark)] px-5 py-3 text-sm font-black text-white shadow-[0_10px_24px_oklch(0.16_0.03_265/0.14)] transition hover:-translate-y-0.5 active:translate-y-0">
              {detail?.ctaLabel ?? "Anfrage senden"}
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={16} aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
    </SectionShell>
  );
}

function ResourceBody({
  current,
  detail,
  labels,
}: {
  current: CurrentPage;
  detail: PageDetail | null;
  labels: typeof siteContent.pageDetailLabels;
}) {
  return (
    <>
      <SectionShell>
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.36fr_0.64fr]">
          <h2 className="font-display text-4xl font-semibold leading-tight md:text-6xl">{labels.includes}</h2>
          <div className="columns-1 gap-8 md:columns-2">
            {(detail?.includes ?? current.bullets).map((item) => (
              <p key={item} className="mb-5 break-inside-avoid border-t border-[oklch(0.78_0.03_265)] pt-4 text-lg font-semibold leading-8">
                {item}
              </p>
            ))}
          </div>
        </div>
      </SectionShell>
      <ProcessAndFaq process={detail?.process ?? []} faq={detail?.faq ?? []} labels={labels} />
    </>
  );
}

function ProcessAndFaq({
  process,
  faq,
  labels,
}: {
  process: readonly string[];
  faq: readonly { question: string; answer: string }[];
  labels: typeof siteContent.pageDetailLabels;
}) {
  if (!process.length && !faq.length) return null;

  return (
    <SectionShell>
      <div className="mx-auto grid max-w-[1440px] min-w-0 gap-10 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)]">
        {process.length ? (
          <div className="min-w-0">
            <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">{labels.process}</h2>
            <div className="dw-snap-scroll mt-8 flex max-w-full gap-3 overflow-x-auto pb-3 md:grid md:grid-cols-4 md:overflow-visible">
              {process.map((step, index) => (
                <div key={step} className="min-w-[235px] border-t-4 border-[var(--dw-accent)] bg-white p-4 md:min-w-0">
                  <span className="font-display text-3xl font-semibold text-[var(--dw-accent)]">{String(index + 1).padStart(2, "0")}</span>
                  <p className="mt-8 font-display text-xl font-semibold">{step}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {faq.length ? (
          <div className="min-w-0">
            <h2 className="mb-6 font-display text-3xl font-semibold">{labels.faq}</h2>
            <div className="grid gap-3">
              {faq.map((item) => (
                <details key={item.question} className="group rounded-xl border border-[oklch(0.88_0.02_265)] bg-white p-4 shadow-sm transition hover:border-[oklch(0.72_0.04_265)]">
                  <summary className="cursor-pointer list-none rounded-lg font-display text-xl font-semibold outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[var(--dw-accent)]">
                    {item.question}
                    <span className="float-right transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-sm font-semibold leading-7 text-[oklch(0.34_0.04_265)]">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </SectionShell>
  );
}

function SectionShell({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <section className={`${dark ? "bg-[var(--dw-dark)] text-white" : ""} px-5 py-16 md:py-24`}>{children}</section>;
}

function BorderList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="border-y border-[oklch(0.78_0.03_265)]">
      <p className="py-5 text-sm font-black text-[var(--dw-accent)]">{title}</p>
      {items.map((item) => (
        <p key={item} className="border-t border-[oklch(0.86_0.025_265)] py-5 text-pretty text-base font-semibold leading-8 text-[oklch(0.34_0.04_265)]">
          {item}
        </p>
      ))}
    </div>
  );
}

function HorizontalRail({ children }: { children: ReactNode }) {
  return <div className="dw-snap-scroll flex max-w-full gap-3 overflow-x-auto pb-3 md:grid md:grid-cols-3 md:overflow-visible">{children}</div>;
}

function RailItem({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div
      className={`min-w-[min(74vw,320px)] rounded-xl p-5 md:min-w-0 ${
        dark ? "bg-white/[0.075] text-white" : "bg-white text-[oklch(0.17_0.025_265)] shadow-sm"
      }`}
    >
      <p className={`text-pretty text-sm font-semibold leading-7 ${dark ? "text-white/76" : "text-[oklch(0.33_0.04_265)]"}`}>{children}</p>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-[oklch(0.24_0.035_265)]">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="min-h-12 rounded-xl border border-[oklch(0.82_0.024_265)] px-4 font-semibold outline-none transition hover:border-[oklch(0.66_0.05_265)] focus:border-[var(--dw-accent)]"
        placeholder={placeholder}
      />
    </label>
  );
}
