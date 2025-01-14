import Link from 'next/link'; 

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-12">Niveau 4 - Choisissez une opération</h1>
      <div className="grid grid-cols-2 gap-8">
      <Link
        href="/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>
      <Link
          href="/niveaux/niveau4/exposant"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
          >
          Exposant
          </Link>
          <Link
          href="/niveaux/niveau4/priooperation"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
        >
          Priorité d&#39;opération
          </Link>
        </div>
      </div>
    );
  }