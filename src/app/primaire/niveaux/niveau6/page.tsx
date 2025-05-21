import Link from "next/link";

export default function Niveau1() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-indigo-100 text-black relative overflow-hidden">
      {/* Arrière-plan style parchemin mystique en SVG */}
      <div className="absolute inset-0 opacity-10 z-0">
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <pattern id="magicPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="3" fill="#6d28d9" />
              <circle cx="80" cy="40" r="2" fill="#4c1d95" />
              <circle cx="50" cy="80" r="3" fill="#7c3aed" />
              <rect x="40" y="10" width="20" height="3" fill="#a78bfa" transform="rotate(45 50 10)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#magicPattern)" />
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
        <h1 className="text-indigo-800 text-5xl sm:text-6xl md:text-7xl font-extrabold mb-2 drop-shadow-lg">
          📜 Ordre Magique des Opérations
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700 font-medium">
          Entre dans le temple des règles mathématiques sacrées ✨
        </p>
      </div>

      {/* Bouton unique */}
      <div className="flex flex-col items-center justify-center gap-8 z-10">
        <a
          href="/primaire/niveaux/niveau6/priooperation"
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-6 px-12 rounded-2xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] max-w-[500px] transition transform hover:scale-105"
        >
          🧠 Priorité d&apos;opération
        </a>
      </div>
    </div>
  );
}
