"use client";

import Link from "next/link";

export default function Niveau4() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black relative overflow-hidden font-fredoka">
      
      {/* Bouton Retour */}
      <Link
        href="/primaire/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Titre */}
      <div className="flex flex-col items-center text-center mb-12 z-10">
        <h1 className="text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-2">
          Mission Géométrie
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700 font-medium">
          Choisis ta mission mathématique !
        </p>
      </div>

      {/* Grille des missions */}
      <div className="grid grid-cols-2 gap-8 z-10 max-w-4xl">
        <a
          href="/primaire/niveaux/niveau4/perimetre2"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-6 px-12 rounded-2xl text-3xl shadow-lg text-center flex items-center justify-center min-w-[280px] transition transform hover:scale-105"
        >
          Périmètre
        </a>
        <a
          href="/primaire/niveaux/niveau4/geometrie"
          className="bg-red-400 hover:bg-red-500 text-white font-bold py-6 px-12 rounded-2xl text-3xl shadow-lg text-center flex items-center justify-center min-w-[280px] transition transform hover:scale-105"
        >
          Géométrie
        </a>
        <a
          href="/primaire/niveaux/niveau4/aire"
          className="col-span-2 justify-self-center bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-12 rounded-2xl text-3xl shadow-lg text-center flex items-center justify-center min-w-[280px] transition transform hover:scale-105"
        >
          Aire
        </a>
      </div>
      {/* Décor : cheminée + neige */}
        <div className="chimney">
          <div className="chimney-top">
            <div className="snow-cap"></div>
          </div>
          <div className="chimney-base">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i}></div>
            ))}
          </div>
        </div>
    </div>
  );
}
