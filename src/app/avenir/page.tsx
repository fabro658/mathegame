"use client";

import Link from "next/link";
import "../globals.css";
import React, { useMemo } from "react";

// Génère un tableau d'arbres avec des positions aléatoires
const generateTrees = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 90}vw`, // Position horizontale aléatoire
    bottom: `${Math.random() * 50 + 10}px`, // Hauteur aléatoire (distance du bas)
  }));
};

export default function Primaire() {
  // Générer les arbres une seule fois avec useMemo pour éviter la régénération
  const trees = useMemo(() => generateTrees(10), []); // Modifier ici pour générer 10 arbres

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
          À Venir
        </h1>
      </div>

      {/* Arbres */}
      {trees.map((tree) => (
        <div
          key={tree.id}
          className="tree"
          style={{
            left: tree.left,
            bottom: `0px`, // Positionner tous les arbres au bas de l'écran
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
