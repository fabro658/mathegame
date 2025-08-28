"use client";

import Link from "next/link";

export default function Secondaire_mobile() {
  return (
    // Zone de scroll indépendante du body/layout
    <div className="fixed inset-0 overflow-y-auto bg-blue-100 text-gray-900">
      {/* Barre supérieure fixe */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-gray-100/90 backdrop-blur px-4 py-4 border-b">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="bg-orange-500 text-white py-2 px-6 rounded font-bold shadow-md hover:bg-orange-700"
          >
            Retour
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold underline text-center flex-1">
            Secondaire
          </h1>
        </div>
      </div>

      {/* Contenu scrollable */}
      <main className="max-w-md mx-auto px-4 pt-24 pb-10">
        <div className="flex flex-col gap-4">
          <Link
            href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile"
            className="bg-yellow-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg text-center"
          >
            Arithmétique
          </Link>

          <Link
            href="/mobile/secondaire_mobile/niveaux_mobile/niveau2_mobile"
            className="bg-orange-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg text-center"
          >
            Fraction
          </Link>

          <Link
            href="/mobile/secondaire_mobile/niveaux_mobile/niveau3_mobile"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg text-center"
          >
            Algèbre
          </Link>

          <Link
            href="/mobile/secondaire_mobile/niveaux_mobile/niveau4_mobile"
            className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg text-center"
          >
            Géométrie
          </Link>

          <Link
            href="/mobile/secondaire_mobile/niveaux_mobile/niveau5_mobile"
            className="bg-blue-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg text-center"
          >
            Fonction
          </Link>
        </div>
      </main>
    </div>
  );
}
