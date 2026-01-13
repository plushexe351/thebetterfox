import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Gauge, Layout, Palette, Shield, Sparkles } from "lucide-react";
import betterfoxsettings from "@/app/assets/images/betterfoxsettings.png";

/**
 * A component that displays a list of features for Betterfox.
 *
 * The component renders a grid of cards, each containing an icon, title, and description.
 * The component also includes a widget collage image.
 *
 * @returns {JSX.Element} The rendered component.
 */
const Features = () => {
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
    <>
      <div className="container mx-auto px-6 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Powerful features,
            <br />
            <span className="text-primary">simple experience</span>
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
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
      ;
    </>
  );
};

export default Features;
