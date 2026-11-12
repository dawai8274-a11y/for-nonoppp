import type { Metadata, Viewport } from "next";
import { Caveat, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap"
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-caveat",
  display: "swap"
});

export const metadata: Metadata = {
  title: "A Little World For Nonoppp ♡",
  description: "Lembaran kenangan manis dan surat cinta spesial dari aku untuk Nonoppp."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fce4ec"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${dmSans.variable} ${playfair.variable} ${caveat.variable}`}
    >
      <head>
        <link
          rel="preload"
          href="/models/nailong.glb"
          as="fetch"
          crossOrigin="anonymous"
        />
        <link rel="preload" href="/images/memory-01.jpg" as="image" />
        <link rel="preload" href="/images/memory-03.jpg" as="image" />
      </head>
      <body>{children}</body>
    </html>
  );
}
