import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  ChevronDown,
  ChevronLeft,
  Layers3,
  Megaphone,
  Menu,
  Monitor,
  Palette,
  Search,
  Share2,
  Target,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { siteContent } from "../data/siteContent";

export type NavigateHandler = (href: string) => void;
export type NavTone = "atlas" | "market" | "night" | "studio" | "orbit" | "plain";

type NavigationProps = {
  tone: NavTone;
  onNavigate: NavigateHandler;
};

type MenuKey = "services" | "work";

type NavItem = {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconText: string;
};

type NavGroup = {
  key: MenuKey;
  label: string;
  items: NavItem[];
};

const navTone = {
  shell: "border-[oklch(0.87_0.016_250)] bg-white text-[oklch(0.16_0.025_260)] shadow-[0_10px_28px_oklch(0.2_0.035_250/0.12)]",
  brand: "bg-[oklch(0.16_0.025_260)] text-white",
  link: "text-[oklch(0.27_0.035_260)] hover:bg-[oklch(0.96_0.012_250)] hover:text-[oklch(0.12_0.025_260)]",
  active: "bg-[oklch(0.95_0.018_245)] text-[oklch(0.32_0.11_245)]",
  panel: "border-[oklch(0.9_0.018_250)] bg-white text-[oklch(0.18_0.025_260)]",
  button: "bg-[oklch(0.17_0.025_260)] text-white hover:bg-[oklch(0.32_0.1_245)]",
};

function normalizePath(pathname: string) {
  const clean = pathname.replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
}

function AppLink({
  href,
  children,
  className = "",
  onNavigate,
  ariaCurrent,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onNavigate: NavigateHandler;
  ariaCurrent?: "page";
}) {
  return (
    <a
      href={href}
      className={className}
      aria-current={ariaCurrent}
      onClick={(event) => {
        if (href.startsWith("/")) {
          event.preventDefault();
          onNavigate(href);
        }
      }}
    >
      {children}
    </a>
  );
}

function useNavGroups(): NavGroup[] {
  return useMemo(
    () => [
      {
        key: "services",
        label: siteContent.navigation.servicesLabel,
        items: [
          {
            label: "Webdesign",
            href: "/leistungen/webdesign",
            description: "Websites und Landingpages, die Vertrauen und Anfrageführung klar machen",
            icon: Monitor,
            iconBg: "bg-[oklch(0.92_0.055_250)]",
            iconText: "text-[oklch(0.48_0.16_250)]",
          },
          {
            label: "SEO",
            href: "/leistungen/local-seo",
            description: "Struktur, Inhalte und Technik für bessere Sichtbarkeit in Google",
            icon: Search,
            iconBg: "bg-[oklch(0.92_0.095_150)]",
            iconText: "text-[oklch(0.47_0.17_150)]",
          },
          {
            label: "Google Ads",
            href: "/leistungen/google-ads",
            description: "Kampagnen, Landingpages und Tracking für gezielte Anfragen",
            icon: Megaphone,
            iconBg: "bg-[oklch(0.93_0.085_70)]",
            iconText: "text-[oklch(0.57_0.16_65)]",
          },
          {
            label: "Social Media",
            href: "/leistungen/social-media",
            description: "Content-Serien und Kampagnen mit erkennbarem Rhythmus",
            icon: Share2,
            iconBg: "bg-[oklch(0.92_0.06_205)]",
            iconText: "text-[oklch(0.44_0.13_215)]",
          },
          {
            label: "Branding",
            href: "/leistungen/branding",
            description: "Positionierung, Tonalität und visuelle Identität",
            icon: Palette,
            iconBg: "bg-[oklch(0.92_0.06_330)]",
            iconText: "text-[oklch(0.5_0.14_330)]",
          },
          {
            label: "KI & Automatisierung",
            href: "/leistungen/geo",
            description: "GEO, Chatbots und Workflows mit praktischem Nutzen",
            icon: Bot,
            iconBg: "bg-[oklch(0.92_0.085_300)]",
            iconText: "text-[oklch(0.52_0.18_300)]",
          },
        ],
      },
      {
        key: "work",
        label: siteContent.navigation.workLabel,
        items: [
          {
            label: "Projektarten",
            href: "/cases",
            description: "Relaunches, SEO-Strukturen und Kampagnen-Landingpages",
            icon: BriefcaseBusiness,
            iconBg: "bg-[oklch(0.92_0.06_210)]",
            iconText: "text-[oklch(0.42_0.13_225)]",
          },
          {
            label: "Methode",
            href: "/methode",
            description: "Wie aus Erstberatung, Empfehlung und Umsetzung ein klarer Ablauf wird",
            icon: Target,
            iconBg: "bg-[oklch(0.93_0.085_30)]",
            iconText: "text-[oklch(0.52_0.18_30)]",
          },
          {
            label: "Leistungsfelder",
            href: "/leistungen/webdesign",
            description: "Website, Suche, Kampagnen, Marke und Automatisierung im Zusammenspiel",
            icon: Layers3,
            iconBg: "bg-[oklch(0.94_0.05_245)]",
            iconText: "text-[oklch(0.43_0.13_250)]",
          },
        ],
      },
    ],
    [],
  );
}

export function Navigation({ onNavigate }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileView, setMobileView] = useState<MenuKey | null>(null);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const navShellRef = useRef<HTMLDivElement>(null);
  const groups = useNavGroups();
  const currentPath = normalizePath(window.location.pathname);
  const activeGroup = groups.find((group) => group.key === mobileView) ?? null;

  const isActive = (href: string) => {
    if (href === "/") return currentPath === "/";
    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  const isGroupActive = (group: NavGroup) => group.items.some((item) => isActive(item.href));

  useEffect(() => {
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!navShellRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const closeAndNavigate = (href: string) => {
    setMobileOpen(false);
    setMobileView(null);
    setOpenMenu(null);
    onNavigate(href);
  };

  const topLinks = [
    ["Über uns", "/agentur"],
    ["Preise", "/preise"],
    ["Enterprise", "/enterprise"],
    ["Kontakt", "/kontakt"],
  ] as const;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-2 sm:px-5">
      <div ref={navShellRef} className={`mx-auto max-w-[1370px] rounded-[18px] border px-4 py-2 ${navTone.shell}`}>
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
          <AppLink
            href="/"
            onNavigate={closeAndNavigate}
            ariaCurrent={isActive("/") ? "page" : undefined}
            className="flex min-w-0 items-center gap-2 rounded-full pr-2 outline-none transition-transform hover:translate-x-0.5 active:scale-[0.98]"
          >
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-impact text-sm ${navTone.brand}`}>D</span>
            <span className="block truncate font-display text-base font-black leading-none">{siteContent.brand.name}</span>
          </AppLink>

          <nav className="hidden items-center justify-center gap-1 lg:flex" aria-label="Hauptnavigation">
            <AppLink href="/agentur" onNavigate={closeAndNavigate} ariaCurrent={isActive("/agentur") ? "page" : undefined} className={`rounded-full px-3 py-2 text-sm font-bold transition active:scale-[0.97] ${navTone.link} ${isActive("/agentur") ? navTone.active : ""}`}>
              Über uns
            </AppLink>
            {groups.map((group) => (
              <DesktopMenu
                key={group.key}
                group={group}
                open={openMenu === group.key}
                active={isGroupActive(group)}
                setOpenMenu={setOpenMenu}
                onNavigate={closeAndNavigate}
                isActive={isActive}
              />
            ))}
            <AppLink href="/preise" onNavigate={closeAndNavigate} ariaCurrent={isActive("/preise") ? "page" : undefined} className={`rounded-full px-3 py-2 text-sm font-bold transition active:scale-[0.97] ${navTone.link} ${isActive("/preise") ? navTone.active : ""}`}>
              Preise
            </AppLink>
            <AppLink href="/enterprise" onNavigate={closeAndNavigate} ariaCurrent={isActive("/enterprise") ? "page" : undefined} className={`rounded-full px-3 py-2 text-sm font-bold transition active:scale-[0.97] ${navTone.link} ${isActive("/enterprise") ? navTone.active : ""}`}>
              Enterprise
            </AppLink>
            <AppLink href="/kontakt" onNavigate={closeAndNavigate} ariaCurrent={isActive("/kontakt") ? "page" : undefined} className={`rounded-full px-3 py-2 text-sm font-bold transition active:scale-[0.97] ${navTone.link} ${isActive("/kontakt") ? navTone.active : ""}`}>
              Kontakt
            </AppLink>
          </nav>

          <div className="flex items-center justify-end gap-2">
            <AppLink
              href="/kontakt"
              onNavigate={closeAndNavigate}
              className={`group hidden min-h-10 items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold shadow-[0_8px_18px_oklch(0.18_0.035_260/0.14)] transition hover:-translate-y-0.5 active:translate-y-0 lg:inline-flex ${navTone.button}`}
            >
              {siteContent.navigation.ctaLabel}
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={15} aria-hidden="true" />
            </AppLink>
            <button
              type="button"
              className={`grid h-10 w-10 place-items-center rounded-full transition hover:bg-[oklch(0.95_0.014_250)] active:scale-[0.96] lg:hidden ${navTone.link}`}
              aria-label={mobileOpen ? siteContent.navigation.menuClose : siteContent.navigation.menuOpen}
              aria-expanded={mobileOpen}
              onClick={() => {
                setMobileOpen((value) => !value);
                setMobileView(null);
              }}
            >
              {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className={`dw-mobile-menu mt-3 rounded-2xl border p-3 lg:hidden ${navTone.panel}`}>
            {activeGroup ? (
              <div>
                <button
                  type="button"
                  className="mb-3 inline-flex items-center gap-2 rounded-full bg-[oklch(0.96_0.012_250)] px-3 py-2 text-sm font-black transition hover:bg-[oklch(0.92_0.02_250)] active:scale-[0.98]"
                  onClick={() => setMobileView(null)}
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                  Zurück
                </button>
                <p className="px-2 font-display text-2xl font-black">{activeGroup.label}</p>
                <div className="mt-4 grid gap-2">
                  {activeGroup.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.href}
                        type="button"
                        className={`grid min-h-[82px] grid-cols-[auto_1fr] items-start gap-3 rounded-xl p-3 text-left transition hover:bg-[oklch(0.965_0.012_250)] active:scale-[0.98] ${isActive(item.href) ? navTone.active : ""}`}
                        onClick={() => closeAndNavigate(item.href)}
                      >
                        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${item.iconBg} ${item.iconText}`}>
                          <Icon size={20} aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-sm font-extrabold leading-5">{item.label}</span>
                          <span className="mt-1 line-clamp-2 block text-xs leading-5 text-[oklch(0.45_0.035_260)]">{item.description}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="grid gap-2">
                {groups.map((group) => (
                  <button
                    key={group.key}
                    type="button"
                    className={`flex items-center justify-between rounded-xl bg-[oklch(0.96_0.012_250)] p-4 text-left transition hover:bg-[oklch(0.92_0.02_250)] active:scale-[0.98] ${isGroupActive(group) ? navTone.active : ""}`}
                    onClick={() => setMobileView(group.key)}
                  >
                    <span className="font-display text-xl font-black">{group.label}</span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </button>
                ))}
                {topLinks.map(([label, href]) => (
                  <button
                    key={label}
                    type="button"
                    className={`rounded-xl bg-[oklch(0.96_0.012_250)] p-4 text-left font-display text-xl font-black transition hover:bg-[oklch(0.92_0.02_250)] active:scale-[0.98] ${isActive(href) ? navTone.active : ""}`}
                    onClick={() => closeAndNavigate(href)}
                  >
                    {label}
                  </button>
                ))}
                <button
                  type="button"
                  className={`rounded-xl p-4 text-left font-display text-xl font-black transition active:scale-[0.98] ${navTone.button}`}
                  onClick={() => closeAndNavigate("/kontakt")}
                >
                  {siteContent.navigation.ctaLabel}
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </header>
  );
}

function DesktopMenu({
  group,
  open,
  active,
  setOpenMenu,
  onNavigate,
  isActive,
}: {
  group: NavGroup;
  open: boolean;
  active: boolean;
  setOpenMenu: (key: MenuKey | null) => void;
  onNavigate: NavigateHandler;
  isActive: (href: string) => boolean;
}) {
  const panelId = `${group.key}-menu`;

  return (
    <div className="relative" onFocus={() => setOpenMenu(group.key)} onMouseEnter={() => setOpenMenu(group.key)} onMouseLeave={() => setOpenMenu(null)}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        className={`relative flex items-center gap-1 rounded-full px-3 py-2 text-sm font-bold transition active:scale-[0.97] ${navTone.link} ${active ? navTone.active : ""} ${
          open ? "after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:rounded-full after:bg-[oklch(0.55_0.17_250)]" : ""
        }`}
        onClick={() => setOpenMenu(open ? null : group.key)}
      >
        {group.label}
        <ChevronDown className={open ? "rotate-180 transition-transform" : "transition-transform"} size={15} aria-hidden="true" />
      </button>
      <div
        id={panelId}
        className={`dw-menu-panel absolute left-1/2 top-[calc(100%_-_2px)] w-[min(430px,calc(100vw-32px))] -translate-x-1/2 pt-3 transition duration-200 ${
          open ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className={`rounded-2xl border p-5 shadow-[0_8px_18px_oklch(0.18_0.025_250/0.12)] ${navTone.panel}`}>
          <div className="grid gap-3">
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <AppLink
                  key={item.href}
                  href={item.href}
                  onNavigate={onNavigate}
                  ariaCurrent={isActive(item.href) ? "page" : undefined}
                  className={`group grid grid-cols-[auto_1fr] items-start gap-4 rounded-xl p-2 transition hover:bg-[oklch(0.975_0.01_250)] active:scale-[0.98] ${isActive(item.href) ? navTone.active : ""}`}
                >
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${item.iconBg} ${item.iconText}`}>
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="pt-0.5">
                    <span className="block text-sm font-extrabold leading-5">{item.label}</span>
                    <span className="mt-1 block text-xs font-semibold leading-5 text-[oklch(0.46_0.035_260)]">{item.description}</span>
                  </span>
                </AppLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
