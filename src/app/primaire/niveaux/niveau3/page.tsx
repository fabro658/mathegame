"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-start items-center bg-gray-100 text-gray-900 relative py-16">
      {/* Bouton de retour en haut à droite */}
      <Link
        href="/primaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-4xl font-bold mb-12 text-center">Choisissez une opération</h1>
      
      {/* Disposition des boutons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <a
          href="/primaire/niveaux/niveau3/additionfraction"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px] h-[120px] md:h-[100px]"
        >
          Addition de fraction
        </a>
        <a
          href="/primaire/niveaux/niveau3/soustractionfraction"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Soustraction de fraction
        </a>
        <a
          href="/primaire/niveaux/niveau3/multiplicationfraction"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Multiplication de fraction
        </a>
        <a
          href="/primaire/niveaux/niveau3/divisionfraction"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Division de fraction
        </a>
        <div className="col-span-1 sm:col-span-2 flex justify-center">
          <a
            href="/primaire/niveaux/niveau3/fractionreduite"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
          >
            Fraction réduite
          </a>
        </div>
      </div>
    </div>
  );
}