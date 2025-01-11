"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      <h1 className="text-4xl font-bold mb-12 text-center">Les fractions</h1>

      {/* Bouton de retour en haut à droite */}
      <Link
        href="/primaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full sm:w-full sm:justify-center">
        {/* Première ligne avec 2 boutons */}
        <Link
          href="/primaire/niveaux/niveau3/additionfraction"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-lg text-3xl sm:text-xl md:text-lg shadow-lg text-center flex items-center justify-center min-w-[300px] h-[120px] md:h-[100px]"
        >
          Addition de fraction
        </Link>
        <Link
          href="/primaire/niveaux/niveau3/soustractionfraction"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg text-3xl sm:text-xl md:text-lg shadow-lg text-center flex items-center justify-center min-w-[300px] h-[120px] md:h-[100px]"
        >
          Soustraction de fraction
        </Link>

        {/* Deuxième ligne avec 2 boutons */}
        <Link
          href="/primaire/niveaux/niveau3/multiplicationfraction"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl sm:text-xl md:text-lg shadow-lg text-center flex items-center justify-center min-w-[300px] h-[120px] md:h-[100px]"
        >
          Multiplication de fraction
        </Link>
        <Link
          href="/primaire/niveaux/niveau3/divisionfraction"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl sm:text-xl md:text-lg shadow-lg text-center flex items-center justify-center min-w-[300px] h-[120px] md:h-[100px]"
        >
          Division de fraction
        </Link>

        {/* Dernière ligne avec 1 bouton centré */}
        <div className="col-span-2 flex justify-center">
          <Link
            href="/primaire/niveaux/niveau3/fractionreduite"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-6 px-12 rounded-lg text-3xl sm:text-xl md:text-lg shadow-lg text-center flex items-center justify-center min-w-[300px] h-[120px] md:h-[100px]"
          >
            Fraction réduite
          </Link>
        </div>
      </div>
    </div>
  );
}
