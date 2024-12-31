"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      {/* Bouton de retour en haut à droite */}
      <Link
        href="/"
        className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
      >
        Retour
      </Link>

      <h1 className="text-4xl font-bold mb-12">Niveau 1 - Choisissez une opération</h1>
      <div className="flex flex-col items-center gap-8">
        {/* Conteneur pour les deux premiers boutons */}
        <div className="flex flex-wrap justify-center gap-8">
          <a
            href="/niveaux/niveau1/addition"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
          >
            Addition
          </a>
          <a
            href="/niveaux/niveau1/soustraction"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
          >
            Soustraction
          </a>
        </div>
        {/* Conteneur pour les deux autres boutons */}
        <div className="flex flex-wrap justify-center gap-8">
          <a
            href="/niveaux/niveau1/soustractionfraction"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
          >
            Soustraction de fraction
          </a>
          <a
            href="/niveaux/niveau1/additionfraction"
            className="bg-green-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
          >
            Addition de fraction
          </a>
        </div>
        {/* Bouton centré en dessous */}
        <a
          href="/niveaux/niveau1/revision"
          className="bg-yellow-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Révision
        </a>
      </div>
    </div>
  );
}
