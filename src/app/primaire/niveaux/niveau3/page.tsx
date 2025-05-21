import Link from "next/link";

export default function Niveau1() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-100 text-black relative overflow-hidden">
      {/* Arrière-plan motif cuisine/fruits */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <pattern id="kitchenPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="8" fill="#f87171" /> {/* fraise */}
              <circle cx="70" cy="40" r="10" fill="#fbbf24" /> {/* tranche d’orange */}
              <circle cx="50" cy="80" r="6" fill="#34d399" /> {/* kiwi */}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#kitchenPattern)" />
        </svg>
      </div>

      {/* Bouton Retour */}
      <Link
        href="/primaire/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Titre */}
      <div className="flex flex-col items-center text-center mb-12 z-10">
        <h1 className="text-red-600 text-5xl sm:text-6xl md:text-7xl font-extrabold mb-2 drop-shadow-lg">
          🧁 Chef des Fractions !
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700 font-medium">
          Coupe, partage et calcule comme un vrai pâtissier 🍰
        </p>
      </div>

      {/* Boutons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 z-10 max-w-4xl">
        <a
          href="/primaire/niveaux/niveau3/additionfraction"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Addition de fractions 🍩
        </a>
        <a
          href="/primaire/niveaux/niveau3/soustractionfraction"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Soustraction de fractions 🥧
        </a>
        <a
          href="/primaire/niveaux/niveau3/multiplicationfraction"
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Multiplication de fractions 🍪
        </a>
        <a
          href="/primaire/niveaux/niveau3/divisionfraction"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Division de fractions 🍰
        </a>
        <a
          href="/primaire/niveaux/niveau3/trouvefraction"
          className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Trouver la fraction 🍕
        </a>
      </div>
    </div>
  );
}
