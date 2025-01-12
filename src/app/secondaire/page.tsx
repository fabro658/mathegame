import Link from "next/link";

export default function Secondaire() {
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
        <Link href="/secondaire/niveaux/niveau1">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-yellow-500 text-white gap-2 hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Arithmétique
          </div>
        </Link>
        <Link href="/secondaire/niveaux/niveau2">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-orange-500 text-white gap-2 hover:bg-green-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Algèbre
          </div>
        </Link>
        <Link href="/secondaire/niveaux/niveau3">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-red-500 text-white gap-2 hover:bg-red-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Probabilités
          </div>
        </Link>
        <Link href="/secondaire/niveaux/niveau4">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-blue-800 text-white gap-2 hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Statistique
          </div>
        </Link>
        <Link href="/secondaire/niveaux/niveau5">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-blue-500 text-white gap-2 hover:bg-green-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Géométrie
          </div>
        </Link>
        <Link href="/secondaire/niveaux/niveau6">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-purple-500 text-white gap-2 hover:bg-red-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Géométrie analytique
          </div>
        </Link>
        <Link href="/secondaire/niveaux/niveau7">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-yellow-500 text-white gap-2 hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72 md:mr-[-36px]">
            Mathématiques discrètes
          </div>
        </Link>
      </div>

      {/* Colonnes de cubes sur le côté gauche */}
      <div className="absolute left-4 bottom-8 flex space-x-8">
        {/* Première colonne (3 cubes) */}
        <div className="flex flex-col space-y-8">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-12 h-12 bg-blue-800"
              style={{
                height: `${10 + 3 * index}vh`, // Ajuste la hauteur pour les cubes de la colonne 1
              }}
            ></div>
          ))}
        </div>

        {/* Deuxième colonne (2 cubes) */}
        <div className="flex flex-col space-y-8">
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="w-12 h-12 bg-blue-800"
              style={{
                height: `${10 + 3 * index}vh`, // Ajuste la hauteur pour les cubes de la colonne 2
              }}
            ></div>
          ))}
        </div>

        {/* Troisième colonne (1 cube) */}
        <div className="flex flex-col space-y-8">
          <div className="w-12 h-12 bg-blue-800" style={{ height: `16vh` }}></div>
        </div>
      </div>
    </div>
  );
}
