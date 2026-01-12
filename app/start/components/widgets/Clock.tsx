"use client";

import React, { useEffect, useState } from "react";
import { useSettings } from "../../lib/SettingsContext";
import { DateFormat } from "../../lib/settings";

const Clock = () => {
  const { settings } = useSettings();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update time immediately when settings change
    // eslint-disable-next-line
    setTime(new Date());

    const interval = settings.clock.showSeconds ? 1000 : 60000; // Update every second if showing seconds, otherwise every minute
    const timer = setInterval(() => {
      setTime(new Date());
    }, interval);

    return () => clearInterval(timer);
  }, [
    settings.clock.showSeconds,
    settings.clock.timeFormat,
    settings.clock.displayMode,
    settings.clock.dateFormat,
    settings.clock.fontSize,
    settings.clock.fontFamily,
    settings.clock.dateFontFamily,
    settings.clock.fontWeight,
    settings.clock.textColor,
  ]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: settings.clock.showSeconds ? "2-digit" : undefined,
      hour12: settings.clock.timeFormat === "12",
    });
  };

  const formatDate = (date: Date, format: DateFormat) => {
    const options: Record<DateFormat, Intl.DateTimeFormatOptions> = {
      "Mon Jan 12": { weekday: "short", month: "short", day: "numeric" },
      "01/12/2024": { month: "2-digit", day: "2-digit", year: "numeric" },
      "12/01/2024": { day: "2-digit", month: "2-digit", year: "numeric" },
      "2024-01-12": { year: "numeric", month: "2-digit", day: "2-digit" },
      "Jan 12, 2024": { month: "short", day: "numeric", year: "numeric" },
    };
    return date.toLocaleDateString("en-US", options[format]);
  };

  const shouldShowDate =
    settings.clock.displayMode === "date-only" ||
    settings.clock.displayMode === "both";

  const shouldShowTime =
    settings.clock.displayMode === "time-only" ||
    settings.clock.displayMode === "both";

  // Determine font style
  const timeStyle: React.CSSProperties = {
    fontFamily: settings.clock.fontFamily,
    // Use clamp to allow slider control while capping on mobile (20vw max on mobile, no cap on desktop)
    fontSize: `clamp(2rem, ${settings.clock.fontSize}px, 20vw)`,
    fontWeight: settings.clock.fontWeight,
    color: settings.clock.textColor,
    lineHeight: 1,
  };

  const dateStyle: React.CSSProperties = {
    // Cap date font size similarly
    fontSize: `clamp(1rem, ${settings.clock.dateFontSize || 32}px, 10vw)`,
    fontFamily: settings.clock.dateFontFamily || settings.clock.fontFamily,
    color: settings.clock.textColor,
    fontWeight: settings.clock.fontWeight,
  };

  return (
    <div className="clock-main">
      <div className="clock-content">
        <div className="date-time text-center">
          {shouldShowTime && (
            <div
              className={`date drop-shadow-custom leading-tight`}
              style={timeStyle}
            >
              {formatTime(time)}
            </div>
          )}
          {shouldShowDate && (
            <div className="time text-l" style={dateStyle}>
              {formatDate(time, settings.clock.dateFormat)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clock;
