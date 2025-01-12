"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      {/* Lignes verticales vertes */}
      <div className="absolute inset-y-0 left-0 flex space-x-4 pl-4">
        {/* Ligne vert clair */}
        <div className="w-4 bg-green-300"></div>
        {/* Ligne vert foncé */}
        <div className="w-4 bg-green-700"></div>
      </div>

      {/* Bouton de retour */}
      <Link
        href="/primaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded font-bold shadow"
      >
        Retour
      </Link>

      {/* Titre */}
      <h1 className="text-4xl font-bold mb-12 text-center">Choisissez une opération</h1>

      {/* Boutons */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl px-4 sm:px-8">
        <a
          href="/primaire/niveaux/niveau2/comparaison_decimaux"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
        >
          Comparaisons nombre décimaux
        </a>
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
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center col-span-2 md:col-span-1 md:col-start-2"
        >
          Comparaison de fraction
        </a>
      </div>
    </div>
  );
}
