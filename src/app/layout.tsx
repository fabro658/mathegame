import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Couleur que prendra la barre de statut (mets le même bleu que ton fond)
const THEME_COLOR = "#0f172a"; // exemple: slate-900 / bleu très foncé

export const metadata: Metadata = {
  title: "ExploreMath",
  description: "Apprentissage des mathématiques",
  themeColor: THEME_COLOR,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent", // options: "default" | "black" | "black-translucent"
  },
};

// (optionnel mais recommandé pour iOS)
export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
