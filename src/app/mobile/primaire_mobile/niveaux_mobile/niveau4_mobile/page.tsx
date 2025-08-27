"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen overflow-y-auto flex flex-col items-center bg-[#0b0c2a] text-white p-4 relative font-fredoka">
      {/* Bouton de retour fixé */}
      <Link
        href="/mobile/primaire_mobile"
        className="fixed top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-50"
      >
        Retour
      </Link>

      {/* Titre avec marge pour éviter le chevauchement */}
      <h1 className="text-4xl font-bold mt-20 mb-12 text-center">Mission Géométrie</h1>

      {/* Boutons scrollables */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 w-full justify-items-center mb-12">
        <Link href="/mobile/primaire_mobile/niveaux_mobile/niveau4_mobile/perimetre_mobile">
          <div className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]">
            Périmètre
          </div>
        </Link>

        <Link href="/mobile/primaire_mobile/niveaux_mobile/niveau4_mobile/geometrie_mobile">
          <div className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]">
            Géométrie
          </div>
        </Link>

        <Link href="/mobile/primaire_mobile/niveaux_mobile/niveau4_mobile/aire_mobile">
          <div className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]">
            Aire
          </div>
        </Link>
      </div>
    </div>
  );
}
