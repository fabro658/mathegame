import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import HeaderSwitcher from "@/components/HeaderSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ExploreMath",
  description: "ExploreMath – Plateforme éducative de mathématiques",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* hCaptcha script GLOBAL (obligatoire) */}
        <Script
          src="https://js.hcaptcha.com/1/api.js"
          strategy="afterInteractive"
        />

        {/* Sur / : rien (accueil inchangé). Sur le reste : hamburger/menu */}
        <HeaderSwitcher />

        {children}
      </body>
    </html>
  );
}
