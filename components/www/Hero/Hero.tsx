import Image from "next/image";
import highlight from "@/app/assets/images/highlight.png";
import ssHero from "@/app/assets/images/ss-hero.png";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
// @ts-ignore
import "./Hero.css";

/**
 * A Hero component that displays a screenshot of the app with a 3D transform.
 * It also displays a call to action button to get started.
 * The component is fully responsive and can be used in any layout.
 *
 * @returns {JSX.Element} A JSX element representing the Hero component.
 */
const Hero = () => {
  return (
    <div className="thebetterfox-home-hero-section container mx-auto px-6 pt-20 pb-32">
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
              href="https://github.com/plushexe351/thebetterfox"
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
  );
};

export default Hero;
