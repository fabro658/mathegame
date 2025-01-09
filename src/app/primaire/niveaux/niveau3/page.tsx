import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-12">Les fractions</h1>
      <div className="grid grid-cols-2 gap-8">
        <Link
          href="/primaire"
          className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
        >
          Retour
        </Link>
        <Link
          href="/primaire/niveaux/niveau3/additionfraction"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Addition de fraction
        </Link>
        <Link
          href="/primaire/niveaux/niveau3/soustractionfraction"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Soustraction de fraction
        </Link>
        <Link
          href="/primaire/niveaux/niveau3/multiplicationfraction"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Multiplication de fraction
        </Link>
        <Link
          href="/primaire/niveaux/niveau3/divisionfraction"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Division de fraction
        </Link>
        {/* Dernière ligne avec 1 bouton centré */}
          <div className="flex justify-center">
          <Link
            href="/primaire/niveaux/niveau3/fractionreduite"
            className="bg-yellow-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
            >
            Fraction réudite
          </Link>
        </div>
      </div>
    </div>
  );
}