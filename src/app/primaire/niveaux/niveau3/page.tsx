"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      {/* Nuage en haut à gauche */}
      <div className="absolute top-4 left-4 w-40 h-20 bg-gradient-to-b from-white to-gray-300 rounded-full shadow-lg">
        <div className="absolute w-24 h-24 bg-gradient-to-b from-white to-gray-300 rounded-full -top-6 -left-6"></div>
        <div className="absolute w-16 h-16 bg-gradient-to-b from-white to-gray-300 rounded-full -top-4 right-4"></div>
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
      <div className="absolute top-4 left-4">
  {/* Soleil */}
  <div className="relative w-24 h-24 flex justify-center items-center">
    {/* Cercle central */}
    <div className="w-16 h-16 bg-yellow-400 rounded-full shadow-lg"></div>
    
    {/* Rayons */}
    {Array.from({ length: 12 }).map((_, index) => (
      <div
        key={index}
        className="absolute w-4 h-8 bg-yellow-400"
        style={{
          transform: `rotate(${index * 30}deg) translate(30px) rotate(-${index * 30}deg)`,
          clipPath: "polygon(50% 100%, 100% 0%, 0% 0%)", // Triangle avec base plane
        }}
      ></div>
    ))}
  </div>
</div>

    </div>
  );
}
