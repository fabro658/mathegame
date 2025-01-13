"use client";

import Link from "next/link";

function DesignFleurs() {
  return (
    <div className="absolute top-4 left-4 flex justify-center items-center">
      {/* Pétales */}
      <div className="relative w-24 h-24">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-black w-16 h-16 rounded-full"
            style={{
              transform: `rotate(${i * 90}deg) translate(0, -50%)`,
              top: "50%",
              left: "50%",
            }}
          ></div>
        ))}

        {/* Point jaune au centre */}
        <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-yellow-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      {/* Design des fleurs */}
      <DesignFleurs />

      {/* Bouton de retour en haut à droite */}
      <Link
        href="/primaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      <h1 className="text-4xl font-bold mb-12 text-center">Choisissez une opération</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
        {/* Boutons en une colonne sur mobile, deux colonnes sur écrans plus grands */}
        <a
          href="/primaire/niveaux/niveau4/perimetre"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Périmètre
        </a>
        <a
          href="/primaire/niveaux/niveau4/geometrie"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Géométrie
        </a>
      </div>
    </div>
  );
}
