"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  RotateCcw,
  Upload,
  X,
  Moon,
  Sun,
  Info,
  NotebookPen,
  Link,
  ChevronRight,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSettings } from "../lib/SettingsContext";
import {
  BackgroundType,
  TimeFormat,
  ClockDisplayMode,
  DateFormat,
  THEME_COLOR_SHADES,
  FONT_OPTIONS,
  ThemeMode,
  ShortcutsViewPreset,
  ShortcutsAlignment,
  IMAGE_PRESETS,
  VIDEO_PRESETS,
} from "../lib/settings";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SettingsContentProps {
  onResetClick: () => void;
}

export default function SettingsContent({
  onResetClick,
}: SettingsContentProps) {
  const {
    settings,
    updateSettings,
    setOpenQuickNotesManager,
    setOpenShortcutsManager,
  } = useSettings();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleBackgroundTypeChange = (type: BackgroundType) => {
    updateSettings({
      background: {
        ...settings.background,
        type,
      },
    });
  };

  const handleSolidColorChange = (color: string) => {
    updateSettings({
      background: {
        ...settings.background,
        type: "solid",
        solidColor: color.trim() || undefined,
      },
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        updateSettings({
          background: {
            ...settings.background,
            type: "image",
            imageUrl,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const videoUrl = reader.result as string;
        updateSettings({
          background: {
            ...settings.background,
            type: "video",
            videoUrl,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidgetVisibilityChange = (
    widget: keyof typeof settings.widgetVisibility,
    value: boolean,
  ) => {
    updateSettings({
      widgetVisibility: {
        ...settings.widgetVisibility,
        [widget]: value,
      },
    });
  };

  const handleClockSettingsChange = (
    key: keyof typeof settings.clock,
    value:
      | boolean
      | TimeFormat
      | ClockDisplayMode
      | DateFormat
      | number
      | string
      | undefined,
  ) => {
    updateSettings({
      clock: {
        ...settings.clock,
        [key]: value,
      },
    });
  };

  const formatDateExample = (format: DateFormat, date: Date) => {
    const options: Record<DateFormat, Intl.DateTimeFormatOptions> = {
      "Mon Jan 12": { weekday: "short", month: "short", day: "numeric" },
      "01/12/2024": { month: "2-digit", day: "2-digit", year: "numeric" },
      "12/01/2024": { day: "2-digit", month: "2-digit", year: "numeric" },
      "2024-01-12": { year: "numeric", month: "2-digit", day: "2-digit" },
      "Jan 12, 2024": { month: "short", day: "numeric", year: "numeric" },
    };
    return date.toLocaleDateString("en-US", options[format]);
  };

  const handleThemeModeChange = (checked: boolean) => {
    updateSettings({
      theme: {
        ...settings.theme,
        mode: checked ? "dark" : "light",
      },
    });
  };

  const handleThemeSettingsChange = (
    key: keyof typeof settings.theme,
    value: string,
  ) => {
    updateSettings({
      theme: {
        ...settings.theme,
        [key]: value as ThemeMode | ShortcutsViewPreset,
      },
    });
  };

  const handleShortcutsSettingsChange = (
    key: keyof typeof settings.shortcuts,
    value: string,
  ) => {
    updateSettings({
      shortcuts: {
        ...settings.shortcuts,
        [key]: value as ShortcutsAlignment,
      },
    });
  };

  const handleSearchSettingsChange = (
    key: keyof typeof settings.search,
    value: boolean,
  ) => {
    updateSettings({
      search: {
        ...settings.search,
        [key]: value,
      },
    });
  };

  const handleThemeColorChange = (color: string) => {
    updateSettings({
      theme: {
        ...settings.theme,
        [settings.theme.mode === "dark" ? "darkColor" : "lightColor"]: color,
      },
    });
  };

  const currentThemeColor =
    settings.theme.mode === "dark"
      ? settings.theme.darkColor
      : settings.theme.lightColor;

  return (
    <div className="space-y-6 pb-6 px-1 pt-5 overflow-y-auto">
      {/* Widget Visibility */}
      <div className="space-y-4">
        <div className="mx-5.5 mb-3">
          <h3 className="text-primary text-base font-medium">Widgets</h3>
        </div>
        <Card className="space-y-3 rounded-3xl">
          <CardContent>
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between flex-wrap space-y-4">
                <div className="space-y-0.5">
                  <Label htmlFor="show-titles">Widget Titles</Label>
                </div>
                <Switch
                  id="show-titles"
                  checked={settings.widgetVisibility.showTitles}
                  onCheckedChange={(checked) =>
                    handleWidgetVisibilityChange("showTitles", checked)
                  }
                />
                <p className="text-xs text-muted-foreground min-w-full">
                  Not all widgets support titles
                </p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label htmlFor="clock-visibility">Clock</Label>
                <Switch
                  id="clock-visibility"
                  checked={settings.widgetVisibility.clock}
                  onCheckedChange={(checked) =>
                    handleWidgetVisibilityChange("clock", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label htmlFor="searchbar-visibility">Search Bar</Label>
                <Switch
                  id="searchbar-visibility"
                  checked={settings.widgetVisibility.searchBar}
                  onCheckedChange={(checked) =>
                    handleWidgetVisibilityChange("searchBar", checked)
                  }
                />
              </div>
              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="shortcuts-visibility">Shortcuts</Label>
                  <Switch
                    id="shortcuts-visibility"
                    checked={settings.widgetVisibility.shortcuts}
                    onCheckedChange={(checked) =>
                      handleWidgetVisibilityChange("shortcuts", checked)
                    }
                  />
                </div>
                {settings.widgetVisibility.shortcuts && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-9 rounded-xl border-white/5 bg-white/5 hover:bg-white/10 text-xs font-medium justify-between group"
                    onClick={() => setOpenShortcutsManager(true)}
                  >
                    <div className="flex items-center gap-2">
                      <Link className="h-3.5 w-3.5 text-orange-500" />
                      Manage Shortcuts
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-white/20 group-hover:text-white/40 transition-colors" />
                  </Button>
                )}
              </div>
              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="quick-notes-visibility">Quick Notes</Label>
                  <Switch
                    id="quick-notes-visibility"
                    checked={settings.widgetVisibility.quickNotes}
                    onCheckedChange={(checked) =>
                      handleWidgetVisibilityChange("quickNotes", checked)
                    }
                  />
                </div>
                {settings.widgetVisibility.quickNotes && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-9 rounded-xl border-white/5 bg-white/5 hover:bg-white/10 text-xs font-medium justify-between group"
                    onClick={() => setOpenQuickNotesManager(true)}
                  >
                    <div className="flex items-center gap-2">
                      <NotebookPen className="h-3.5 w-3.5 text-primary" />
                      Manage Quickies
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-white/20 group-hover:text-white/40 transition-colors" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Theme Settings */}
      <div className="space-y-4">
        <h3 className="text-primary text-base mb-3 font-medium mx-5.5">
          Theme
        </h3>
        <Card className="space-y-3 rounded-3xl">
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {settings.theme.mode === "dark" ? (
                    <Moon className="w-4 h-4" />
                  ) : (
                    <Sun className="w-4 h-4" />
                  )}
                  <Label htmlFor="theme-mode">Dark Mode</Label>
                </div>
                <Switch
                  id="theme-mode"
                  checked={settings.theme.mode === "dark"}
                  onCheckedChange={handleThemeModeChange}
                />
              </div>
              <Separator />
              <div className="space-y-3 flex justify-between">
                <Label>View Preset</Label>
                <Select
                  value={settings.theme.viewPreset}
                  onValueChange={(value) =>
                    handleThemeSettingsChange("viewPreset", value)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="glass">Glass</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <Label>Background</Label>
              <div className="flex gap-2 mb-3">
                <Button
                  variant={
                    settings.background.type === "solid" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleBackgroundTypeChange("solid")}
                >
                  Solid
                </Button>
                <Button
                  variant={
                    settings.background.type === "image" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleBackgroundTypeChange("image")}
                >
                  Image
                </Button>
                <Button
                  variant={
                    settings.background.type === "video" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleBackgroundTypeChange("video")}
                >
                  Video
                </Button>
              </div>

              {settings.background.type === "solid" && (
                <div className="space-y-3">
                  {/* <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground text-center">
                    Solid background preset options change depening on Theme
                    selected above.
                  </div> */}
                  <div className="text-xs text-muted-foreground text-sm mt-2">
                    Select a theme shade below or pick a custom color.
                  </div>
                  <div className="space-y-3">
                    <Label>
                      Theme Background Color ({settings.theme.mode})
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {THEME_COLOR_SHADES[settings.theme.mode].map((color) => (
                        <button
                          key={color}
                          type="button"
                          className={`w-6 h-6 rounded-full border-2 transition-all ${
                            currentThemeColor === color
                              ? "border-foreground scale-110"
                              : "border-transparent hover:scale-105"
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => handleThemeColorChange(color)}
                          aria-label={`Select color ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 justify-between flex-wrap items-center mt-3">
                    <Label className="shrink-0">Custom Color</Label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={settings.background.solidColor || "#000000"}
                        onChange={(e) => handleSolidColorChange(e.target.value)}
                        className="w-6 h-6 p-0 border-0 rounded overflow-hidden cursor-pointer"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSolidColorChange("")}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {settings.background.type === "image" && (
                <div className="space-y-3">
                  <Label className="text-s text-muted-foreground font-semibold">
                    Custom
                  </Label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  <div className="space-y-2">
                    <Label className="text-s text-muted-foreground font-semibold">
                      Presets
                    </Label>
                    {IMAGE_PRESETS.length === 0 && (
                      <p className="text-xs text-muted-foreground">
                        No presets available.
                      </p>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      {IMAGE_PRESETS.map((preset) => (
                        <Button
                          key={preset.url}
                          variant="outline"
                          size="sm"
                          className={cn(
                            "h-16 relative overflow-hidden group border-white/5",
                            settings.background.imageUrl === preset.url &&
                              "ring-2 ring-primary",
                          )}
                          onClick={() =>
                            updateSettings({
                              background: {
                                ...settings.background,
                                type: "image",
                                imageUrl: preset.url,
                              },
                            })
                          }
                        >
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="text-[10px] font-medium text-white shadow-sm">
                              {preset.name}
                            </span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                  {settings.background.imageUrl && (
                    <div className="relative">
                      <img
                        src={settings.background.imageUrl}
                        alt="Background preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="absolute top-2 right-2"
                        onClick={() =>
                          updateSettings({
                            background: {
                              ...settings.background,
                              imageUrl: undefined,
                            },
                          })
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {settings.background.type === "video" && (
                <div className="space-y-3">
                  <Label className="text-s text-muted-foreground font-semibold">
                    Custom
                  </Label>
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => videoInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Video
                  </Button>
                  <div className="space-y-2">
                    <Label className="text-s text-muted-foreground font-semibold">
                      Presets
                    </Label>
                    {VIDEO_PRESETS.length === 0 && (
                      <p className="text-xs text-muted-foreground">
                        No presets available.
                      </p>
                    )}
                    {VIDEO_PRESETS.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {VIDEO_PRESETS.map((preset) => (
                          <Button
                            key={preset.url}
                            variant="outline"
                            size="sm"
                            className={cn(
                              "h-16 relative overflow-hidden group border-white/5",
                              settings.background.videoUrl === preset.url &&
                                "ring-2 ring-primary",
                            )}
                            onClick={() =>
                              updateSettings({
                                background: {
                                  ...settings.background,
                                  type: "video",
                                  videoUrl: preset.url,
                                },
                              })
                            }
                          >
                            <video
                              src={preset.url}
                              className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
                              muted
                              loop
                              onMouseEnter={(e) => e.currentTarget.play()}
                              onMouseLeave={(e) => {
                                e.currentTarget.pause();
                                e.currentTarget.currentTime = 0;
                              }}
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <span className="text-[10px] font-medium text-white shadow-sm">
                                {preset.name}
                              </span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                  {settings.background.videoUrl && (
                    <div className="relative">
                      <video
                        src={settings.background.videoUrl}
                        className="w-full h-32 object-cover rounded-lg"
                        muted
                        loop
                        playsInline
                      />
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="absolute top-2 right-2"
                        onClick={() =>
                          updateSettings({
                            background: {
                              ...settings.background,
                              videoUrl: undefined,
                            },
                          })
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Brightness & Blur Sliders - Only show for image/video */}
              {(settings.background.type === "image" ||
                settings.background.type === "video") && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label>Brightness</Label>
                      <span className="text-sm text-muted-foreground">
                        {settings.background.brightness}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      step="5"
                      value={settings.background.brightness}
                      onChange={(e) =>
                        updateSettings({
                          background: {
                            ...settings.background,
                            brightness: parseInt(e.target.value),
                          },
                        })
                      }
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label>Blur</Label>
                      <span className="text-sm text-muted-foreground">
                        {settings.background.blur}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="1"
                      value={settings.background.blur}
                      onChange={(e) =>
                        updateSettings({
                          background: {
                            ...settings.background,
                            blur: parseInt(e.target.value),
                          },
                        })
                      }
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label>Background Position (X-Axis)</Label>
                      <span className="text-sm text-muted-foreground">
                        {settings.background.position}%
                      </span>
                    </div>
                    <p className="flex gap-1 items-center text-xs text-muted-foreground">
                      <Info size={15} /> Mobile only
                    </p>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={settings.background.position}
                      onChange={(e) =>
                        updateSettings({
                          background: {
                            ...settings.background,
                            position: parseInt(e.target.value),
                          },
                        })
                      }
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Settings */}
      {settings.widgetVisibility.searchBar && (
        <div className="space-y-4">
          <h3 className="text-primary text-base mb-3 font-medium mx-5.5">
            Search Settings
          </h3>
          <Card className="space-y-3 rounded-3xl">
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="open-new-tab">Always Open in New Tab</Label>
                <Switch
                  id="open-new-tab"
                  checked={settings.search.openInNewTab}
                  onCheckedChange={(checked) =>
                    handleSearchSettingsChange("openInNewTab", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label htmlFor="show-suggestions">Show Suggestions</Label>
                <Switch
                  id="show-suggestions"
                  checked={settings.search.showSuggestions}
                  onCheckedChange={(checked) =>
                    handleSearchSettingsChange("showSuggestions", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Shortcuts Settings */}
      {/* {settings.widgetVisibility.shortcuts && (
        <div className="space-y-4">
          <h3 className="text-primary text-base mb-3 font-medium mx-5.5">
            Shortcuts Settings
          </h3>
          <Card className="space-y-3 rounded-3xl">
            <CardContent>
              <div className="space-y-3 flex justify-between">
                <Label>Alignment</Label>
                <Select
                  value={settings.shortcuts.alignment}
                  onValueChange={(value) =>
                    handleShortcutsSettingsChange("alignment", value)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      )} */}

      {/* Clock Settings */}
      {settings.widgetVisibility.clock && (
        <div className="space-y-4">
          <h3 className="text-primary text-base mb-3 font-medium mx-5.5">
            Clock Settings
          </h3>
          <Card className="space-y-3 rounded-3xl">
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2 flex justify-between">
                  <Label>Show</Label>
                  <Select
                    value={settings.clock.displayMode}
                    onValueChange={(value: ClockDisplayMode) =>
                      handleClockSettingsChange("displayMode", value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="time-only">Time Only</SelectItem>
                      <SelectItem value="date-only">Date Only</SelectItem>
                      <SelectItem value="both">Both Time & Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <Label htmlFor="show-seconds">Show Seconds</Label>
                  <Switch
                    id="show-seconds"
                    checked={settings.clock.showSeconds}
                    onCheckedChange={(checked) =>
                      handleClockSettingsChange("showSeconds", checked)
                    }
                  />
                </div>
                <Separator />

                <div className="space-y-2 flex justify-between">
                  <Label>Time Format</Label>
                  <Select
                    value={settings.clock.timeFormat}
                    onValueChange={(value: TimeFormat) =>
                      handleClockSettingsChange("timeFormat", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24">24 Hour</SelectItem>
                      <SelectItem value="12">12 Hour (AM/PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />

                <div className="space-y-3 flex justify-between flex-wrap items-center">
                  <Label>Text Color</Label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={settings.clock.textColor || "#ffffff"}
                      onChange={(e) =>
                        handleClockSettingsChange("textColor", e.target.value)
                      }
                      className="w-6 h-6 p-0 border-0 rounded overflow-hidden cursor-pointer"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleClockSettingsChange("textColor", undefined)
                      }
                    >
                      Reset Color
                    </Button>
                  </div>
                </div>
                <Separator />

                <div className="space-y-2 flex justify-between flex-wrap">
                  <Label>Date Format</Label>
                  <Select
                    value={settings.clock.dateFormat}
                    onValueChange={(value: DateFormat) =>
                      handleClockSettingsChange("dateFormat", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mon Jan 12">Mon Jan 12</SelectItem>
                      <SelectItem value="01/12/2024">01/12/2024</SelectItem>
                      <SelectItem value="Jan 12, 2024">Jan 12, 2024</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground min-w-full">
                    Example:{" "}
                    {formatDateExample(settings.clock.dateFormat, new Date())}
                  </p>
                </div>
                <Separator />
                <div className="space-y-2 flex justify-between gap-2 items-center">
                  <Label>Date Font</Label>
                  <Select
                    value={settings.clock.dateFontFamily}
                    onValueChange={(value) =>
                      handleClockSettingsChange("dateFontFamily", value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FONT_OPTIONS.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>Date Font Size</Label>
                    <span className="text-sm text-muted-foreground">
                      {settings.clock.dateFontSize}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="16"
                    max="64"
                    step="2"
                    value={settings.clock.dateFontSize || 32}
                    onChange={(e) =>
                      handleClockSettingsChange(
                        "dateFontSize",
                        parseInt(e.target.value),
                      )
                    }
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
                <Separator />
                <div className="space-y-2 flex justify-between gap-2 items-center">
                  <Label>Time Font</Label>
                  <Select
                    value={settings.clock.fontFamily}
                    onValueChange={(value) =>
                      handleClockSettingsChange("fontFamily", value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FONT_OPTIONS.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>Time Font Size</Label>
                    <span className="text-sm text-muted-foreground">
                      {settings.clock.fontSize}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="160"
                    step="4"
                    value={settings.clock.fontSize}
                    onChange={(e) =>
                      handleClockSettingsChange(
                        "fontSize",
                        parseInt(e.target.value),
                      )
                    }
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>Font Weight</Label>
                    <span className="text-sm text-muted-foreground">
                      {settings.clock.fontWeight}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="900"
                    step="100"
                    value={settings.clock.fontWeight}
                    onChange={(e) =>
                      handleClockSettingsChange(
                        "fontWeight",
                        parseInt(e.target.value),
                      )
                    }
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reset Settings */}
      <div className="space-y-4">
        <h3 className="text-primary text-base mb-3 font-medium mx-5.5">
          Reset
        </h3>
        <Button variant="destructive" onClick={onResetClick} className="w-full">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset All Settings
        </Button>
      </div>

      {/* Footer */}
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground mx-5.5 text-center">
          Made in India
          <br />
          by{" "}
          <a
            href="https://ushnish-tapaswi.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Ushnish Tapaswi
          </a>
          <br />
        </p>
      </div>
      <Separator />
      {new Date().getFullYear() > 2023 && (
        <p className="text-xs text-muted-foreground text-center mb-5">
          {new Date().getFullYear()} TheBetterFox.
        </p>
      )}
    </div>
  );
}
