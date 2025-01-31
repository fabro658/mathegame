import Link from 'next/link';

export default function Niveau4() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      {/* Section Titre */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">Géométrie</h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-black mb-4"></div>
        <h2 className="text-black text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">Choisi un sujet!</h2>
      </div>
      
      <Link
        href="/mobile/secondaire_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <div className="flex flex-col gap-8 items-center w-full max-w-md">
        <Link
          href="/mobile/secondaire_mobile/niveaux_mobile/niveau4_mobile/perimetre_mobile"
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
        
          Périmètre
        </Link>
        <Link
          href="/mobile/secondaire_mobile/niveaux_mobile/niveau4_mobile/aire_mobile"
         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
        
          Aire
        </Link>
        <Link
          href="/mobile/secondaire_mobile/niveaux_mobile/niveau4_mobile/volume_mobile"
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
        
          Volume
        </Link>
        <Link
          href="/mobile/secondaire_mobile/niveaux_mobile/niveau4_mobile/geometrie_mobile"
         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
        
          Géométrie
        </Link>
      </div>

      {/* Vague arrondie en bas */}
      <div
        className="absolute bottom-0 w-screen h-[100px] bg-yellow-500 z-0"
        style={{
          clipPath: "path('M0,50 C300,150 600,-50 900,50 C1200,150 1500,-50 1800,50 L1800,100 L0,100 Z')",
        }}
      ></div>
    </div>
  );
}