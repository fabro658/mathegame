"use client";
import Link from "next/link";

export default function Page() {
  return (
    // Zone scrollable indépendante du body/layout
    <div className="fixed inset-0 overflow-y-auto bg-gray-100 text-gray-900 p-4">
      {/* Bouton de retour en haut à droite */}
      <Link
        href="/mobile/primaire_mobile"
        className="fixed top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-50"
      >
        Retour
      </Link>

      {/* Contenu */}
      <div className="min-h-full flex flex-col items-center">
        <h1 className="text-4xl font-bold mt-20 mb-12 text-center">
          Mission Géométrie
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 w-full justify-items-center mb-12">
          <Link
            href="/mobile/primaire_mobile/niveaux_mobile/niveau4_mobile/aire_mobile"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center w-[300px] leading-snug"
          >
            Aire
          </Link>

          <Link
            href="/mobile/primaire_mobile/niveaux_mobile/niveau4_mobile/perimetre_mobile"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center w-[300px] leading-snug"
          >
            Périmètre
          </Link>

          <Link
            href="/mobile/primaire_mobile/niveaux_mobile/niveau4_mobile/geometrie_mobile"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center w-[300px] leading-snug"
          >
            Géométrie
          </Link>
        </div>
      </div>
    </div>
  );
}
