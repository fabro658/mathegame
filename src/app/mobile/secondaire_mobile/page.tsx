"use client";
import Link from "next/link";

export default function Secondaire_mobile() {
  return (
    // Page à défilement indépendant
    <div className="fixed inset-0 overflow-y-auto bg-blue-100 text-black">
      {/* Contenu principal */}
      <main className="min-h-screen flex flex-col items-center p-4 pt-24 pb-28 relative">
        {/* Bouton Retour (fixe) */}
        <Link
          href="/"
          className="fixed top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-50"
        >
          Retour
        </Link>

        {/* Titre */}
        <div className="flex flex-col items-center text-center mb-6">
          <h1 className="text-black text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Secondaire
          </h1>
          <div className="w-40 sm:w-56 md:w-72 h-1 bg-black mb-3" />
          <h2 className="text-black text-xl sm:text-2xl md:text-3xl font-semibold">
            Choisis un sujet&nbsp;!
          </h2>
        </div>

        {/* Liens vers les niveaux */}
        <nav className="w-full max-w-md flex flex-col gap-3">
          <Link
            href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile"
            className="w-full h-14 rounded-full transition-colors flex items-center justify-center bg-yellow-500 text-white hover:bg-yellow-600 text-lg font-bold"
          >
            Arithmétique
          </Link>

          <Link
            href="/mobile/secondaire_mobile/niveaux_mobile/niveau2_mobile"
            className="w-full h-14 rounded-full transition-colors flex items-center justify-center bg-orange-500 text-white hover:bg-orange-600 text-lg font-bold"
          >
            Fraction
          </Link>

          <Link
            href="/mobile/secondaire_mobile/niveaux_mobile/niveau3_mobile"
            className="w-full h-14 rounded-full transition-colors flex items-center justify-center bg-red-500 text-white hover:bg-red-600 text-lg font-bold"
          >
            Algèbre
          </Link>

          <Link
            href="/mobile/secondaire_mobile/niveaux_mobile/niveau4_mobile"
            className="w-full h-14 rounded-full transition-colors flex items-center justify-center bg-blue-800 text-white hover:bg-blue-700 text-lg font-bold"
          >
            Géométrie
          </Link>

          <Link
            href="/mobile/secondaire_mobile/niveaux_mobile/niveau5_mobile"
            className="w-full h-14 rounded-full transition-colors flex items-center justify-center bg-purple-500 text-white hover:bg-purple-600 text-lg font-bold"
          >
            Fonction
          </Link>
        </nav>

        {/* marge en bas pour scroller confortablement (au-dessus du safe area) */}
        <div className="h-10" />
      </main>
    </div>
  );
}
