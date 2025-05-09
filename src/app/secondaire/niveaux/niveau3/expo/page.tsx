import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-12">Les exposants et les racines</h1>
      {/* Première rangée - Exposants */}
      <div className="flex space-x-8 mb-12">
        <Link
          href="/secondaire/niveaux/niveau3/expo/n1"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
        >
          Premier niveau
        </Link>
        <Link
          href="/secondaire/niveaux/niveau3/expo/n2"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
        >
          Deuxième niveau
        </Link>
        <Link
          href="/secondaire/niveaux/niveau3/expo/n3"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
        >
          Troisième niveau
        </Link>
      </div>
      {/* Bouton de retour */}
      <Link
        href="/secondaire/niveaux/niveau3"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>
    </div>
  );
}
