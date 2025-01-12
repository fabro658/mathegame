"use client";
import Link from "next/link";

export default function Secondaire() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black-900 relative">
      {/* Bouton Retour */}
      <Link
        href="/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Section Titre */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          Secondaire
        </h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-black mb-4"></div>
        <h2 className="text-black text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">
          Choisi un sujet!
        </h2>
      </div>

      {/* Liens vers les niveaux */}
      <div className="flex flex-col gap-4 w-full px-4 sm:items-center sm:gap-4 sm:w-full sm:text-center sm:mt-8 md:absolute md:right-8 md:top-1/2 md:transform md:-translate-y-1/2 md:flex-col md:items-start md:w-auto z-0">
        {/* Vos liens existants */}
      </div>

      {/* Colonnes de cubes sur le côté gauche */}
      <div className="absolute left-4 bottom-8 flex space-x-8">
        {/* Vos colonnes existantes */}
      </div>

      {/* Forme en escalier */}
      <div className="absolute bottom-0 left-0">
        <div
          className="relative"
          style={{
            width: "150px",
            height: "150px",
            backgroundColor: "#ADD8E6",
            clipPath:
              "polygon(0% 0%, 0% 100%, 33% 100%, 33% 67%, 67% 67%, 67% 33%, 100% 33%, 100% 0%)",
          }}
        ></div>
        <div
          className="absolute top-0 left-0 border-4 border-purple-500 rounded-md"
          style={{
            width: "150px",
            height: "150px",
          }}
        ></div>
      </div>
    </div>
  );
}
