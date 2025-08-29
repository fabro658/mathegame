"use client";
import Link from "next/link";

export default function Niveau4() {
  return (
    // Zone scrollable indépendante du body/layout
    <div className="fixed inset-0 overflow-y-auto bg-blue-100 text-black">
      {/* Contenu principal scrollable */}
      <main className="min-h-screen flex flex-col items-center p-4 pt-24 pb-28 relative">
        {/* Bouton Retour (fixe en haut à droite) */}
        <Link
          href="/mobile/secondaire_mobile"
          className="fixed top-4 right-4 bg-orange-500 text-white py-4 px-10 rounded-lg font-bold text-lg sm:text-xl z-50"
        >
          Retour
        </Link>

        {/* Section Titre */}
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="text-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            Géométrie
          </h1>
          <div className="w-48 md:w-64 lg:w-96 h-1 bg-black mb-4"></div>
          <h2 className="text-black text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">
            Choisi un sujet!
          </h2>
        </div>

        {/* Liens vers les niveaux */}
        <div className="flex flex-col gap-4 items-center w-full max-w-xl">
          <Link
            href="/mobile/secondaire_mobile/niveaux_mobile/niveau4_mobile/perimetre_mobile"
            className="w-80 sm:w-96 h-14 sm:h-16 px-8 sm:px-10 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-semibold"
          >
            Périmètre
          </Link>

          <Link
            href="/mobile/secondaire_mobile/niveaux_mobile/niveau4_mobile/aire_mobile"
            className="w-80 sm:w-96 h-14 sm:h-16 px-8 sm:px-10 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-semibold"
          >
            Aire
          </Link>

          <Link
            href="/mobile/secondaire_mobile/niveaux_mobile/niveau4_mobile/volume_mobile"
            className="w-80 sm:w-96 h-14 sm:h-16 px-8 sm:px-10 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-semibold"
          >
            Volume
          </Link>
        </div>
      </main>
    </div>
  );
}
