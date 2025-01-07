import Link from "next/link";

export default function Primaire() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black-900 relative">
      {/* Bouton Retour */}
      <Link
        href="src/app"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Liens vers les niveaux */}
      <div className="flex flex-col gap-4 absolute right-8 top-1/2 transform -translate-y-1/2 z-0">
        <Link href="/primaire/niveaux/niveau5">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
            exposant
          </div>
        </Link>
        <Link href="/primaire/niveaux/niveau5">
          <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
            priorite operation
          </div>
        </Link>
      </div>
    </div>
  );
}
