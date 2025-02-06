import Link from 'next/link';

export default function Niveau3() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-12">Niveau 3 - Choisissez une opération</h1>
      
      <Link
        href="/secondaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>
      
      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-8">
          <Link
            href="/niveaux/niveau3/expo"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
          >
            Exposant
          </Link>
          <Link
            href="/niveaux/niveau3/racine"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
          >
            Racine
          </Link>
        </div>
        
        <Link
          href="/niveaux/niveau3/expression_equivalente"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Expression équivalente 
        </Link>
        
        <Link
          href="/niveaux/niveau3/priooperation"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Priorité d&apos;opération
        </Link>
        
        <Link
          href="/niveaux/niveau3/approx"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Approximation
        </Link>
      </div>
    </div>
  );
}
