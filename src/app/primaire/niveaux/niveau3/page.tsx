import Link from "next/link";

export default function Niveau3() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white relative overflow-hidden font-fredoka bg-gradient-to-t from-[#770c75] to-[#090536]">

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
          <div className="leaves plant-4"></div>
        </div>
      </div>

      {/* Bouton Retour */}
      <Link
        href="/primaire/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-30"
      >
        Retour
      </Link>

      {/* Titre magique */}
      <div className="flex flex-col items-center text-center mb-12 z-10">
      <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-extrabold mb-3 drop-shadow">
      Le Grimoire des Fractions
        </h1>
        <p className="text-xl sm:text-2xl text-white font-medium">
          Maîtrise l&rsquo;art des fractions comme un véritable mage mathémagicien&nbsp;!
        </p>
      </div>

      {/* Boutons magiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 z-10 max-w-4xl">
        <a
          href="/primaire/niveaux/niveau3/additionfraction"
          className="bg-purple-600 text-white font-bold text-3xl px-12 py-6 rounded-full text-center transition transform hover:scale-105"
        >
          Addition de fractions
        </a>
        <a
          href="/primaire/niveaux/niveau3/soustractionfraction"
          className="bg-green-600 text-white font-bold text-3xl px-12 py-6 rounded-full text-center transition transform hover:scale-105"
        >
          Soustraction de fractions
        </a>
        <a
          href="/primaire/niveaux/niveau3/multiplicationfraction"
          className="bg-yellow-400 text-white font-bold text-3xl px-12 py-6 rounded-full text-center transition transform hover:scale-105"
        >
          Multiplication de fractions
        </a>
        <a
          href="/primaire/niveaux/niveau3/divisionfraction"
          className="bg-red-500 text-white font-bold text-3xl px-12 py-6 rounded-full text-center transition transform hover:scale-105"
        >
          Division de fractions
        </a>
        <a
          href="/primaire/niveaux/niveau3/trouvefraction"
          className="bg-red-500 text-white font-bold text-3xl px-12 py-6 rounded-full text-center transition transform hover:scale-105"
        >
          Trouver la fraction
        </a>
      </div>
    </div>
  );
}
