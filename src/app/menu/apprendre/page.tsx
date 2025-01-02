"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      {/* Bouton Retour à l'accueil */}
      <Link
        href="/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-4xl font-bold mb-12 underline">Zone d&apos;apprentissage</h1>
      <div className="flex flex-col gap-4 text-lg w-full pl-0">
        {/* Menu complètement collé à gauche */}
        <Link href="/menu/apprendre/opérations arithmétiques" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
            >
            opérations arithmétiques
        </Link>
        <Link href="/menu/apprendre/fraction" 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
            >
            Fraction
        </Link>
        <Link href="/menu/apprendre/aire" 
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Aire
        </Link>
        <Link href="/menu/apprendre/perimetre" 
        className="bg-green-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Périmètre
        </Link>
        <Link href="/menu/apprendre/algebre" 
        className="bg-yellow-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Algèbre
        </Link>
        <Link href="/menu/apprendre/priorite operation" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Priorité d&apos;opération
        </Link>
      </div>
    </div>
  );
}
