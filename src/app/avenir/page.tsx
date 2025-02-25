"use client";

 import Link from "next/link";
import "../globals.css"; 
import React from "react";

export default function Primaire() {
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

      {/* Fleurs */}
      <div className="background">
        <div className="canvas-container">
          <canvas id="fieldCanvas" style={{ width: '100%', height: '100%' }}> </canvas>
        </div>
      </div>
    </div>
  );
}