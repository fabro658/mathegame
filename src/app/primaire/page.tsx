import Link from "next/link";

export default function Primaire() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black relative">
      {/* Demi-cercles bleus clairs collés à gauche */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between items-center z-0">
        {Array.from({ length: 5 }).map((_, index) => (
          <svg
            key={index}
            className="w-24 h-48 transform rotate-90"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 100"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Demi-cercle décoratif"
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
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="text-black text-4xl md:text-6xl lg:text-7xl font-bold mb-4">Primaire</h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-black mb-4"></div>
        <h2 className="text-black text-2xl md:text-4xl lg:text-5xl font-semibold">Choisi un sujet!</h2>
      </div>

      {/* Liens vers les niveaux */}
      <div className="flex flex-col gap-4 absolute right-8 top-1/2 transform -translate-y-1/2 z-10">
        {[
          { href: "/primaire/niveaux/niveau1", text: "Opérations arithmétiques" },
          { href: "/primaire/niveaux/niveau2", text: "Comparaisons" },
          { href: "/primaire/niveaux/niveau3", text: "Fraction" },
          { href: "/primaire/niveaux/niveau4", text: "Géométrie" },
          { href: "/primaire/niveaux/niveau5", text: "Exposants" },
          { href: "/primaire/niveaux/niveau6", text: "Priorité d'opération" },
        ].map(({ href, text }) => (
          <Link href={href} key={href}>
            <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              {text}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
