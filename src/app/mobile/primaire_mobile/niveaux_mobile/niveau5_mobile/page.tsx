"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen overflow-y-auto flex flex-col items-center bg-gray-100 text-gray-900 p-4 relative">
      {/* Bouton de retour en haut à droite */}
      <Link
        href="/mobile/primaire_mobile"
        className="fixed top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-50"
      >
        Retour
      </Link>

      {/* Titre */}
      <h1 className="text-4xl font-bold mt-20 mb-12 text-center">
        Les exposants
      </h1>

      {/* Boutons (scrollables avec la page) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 w-full justify-items-center mb-12">
        <a
          href="/mobile/primaire_mobile/niveaux_mobile/niveau5_mobile/exposant_mobile/n1_mobile"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center w-[300px] leading-snug"
        >
          Premier niveau
        </a>
        <a
          href="/mobile/primaire_mobile/niveaux_mobile/niveau5_mobile/exposant_mobile/n2_mobile"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center w-[300px] leading-snug"
        >
          Deuxième niveau
        </a>
      </div>
    </div>
  );
}
