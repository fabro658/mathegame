import Link from "next/link";

export default function Niveau2() {
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
        <h1 className="text-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">Fraction</h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-black mb-4"></div>
        <h2 className="text-black text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">Choisi un sujet!</h2>
      </div>
      
      {/* Boutons centrés */}
      <div className="flex flex-col gap-6 items-center w-full max-w-md">
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau2_mobile/additionfraction_mobile">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 w-full font-semibold">
            Addition de fraction
          </div>
        </Link>
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau2_mobile/soustractionfraction_mobile">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 w-full font-semibold">
            Soustraction de fraction
          </div>
        </Link>
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau2_mobile/multiplicationfraction_mobile">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 w-full font-semibold">
            Multiplication de fraction
          </div>
        </Link>
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau2_mobile/divisionfraction_mobile">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 w-full font-semibold">
            Division de fraction
          </div>
        </Link>
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau2_mobile/trans_pourcent_mobile">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 w-full font-semibold">
            Transformation
          </div>
        </Link>
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau2_mobile/approx_mobile">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 w-full font-semibold">
            Approximation
          </div>
        </Link>
      </div>
    </div>
  );
}
