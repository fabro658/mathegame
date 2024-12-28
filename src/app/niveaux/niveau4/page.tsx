import Link from 'next/link'; // Si vous utilisez Next.js

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-12">Niveau 4 - Choisissez une opération</h1>
      <div className="grid grid-cols-2 gap-8">
        <Link
          href="/niveaux/niveaue/algebre"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
          >
          Algèbre
          </Link>
          <Link
          href="/niveaux/niveau3/priooperation"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
        >
          Priorité d&#39;opération
          </Link>
        </div>
      </div>
    );
  }