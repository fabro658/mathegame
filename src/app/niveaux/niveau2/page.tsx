"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      {/* Bouton de retour en haut à droite */}
      <Link
        href="/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-4xl font-bold mb-12">Niveau 2 - Choisissez une opération</h1>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-wrap justify-center gap-8">
          <Link
            href="/niveaux/niveau2/multiplication"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
            aria-label="Page de multiplication"
          >
            Multiplication
          </Link>
          <Link
            href="/niveaux/niveau2/division"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
            aria-label="Page de division"
          >
            Division
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <Link
            href="/niveaux/niveau2/multiplicationfraction"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
            aria-label="Page de multiplication de fraction"
          >
            Multiplication de fraction
          </Link>
          <Link
            href="/niveaux/niveau2/divisionfraction"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
            aria-label="Page de division de fraction"
          >
            Division de fraction
          </Link>
        </div>
      </div>
    </div>
  );
}
