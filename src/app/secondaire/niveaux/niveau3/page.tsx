import Link from 'next/link';

export default function Niveau3() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black-900 relative">
      {/* Bouton Retour */}
      <Link
        href="/secondaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Section Titre */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">Niveau 3</h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-black mb-4"></div>
        <h2 className="text-black text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">Choisis un sujet!</h2>
      </div>

      {/* Grille des boutons */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl px-4 sm:px-8">
        <Link
          href="/niveaux/niveau3/expo"
          className="w-80 sm:w-96 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 font-semibold"
          >
          Exposant
        </Link>
        <Link
          href="/secondaire/niveaux/niveau3/racine"
          className="w-80 sm:w-96 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 font-semibold"
        >
          Racine
        </Link>
        <Link
          href="/secondaire/niveaux/niveau3/expression_equivalente"
          className="w-80 sm:w-96 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 font-semibold"
        >
          Expression équivalente
        </Link>
        <Link
          href="/secondaire/niveaux/niveau3/priooperation"
          className="w-80 sm:w-96 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 font-semibold"
        >
          Priorité d&apos;opération
        </Link>
        <Link
          href="/secondaire/niveaux/niveau3/approx"
          className="w-80 sm:w-96 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 font-semibold"
        >
          Approximation
        </Link>
      </div>
    </div>
  );
}
