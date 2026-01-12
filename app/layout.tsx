import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Lora,
  Oswald,
  Bebas_Neue,
  Anton,
  Rubik_Glitch,
  Bungee_Shade,
  Faster_One,
  Monoton,
  Righteous,
  Press_Start_2P,
} from "next/font/google";
// allow importing global CSS without type declarations
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});
const rubikGlitch = Rubik_Glitch({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rubik-glitch",
});
const bungeeShade = Bungee_Shade({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bungee-shade",
});
const fasterOne = Faster_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-faster-one",
});
const monoton = Monoton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-monoton",
});
const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-righteous",
});
const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
});

export const metadata: Metadata = {
  title: "Thebetterfox",
  description: "Start page for better browsing",
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
