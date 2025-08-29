"use client";
import Link from "next/link";

export default function Niveau1() {
  return (
    // Zone de scroll indépendante du body/layout
    <div className="fixed inset-0 overflow-y-auto bg-blue-100 text-gray-900">
      {/* Contenu principal scrollable */}
      <main className="min-h-screen flex flex-col items-center p-4 pt-20 pb-24 relative">
        {/* Bouton Retour (fixe en haut à droite) */}
        <Link
          href="/mobile/secondaire_mobile"
          className="fixed top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-50"
        >
          Retour
        </Link>

        {/* Titre */}
        <h1 className="text-4xl font-bold mb-12 text-center">Arithmétique</h1>

        {/* Boutons (scrollables avec la page) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-5xl justify-items-center">
          <Link
            href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/sommes_mobile"
            className="w-80 sm:w-96 h-14 sm:h-16 px-8 sm:px-10 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-semibold"
          >
            Sommes
          </Link>

          <Link
            href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/difference_mobile"
            className="w-80 sm:w-96 h-14 sm:h-16 px-8 sm:px-10 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-semibold"
          >
            Différence
          </Link>

          <Link
            href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/produit_mobile"
            className="w-80 sm:w-96 h-14 sm:h-16 px-8 sm:px-10 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-semibold"
          >
            Produit
          </Link>

          <Link
            href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/quotient_mobile"
            className="w-80 sm:w-96 h-14 sm:h-16 px-8 sm:px-10 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-semibold"
          >
            Quotient
          </Link>

          <Link
            href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/comparaison_mobile"
            className="w-80 sm:w-96 h-14 sm:h-16 px-8 sm:px-10 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-semibold"
          >
            Comparer
          </Link>
        </div>
      </main>
    </div>
  );
}
