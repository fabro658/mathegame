import Link from 'next/link';

export default function Niveau3() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      {/* Bouton Retour */}
      <Link
        href="/secondaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      {/* Titre */}
      <h1 className="text-4xl font-bold mb-12 mt-16 sm:mt-12 text-center">
        Niveau 3 - Choisissez une opération
      </h1>

      {/* Grille des boutons */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl px-4 sm:px-8">
        <Link
          href="/niveaux/niveau3/expo"
          className="bg-white hover:bg-gray-200 text-black font-semibold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
        >
          Exposant
        </Link>
        <Link
          href="/secondaire/niveaux/niveau3/racine"
          className="bg-white hover:bg-gray-200 text-black font-semibold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
        >
          Racine
        </Link>
        <Link
          href="/secondaire/niveaux/niveau3/expression_equivalente"
          className="bg-white hover:bg-gray-200 text-black font-semibold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
        >
          Expression équivalente
        </Link>
        <Link
          href="/secondaire/niveaux/niveau3/priooperation"
          className="bg-white hover:bg-gray-200 text-black font-semibold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
        >
          Priorité d&apos;opération
        </Link>
        <Link
          href="/secondaire/niveaux/niveau3/approx"
          className="bg-white hover:bg-gray-200 text-black font-semibold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center col-span-2"
        >
          Approximation
        </Link>
      </div>
    </div>
  );
}
