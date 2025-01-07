import Link from 'next/link'; // Si vous utilisez Next.js

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-12">Niveau 3  - Les fractions</h1>
      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-8">
        <Link
        href="/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link><Link
            href="/niveaux/niveau3/additionfraction"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
          >
            Addition de de fraction
          </Link>
          <Link
            href="/niveaux/niveau3/soustractionfraction"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
          >
            Soustraction de fraction
          </Link>
        </div>
        {/* Deuxième ligne avec 2 boutons */}
        <div className="flex justify-center gap-8">
          <Link
            href="/niveaux/niveau2/multiplicationfraction"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
            aria-label="Page de multiplication de fraction"
          >
            Multiplication de fraction
          </Link>
          <Link
            href="/niveaux/niveau2/divisionfraction"
            className="bg-green-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
            aria-label="Page de division de fraction"
          >
            Division de fraction
          </Link>
        </div>
        <Link
          href="/niveaux/niveau3/comparer_fraction"
          className="bg-yellow-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
          >
          Comparaison de fraction
        </Link>
      </div>
    </div>
  );
}