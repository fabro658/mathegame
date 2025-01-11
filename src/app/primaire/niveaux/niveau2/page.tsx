"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      {/* Bouton de retour en haut à droite */}
      <Link
        href="/primaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-4xl font-bold mb-6 sm:mb-12 text-center">Choisissez une opération</h1>

      {/* Disposition des boutons */}
      <div className="flex flex-col items-center gap-8">
        {/* Première ligne avec 2 boutons */}
        <div className="flex justify-center gap-4">
          <Link
            href="/primaire/niveaux/niveau2/comparaison"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center w-[320px] h-[120px]"
            aria-label="Page de comparaison"
          >
            Comparaisons
          </Link>
          <Link
            href="/primaire/niveaux/niveau2/expression_equivalente"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center w-[320px] h-[120px]"
            aria-label="Page d'expression équivalente"
          >
            Expression équivalente
          </Link>
        </div>

        {/* Deuxième ligne avec 1 bouton centré */}
        <div className="flex justify-center">
          <Link
            href="/primaire/niveaux/niveau2/comparer_fraction"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center w-[320px] h-[120px]"
          >
            Comparaison de fraction
          </Link>
        </div>
      </div>
    </div>
  );
}
