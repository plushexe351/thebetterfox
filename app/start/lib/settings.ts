export type BackgroundType = "solid" | "image" | "video";

export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

export type TimeFormat = "12" | "24";

export type ClockDisplayMode = "time-only" | "date-only" | "both";

export type DateFormat =
  | "Mon Jan 12" // weekday month day
  | "01/12/2024" // MM/DD/YYYY
  | "12/01/2024" // DD/MM/YYYY
  | "2024-01-12" // YYYY-MM-DD
  | "Jan 12, 2024"; // Month day, year

export type ThemeMode = "light" | "dark";

export const FONT_OPTIONS = [
  { label: "Inter", value: "var(--font-sans)" },
  { label: "Geist Mono", value: "var(--font-geist-mono)" },
  { label: "Lora", value: "var(--font-lora)" },
  { label: "Oswald", value: "var(--font-oswald)" },
  { label: "Bebas Neue", value: "var(--font-bebas-neue)" },
  { label: "Anton", value: "var(--font-anton)" },
  { label: "Rubik Glitch", value: "var(--font-rubik-glitch)" },
  { label: "Bungee Shade", value: "var(--font-bungee-shade)" },
  { label: "Faster One", value: "var(--font-faster-one)" },
  { label: "Monoton", value: "var(--font-monoton)" },
  { label: "Righteous", value: "var(--font-righteous)" },
  { label: "Press Start 2P", value: "var(--font-press-start-2p)" },
];

export const THEME_COLOR_SHADES = {
  light: [
    "#ffffff", // White
    "#f8fafc", // Slate 50
    "#f3f4f6", // Gray 100
    "#e2e8f0", // Slate 200
    "#e5e5e5", // Neutral 200
    "#f0f9ff", // Sky 50
  ],
  dark: [
    "#09090b", // Zinc 950
    "#020617", // Slate 950
    "#111827", // Gray 900
    "#1e1e2e", // Mocha (Catppuccin-ish)
    "#000000", // Pure Black
    "#0f172a", // Slate 900
  ],
};

export interface ClockSettings {
  showSeconds: boolean;
  timeFormat: TimeFormat;
  displayMode: ClockDisplayMode;
  dateFormat: DateFormat;
  fontSize: number;
  dateFontSize: number;
  fontFamily: string;
  dateFontFamily: string;
  fontWeight: number;
  textColor?: string;
}

export type ShortcutsViewPreset = "card" | "minimal" | "glass";
export type ShortcutsAlignment = "left" | "center" | "right";

export interface ShortcutsSettings {
  viewPreset: ShortcutsViewPreset;
  alignment: ShortcutsAlignment;
}

export interface WidgetVisibility {
  clock: boolean;
  searchBar: boolean;
  shortcuts: boolean;
  quickNotes: boolean;
}

export interface SearchSettings {
  openInNewTab: boolean;
}

export interface BackgroundSettings {
  type: BackgroundType;
  solidColor?: string;
  imageUrl?: string;
  videoUrl?: string;
  blur: number; // px, 0-20
  brightness: number; // %, 0-200
  position: number; // %, 0-100 (for x-axis)
}

export interface ThemeSettings {
  mode: ThemeMode;
  darkColor: string;
  lightColor: string;
}

export interface Settings {
  background: BackgroundSettings;
  widgetVisibility: WidgetVisibility;
  clock: ClockSettings;
  search: SearchSettings;
  shortcuts: ShortcutsSettings;
  theme: ThemeSettings;
  notes: Note[];
}

export const DEFAULT_SETTINGS: Settings = {
  background: {
    type: "solid",
    solidColor: undefined, // undefined means use CSS default (no inline style)
    blur: 0,
    brightness: 100,
    position: 50,
  },
  widgetVisibility: {
    clock: true,
    searchBar: true,
    shortcuts: true,
    quickNotes: false,
  },
  clock: {
    showSeconds: false,
    timeFormat: "24",
    displayMode: "both",
    dateFormat: "Mon Jan 12",
    fontSize: 80, // Default large size
    dateFontSize: 18, // Default date size
    fontFamily: "var(--font-monoton)",
    dateFontFamily: "var(--font-sans)",
    fontWeight: 400,
    textColor: undefined, // undefined means use CSS/Theme default
  },
  search: {
    openInNewTab: false,
  },
  shortcuts: {
    viewPreset: "card",
    alignment: "center",
  },
  theme: {
    mode: "dark",
    darkColor: THEME_COLOR_SHADES.dark[0],
    lightColor: THEME_COLOR_SHADES.light[0],
  },
  notes: [],
};

export const STORAGE_KEY = "betterfox-settings";

export const COLOR_PRESETS = [
  "#000000", // black
  "#1a1a1a", // dark gray
  "#2d2d2d", // lighter dark gray
  "#ffffff", // white
  "#f5f5f5", // light gray
  "#1e293b", // slate-800
  "#0f172a", // slate-900
  "#1c1917", // stone-900
  "#09090b", // zinc-950
  "#0a0a0a", // neutral-950
];
