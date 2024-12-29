import Link from 'next/link'; // Si vous utilisez Next.js

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-12">Niveau 2 - Choisissez une opération</h1>
      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-8">
          <Link
            href="/niveaux/niveau2/multiplication"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
          >
            Multiplication
          </Link>
          <Link
            href="/niveaux/niveau2/division"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
          >
            Division
          </Link>
        </div>
        <Link
          href="/niveaux/niveau2/fraction"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Fraction
        </Link>
      </div>
    </div>
  );
}
