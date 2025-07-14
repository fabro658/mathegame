import Link from "next/link";

export default function Secondaire_mobile() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black-900 relative">
      {/* Bouton Retour */}
      <Link
        href="/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Section Titre */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">Secondaire</h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-black mb-4"></div>
        <h2 className="text-black text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">Choisi un sujet!</h2>
      </div>

      {/* Liens vers les niveaux */}
      <div className="flex flex-col gap-4 w-full px-4 sm:items-center sm:gap-4 sm:w-full sm:text-center sm:mt-8 md:absolute md:right-8 md:top-1/2 md:transform md:-translate-y-1/2 md:flex-col md:items-start md:w-auto z-0">
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-yellow-500 text-white gap-2 hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Arithmétique
          </div>
        </Link>
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau2_mobile">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-orange-500 text-white gap-2 hover:bg-green-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Fraction
          </div>
        </Link>
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau3_mobile">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-red-500 text-white gap-2 hover:bg-red-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Algèbre
          </div>
        </Link>
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau4_mobile">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-blue-800 text-white gap-2 hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
          Géométrie
          </div>
        </Link>
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau5_mobile">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-blue-500 text-white gap-2 hover:bg-green-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Algèbre
          </div>
        </Link>
        </div>
      </div>
  );
}
