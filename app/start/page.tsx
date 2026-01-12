"use client";

import { useEffect, useRef } from "react";
import PageEditDrawer from "@/app/start/components/PageEditDrawer";
import SearchBar from "@/app/start/components/widgets/SearchBar";
import Clock from "@/app/start/components/widgets/Clock";
import Shortcuts from "./components/widgets/Shortcuts";
import { SettingsProvider, useSettings } from "./lib/SettingsContext";

function StartContent() {
  const { settings, isLoaded } = useSettings();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const mainContent = document.querySelector(".new-page-main-content");
    if (!mainContent) return;

    // Remove existing background styles
    (mainContent as HTMLElement).style.background = "";
    (mainContent as HTMLElement).style.backgroundImage = "";
    (mainContent as HTMLElement).style.backgroundSize = "";
    (mainContent as HTMLElement).style.backgroundPosition = "";
    (mainContent as HTMLElement).style.backgroundRepeat = "";

    // Apply background based on settings
    if (settings.background.type === "solid") {
      if (settings.background.solidColor) {
        (mainContent as HTMLElement).style.background =
          settings.background.solidColor;
      } else {
        // No color set - remove inline style to inherit from CSS
        (mainContent as HTMLElement).style.background = "";
      }
    } else if (
      settings.background.type === "image" &&
      settings.background.imageUrl
    ) {
      (
        mainContent as HTMLElement
      ).style.backgroundImage = `url(${settings.background.imageUrl})`;
      (mainContent as HTMLElement).style.backgroundSize = "cover";
      (mainContent as HTMLElement).style.backgroundPosition = "center";
      (mainContent as HTMLElement).style.backgroundRepeat = "no-repeat";
    } else if (
      settings.background.type === "video" &&
      settings.background.videoUrl
    ) {
      // Video background will be handled by a video element
      (mainContent as HTMLElement).style.background = "#000000";
    }
  }, [settings.background, isLoaded]);

  return (
    <>
      <PageEditDrawer />
      <div className="new-page-main-content h-screen w-full flex flex-col items-center justify-center gap-4 relative">
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
              style={{ pointerEvents: "none" }}
            />
          )}

        {/* Content overlay */}
        <div className="new-page-main-content-container container h-full flex flex-col items-center justify-start gap-20 p-3 pt-30 relative z-10">
          {settings.widgetVisibility.clock && <Clock />}
          {settings.widgetVisibility.searchBar && <SearchBar />}
          {settings.widgetVisibility.shortcuts && <Shortcuts />}
        </div>
      </div>
    </>
  );
}

type Props = {};

const Start = (props: Props) => {
  return (
    <SettingsProvider>
      <StartContent />
    </SettingsProvider>
  );
};

export default Start;
