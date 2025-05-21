import Link from "next/link";

export default function Niveau1() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black relative overflow-hidden">
      {/* Arrière-plan illustré en SVG */}
      <div className="absolute inset-0 opacity-10 z-0">
        <svg
          width="100%"
          height="100%"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="geoPattern"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M40 0 L80 40 L40 80 L0 40 Z"
                fill="none"
                stroke="#2563eb"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geoPattern)" />
        </svg>
      </div>

      {/* Bouton Retour */}
      <Link
        href="/primaire/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Section Titre */}
      <div className="flex flex-col items-center text-center mb-12 z-10">
        <h1 className="text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-2">
          Mission Géométrie 🚀
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700 font-medium">
          Choisis ta mission mathématique !
        </p>
      </div>

      {/* Boutons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 z-10">
        <a
          href="/primaire/niveaux/niveau4/perimetre2"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-2xl text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          📏 Périmètre
        </a>
        <a
          href="/primaire/niveaux/niveau4/geometrie"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-2xl text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          🔺 Géométrie
        </a>
        <a
          href="/primaire/niveaux/niveau4/aire"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-2xl text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          🔲 Aire
        </a>
      </div>
    </div>
  );
}
