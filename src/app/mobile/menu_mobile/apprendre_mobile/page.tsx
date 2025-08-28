"use client";

import Link from "next/link";

export default function Page() {
  return (
    // Zone de scroll indépendante du body/layout
    <div className="fixed inset-0 overflow-y-auto bg-blue-100 text-gray-900">
      {/* Barre supérieure fixe */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-blue-100/90 backdrop-blur px-4 py-4 border-b">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="bg-orange-500 text-white py-2 px-6 rounded font-bold shadow-md hover:bg-orange-700"
          >
            Retour
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold underline text-center flex-1">
            Zone d&apos;apprentissage
          </h1>
        </div>
      </div>

      {/* Contenu scrollable */}
      <main className="max-w-md mx-auto px-4 pt-24 pb-10">
        <div className="flex flex-col gap-4">
          <Link
            href="/mobile/menu_mobile/apprendre_mobile/operations_arithmetiques_mobile"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg text-center"
          >
            Opérations arithmétiques
          </Link>
          <Link
            href="/mobile/menu_mobile/apprendre_mobile/fraction_mobile"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg text-center"
          >
            Fraction
          </Link>
          <Link
            href="/mobile/menu_mobile/apprendre_mobile/aire_mobile"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg text-center"
          >
            Aire
          </Link>
          <Link
            href="/mobile/menu_mobile/apprendre_mobile/perimetre_mobile"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg text-center"
          >
            Périmètre
          </Link>
          <Link
            href="/mobile/menu_mobile/apprendre_mobile/exposant_mobile"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg text-center"
          >
            Exposant
          </Link>
          <Link
            href="/mobile/menu_mobile/apprendre_mobile/prioriteoperation_mobile"
            className="bg-blue-500 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg text-center"
          >
            Priorité d&apos;opération
          </Link>
          <Link
            href="/mobile/menu_mobile/apprendre_mobile/algebre_mobile"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg text-center"
          >
            Algèbre
          </Link>
          <Link
            href="/mobile/menu_mobile/apprendre_mobile/fonction_mobile"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg text-center"
          >
            Fonction
          </Link>
        </div>
      </main>
    </div>
  );
}
