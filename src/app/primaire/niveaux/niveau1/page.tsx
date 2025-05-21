import Link from "next/link";

export default function Niveau1() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-yellow-100 text-black relative overflow-hidden">
      {/* Fond style carte au trésor */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg width="100%" height="100%" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="treasureMap" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 Q50 0 100 50 T200 50" stroke="#8b5e3c" strokeWidth="2" fill="none" />
              <circle cx="25" cy="75" r="5" fill="#8b5e3c" />
              <circle cx="75" cy="25" r="5" fill="#8b5e3c" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#treasureMap)" />
        </svg>
      </div>

      {/* Bouton Retour */}
      <Link
        href="/primaire/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Titre pirate */}
      <div className="flex flex-col items-center text-center mb-12 z-10">
        <h1 className="text-brown-800 text-5xl sm:text-6xl md:text-7xl font-extrabold mb-2 drop-shadow-lg">
          🏴‍☠️ Capitaine des Nombres !
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700 font-medium">
          Choisis ton épreuve mathématique sur l’île aux chiffres 💰
        </p>
      </div>

      {/* Boutons style coffre au trésor */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 z-10">
        <a
          href="/primaire/niveaux/niveau1/addition"
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl text-center flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          ➕ Addition ⚓
        </a>
        <a
          href="/primaire/niveaux/niveau1/soustraction"
          className="bg-green-600 hover:bg-green-800 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl text-center flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          ➖ Soustraction 🦜
        </a>
        <a
          href="/primaire/niveaux/niveau1/multiplication"
          className="bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl text-center flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          ✖️ Multiplication 🗺️
        </a>
        <a
          href="/primaire/niveaux/niveau1/division"
          className="bg-red-600 hover:bg-red-800 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl text-center flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          ➗ Division 💎
        </a>
      </div>
    </div>
  );
}