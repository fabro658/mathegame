"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative overflow-hidden">
      {/* Bouton de retour en haut à droite */}
      <Link
        href="/mobile/primaire_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      {/* Titre */}
      <h1 className="text-4xl font-bold mb-12 text-center">Choisissez une opération</h1>

      {/* Boutons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 relative z-10">
        <Link href="/mobile/primaire_mobile/niveaux_mobile/niveau4_mobile/perimetre_mobile">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 shadow-md w-full text-center">
            Périmètre
          </div>
        </Link>
        <Link href="/mobile/primaire_mobile/niveaux_mobile/niveau4_mobile/geometrie_mobile">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 shadow-md w-full text-center">
            Géométrie
          </div>
        </Link>
        <Link href="/mobile/primaire_mobile/niveaux_mobile/niveau4_mobile/aire_mobile">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 shadow-md w-full text-center">
            Aire
          </div>
        </Link>
      </div>
    </div>
  );
}
