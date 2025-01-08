import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      {/* Bouton retour dans le coin supérieur droit */}
      <Link
        href="/primaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold shadow-lg"
      >
        Retour
      </Link>

      {/* Titre principal */}
      <h1 className="text-4xl font-bold mb-12">Niveau 4 - Pratiquer la géométrie</h1>

      {/* Conteneur des boutons */}
      <div className="grid grid-cols-2 gap-8 mt-12 w-full max-w-5xl">
        <Link
          href="/primaire/niveaux/niveau4/perimetre"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center transition duration-300 ease-in-out"
        >
          Périmètre
        </Link>

        <Link
          href="/primaire/niveaux/niveau4/aire"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center transition duration-300 ease-in-out"
        >
          Aire
        </Link>

        <Link
          href="/primaire/niveaux/niveau4/geometrie"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center transition duration-300 ease-in-out"
        >
          Géométrie
        </Link>

        <Link
          href="/primaire/niveaux/niveau4/volume"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center transition duration-300 ease-in-out"
        >
          Volume
        </Link>
      </div>
    </div>
  );
}
