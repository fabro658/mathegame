import Link from "next/link";

export default function Niveau3() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black-900 relative">
      {/* Bouton Retour */}
      <Link
        href="/mobile/secondaire_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
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
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/expo_mobile">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
            Exposant
          </div>
        </Link>
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/racine_mobile">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
            Racine
          </div>
        </Link>
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/expression_equivalente_mobile">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
            Expression équivalente
          </div>
        </Link>
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/priooperation_mobile">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
            Priorité d&apos;opération
          </div>
        </Link>
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile/comparaison_mobile">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
            Comparer
          </div>
        </Link>
      </div>
    </div>
  );
}