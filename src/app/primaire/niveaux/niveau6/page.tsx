import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      <h1 className="text-4xl font-bold mb-12">Priorité d&#39;opération</h1>
      <Link
        href="/primaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>
      <div className="flex items-center justify-center w-full">
        <Link
          href="/primaire/niveaux/niveau6/priooperation"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center"
        >
          Priorité d&#39;opération
        </Link>
      </div>
    </div>
  );
}
