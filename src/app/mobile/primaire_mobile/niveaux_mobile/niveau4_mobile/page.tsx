import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      {/* Bouton de retour en haut à droite */}
      <Link
        href="/mobile/primaire_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Titre */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          Géométrie
        </h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-black mb-4"></div>
        <h2 className="text-black text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">
          Choisissez une opération
        </h2>
      </div>

      {/* Boutons centrés */}
      <div className="flex flex-col gap-6 items-center w-full max-w-md">
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
