import Link from "next/link";

export default function Niveau1() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black-900 relative">
      {/* Bouton Retour */}
      <Link
        href="/secondaire/"
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
      
      {/* Grille des boutons */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl px-4 sm:px-8">
        <Link href="/secondaire/niveaux/niveau1/sommes">
        <div className="w-80 sm:w-96 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 font-semibold">
            Sommes
          </div>
        </Link>
        <Link href="/secondaire/niveaux/niveau1/difference">
        <div className="w-80 sm:w-96 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 font-semibold">
            Différence
          </div>
        </Link>
        <Link href="/secondaire/niveaux/niveau1/produit">
        <div className="w-80 sm:w-96 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 font-semibold">
            Produit
          </div>
        </Link>
        <Link href="/secondaire/niveaux/niveau1/quotient">
        <div className="w-80 sm:w-96 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 font-semibold">
            Quotient
          </div>
        </Link>
        <Link href="/secondaire/niveaux/niveau1/comparaison">
        <div className="w-80 sm:w-96 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-lg sm:text-xl h-14 sm:h-16 px-8 sm:px-10 font-semibold">
            Comparer
          </div>
        </Link>
      </div>
      {/* Vague arrondie en bas */}
      <div
        className="absolute bottom-0 w-screen h-[100px] bg-yellow-500 z-0"
        style={{
          clipPath: "path('M0,50 C300,150 600,-50 900,50 C1200,150 1500,-50 1800,50 L1800,100 L0,100 Z')",
        }}
      >
      </div>
    </div>
  );
}
