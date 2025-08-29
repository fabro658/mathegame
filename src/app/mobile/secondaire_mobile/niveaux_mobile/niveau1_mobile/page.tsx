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
         className="w-80 sm:w-96 h-14 sm:h-16 px-8 sm:px-10 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-semibold">
          Sommes
        </Link>

        <Link
          href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/difference_mobile"
         className="w-80 sm:w-96 h-14 sm:h-16 px-8 sm:px-10 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-semibold">
          Différence
        </Link>

        <Link
          href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/produit_mobile"
          className="w-80 sm:w-96 h-14 sm:h-16 px-8 sm:px-10 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-semibold">
          Produit
        </Link>

        <Link
          href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/quotient_mobile"
           className="w-80 sm:w-96 h-14 sm:h-16 px-8 sm:px-10 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-semibold">
          Quotient
        </Link>

        <Link
          href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/comparaison_mobile"
           className="w-80 sm:w-96 h-14 sm:h-16 px-8 sm:px-10 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-semibold">
          Comparer
        </Link>
      </div>
    </div>
  );
}
