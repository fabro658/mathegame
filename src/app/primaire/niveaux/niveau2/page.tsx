"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      {/* Bouton de retour en haut à droite */}
      <Link
        href="/primaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded font-bold shadow"
      >
        Retour
      </Link>

      {/* Titre de la page */}
      <h1 className="text-4xl font-bold mb-12 text-center">Choisissez une opération</h1>

      {/* Conteneur des boutons */}
      <div className="w-full px-4 sm:px-8 flex justify-center">
        {/* Disposition mobile : boutons alignés verticalement */}
        <div className="grid grid-cols-1 gap-4 w-full max-w-xs md:hidden">
          <a
            href="/primaire/niveaux/niveau2/comparaison"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center"
          >
            Comparaisons
          </a>
          <a
            href="/primaire/niveaux/niveau2/expression_equivalente"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center"
          >
            Expression équivalente
          </a>
          <a
            href="/primaire/niveaux/niveau2/comparer_fraction"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center"
          >
            Comparaison de fraction
          </a>
        </div>

        {/* Disposition ordinateur : grille avec 3 lignes */}
        {/* Première ligne avec 2 boutons */}
        <div className="flex justify-center gap-8">
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/primaire/niveaux/niveau2/comparaison"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
          >
            Comparaisons
          </a>
          <a
            href="/primaire/niveaux/niveau2/expression_equivalente"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
          >
            Expression équivalente
          </a>
          </div>
          {/* Dernière ligne avec 1 bouton centré */}
        <div className="flex justify-center">
          <a
            href="/primaire/niveaux/niveau2/comparer_fraction"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center col-span-2 lg:col-span-1 lg:col-start-2"
          >
            Comparaison de fraction
          </a>
          </div>
        </div>
      </div>
    </div>
  );
}
