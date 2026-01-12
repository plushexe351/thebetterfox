"use client";

import { useEffect, useRef } from "react";
import PageEditDrawer from "@/app/start/components/PageEditDrawer";
import SearchBar from "@/app/start/components/widgets/SearchBar";
import Clock from "@/app/start/components/widgets/Clock";
import Shortcuts from "./components/widgets/Shortcuts";
import QuickNotes from "./components/widgets/QuickNotes";
import { SettingsProvider, useSettings } from "./lib/SettingsContext";

function StartContent() {
  const { settings, isLoaded } = useSettings();
  const videoRef = useRef<HTMLVideoElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const backgroundEl = backgroundRef.current;
    if (!backgroundEl) return;

    // Remove existing background styles from background element
    backgroundEl.style.background = "";
    backgroundEl.style.backgroundImage = "";
    backgroundEl.style.backgroundSize = "";
    backgroundEl.style.backgroundPosition = "";
    backgroundEl.style.backgroundRepeat = "";
    backgroundEl.style.filter = "";

    // Remove stray styles from main content if any
    const mainContent = document.querySelector(".new-page-main-content");
    if (mainContent) {
      (mainContent as HTMLElement).style.background = "";
      (mainContent as HTMLElement).style.filter = "";
    }

    // Toggle dark class
    if (settings.theme.mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Apply background based on settings
    if (settings.background.type === "solid") {
      const color =
        settings.background.solidColor ||
        (settings.theme.mode === "dark"
          ? settings.theme.darkColor
          : settings.theme.lightColor);

      backgroundEl.style.background = color;
      backgroundEl.style.transition = "background 0.3s ease";
      backgroundEl.style.filter = `blur(${settings.background.blur}px) brightness(${settings.background.brightness}%)`;
      // Position applies mainly to images but we keep it consistent
      backgroundEl.style.backgroundPosition = `${settings.background.position}% center`;
    } else if (
      settings.background.type === "image" &&
      settings.background.imageUrl
    ) {
      backgroundEl.style.backgroundImage = `url(${settings.background.imageUrl})`;
      backgroundEl.style.backgroundSize = "cover";
      backgroundEl.style.backgroundPosition = `${settings.background.position}% center`;
      backgroundEl.style.backgroundRepeat = "no-repeat";
      backgroundEl.style.filter = `blur(${settings.background.blur}px) brightness(${settings.background.brightness}%)`;
    } else if (
      settings.background.type === "video" &&
      settings.background.videoUrl
    ) {
      // Video background is handled by the video element in JSX
      // We might want to set a fallback background color on the backgroundEl just in case
      backgroundEl.style.background = "#000000";
    }
  }, [
    settings.background.solidColor,
    settings.background.type,
    settings.background.imageUrl,
    settings.background.videoUrl,
    settings.background.blur,
    settings.background.brightness,
    settings.background.position,
    settings.theme.mode,
    settings.theme.darkColor,
    settings.theme.lightColor,
    isLoaded,
  ]);

  return (
    <>
      <PageEditDrawer />
      <div className="new-page-main-content h-full w-full flex flex-col items-center justify-center gap-4 relative overflow-auto">
        {/* Background Layer */}
        <div
          ref={backgroundRef}
          className="absolute inset-0 w-full h-full z-0 "
        />
        {/* Video background */}
        {settings.background.type === "video" &&
          settings.background.videoUrl && (
            <video
              ref={videoRef}
              src={settings.background.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0"
              style={{
                pointerEvents: "none",
                filter: `blur(${settings.background.blur}px) brightness(${settings.background.brightness}%)`,
              }}
            />
          )}

        {/* Content overlay */}
        <div className="new-page-main-content-container container min-h-screen h-full flex flex-col items-center justify-start gap-20 p-3 pt-30 relative z-10">
          {settings.widgetVisibility.clock && <Clock />}
          {settings.widgetVisibility.quickNotes && <QuickNotes />}
          {settings.widgetVisibility.searchBar && <SearchBar />}
          {settings.widgetVisibility.shortcuts && <Shortcuts />}
        </div>
      </div>
    </>
  );
}

const Start = () => {
  return (
    <SettingsProvider>
      <StartContent />
    </SettingsProvider>
  );
};

export default Start;
