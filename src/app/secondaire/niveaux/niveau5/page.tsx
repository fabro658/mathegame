import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-12">Géométrie</h1>
      <div className="grid grid-cols-2 gap-8">
      <Link
        href="/secondaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>
      <Link
          href="/secondaire/niveaux/niveau5/perimetre"
          className="bg-red-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
          >
          Périmètre
          </Link>
      <Link
          href="/secondaire/niveaux/niveau5/aire"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
          >
          Aire
          </Link>
          <Link
          href="/secondaire/niveaux/niveau5/volume"
          className="bg-pruple-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
          >
          Volume
          </Link>
          <Link
          href="/secondaire/niveaux/niveau5/geometrie"
          className="bg-blue-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
        >
          Géométrie
          </Link>
        </div>
      </div>
    );
  }