import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * A call-to-action (CTA) component that encourages users to upgrade to Betterfox.
 * It renders a card with a heading, paragraph, and a button to get started.
 */
const CTA = () => {
  return (
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
  );
};

export default CTA;
