import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import logo from "@/app/assets/images/logo.png";
import { useEffect, useState } from "react";

/**
 * Navbar component for Betterfox app
 *
 * It contains the logo, app name, theme toggle button and a button to launch the app
 *
 * The theme toggle button toggles the dark mode on and off
 *
 * The launch app button redirects the user to the start page of the app
 */
const Navbar = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDark(darkModeMediaQuery.matches);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="Logo" width={40} height={40} />
          <span className="text-xl font-bold">Betterfox</span>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button asChild>
            <Link href="/start">Launch App</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
