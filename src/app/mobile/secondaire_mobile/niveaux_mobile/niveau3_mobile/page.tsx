import Link from "next/link";

export default function Niveau3() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black-900 relative">
      {/* Bouton Retour */}
      <Link
        href="/mobile/secondaire_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-4 px-10 rounded font-bold text-lg sm:text-xl z-10"
      >
        Retour
      </Link>

      {/* Section Titre */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">Arithmétique</h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-black mb-4"></div>
        <h2 className="text-black text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">Choisi un sujet!</h2>
      </div>
      
      {/* Liens vers les niveaux */}
      <div className="flex flex-col gap-4 items-center w-full max-w-md">
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau3_mobile/expo_mobile">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 w-full font-semibold">
            Exposant
          </div>
        </Link>
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau3_mobile/racine_mobile">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 w-full font-semibold">
            Racine
          </div>
        </Link>
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau3_mobile/expression_equivalente_mobile">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 w-full font-semibold">
            Expression équivalente
          </div>
        </Link>
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau3_mobile/priooperation_mobile">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 w-full font-semibold">
            Priorité d&apos;opération
          </div>
        </Link>
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau3_mobile/comparaison_mobile">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 w-full font-semibold">
            Comparer
          </div>
        </Link>
      </div>
    </div>
  );
}
