"use client";
import Link from "next/link";

export default function Niveau1() {
  return (
    <div className="h-screen overflow-y-auto flex flex-col items-center bg-blue-100 text-gray-900 p-4 relative">
      {/* Bouton Retour (fixe en haut à droite) */}
      <Link
        href="/mobile/secondaire_mobile"
        className="fixed top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-50"
      >
        Retour
      </Link>

      {/* Titre */}
      <h1 className="text-4xl font-bold mt-20 mb-12 text-center">
        Arithmétique
      </h1>

      {/* Boutons (scrollables avec la page) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 w-full justify-items-center mb-12">
        <Link
          href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/sommes_mobile"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center w-[300px] leading-snug"
        >
          Sommes
        </Link>

        <Link
          href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/difference_mobile"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center w-[300px] leading-snug"
        >
          Différence
        </Link>

        <Link
          href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/produit_mobile"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center w-[300px] leading-snug"
        >
          Produit
        </Link>

        <Link
          href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/quotient_mobile"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center w-[300px] leading-snug"
        >
          Quotient
        </Link>

        <Link
          href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/comparaison_mobile"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center w-[300px] leading-snug"
        >
          Comparer
        </Link>
      </div>
    </div>
  );
}
