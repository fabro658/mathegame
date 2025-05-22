import Link from "next/link";

export default function Niveau1() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-black relative overflow-hidden bg-[#71c6f7] font-fredoka">
      {/* Décor ciel */}
      <div className="absolute inset-0 z-0">
        {/* Visage nuageux */}
        <div className="absolute top-10 left-10 z-10">
          <svg width="80" height="80" viewBox="0 0 100 100">
            <rect x="10" y="10" width="10" height="80" fill="#4b5563" />
            <path d="M20,10 Q40,30 20,50 Q40,70 20,90" fill="#111827" />
            <circle cx="30" cy="35" r="4" fill="white" />
            <circle cx="40" cy="35" r="4" fill="white" />
            <path d="M30,45 Q35,50 40,45" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Sol jaune et vague */}
        <div className="absolute bottom-0 left-0 w-full h-40">
          <svg width="100%" height="100%" preserveAspectRatio="none">
            <rect width="100%" height="100%" fill="#fcd34d" />
            <path d="M0,30 Q100,60 200,30 T400,30 T600,30 T800,30 T1000,30" fill="#38bdf8" />
          </svg>
        </div>

        {/* Arbre tropical */}
        <div className="absolute bottom-20 left-6 z-10">
          <svg width="100" height="120" viewBox="0 0 100 120">
            <rect x="45" y="40" width="10" height="70" fill="#8b5e3c" />
            <path d="M50,40 Q30,10 10,20 Q30,30 50,40" fill="#34d399" />
            <path d="M50,40 Q70,10 90,20 Q70,30 50,40" fill="#34d399" />
            <path d="M50,40 Q20,30 20,50 Q40,50 50,40" fill="#34d399" />
            <path d="M50,40 Q80,30 80,50 Q60,50 50,40" fill="#34d399" />
          </svg>
        </div>
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

      {/* Boutons 2x2 capsules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 z-10 mt-4">
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
