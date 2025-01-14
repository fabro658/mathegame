"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);

  // Détecte si l'écran est un mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Taille d'écran < 768px => mobile
    };
    handleResize(); // Vérifie au chargement
    window.addEventListener("resize", handleResize); // Écoute les changements de taille
    return () => window.removeEventListener("resize", handleResize); // Nettoyage
  }, []);

  // Partie commune pour le bouton retour et le titre
  const CommonHeader = () => (
    <>
      <Link
        href="/secondaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded font-bold shadow"
      >
        Retour
      </Link>
      <h1 className="text-3xl font-bold mb-12 text-center mt-16 sm:mt-12">
        Choisissez une opération
      </h1>
    </>
  );

  // Affichage des boutons pour mobile
  const MobileButtons = () => (
    <div className="flex flex-col gap-4 w-3/4 mx-auto">
      <a
            href="/niveaux/niveau2/multiplicationfraction"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center"
      >
        Multiplication de fraction
      </a>
      <a
            href="/niveaux/niveau2/divisionfraction"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center"
      >
        Division de fraction
      </a>
      <a
            href="/niveaux/niveau2/trans_pourcent"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center"
      >
        Transformation de nombres
      </a>
      <a
            href="/niveaux/niveau2/fractionreduite"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center"
      >
        Fraction réduite
      </a>
    </div>
  );

  // Affichage des boutons pour ordinateur
  const DesktopButtons = () => (
    <div className="grid grid-cols-2 gap-4 w-full max-w-4xl px-4 sm:px-8">
      <a
            href="/niveaux/niveau2/multiplicationfraction"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
      >
        Multiplication de fraction
      </a>
      <a
            href="/niveaux/niveau2/divisionfraction"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
      >
        Division de fraction
      </a>
      <a
            href="/niveaux/niveau2/trans_pourcent"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
      >
        Transformation de nombres
      </a>
      <a
            href="/niveaux/niveau2/fractionreduite"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
      >
        Fraction réduite
      </a>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      {/* Header commun */}
      <CommonHeader />

      {/* Affichage conditionnel */}
      {isMobile ? <MobileButtons /> : <DesktopButtons />}
    </div>
  );
}
