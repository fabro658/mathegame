import Link from "next/link";

export default function Niveau2() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black-900 relative">
      {/* Bouton Retour */}
      <Link
        href="/secondaire/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>
      
      {/* Titre */}
      <h1 className="text-3xl font-bold mb-12 text-center mt-16 sm:mt-12">
        Choisissez une opération
      </h1>

      {/* Affichage des boutons */}
      <DesktopButtons />
    </div>
  );
}

// Composant pour les boutons
const DesktopButtons = () => (
  <div className="grid grid-cols-2 gap-4 w-full max-w-4xl px-4 sm:px-8">
    <a
      href="/niveaux/niveau2/multiplicationfraction"
      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
    >
      Multiplication de fraction
    </a>
    <a
      href="/niveaux/niveau2/divisionfraction"
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
    >
      Division de fraction
    </a>
    <a
      href="/niveaux/niveau2/additionfraction"
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
    >
      Addition de fraction
    </a>
    <a
      href="/niveaux/niveau2/soustractionfraction"
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
    >
      Soustraction de fraction
    </a>
    <a
      href="/niveaux/niveau2/trans_pourcent"
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
    >
      Transformation de nombres
    </a>
    <a
      href="/niveaux/niveau2/fractionreduite"
      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
    >
      Fraction réduite
    </a>
  </div>
);
