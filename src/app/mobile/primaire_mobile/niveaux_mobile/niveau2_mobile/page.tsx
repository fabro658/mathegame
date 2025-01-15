"use client";

import Link from "next/link";

// Page principale
export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative overflow-hidden">

      {/* Bouton de retour */}
      <Link
        href="/mobile/primiare_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded font-bold shadow"
      >
        Retour
      </Link>

      {/* Titre */}
      <h1 className="text-3xl font-bold mb-8 text-center mt-16 sm:mt-12">
        Choisissez une opération
      </h1>

      {/* Boutons de niveau en colonne */}
      <div className="flex flex-col gap-4 w-full max-w-md px-4">
        <Link
          href="/mobile/primaire_mobile/niveaux_mobile/niveau3_mobile/additionfraction_mobile"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg text-lg shadow-md text-center"
        >
          Addition de fraction
        </Link>
        <Link
          href="/mobile/primaire_mobile/niveaux_mobile/niveau3_mobile/soustractionfraction_mobile"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg text-lg shadow-md text-center"
        >
          Soustraction de fraction
        </Link>
        <Link
          href="/mobile/primaire_mobile/niveaux_mobile/niveau3_mobile/multiplicationfraction_mobile"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg text-lg shadow-md text-center"
        >
          Multiplication de fraction
        </Link>
        <Link
          href="/mobile/primaire_mobile/niveaux_mobile/niveau3_mobile/divisionfraction_mobile"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-4 px-6 rounded-lg text-lg shadow-md text-center"
        >
          Division de fraction
        </Link>
      </div>
    </div>
  );
}