import Link from "next/link";
import "../styles/globals.css"; // Import du fichier d'animations

export default function Secondaire() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black relative overflow-hidden">
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
          Secondaire
        </h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-black mb-4"></div>
        <h2 className="text-black text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">
          Choisis un sujet!
        </h2>
      </div>

      {/* Liens vers les niveaux */}
      <div className="flex flex-col gap-4 w-full px-4 sm:items-center md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 z-10">
        {[
          { href: "/secondaire/niveaux/niveau1", color: "bg-yellow-500", label: "Arithmétique" },
          { href: "/secondaire/niveaux/niveau2", color: "bg-orange-500", label: "Fractions" },
          { href: "/secondaire/niveaux/niveau3", color: "bg-red-500", label: "Probabilités" },
          { href: "/secondaire/niveaux/niveau4", color: "bg-blue-800", label: "Géométrie" },
          { href: "/secondaire/niveaux/niveau5", color: "bg-yellow-500", label: "Algèbre" },
        ].map((item, i) => (
          <Link key={i} href={item.href}>
            <div
              className={`${item.color} rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center text-white hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 md:w-72`}
            >
              {item.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Flocons de neige */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i} className="snowflake" />
      ))}
    </div>
  );
}
