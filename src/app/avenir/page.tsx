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
  // Générer les arbres avec les positions fixes
  const trees = useMemo(() => fixedPositions, []); // Utilisation des positions fixes

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
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-center">
        <h1 className="text-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
        </h1>
      </div>

      {/* Arbres */}
      {trees.map((tree, index) => (
        <div
          key={index}
          className={`tree ${tree.isLarge ? "large-tree" : ""}`} // Appliquer la classe large-tree pour les grands arbres
          style={{
            left: tree.left,
            bottom: tree.bottom, // Positionner tous les arbres au bas de l'écran
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
