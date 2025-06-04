import Link from "next/link";

export default function Niveau3() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-black relative overflow-hidden font-fredoka bg-gradient-to-b from-[#f8e9b8] to-[#eddca3]">

      {/* Nuages (à styliser avec CSS si nécessaire) */}
      <div className="clouds"></div>

      {/* Bande de sable */}
      <div className="sable"></div>

      {/* Plantes sur la bande de sable */}
      <div className="plants">
        <div className="plant">
          <div className="leaves plant-1"></div>
        </div>
        <div className="plant">
          <div className="leaves plant-2"></div>
        </div>
        <div className="plant">
          <div className="leaves plant-3"></div>
        </div>
        <div className="plant">
          <div className="leaves plant-1"></div>
        </div>
      </div>

      {/* Bouton Retour */}
      <Link
        href="/primaire/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-30"
      >
        Retour
      </Link>

      {/* Titre thématique */}
      <div className="flex flex-col items-center text-center mb-12 z-10">
        <h1 className="text-[#2e1c0c] text-5xl sm:text-6xl md:text-7xl font-extrabold mb-3 drop-shadow">
          Explore le déserts des Fractions
        </h1>
      </div>

      {/* Boutons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 z-10 max-w-4xl mb-6">
        <a
          href="/primaire/niveaux/niveau3/additionfraction"
          className="bg-[#f4d58d] text-black font-bold text-3xl px-12 py-6 rounded-full text-center transition transform hover:scale-105 shadow-md"
        >
          Addition de fractions
        </a>
        <a
          href="/primaire/niveaux/niveau3/soustractionfraction"
          className="bg-[#4caf50] text-white font-bold text-3xl px-12 py-6 rounded-full text-center transition transform hover:scale-105 shadow-md"
        >
          Soustraction de fractions
        </a>
      </div>

      {/* Deuxième ligne avec bouton centré */}
      <div className="z-10 mb-10">
        <a
          href="/primaire/niveaux/niveau3/trouvefraction"
          className="bg-[#d86f45] text-white font-bold text-3xl px-12 py-6 rounded-full text-center transition transform hover:scale-105 block mx-auto shadow-md"
        >
          Trouver la fraction
        </a>
      </div>
    </div>
  );
}
