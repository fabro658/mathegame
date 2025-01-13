import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      {/* Section Titre */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">Géométrie</h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-black mb-4"></div>
        <h2 className="text-black text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">Choisi un sujet!</h2>
      </div>
      
      <Link
        href="/secondaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
        <Link
          href="/secondaire/niveaux/niveau5/perimetre"
          className="bg-red-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
        >
          Périmètre
        </Link>
        <Link
          href="/secondaire/niveaux/niveau5/aire"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
        >
          Aire
        </Link>
        <Link
          href="/secondaire/niveaux/niveau5/volume"
          className="bg-yellow-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
        >
          Volume
        </Link>
        <Link
          href="/secondaire/niveaux/niveau5/geometrie"
          className="bg-blue-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
        >
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