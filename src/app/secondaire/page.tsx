"use client";

import Link from "next/link";
import "../globals.css";
import React, { useMemo } from "react";

// Liste de positions fixes pour les arbres
const fixedPositions = [
  { left: "5vw", bottom: "0px", isLarge: false },
  { left: "20vw", bottom: "0px", isLarge: true },
  { left: "35vw", bottom: "0px", isLarge: false },
  { left: "50vw", bottom: "0px", isLarge: true },
  { left: "65vw", bottom: "0px", isLarge: false },
  { left: "80vw", bottom: "0px", isLarge: false },
  { left: "10vw", bottom: "0px", isLarge: true },
  { left: "25vw", bottom: "0px", isLarge: false },
  { left: "40vw", bottom: "0px", isLarge: false },
  { left: "55vw", bottom: "0px", isLarge: true },
];

export default function Primaire() {
  const trees = useMemo(() => fixedPositions, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black relative">
      {/* Bouton Retour */}
      <Link
        href="/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Section Titre */}
      <div className="flex flex-col items-center text-center mb-8 z-10">
        <h1 className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          Secondaire
        </h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-white mb-4"></div>
        <h2 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">
          Choisis un sujet!
        </h2>
      </div>
      {/* Liens vers les niveaux */}
      <div className="flex flex-col gap-4 px-4 sm:items-center sm:gap-4 sm:mt-8 md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 md:flex-col md:items-end z-20">
  <Link href="/secondaire/niveaux/niveau1">
    <div className="w-72 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 text-xl font-semibold py-4 px-6 text-center shadow-lg">
      Arithmétique
    </div>
  </Link>
  <Link href="/secondaire/niveaux/niveau2">
    <div className="w-72 rounded-lg bg-orange-500 text-white hover:bg-orange-600 text-xl font-semibold py-4 px-6 text-center shadow-lg">
      Fractions
    </div>
  </Link>
  <Link href="/secondaire/niveaux/niveau3">
    <div className="w-72 rounded-lg bg-red-500 text-white hover:bg-red-600 text-xl font-semibold py-4 px-6 text-center shadow-lg">
      Probabilités
    </div>
  </Link>
  <Link href="/secondaire/niveaux/niveau4">
    <div className="w-72 rounded-lg bg-blue-700 text-white hover:bg-blue-800 text-xl font-semibold py-4 px-6 text-center shadow-lg">
      Géométrie
    </div>
  </Link>
  <Link href="/secondaire/niveaux/niveau5">
    <div className="w-72 rounded-lg bg-green-600 text-white hover:bg-green-700 text-xl font-semibold py-4 px-6 text-center shadow-lg">
      Algèbre
    </div>
  </Link>
</div>

      {/* Arbres */}
      {trees.map((tree, index) => (
        <div
          key={index}
          className={`tree ${tree.isLarge ? "large-tree" : ""}`}
          style={{
            left: tree.left,
            bottom: tree.bottom,
          }}
        >
          <div className="tree__5"></div>
          <div className="tree__1"></div>
          <div className="tree__2"></div>
          <div className="tree__3"></div>
          <div className="tree__4"></div>
        </div>
      ))}

      {/* Herbe */}
      <div id="grass"></div>
    </div>
  );
}
