"use client";
import Link from "next/link";

export default function Niveau3() {
  return (
    // Conteneur scrollable indépendant du body/layout
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
      <div className="flex flex-col gap-4 items-center w-full max-w-md mb-16">
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau3_mobile/expo_mobile">
          <div className="w-80 sm:w-96 h-14 sm:h-16 px-8 sm:px-10 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-semibold">
            Exposant
          </div>
        </Link>

        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau3_mobile/racine_mobile">
          <div className="w-80 sm:w-96 h-14 sm:h-16 px-8 sm:px-10 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-semibold">
            Racine
          </div>
        </Link>

        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau3_mobile/expression_equivalente_mobile">
          <div className="w-80 sm:w-96 h-14 sm:h-16 px-8 sm:px-10 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-semibold">
            Expression équivalente
          </div>
        </Link>

        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau3_mobile/priooperation_mobile">
          <div className="w-80 sm:w-96 h-14 sm:h-16 px-8 sm:px-10 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-semibold">
            Priorité d&apos;opération
          </div>
        </Link>

        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau3_mobile/approx_mobile">
          <div className="w-80 sm:w-96 h-14 sm:h-16 px-8 sm:px-10 rounded-full transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl font-semibold">
            Approximation
          </div>
        </Link>
      </div>
    </div>
  );
}
