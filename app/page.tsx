"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Palette,
  Gauge,
  Layout,
  Shield,
  Sparkles,
  ArrowRight,
  Moon,
  Sun,
  Play,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

// Asset Imports
import logo from "@/app/assets/images/logo.png";
import highlight from "@/app/assets/images/highlight.png";
import ssHero from "@/app/assets/images/ss-hero.png";
import betterfoxsettings from "@/app/assets/images/betterfoxsettings.png";

export default function LandingPage() {
  const [isDark, setIsDark] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const mobileScreenshots = [
    { title: "Minimal View", description: "Clean, focused interface" },
    { title: "Custom Themes", description: "Your style, your way" },
    { title: "Smart Widgets", description: "Productive shortcuts" },
    { title: "Dark Mode", description: "Easy on the eyes" },
  ];

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mobileScreenshots.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + mobileScreenshots.length) % mobileScreenshots.length
    );
  };

  const features = [
    {
      icon: Palette,
      title: "Fully Customizable",
      description:
        "Personalize every aspect - from themes and backgrounds to widget placement and styles.",
    },
    {
      icon: Layout,
      title: "Smart Widgets",
      description:
        "Clock, search, and shortcuts that adapt to your workflow. Toggle visibility as needed.",
    },
    {
      icon: Gauge,
      title: "Lightning Fast",
      description:
        "Built with Next.js and optimized for speed. Your new tab loads instantly.",
    },
    {
      icon: Sparkles,
      title: "Beautiful Design",
      description:
        "Modern, clean interface with glassmorphism effects and smooth animations.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "All settings stored locally. No tracking, no data collection, no compromises.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Navigation */}
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

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-32">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Your perfect
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  New Tab
                </span>

                <Image
                  src={highlight}
                  alt="Highlight"
                  width={200}
                  height={200}
                  className="absolute left-0 bottom-0 w-full pointer-events-none h-[20px]"
                />
              </span>
              <span> Experience</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              A minimalistic, customizable start page that makes every new tab
              feel like home.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" asChild className="group">
              <Link href="/start">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com/betterfox/betterfox"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </Button>
          </div>
        </div>

        {/* Hero Screenshot with 3D Transform (Linear.app style) */}
        <div className="mt-24 max-w-6xl mx-auto perspective-container">
          <div className="hero-3d-transform">
            <Card className="overflow-hidden border-2 shadow-2xl p-0">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="text-center space-y-4 w-full h-full">
                    <Image
                      src={ssHero}
                      alt="Screenshot"
                      width={1920}
                      height={1080}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section - Complex Grid */}
      <div className="container mx-auto px-6 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Powerful features,
            <br />
            <span className="text-primary">simple experience</span>
          </h2>
        </div>

        {/* Complex Responsive Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Large feature card - spans 2 rows on large screens */}
          <Card className="lg:col-span-5 lg:row-span-2 group hover:shadow-lg transition-all duration-300 border-muted hover:border-primary/50">
            <CardContent className="p-8 h-full flex flex-col justify-between space-y-6">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-6">
                  <Palette className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  {features[0].title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {features[0].description}
                </p>
              </div>
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/5 rounded-xl flex items-center justify-center">
                <Image
                  src={betterfoxsettings}
                  width={1920}
                  height={1080}
                  alt="widgets collage"
                  className="object-cover overflow-hidden w-full h-full rounded-xl border-secondary border-1"
                ></Image>
              </div>
            </CardContent>
          </Card>

          {/* Smaller cards */}
          {features.slice(1, 3).map((feature, index) => (
            <Card
              key={index}
              className="lg:col-span-7 group hover:shadow-lg transition-all duration-300 border-muted hover:border-primary/50"
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Medium cards */}
          {features.slice(3).map((feature, index) => (
            <Card
              key={index}
              className="lg:col-span-6 group hover:shadow-lg transition-all duration-300 border-muted hover:border-primary/50"
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Video Demo Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Watch how it works</h2>
          <p className="text-xl text-muted-foreground">
            A quick tour of Betterfox's features and customization options.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-2 shadow-xl p-0">
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/10 flex items-center justify-center relative group cursor-pointer p-0 w-full h-full">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors w-full h-full" />
                <div className="relative z-10 text-center space-y-4 h-full w-full">
                  <video autoPlay controls className="w-full h-full">
                    <source src="/assets/videos/betterfoxdemo.mov" />
                  </video>
                  {/* <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </div>
                  <p className="text-foreground font-medium">
                    Demo Video Placeholder
                  </p> */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-24">
        <Card className="max-w-4xl mx-auto overflow-hidden border-primary/50 bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to transform your new tab?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join users who've already upgraded their browsing experience with
              Betterfox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="group">
                <Link href="/start">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-6 py-12 border-t border-border">
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Built with Next.js, React, and shadcn/ui
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <a
              href="https://github.com/betterfox/betterfox"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="/start"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Start Page
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-container {
          perspective: 2000px;
        }

        .hero-3d-transform {
          transform: rotateX(20deg) rotateY(-8deg);
          transition: transform 0.4s ease-out;
        }

        .hero-3d-transform:hover {
          transform: rotateX(0) rotateY(0) scale(1.02);
        }
      `}</style>
    </div>
  );
}
