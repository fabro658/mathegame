"use client";

import Link from "next/link";

export default function Niveau4() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0b0c2a] text-white relative overflow-hidden font-fredoka">

      {/* Planète et astronaute */}
      <div className="container">
        <div className="planet">
          <div className="yeuxG"></div>
          <div className="yeuxD"></div>
          <div className="bouche"></div>
        </div>

        <div className="astronaut">
          <div className="tank center"></div>
          <div className="suit center"></div>
          <div className="helmet center"></div>

          {/* Boutons */}
          <div className="buttons center">
            <div className="btn btn-red"></div>
            <div className="btn btn-blue"></div>
            <div className="btn btn-yellow"></div>
          </div>

          {/* Mains et jambes */}
          <div className="hand-l"></div>
          <div className="hand-r"></div>
          <div className="hand2-l"></div>
          <div className="hand2-r"></div>
          <div className="leg-l"></div>
          <div className="leg-r"></div>
        </div>
      </div>

      {/* Bouton Retour */}
      <Link
        href="/primaire/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Titre */}
      <div className="flex flex-col items-center text-center mb-12 z-10">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-2">
          Mission Géométrie
        </h1>
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
    </div>
  );
}
