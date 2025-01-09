"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      {/* Bouton de retour en haut à droite */}
      <Link
        href="/primaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-4xl font-bold mb-12">Choisissez une opération</h1>
      <div className="grid grid-cols-2 gap-8">
        {/* Boutons en deux rangées de deux */}
        <a
          href="/primaire/niveaux/niveau1/addition"
          className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Addition
        </a>
        <a
          href="/primaire/niveaux/niveau1/soustraction"
          className="bg-green-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Soustraction
        </a>
        {/* Dernière ligne avec 1 bouton centré */}
        <div className="flex justify-center">
          <a
            href="/primaire/niveaux/niveau2/revision"
            className="bg-yellow-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
            >
            Révision
          </a>
        </div>
      </div>
    </div>
  );
}
