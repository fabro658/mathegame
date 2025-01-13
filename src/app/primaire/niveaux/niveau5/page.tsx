"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
           {/* Vague en haut, inversée et derrière le bouton */}
           <div
        className="absolute top-0 left-0 w-full h-[100px] bg-orange-500 z-0"
        style={{
          clipPath: "path('M0,50 C300,150 600,-50 900,50 C1200,150 1500,-50 1800,50 L1800,100 L0,100 Z')",
          transform: "rotate(180deg)" // Rotation de 180 degrés pour inverser la vague
        }}
      >
      </div>
       {/* Bouton de retour en haut à droite */}
      <Link
        href="/primaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      {/* Ligne horizontale rectangle en bas de l'écran */}
      <div className="absolute bottom-0 left-0 w-full h-[60px] bg-blue-500 z-0"></div>

      {/* Titre */}
      <h1 className="text-4xl font-bold mb-12 text-center">Choisissez une opération</h1>

      {/* Boutons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Boutons en une colonne sur mobile, deux colonnes sur écrans plus grands */}
        <a
          href="/primaire/niveaux/niveau5/exposant/n1"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Premier niveau
        </a>
        <a
          href="/primaire/niveaux/niveau5/exposant/n2"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Deuxième niveau
        </a>
        <div className="col-span-1 sm:col-span-2 flex justify-center">
          <a
            href="/primaire/niveaux/niveau5/exposant/n3"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
          >
            Troisième niveau
          </a>
        </div>
      </div>
    </div>
  );
}
