"use client";
import Link from "next/link";

export default function Niveau1() {
  return (
    // Zone scrollable indépendante du body/layout
    <div className="fixed inset-0 overflow-y-auto flex flex-col items-center bg-blue-100 text-black p-4">
      {/* Bouton Retour */}
      <Link
        href="/mobile/secondaire_mobile"
        className="fixed top-4 right-4 bg-orange-500 text-white py-4 px-10 rounded-lg font-bold text-lg sm:text-xl z-10"
      >
        Retour
      </Link>

      {/* Section Titre */}
      <div className="flex flex-col items-center text-center mt-20 mb-8">
        <h1 className="text-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          Arithmétique
        </h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-black mb-4"></div>
        <h2 className="text-black text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">
          Choisi un sujet!
        </h2>
      </div>

      {/* Liens vers les niveaux */}
      <div className="flex flex-col gap-6 mb-16">
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/sommes_mobile">
          <div className="w-48 sm:w-64 md:w-72 h-12 sm:h-16 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-bold">
            Sommes
          </div>
        </Link>

        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/difference_mobile">
          <div className="w-48 sm:w-64 md:w-72 h-12 sm:h-16 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-bold">
            Différence
          </div>
        </Link>

        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/produit_mobile">
          <div className="w-48 sm:w-64 md:w-72 h-12 sm:h-16 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-bold">
            Produit
          </div>
        </Link>

        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/quotient_mobile">
          <div className="w-48 sm:w-64 md:w-72 h-12 sm:h-16 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-bold">
            Quotient
          </div>
        </Link>

        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/comparaison_mobile">
          <div className="w-48 sm:w-64 md:w-72 h-12 sm:h-16 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-bold">
            Comparer
          </div>
        </Link>
      </div>
    </div>
  );
}
