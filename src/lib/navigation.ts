export type IconName =
  | "ArrowLeft"
  | "ArrowRight"
  | "Bot"
  | "BriefcaseBusiness"
  | "CircleCheckBig"
  | "ChevronDown"
  | "ChevronLeft"
  | "Layers"
  | "Mail"
  | "Megaphone"
  | "Menu"
  | "Monitor"
  | "Palette"
  | "Search"
  | "SearchCheck"
  | "Share2"
  | "Sparkles"
  | "Target"
  | "Video"
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
