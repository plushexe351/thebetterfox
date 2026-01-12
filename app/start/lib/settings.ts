export type BackgroundType = "solid" | "image" | "video";

export type TimeFormat = "12" | "24";

export type ClockDisplayMode = "time-only" | "date-only" | "both";

export type DateFormat = 
  | "Mon Jan 12" // weekday month day
  | "01/12/2024" // MM/DD/YYYY
  | "12/01/2024" // DD/MM/YYYY
  | "2024-01-12" // YYYY-MM-DD
  | "Jan 12, 2024"; // Month day, year

export interface ClockSettings {
  showSeconds: boolean;
  timeFormat: TimeFormat;
  displayMode: ClockDisplayMode;
  dateFormat: DateFormat;
}

export interface WidgetVisibility {
  clock: boolean;
  searchBar: boolean;
  shortcuts: boolean;
}

export interface BackgroundSettings {
  type: BackgroundType;
  solidColor?: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface Settings {
  background: BackgroundSettings;
  widgetVisibility: WidgetVisibility;
  clock: ClockSettings;
}

export const DEFAULT_SETTINGS: Settings = {
  background: {
    type: "solid",
    solidColor: undefined, // undefined means use CSS default (no inline style)
  },
  widgetVisibility: {
    clock: true,
    searchBar: true,
    shortcuts: true,
  },
  clock: {
    showSeconds: false,
    timeFormat: "24",
    displayMode: "both",
    dateFormat: "Mon Jan 12",
  },
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
