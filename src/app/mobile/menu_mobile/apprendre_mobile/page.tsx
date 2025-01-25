"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      {/* Bouton Retour à l'accueil */}
      <Link
        href="/"
        className="absolute top-4 left-4 bg-orange-500 text-white py-2 px-6 rounded font-bold shadow-md hover:bg-orange-700"
      >
        Retour
      </Link>

      <h1 className="text-3xl font-bold mt-16 mb-8 underline">Zone d&apos;apprentissage</h1>

      {/* Colonne de boutons */}
      <div className="flex flex-col gap-4">
        <Link
          href="/mobile/menu_mobile/apprendre_mobile/operations_arithmetiques_mobile"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg text-center flex items-center justify-center min-w-[200px]"
        >
          Opérations arithmétiques
        </Link>
        <Link
          href="/mobile/menu_mobile/apprendre_mobile/fraction_mobile"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg text-center flex items-center justify-center min-w-[200px]"
        >
          Fraction
        </Link>
        <Link
          href="/mobile/menu_mobile/apprendre_mobile/aire_mobile"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg text-center flex items-center justify-center min-w-[200px]"
        >
          Aire
        </Link>
        <Link
          href="/mobile/menu_mobile/apprendre_mobile/perimetre_mobile"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg text-center flex items-center justify-center min-w-[200px]"
        >
          Périmètre
        </Link>
        <Link
          href="/mobile/menu_mobile/apprendre_mobile/exposant_mobile"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg text-center flex items-center justify-center min-w-[200px]"
        >
          Exposant
        </Link>
        <Link
          href="/mobile/menu_mobile/apprendre_mobile/prioriteoperation_mobile"
          className="bg-blue-500 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg text-center flex items-center justify-center min-w-[200px]"
        >
          Priorité d&apos;opération
        </Link>
        <Link
          href="/mobile/menu_mobile/apprendre_mobile/algebre_mobile"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg text-center flex items-center justify-center min-w-[200px]"
        >
          Algèbre
        </Link>
        <Link
          href="/mobile/menu_mobile/apprendre_mobile/fonction_mobile"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg text-center flex items-center justify-center min-w-[200px]"
        >
          Fonction
        </Link>
      </div>
    </div>
  );
}
