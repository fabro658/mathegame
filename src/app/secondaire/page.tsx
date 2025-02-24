import Link from "next/link";

export default function Secondaire() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white relative overflow-hidden">
      {/* Animation de neige */}
      <div className="snowfall"></div>

      {/* Bouton Retour */}
      <Link
        href="/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Section Titre */}
      <div className="flex flex-col items-center text-center mb-8 z-10">
        <h1 className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          Secondaire
        </h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-white mb-4"></div>
        <h2 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">
          Choisis un sujet!
        </h2>
      </div>

      {/* Liens vers les niveaux */}
      <div className="flex flex-col gap-4 w-full px-4 sm:items-center sm:gap-4 sm:w-full sm:text-center sm:mt-8 md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 md:flex-col md:items-end md:w-auto z-10">
        {[
          { href: "/secondaire/niveaux/niveau1", color: "bg-yellow-500", text: "Arithmétique" },
          { href: "/secondaire/niveaux/niveau2", color: "bg-orange-500", text: "Fractions" },
          { href: "/secondaire/niveaux/niveau3", color: "bg-red-500", text: "Probabilités" },
          { href: "/secondaire/niveaux/niveau4", color: "bg-green-800", text: "Géométrie" },
          { href: "/secondaire/niveaux/niveau5", color: "bg-yellow-500", text: "Algèbre" },
        ].map((item, index) => (
          <Link key={index} href={item.href}>
            <div
              className={`${item.color} rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center text-white gap-2 hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72`}
            >
              {item.text}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
