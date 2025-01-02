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
        <Link href="/menu/apprendre/opérations arithmétiques" className="hover:underline text-gray-700">
          opérations arithmétiques
        </Link>
        <Link href="/menu/apprendre/fraction" className="hover:underline text-gray-700">
          Fraction
        </Link>
        <Link href="/menu/apprendre/aire" className="hover:underline text-gray-700">
          Aire
        </Link>
        <Link href="/menu/apprendre/perimetre" className="hover:underline text-gray-700">
          Périmètre
        </Link>
        <Link href="/menu/apprendre/algebre" className="hover:underline text-gray-700">
          Algèbre
        </Link>
        <Link href="/menu/apprendre/priorite operation" className="hover:underline text-gray-700">
          Priorité d&apos;opération
        </Link>
      </div>
    </div>
  );
}
