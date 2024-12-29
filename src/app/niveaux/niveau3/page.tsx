import Link from 'next/link'; // Si vous utilisez Next.js

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-12">Niveau 3 - Choisissez une opération</h1>
      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-8">
          <Link
            href="/niveaux/niveau3/perimetre"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
          >
            Périmètre
          </Link>
          <Link
            href="/niveaux/niveau3/aire"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
          >
            Aire
          </Link>
        </div>
        <Link
          href="/niveaux/niveau3/Géometrie"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
        >
          Géométrie
        </Link>
      </div>
    </div>
  );
}
