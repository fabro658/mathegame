"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Vague arrondie en bas */}
      <div
        className="absolute bottom-0 left-0 w-screen h-[100px] bg-blue-500 z-0"
        style={{
          clipPath: "path('M0,50 C300,150 600,-50 900,50 C1200,150 1500,-50 1800,50 L1800,100 L0,100 Z')",
        }}
      ></div>

      {/* Bouton de retour */}
      <Link
        href="/primaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded font-bold shadow"
      >
        Retour
      </Link>

      {/* Titre */}
      <h1 className="text-4xl font-bold mb-12 text-center text-black"> Choisissez une opération</h1>

      {/* Boutons */}
      <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
      <a
          href="/primaire/niveaux/niveau2/comparaison"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
          >
          Comparaison
        </a>
        <a
          href="/primaire/niveaux/niveau2/comparaison_decimaux"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
          >
          Comparaison de nombre décimaux
        </a>
        <a
          href="/primaire/niveaux/niveau2/comparer_fraction"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
          >
          Comparaison de fraction
        </a>
        <a
          href="/primaire/niveaux/niveau2/expression_equivalente"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
          >
          Expression équivalente
        </a>
      </div>
    </div>
  );
}
