"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      {/* Bouton de retour en haut à droite */}
      <Link
        href="/mobile/priamire_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10" // z-10 pour s'assurer que le bouton est au-dessus
      >
        Retour
      </Link>

      {/* Titre */}
      <h1 className="text-4xl font-bold mb-12 text-center">Choisissez une opération</h1>

      {/* Boutons en une colonne */}
      <div className="flex flex-col gap-8 items-center w-full max-w-md">
        <a
          href="/mobile/primaire_mobile/niveaux_mobile/niveau4_mobile/perimetre"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center w-full"
        >
          Périmètre
        </a>
        <a
          href="/mobile/primaire_mobile/niveaux_mobile/niveau4_mobile/geometrie"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center w-full"
        >
          Géométrie
        </a>
      </div>
    </div>
  );
}
