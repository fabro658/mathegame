import Link from "next/link";

export default function Niveau1() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-black relative overflow-hidden bg-[#71c6f7] font-fredoka">
      {/* Décor ciel */}
      <div className="absolute inset-0 z-0">
        {/* Nuages CSS décoratifs */}
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
          {/* Nuage en haut à gauche */}
          <div className="cloud absolute top-[30px] left-[40px] scale-[0.5]" />
          
          {/* Nuage en haut-centre-droit */}
          <div className="cloud absolute top-[50px] left-[50%] -translate-x-1/2 scale-[0.8]" />
          
          {/* Nuage centré en hauteur à droite */}
          <div className="cloud absolute top-1/2 right-[30px] -translate-y-1/2 scale-[0.6]" />
        </div>

        {/* Mer et sable */}
        <div className="beach-scene" />
        <div className="wave-border" />
      </div>

      {/* Bouton retour */}
      <Link
        href="/primaire/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-20"
      >
        Retour
      </Link>

      {/* Titre principal */}
      <div className="flex flex-col items-center text-center mb-12 z-10 mt-12">
        <h1 className="text-6xl md:text-7xl font-extrabold text-[#2d1e1e]">Arithmétique</h1>
        <p className="text-2xl mt-2 font-semibold text-[#2d1e1e]">
          Choisis ta mission mathématique !
        </p>
      </div>

      {/* Boutons missions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 z-10 mt-4 px-4">
        <a
          href="/primaire/niveaux/niveau1/addition"
          className="bg-purple-600 text-white font-bold font-fredoka text-3xl px-12 py-6 rounded-full text-center transition transform hover:scale-105"
        >
          Addition
        </a>
        <a
          href="/primaire/niveaux/niveau1/soustraction"
          className="bg-green-600 text-white font-bold font-fredoka text-3xl px-12 py-6 rounded-full text-center transition transform hover:scale-105"
        >
          Soustraction
        </a>
        <a
          href="/primaire/niveaux/niveau1/multiplication"
          className="bg-yellow-400 text-white font-bold font-fredoka text-3xl px-12 py-6 rounded-full text-center transition transform hover:scale-105"
        >
          Multiplication
        </a>
        <a
          href="/primaire/niveaux/niveau1/division"
          className="bg-red-500 text-white font-bold font-fredoka text-3xl px-12 py-6 rounded-full text-center transition transform hover:scale-105"
        >
          Division
        </a>
      </div>
    </div>
  );
}
