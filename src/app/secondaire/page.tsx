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
      <div className="flex flex-col gap-4 w-full px-4 sm:items-center sm:gap-4 sm:w-full sm:text-center sm:mt-8 md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 md:flex-col md:items-end md:w-auto z-20">
        <Link href="/secondaire/niveaux/niveau1">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-yellow-500 text-white gap-2 hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72">
            Arithmétique
          </div>
        </Link>
        <Link href="/secondaire/niveaux/niveau2">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-orange-500 text-white gap-2 hover:bg-green-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72">
            Fractions
          </div>
        </Link>
        <Link href="/secondaire/niveaux/niveau3">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-red-500 text-white gap-2 hover:bg-red-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72">
            Probabilités
          </div>
        </Link>
        <Link href="/secondaire/niveaux/niveau4">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-blue-800 text-white gap-2 hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72">
            Géométrie
          </div>
        </Link>
        <Link href="/secondaire/niveaux/niveau5">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-yellow-500 text-white gap-2 hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72">
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
