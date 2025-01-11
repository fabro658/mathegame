import Link from "next/link";

export default function Primaire() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black-900 relative">
      {/* Demi-cercles bleus clairs collés à gauche et tournés à 90 degrés */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between items-center z-0 hidden md:flex">
        {Array.from({ length: 5 }).map((_, index) => (
          <svg
            key={index}
            className="w-24 h-48 transform rotate-90"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 100"
            preserveAspectRatio="none"
          >
            <circle cx="25" cy="50" r="25" fill="#ADD8E6" />
          </svg>
        ))}
      </div>

      {/* Bouton Retour */}
      <Link
        href="/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Section Titre */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-black text-4xl md:text-6xl lg:text-7xl font-bold mb-4">Primaire</h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-black mb-4"></div>
        <h2 className="text-black text-2xl md:text-4xl lg:text-5xl font-semibold">Choisi un sujet!</h2>
      </div>

      {/* Liens vers les niveaux */}
      <div className="flex flex-col gap-4 w-full px-4 md:absolute md:right-8 md:top-1/2 md:transform md:-translate-y-1/2 z-0 items-center md:items-start md:w-auto">
        <Link href="/primaire/niveaux/niveau1">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-80 px-4 sm:px-5">
            Opérations arithmétiques
          </div>
        </Link>
        <Link href="/primaire/niveaux/niveau2">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-80 px-4 sm:px-5">
            Comparaisons
          </div>
        </Link>
        <Link href="/primaire/niveaux/niveau3">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-80 px-4 sm:px-5">
            Fraction
          </div>
        </Link>
        <Link href="/primaire/niveaux/niveau4">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-80 px-4 sm:px-5">
            Géométrie
          </div>
        </Link>
        <Link href="/primaire/niveaux/niveau5">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-80 px-4 sm:px-5">
            Exposants
          </div>
        </Link>
        <Link href="/primaire/niveaux/niveau6">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-80 px-4 sm:px-5">
            Priorité d&#39;opération
          </div>
        </Link>
      </div>
    </div>
  );
}
