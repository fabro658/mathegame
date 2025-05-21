import Link from "next/link";

export default function Niveau1() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-indigo-100 text-black relative overflow-hidden">
      {/* Arrière-plan étoilé SVG */}
      <div className="absolute inset-0 opacity-10 z-0">
        <svg width="100%" height="100%" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="stars" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="#fff" />
              <circle cx="50" cy="30" r="1.5" fill="#fff" />
              <circle cx="80" cy="70" r="2.5" fill="#fff" />
              <circle cx="30" cy="90" r="1.2" fill="#fff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stars)" />
        </svg>
      </div>

      {/* Bouton Retour */}
      <Link
        href="/primaire/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Titre thématique */}
      <div className="flex flex-col items-center text-center mb-12 z-10">
        <h1 className="text-black text-5xl sm:text-6xl md:text-7xl font-extrabold mb-3 drop-shadow">
          🌠 Mission Comparaison
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700 font-medium">
          Explore les nombres dans l’univers mathématique 🚀
        </p>
      </div>

      {/* Boutons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 z-10 max-w-4xl">
        <a
          href="/primaire/niveaux/niveau2/comparaison"
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-6 px-12 rounded-2xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Comparaison 🔭 
        </a>
        <a
          href="/primaire/niveaux/niveau2/comparaison_decimaux"
          className="bg-green-600 hover:bg-green-800 text-white font-bold py-6 px-12 rounded-2xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
         Décimaux  🪐 
        </a>
        <a
          href="/primaire/niveaux/niveau2/comparer_fraction"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-6 px-12 rounded-2xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Fractions 🛰️ 
        </a>
        <a
          href="/primaire/niveaux/niveau2/expression_equivalente"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-2xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Expressions équivalentes 🧪 
        </a>
      </div>
    </div>
  );
}
