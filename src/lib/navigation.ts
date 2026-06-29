export type IconName =
  | "ArrowLeft"
  | "ArrowRight"
  | "Bot"
  | "BriefcaseBusiness"
  | "CheckCircle2"
  | "ChevronDown"
  | "ChevronLeft"
  | "Layers3"
  | "Mail"
  | "Megaphone"
  | "Menu"
  | "Monitor"
  | "Palette"
  | "Search"
  | "SearchCheck"
  | "Share2"
  | "Target"
  | "X";

export type MenuKey = "services" | "work";

export type NavItem = {
  label: string;
  href: string;
  description: string;
  icon: IconName;
  iconBg: string;
  iconText: string;
};

export type NavGroup = {
  key: MenuKey;
  label: string;
  items: NavItem[];
};
