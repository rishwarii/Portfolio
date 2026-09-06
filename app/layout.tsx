import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter, Libre_Baskerville, Newsreader } from "next/font/google";
import Script from "next/script";
import { NavBar } from "@/components/NavBar";
import { SiteFooter } from "@/components/SiteFooter";
import { siteContent } from "@/lib/siteContent";
import "./globals.css";

// Body: Inter (stands in for Geist, unavailable via next/font/google here).
const body = Inter({
  subsets: [
    "latin"
  ],
  variable: "--font-body",
  display: "swap",
  weight: [
    "400",
    "500",
    "600",
    "700"
  ]
});

// Display: Fraunces.
const display = Fraunces({
  subsets: [
    "latin"
  ],
  weight: [
    "400",
    "500",
    "600"
  ],
  variable: "--font-display",
  display: "swap"
});

// Editorial: Libre Baskerville.
const editorial = Libre_Baskerville({
  subsets: [
    "latin"
  ],
  weight: [
    "400"
  ],
  variable: "--font-editorial",
  display: "swap"
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  adjustFontFallback: false
});

export const metadata: Metadata = {
  title: "Rishwari Ranjan | Portfolio",
  description: siteContent.brand.role,
  icons: {
    icon: "/images/projects/placeholder-1.svg"
  }
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#F9F6F0"
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#14181C"
    }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-preset="gilt"
      className={`${body.variable} ${display.variable} ${editorial.variable} ${newsreader.variable}`}
    >
      <body className="bg-bg text-fg antialiased">
        <Script id="theme-init" strategy="beforeInteractive">{`(() => {
  try {
    const storageKey = "portfolio-theme";
    const storedTheme = window.localStorage.getItem(storageKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolvedTheme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : prefersDark
          ? "dark"
          : "light";
    document.documentElement.setAttribute("data-theme", resolvedTheme);

    const presetKey = "portfolio-color-preset";
    const storedPreset = window.localStorage.getItem(presetKey);
    const resolvedPreset =
      storedPreset === "gilt" || storedPreset === "lavender" || storedPreset === "blush"
        ? storedPreset
        : "gilt";
    document.documentElement.setAttribute("data-preset", resolvedPreset);
  } catch {
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.setAttribute("data-preset", "gilt");
  }
})();`}</Script>
        <div className="grain-overlay" />
        <div className="paper-ground min-h-screen bg-bg">
          <a href="#main" className="skip-to-content">
            Skip to content
          </a>
          <div className="page-sheet">
            <NavBar />
            <main id="main">{children}</main>
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}