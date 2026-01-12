"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Upload, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  COLOR_PRESETS,
} from "../lib/settings";
import { Card, CardContent } from "@/components/ui/card";

interface SettingsContentProps {
  onResetClick: () => void;
}

export default function SettingsContent({
  onResetClick,
}: SettingsContentProps) {
  const { settings, updateSettings } = useSettings();
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
    value: boolean
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
    value: boolean | TimeFormat | ClockDisplayMode | DateFormat
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

  return (
    <div className="space-y-6 px-1 pb-6 overflow-y-auto">
      {/* Background Settings */}
      <div className="space-y-4 pt-5">
        <h3 className="text-primary text-base mb-3 font-medium mx-5.5">
          Background
        </h3>
        <Card className="space-y-3 rounded-3xl">
          <CardContent>
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
            <Separator className="mb-3" />

            {settings.background.type === "solid" && (
              <div className="space-y-3">
                <Label>Color</Label>
                <div className="flex flex-wrap gap-2">
                  {COLOR_PRESETS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-5 h-5 rounded-full border-2 transition-all ${
                        settings.background.solidColor === color
                          ? "border-foreground scale-110"
                          : "border-transparent hover:scale-105"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleSolidColorChange(color)}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={settings.background.solidColor || "#000000"}
                    onChange={(e) => handleSolidColorChange(e.target.value)}
                    className="w-10"
                  />
                  <Input
                    type="text"
                    value={settings.background.solidColor || ""}
                    onChange={(e) => handleSolidColorChange(e.target.value)}
                    placeholder="Enter hex color or leave empty"
                    className="flex-1"
                  />
                </div>
              </div>
            )}

            {settings.background.type === "image" && (
              <div className="space-y-3">
                <Label>Image</Label>
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
                <Label>Video</Label>
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
          </CardContent>
        </Card>
      </div>

      {/* Widget Visibility */}
      <div className="space-y-4">
        <h3 className="text-primary text-base mb-3 font-medium mx-5.5">
          Widget Visibility
        </h3>
        <Card className="space-y-3 rounded-3xl">
          <CardContent>
            <div className="space-y-3">
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
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clock Settings */}
      {settings.widgetVisibility.clock && (
        <div className="space-y-4">
          <h3 className="text-primary text-base mb-3 font-medium mx-5.5">
            Clock Settings
          </h3>
          <Card className="space-y-3 rounded-3xl">
            <CardContent>
              <div className="space-y-4">
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

                <div className="space-y-2 flex justify-between">
                  <Label>Display Mode</Label>
                  <Select
                    value={settings.clock.displayMode}
                    onValueChange={(value: ClockDisplayMode) =>
                      handleClockSettingsChange("displayMode", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="time-only">Time Only</SelectItem>
                      <SelectItem value="date-only">Date Only</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <SelectItem value="12/01/2024">12/01/2024</SelectItem>
                      <SelectItem value="2024-01-12">2024-01-12</SelectItem>
                      <SelectItem value="Jan 12, 2024">Jan 12, 2024</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground min-w-full">
                    Example:{" "}
                    {formatDateExample(settings.clock.dateFormat, new Date())}
                  </p>
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
    </div>
  );
}
