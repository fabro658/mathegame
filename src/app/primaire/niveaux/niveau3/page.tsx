import Link from "next/link";
import "./plantes.css"; // Assure-toi d'importer ton fichier CSS externe

export default function Niveau3() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-200 text-black relative overflow-hidden font-[Nunito]">

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
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Titre magique */}
      <div className="flex flex-col items-center text-center mb-12 z-10">
        <h1 className="text-purple-800 text-5xl sm:text-6xl md:text-7xl font-extrabold mb-2 drop-shadow-lg">
          Le Grimoire des Fractions
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700 font-medium max-w-xl">
          Maîtrise l&rsquo;art des fractions comme un véritable mage mathémagicien&nbsp;!
        </p>
      </div>

      {/* Boutons magiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 z-10 max-w-4xl">
        <a
          href="/primaire/niveaux/niveau3/additionfraction"
          className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Addition de fractions
        </a>
        <a
          href="/primaire/niveaux/niveau3/soustractionfraction"
          className="bg-green-600 hover:bg-green-800 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Soustraction de fractions
        </a>
        <a
          href="/primaire/niveaux/niveau3/multiplicationfraction"
          className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Multiplication de fractions
        </a>
        <a
          href="/primaire/niveaux/niveau3/divisionfraction"
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Division de fractions
        </a>
        <a
          href="/primaire/niveaux/niveau3/trouvefraction"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Trouver la fraction
        </a>
      </div>
    </div>
  );
}
