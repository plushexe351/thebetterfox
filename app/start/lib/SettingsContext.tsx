"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Settings, DEFAULT_SETTINGS, STORAGE_KEY } from "./settings";

interface SettingsContextType {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
  resetSettings: () => void;
  isLoaded: boolean;
  openQuickNotesManager: boolean;
  setOpenQuickNotesManager: (open: boolean) => void;
  openShortcutsManager: boolean;
  setOpenShortcutsManager: (open: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openQuickNotesManager, setOpenQuickNotesManager] = useState(false);
  const [openShortcutsManager, setOpenShortcutsManager] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const mergedSettings = {
          ...DEFAULT_SETTINGS,
          ...parsed,
          widgetVisibility: {
            ...DEFAULT_SETTINGS.widgetVisibility,
            ...parsed.widgetVisibility,
          },
          notes: parsed.notes || DEFAULT_SETTINGS.notes,
        };
        setSettings(mergedSettings);
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      } catch (error) {
        console.error("Failed to save settings:", error);
      }
    }
  }, [settings, isLoaded]);

  const updateSettings = useCallback((updates: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        isLoaded,
        openQuickNotesManager,
        setOpenQuickNotesManager,
        openShortcutsManager,
        setOpenShortcutsManager,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
