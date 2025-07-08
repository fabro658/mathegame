import Link from "next/link";

export default function Niveau2() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black-900 relative">
      {/* Bouton Retour */}
      <Link
        href="/mobile/secondaire_mobile/niveau3_mobile/expo_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-4 px-10 rounded font-bold text-lg sm:text-xl z-10"
      >
        Retour
      </Link>
  
      {/* Section Titre */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">Exposants</h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-black mb-4"></div>
        <h2 className="text-black text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">Choisi un niveau!</h2>
      </div>
      
      {/* Boutons centrés */}
      <div className="flex flex-col gap-8 items-center w-full max-w-md">
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau3_mobile/expo_mobile/n1_mobile">
          <div className="rounded-full transition-colors flex items-center justify-center bg-purple-500 text-white gap-2 hover:bg-red-600 text-lg sm:text-xl h-16 w-full sm:w-72 px-6 sm:px-8 md:w-96">
            Niveau 1
          </div>
        </Link>
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau3_mobile/expo_mobile/n2_mobile">
          <div className="rounded-full transition-colors flex items-center justify-center bg-purple-500 text-white gap-2 hover:bg-red-600 text-lg sm:text-xl h-16 w-full sm:w-72 px-6 sm:px-8 md:w-96">
            Niveau 2
          </div>
        </Link>
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau3_mobile/expo_mobile/n3_mobile">
          <div className="rounded-full transition-colors flex items-center justify-center bg-purple-500 text-white gap-2 hover:bg-red-600 text-lg sm:text-xl h-16 w-full sm:w-72 px-6 sm:px-8 md:w-96">
            Niveau 3
          </div>
        </Link>
      </div>
    </div>
  );
}
