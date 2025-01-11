import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-12">Les exposants</h1>

      {/* Conteneur des boutons avec flexibilité sur mobile et écran large */}
      <div className="flex flex-col sm:flex-row sm:space-x-8 gap-4 sm:w-full sm:justify-center items-center">
        <Link
          href="/primaire/niveaux/niveau5/exposant/n1"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center w-[320px] h-[120px]"
        >
          Premier niveau
        </Link>
        <Link
          href="/primaire/niveaux/niveau5/exposant/n2"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center w-[320px] h-[120px]"
        >
          Deuxième niveau
        </Link>
        <Link
          href="/primaire/niveaux/niveau5/exposant/n3"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center w-[320px] h-[120px]"
        >
          Troisième niveau
        </Link>
      </div>

      {/* Bouton retour dans le coin supérieur droit */}
      <Link
        href="/primaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>
    </div>
  );
}
