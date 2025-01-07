import Link from 'next/link'; // Si vous utilisez Next.js

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-12">Niveau 3 - Choisissez une opération</h1>
      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-8 mb-8"> {/* Espacement entre les liens */}
          <Link
            href="/primaire"
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded font-bold transition duration-300 ease-in-out"
          >
            Retour
          </Link>
        </div>

        <div className="flex flex-col gap-8"> {/* Regroupement des boutons sous forme de colonne */}
          <Link
            href="/niveaux/niveau3/perimetre"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px] transition duration-300 ease-in-out"
          >
            Périmètre
          </Link>

          <Link
            href="/niveaux/niveau3/aire"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px] transition duration-300 ease-in-out"
          >
            Aire
          </Link>

          <Link
            href="/niveaux/niveau3/geometrie"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px] transition duration-300 ease-in-out"
          >
            Géométrie
          </Link>

          <Link
            href="/niveaux/niveau3/volume"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px] transition duration-300 ease-in-out"
          >
            Volume
          </Link>
        </div>
      </div>
    </div>
  );
}
