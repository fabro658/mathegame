"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen relative bg-gray-100 text-gray-900 flex flex-col items-center justify-center">
      {/* Lignes verticales */}
      <div className="absolute top-0 left-0 h-full w-full flex">
        <div className="w-[1%] bg-blue-900"></div>
        <div className="w-[1%] bg-blue-700"></div>
        <div className="w-[1%] bg-blue-500"></div>
        <div className="w-[1%] bg-blue-300"></div>
        <div className="w-[1%] bg-blue-100"></div>
      </div>

      {/* Bouton de retour */}
      <Link
        href="/primaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded font-bold shadow z-20"
      >
        Retour
      </Link>

      {/* Contenu principal */}
      <div className="relative z-10 w-full">
        {/* Titre */}
        <h1 className="text-3xl font-bold mb-12 text-center mt-16 sm:mt-12">
          Choisissez une opération
        </h1>

        {/* Boutons */}
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
          <a
            href="/primaire/niveaux/niveau3/additionfraction"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
            >
            Addition de fraction
          </a>
          <a
            href="/primaire/niveaux/niveau3/soustractionfraction"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
            >
            Soustraction de fraction
          </a>
          <a
            href="/primaire/niveaux/niveau3/multiplicationfraction"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
            >
            Multiplication de fraction
          </a>
          <a
            href="/primaire/niveaux/niveau3/divisionfraction"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
            >
            Division de fraction
          </a>
        </div>
      </div>
    </div>
  );
}