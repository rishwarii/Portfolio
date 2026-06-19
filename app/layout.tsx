import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { NavBar } from "@/components/NavBar";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import "./globals.css";

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

const display = Space_Grotesk({
  subsets: [
    "latin"
  ],
  weight: [
    "500",
    "600",
    "700"
  ],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Rishwari Ranjan | Portfolio",
  description:
    "Profile website for Rishwari Ranjan, full-stack engineer building reliable AI-enabled products.",
  icons: {
    icon: "/images/projects/placeholder-1.svg"
  }
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#f9f7f4"
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#17101b"
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
      data-preset="lavender"
      className={`${body.variable} ${display.variable}`}
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
  } catch {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();`}</Script>
        <ScrollProgressBar />
        <div className="min-h-screen bg-bg">
          <NavBar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
