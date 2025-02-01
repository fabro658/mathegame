import Link from 'next/link';

export default function Niveau4() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black-900 relative">
      {/* Section Titre */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">Géométrie</h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-black mb-4"></div>
        <h2 className="text-black text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">Choisi un sujet!</h2>
      </div>
      
      <Link
        href="/mobile/secondaire_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-4 px-10 rounded font-bold text-lg sm:text-xl"
      >
        Retour
      </Link>

      <div className="flex flex-col gap-6">
        <Link
          href="/mobile/secondaire_mobile/niveaux_mobile/niveau4_mobile/perimetre_mobile"
          className="w-64 sm:w-80 md:w-96 h-16 sm:h-20 rounded-full border border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl font-bold">
          Périmètre
        </Link>
        <Link
          href="/mobile/secondaire_mobile/niveaux_mobile/niveau4_mobile/aire_mobile"
          className="w-64 sm:w-80 md:w-96 h-16 sm:h-20 rounded-full border border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl font-bold">
          Aire
        </Link>
        <Link
          href="/mobile/secondaire_mobile/niveaux_mobile/niveau4_mobile/volume_mobile"
          className="w-64 sm:w-80 md:w-96 h-16 sm:h-20 rounded-full border border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl font-bold">
          Volume
        </Link>
        <Link
          href="/mobile/secondaire_mobile/niveaux_mobile/niveau4_mobile/geometrie_mobile"
          className="w-64 sm:w-80 md:w-96 h-16 sm:h-20 rounded-full border border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl font-bold">
          Géométrie
        </Link>
      </div>
    </div>
  );
}
