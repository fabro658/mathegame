import Link from "next/link";

export default function Primaire() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black-900 relative">
      {/* Bouton Retour */}
      <Link
        href="/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Section Titre */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          Primaire
        </h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-black mb-4"></div>
        <h2 className="text-black text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">
          Choisi un sujet!
        </h2>
      </div>

      {/* Liens vers les niveaux */}
      <div className="flex flex-col gap-4 w-full px-4 sm:items-center sm:gap-4 sm:w-full sm:text-center sm:mt-8 md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 md:flex-col md:items-end md:w-auto z-0">
        <Link href="/primaire/niveaux/niveau1">
          <div className="rounded-tl-full rounded-bl-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Opérations arithmétiques
          </div>
        </Link>
        <Link href="/primaire/niveaux/niveau2">
          <div className="rounded-tl-full rounded-bl-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Comparaisons
          </div>
        </Link>
        <Link href="/primaire/niveaux/niveau3">
          <div className="rounded-tl-full rounded-bl-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Fraction
          </div>
        </Link>
        <Link href="/primaire/niveaux/niveau4">
          <div className="rounded-tl-full rounded-bl-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Géométrie
          </div>
        </Link>
        <Link href="/primaire/niveaux/niveau5">
          <div className="rounded-tl-full rounded-bl-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Exposants
          </div>
        </Link>
        <Link href="/primaire/niveaux/niveau6">
          <div className="rounded-tl-full rounded-bl-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Priorité d&#39;opération
          </div>
        </Link>
      </div>
    </div>
  );
}
