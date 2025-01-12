"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative overflow-hidden">
      {/* Bouton de retour en haut à droite */}
      <Link
        href="/primaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      {/* Titre */}
      <h1 className="text-4xl font-bold mb-12 text-center">Choisissez une opération</h1>

      {/* Boutons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 relative z-10">
        <a
          href="/primaire/niveaux/niveau1/addition"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Addition
        </a>
        <a
          href="/primaire/niveaux/niveau1/soustraction"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Soustraction
        </a>
        <a
          href="/primaire/niveaux/niveau1/multiplication"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Multiplication
        </a>
        <a
          href="/primaire/niveaux/niveau1/division"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Division
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
        className="absolute w-4 h-4 bg-yellow-400 transform rotate-[30deg]"
        style={{
          transform: `rotate(${index * 30}deg) translate(40px) rotate(-${index * 30}deg)`,
          clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)", // Triangle
        }}
      ></div>
    ))}
  </div>
</div>
    </div>
  );
}
