"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 overflow-hidden">
      {/* Demi-cercles oranges en haut à gauche */}
      <div className="absolute top-0 left-0 w-40 h-40">
        {/* Demi-cercle orange clair */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-orange-100 rounded-b-full"></div>
        
        {/* Demi-cercle orange */}
        <div
          className="absolute top-0 left-0 w-full h-1/2 bg-orange-300 rounded-b-full"
          style={{ top: "20px" }}
        ></div>
        
        {/* Demi-cercle orange foncé */}
        <div
          className="absolute top-0 left-0 w-full h-1/2 bg-orange-500 rounded-b-full"
          style={{ top: "40px" }}
        ></div>
        
        {/* Demi-cercle orange très foncé */}
        <div
          className="absolute top-0 left-0 w-full h-1/2 bg-orange-700 rounded-b-full"
          style={{ top: "60px" }}
        ></div>
      </div>

      {/* Bouton de retour */}
      <Link
        href="/primaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded font-bold shadow"
      >
        Retour
      </Link>

      {/* Titre */}
      <h1 className="text-3xl font-bold mb-12 text-center mt-16 sm:mt-12">
        Choisissez une opération
      </h1>

      {/* Boutons */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl px-4 sm:px-8">
        <a
          href="/primaire/niveaux/niveau3/additionfraction"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
        >
          Addition de fraction
        </a>
        <a
          href="/primaire/niveaux/niveau3/soustractionfraction"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
        >
          Soustraction de fraction
        </a>
        <a
          href="/primaire/niveaux/niveau3/multiplicationfraction"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
        >
          Multiplication de fraction
        </a>
        <a
          href="/primaire/niveaux/niveau3/divisionfraction"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
        >
          Division de fraction
        </a>
      </div>
    </div>
  );
}
