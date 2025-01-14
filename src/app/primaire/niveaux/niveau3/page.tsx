"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen relative bg-gray-100 text-gray-900">
      {/* Lignes verticales couvrant toute la largeur */}
      <div className="absolute top-0 left-0 h-full w-full flex">
        <div className="flex-1 bg-blue-900"></div>
        <div className="flex-1 bg-blue-700"></div>
        <div className="flex-1 bg-blue-500"></div>
        <div className="flex-1 bg-blue-300"></div>
        <div className="flex-1 bg-blue-100"></div>
      </div>

      {/* Bouton de retour */}
      <Link
        href="/primaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded font-bold shadow"
      >
        Retour
      </Link>

      {/* Titre */}
      <h1 className="relative text-3xl font-bold mb-12 text-center mt-16 sm:mt-12 z-10">
        Choisissez une opération
      </h1>

      {/* Boutons */}
      <div className="relative grid grid-cols-2 gap-4 w-full max-w-4xl px-4 sm:px-8 mx-auto z-10">
        <a
          href="/primaire/niveaux/niveau3/additionfraction"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
        >
          Addition de fraction
        </a>
        <a
          href="/primaire/niveaux/niveau3/soustractionfraction"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
        >
          Soustraction de fraction
        </a>
        <a
          href="/primaire/niveaux/niveau3/multiplicationfraction"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
        >
          Multiplication de fraction
        </a>
        <a
          href="/primaire/niveaux/niveau3/divisionfraction"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
        >
          Division de fraction
        </a>
      </div>
    </div>
  );
}
