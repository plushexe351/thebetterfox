import { Card, CardContent } from "@/components/ui/card";

/**
 * A demo component that displays a video showcasing Betterfox's features and customization options.
 * The component is fully responsive and can be used in any layout.
 */
const Demo = () => {
  return (
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
  );
};

export default Demo;
