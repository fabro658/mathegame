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

      <h1 className="text-4xl font-bold mb-12 text-center">Choisissez une opération</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Boutons en une colonne sur mobile, deux colonnes sur écrans plus grands */}
        <a
          href="/primaire/niveaux/niveau5/exposant/n1"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Premier niveau
        </a>
        <a
          href="/primaire/niveaux/niveau5/exposant/n2"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Deuxième niveau
        </a>
        <div className="col-span-1 sm:col-span-2 flex justify-center">
          <a
            href="/primaire/niveaux/niveau5/exposant/n3"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
          >
            Troisième niveau
          </a>
        </div>
      </div>
    </div>
  );
}