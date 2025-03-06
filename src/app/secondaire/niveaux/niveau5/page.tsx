import Link from "next/link";

export default function Niveau1() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black-900 relative">
      {/* Bouton Retour */}
      <Link
        href="/secondaire/nviveaux/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Section Titre */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          Niveau 5
        </h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-black mb-4"></div>
        <h2 className="text-black text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">
          Choisi un sujet!
        </h2>
      </div>

      {/* Grille des boutons */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl px-4 sm:px-8">
        {/* Bouton Fonction */}
        <Link href="/secondaire/niveaux/niveau5/fonction" className="w-full">
          <div className="w-full rounded-lg bg-white text-black hover:bg-gray-200 text-xl font-semibold py-4 px-6 text-center shadow-md">
            Fonction
          </div>
        </Link>

        {/* Bouton Isoler une variable */}
        <Link href="/secondaire/niveaux/niveau5/isolervariable" className="w-full">
          <div className="w-full rounded-lg bg-white text-black hover:bg-gray-200 text-xl font-semibold py-4 px-6 text-center shadow-md">
            Isoler une variable
          </div>
        </Link>
      </div>
    </div>
  );
}
