import type { Metadata } from "next";
import {
  anton,
  bebasNeue,
  bungeeShade,
  fasterOne,
  geistMono,
  geistSans,
  inter,
  lora,
  monoton,
  oswald,
  pressStart2P,
  righteous,
  rubikGlitch,
} from "./fonts";
// @ts-ignore
import "./globals.css";

/**
 * The root layout component for the app.
 * It sets the HTML lang attribute, applies the Inter font, and sets the body class to include all the imported
 * @param {React.ReactNode} children - The children of the RootLayout component.
 * @returns {JSX.Element} - The rendered HTML element.
 */
export const metadata: Metadata = {
  title: "thebetterfox - Your perfect New Tab Experience",
  description:
    "A minimalistic, customizable start page that makes every new tab feel like home.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} ${oswald.variable} ${bebasNeue.variable} ${anton.variable} ${rubikGlitch.variable} ${bungeeShade.variable} ${fasterOne.variable} ${monoton.variable} ${righteous.variable} ${pressStart2P.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
