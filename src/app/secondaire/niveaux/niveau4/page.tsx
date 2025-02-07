import Link from 'next/link'; 

export default function Niveau4() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-12">Niveau 4 - Choisissez une opération</h1>
      <div className="grid grid-cols-2 gap-8">
      <Link
        href="/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>
      <Link
          href="/secondaire/niveaux/niveau4/perimetre"
          className="w-80 sm:w-96 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 font-semibold"
          >
          Périmètre
          </Link>
          <Link
          href="/secondaire/niveaux/niveau4/aire"
          className="w-80 sm:w-96 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 font-semibold"
          >
          Aire
          </Link>
          <Link
          href="/secondaire/niveaux/niveau4/volume"
          className="w-80 sm:w-96 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 font-semibold"
          >
          Volume
          </Link>
          <Link
          href="/secondaire/niveaux/niveau4/geometrie"
          className="w-80 sm:w-96 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 font-semibold"
        >
          Géométrie
          </Link>
        </div>
      </div>
    );
  }