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
      </div>

      {/* Centre orange */}
      <div className="absolute bg-[#9C5F27] w-12 h-12 rounded-full top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"></div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      {/* Design des fleurs */}
      <DesignFleurs />

      {/* Vague en haut, inversée et derrière le bouton */}
      <div
        className="absolute top-0 left-0 w-full h-[100px] bg-orange-500 z-0"
        style={{
          clipPath:
            "path('M0,50 C300,150 600,-50 900,50 C1200,150 1500,-50 1800,50 L1800,100 L0,100 Z')",
          transform: "rotate(180deg)", // Rotation de 180 degrés pour inverser la vague
        }}
      ></div>

      {/* Bouton de retour en haut à droite */}
      <Link
        href="/primaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10" // z-10 pour s'assurer que le bouton est au-dessus de la vague
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
