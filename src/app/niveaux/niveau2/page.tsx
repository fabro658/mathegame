"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      {/* Bouton de retour en haut à droite */}
      <Link
        href="/"
        className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
      >
        Retour
      </Link>

      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
        <h1 className="text-4xl font-bold mb-12">Niveau 2 - Choisissez une opération</h1>
        <div className="flex flex-col items-center gap-8">
          <div className="flex gap-8">
            <Link
              href="/niveaux/niveau2/multiplication"
              className="bg-green-500 py-2 px-4 rounded-full shadow-lg"
              aria-label="Page de multiplication"
            >
              Multiplication
            </Link>
            <Link
              href="/niveaux/niveau2/division"
              className="bg-purple-500 py-2 px-4 rounded-full shadow-lg"
              aria-label="Page de division"
            >
              Division
            </Link>
          </div>
          <div className="flex gap-8">
            <Link
              href="/niveaux/niveau2/multiplicationfraction"
              className="bg-orange-500 py-2 px-4 rounded-full shadow-lg"
              aria-label="Page de multiplication de fraction"
            >
              Multiplication de fraction
            </Link>
            <Link
              href="/niveaux/niveau2/divisionfraction"
              className="bg-red-500 py-2 px-4 rounded-full shadow-lg"
              aria-label="Page de division de fraction"
            >
              Division de fraction
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
