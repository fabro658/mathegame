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
        <h1 className="text-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">Niveau 3</h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-black mb-4"></div>
        <h2 className="text-black text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">Choisi un sujet!</h2>
      </div>

      {/* Grille des boutons */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl px-4 sm:px-8">
        <Link href="/niveaux/niveau3/expo">
          <div className="w-full rounded-lg bg-white text-black hover:bg-gray-200 text-xl font-semibold py-4 px-6 text-center shadow-md">
            Exposant
          </div>
        </Link>
        <Link href="/secondaire/niveaux/niveau3/racine">
          <div className="w-full rounded-lg bg-white text-black hover:bg-gray-200 text-xl font-semibold py-4 px-6 text-center shadow-md">
            Racine
          </div>
        </Link>
        <Link href="/secondaire/niveaux/niveau3/expression_equivalente">
          <div className="w-full rounded-lg bg-white text-black hover:bg-gray-200 text-xl font-semibold py-4 px-6 text-center shadow-md">
            Expression équivalente
          </div>
        </Link>
        <Link href="/secondaire/niveaux/niveau3/priooperation">
          <div className="w-full rounded-lg bg-white text-black hover:bg-gray-200 text-xl font-semibold py-4 px-6 text-center shadow-md">
            Priorité d&apos;opération
          </div>
        </Link>
        <Link href="/secondaire/niveaux/niveau3/approx">
          <div className="w-full rounded-lg bg-white text-black hover:bg-gray-200 text-xl font-semibold py-4 px-6 text-center shadow-md">
            Approximation
          </div>
        </Link>
      </div>

      {/* Vague arrondie en bas */}
      <div
        className="absolute bottom-0 w-screen h-[100px] bg-yellow-500 z-0"
        style={{
          clipPath: "path('M0,50 C300,150 600,-50 900,50 C1200,150 1500,-50 1800,50 L1800,100 L0,100 Z')",
        }}
      ></div>
    </div>
  );
}
