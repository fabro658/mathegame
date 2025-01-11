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
        href="/primaire"
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
          href="/primaire/niveaux/niveau2/comparaison_decimaux"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center"
      >
        Comparaisons nombre décimaux
      </a>
      <a
          href="/primaire/niveaux/niveau2/comparaison"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center"
      >
        Comparaisons
      </a>
      <a
          href="/primaire/niveaux/niveau2/expression_equivalente"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center"
      >
       Expression équivalente
      </a>
      <a
          href="/primaire/niveaux/niveau2/comparer_fraction"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center"
      >
        Comparaison de fraction
      </a>
    </div>
  );

  // Affichage des boutons pour ordinateur
  const DesktopButtons = () => (
    <div className="grid grid-cols-2 gap-4 w-full max-w-4xl px-4 sm:px-8">
      <a
          href="/primaire/niveaux/niveau2/comparaison_decimaux"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
      >
        Comparaisons nombre décimaux
      </a>
      <a
          href="/primaire/niveaux/niveau2/comparaison"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
      >
        Comparaisons
      </a>
      <a
          href="/primaire/niveaux/niveau2/expression_equivalente"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
      >
        Expression équivalente
      </a>
      <a
          href="/primaire/niveaux/niveau2/comparer_fraction"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center col-span-2 md:col-span-1 md:col-start-2"
      >
        Comparaison de fraction
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
