"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import Navbar from "@/components/www/Navbar";
import Hero from "@/components/www/Hero/Hero";
import Features from "@/components/www/Features";
import Demo from "@/components/www/Demo";
import CTA from "@/components/www/CTA";
import Footer from "@/components/www/Footer";

/**
 * The landing page of thebetterfox, featuring a hero section with a 3D transform, a features section with a complex grid, a video demo section, and a CTA section.
 *
 * @returns {JSX.Element} A JSX element representing the landing page.
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Navigation */}
      <Navbar />
      {/* Hero Section */}
      <Hero />
      {/* Features Section - Complex Grid */}
      <Features />
      {/* Video Demo Section */}
      <Demo />
      {/* CTA Section */}
      <CTA />
      {/* Footer */}
      <Footer />
    </div>
  );
}
