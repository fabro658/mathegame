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
            className="w-80 sm:w-96 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 font-semibold"
            >
            Exposant
          </Link>
          <Link
            href="/niveaux/niveau3/racine"
            className="w-80 sm:w-96 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 font-semibold"
            >
            Racine
          </Link>
        </div>
        
        <Link
          href="/niveaux/niveau3/expression_equivalente"
          className="w-80 sm:w-96 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 font-semibold"
        >
          Expression équivalente 
        </Link>
        
        <Link
          href="/niveaux/niveau3/priooperation"
          className="w-80 sm:w-96 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 font-semibold"
        >
          Priorité d&apos;opération
        </Link>
        
        <Link
          href="/niveaux/niveau3/approx"
          className="w-80 sm:w-96 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 font-semibold"
        >
          Approximation
        </Link>
      </div>
    </div>
  );
}
