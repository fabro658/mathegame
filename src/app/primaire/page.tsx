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
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-yellow-500 text-white gap-2 hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Opérations arithmétiques
          </div>
        </Link>
        <Link href="/primaire/niveaux/niveau2">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-orange-500 text-white gap-2 hover:bg-green-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Comparaisons
          </div>
        </Link>
        <Link href="/primaire/niveaux/niveau3">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-red-500 text-white gap-2 hover:bg-red-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Fraction
          </div>
        </Link>
        <Link href="/primaire/niveaux/niveau4">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-blue-800 text-white gap-2 hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Géométrie
          </div>
        </Link>
        <Link href="/primaire/niveaux/niveau5">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-blue-500 text-white gap-2 hover:bg-green-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Exposants
          </div>
        </Link>
        <Link href="/primaire/niveaux/niveau6">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-purple-500 text-white gap-2 hover:bg-red-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Priorité d&#39;opération
          </div>
        </Link>
      </div>

      {/* Cercles bleu foncé sur le côté gauche de l'écran */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 space-y-6 pl-4">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="w-16 h-16 bg-blue-800 rounded-full"
            style={{
              marginBottom: index === 5 ? "0" : "1.5rem", // Espacement entre les cercles
            }}
          >
          </div>
        ))}
      </div>
      {/* Vague arrondie en bas */}
      <div
        className="absolute top-0 left-0 w-screen h-[100px] bg-orange-500 z-0"
        style={{
          clipPath: "path('M0,50 C300,150 600,-50 900,50 C1200,150 1500,-50 1800,50 L1800,100 L0,100 Z')",
        }}
      >
      </div>
    </div>
  );
}
