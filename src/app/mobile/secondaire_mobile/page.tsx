"use client";
import Link from "next/link";

export default function Secondaire_mobile() {
  return (
    // Zone de scroll indépendante du body/layout
    <div className="fixed inset-0 overflow-y-auto flex flex-col items-center bg-blue-100 text-black p-4">
      {/* Bouton Retour (fixe en haut à droite) */}
      <Link
        href="/"
        className="fixed top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-50"
      >
        Retour
      </Link>

      {/* Section Titre */}
      <div className="flex flex-col items-center text-center mt-20 mb-8">
        <h1 className="text-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          Secondaire
        </h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-black mb-4"></div>
        <h2 className="text-black text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">
          Choisi un sujet!
        </h2>
      </div>

      {/* Liens vers les niveaux */}
      <div className="flex flex-col gap-6 w-full max-w-md sm:items-center z-0">
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-yellow-500 text-white hover:bg-blue-600 text-lg font-bold py-3 w-full">
            Arithmétique
          </div>
        </Link>

        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau2_mobile">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-orange-500 text-white hover:bg-green-600 text-lg font-bold py-3 w-full">
            Fraction
          </div>
        </Link>

        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau3_mobile">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-red-500 text-white hover:bg-red-600 text-lg font-bold py-3 w-full">
            Algèbre
          </div>
        </Link>

        <Link href="/mobile/primaire_mobile/niveaux_mobile/niveau4_mobile">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-blue-800 text-white hover:bg-blue-600 text-lg font-bold py-3 w-full">
            Géométrie
          </div>
        </Link>
         <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau5_mobile">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-purple-500 text-white hover:bg-red-600 text-lg font-bold py-3 w-full">
            Fonction
          </div>
        </Link>
      </div>

      {/* marge en bas pour scroller confortablement */}
      <div className="h-16"></div>
    </div>
  );
}

