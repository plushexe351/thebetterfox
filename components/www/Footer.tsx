import React from "react";

/**
 * A footer component that renders a container with a horizontal rule and a
 * centered row of links to GitHub and the start page.
 *
 * @returns {JSX.Element} A JSX element representing the footer.
 */
const Footer = () => {
  return (
    <div className="container mx-auto px-6 py-12 border-t border-border">
      <div className="text-center space-y-4">
        <div className="flex justify-center gap-6 text-sm">
          <a
            href="https://github.com/plushexe351/thebetterfox"
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
  );
};

export default Footer;
