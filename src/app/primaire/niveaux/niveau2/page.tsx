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
      
      {/* Grille des boutons */}
      <div className="grid gap-4 px-4 sm:px-8 w-full lg:w-2/3">
        {/* Mobile layout: une seule colonne */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
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

        {/* Desktop layout: grille avec 3 lignes */}
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
          <a
            href="/primaire/niveaux/niveau2/comparer_fraction"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center col-span-2 lg:col-span-1 lg:col-start-2"
          >
            Comparaison de fraction
          </a>
        </div>
      </div>
    </div>
  );
}
