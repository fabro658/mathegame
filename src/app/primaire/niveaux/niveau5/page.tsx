import Link from "next/link";

export default function Niveau1() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-200 text-black relative overflow-hidden">
      {/* Arrière-plan motif éclairs SVG */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <pattern id="lightningPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <polygon points="50,0 40,40 60,40 45,100 80,50 60,50 70,0" fill="#3b82f6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lightningPattern)" />
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
        <h1 className="text-blue-800 text-5xl sm:text-6xl md:text-7xl font-extrabold mb-2 drop-shadow-lg">
          ⚡ Super Puissances des Nombres
        </h1>
        <p className="text-xl sm:text-2xl text-gray-800 font-medium">
          Découvre les pouvoirs magiques des exposants 💥
        </p>
      </div>

      {/* Boutons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 z-10">
        <a
          href="/primaire/niveaux/niveau5/exposant/n1"
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl text-center flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          🥇 Premier niveau
        </a>
        <a
          href="/primaire/niveaux/niveau5/exposant/n2"
          className="bg-green-600 hover:bg-green-800 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl text-center flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          🥈 Deuxième niveau
        </a>
      </div>
    </div>
  );
}
