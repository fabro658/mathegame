"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Primaire() {
  useEffect(() => {
    const snowContainer = document.querySelector(".snowfall");
    console.log("Snow container:", snowContainer);

    if (snowContainer) {
      for (let i = 0; i < 100; i++) {
        const snowflake = document.createElement("li");
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.top = `-10px`; // Start above the viewport
        const size = Math.random() * 10 + 5;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.animationDuration = `${Math.random() * 10 + 5}s`;
        snowflake.style.animationDelay = `${Math.random() * 20}s`; // Increased delay range for more progressive start
        snowContainer.appendChild(snowflake);
        console.log("Snowflake added:", snowflake);
      }
    }
  }, []);
    return (
      <div
        className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #142852, #0e022e)",
        }}
      >

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
          Primaire
        </h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-white mb-4"></div>
        <h2 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">
          Choisis un sujet!
        </h2>
      </div>

      {/* Liens vers les niveaux */}
      <div className="flex flex-col gap-4 w-full px-4 sm:items-center sm:gap-4 sm:w-full sm:text-center sm:mt-8 md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 md:flex-col md:items-end md:w-auto z-0">
        <Link href="/primaire/niveaux/niveau1">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-yellow-500 text-white gap-2 hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72">
            Opérations arithmétiques
          </div>
        </Link>
        <Link href="/primaire/niveaux/niveau2">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-orange-500 text-white gap-2 hover:bg-green-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72">
            Comparaisons
          </div>
        </Link>
        <Link href="/primaire/niveaux/niveau3">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-red-500 text-white gap-2 hover:bg-red-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72">
            Fraction
          </div>
        </Link>
        <Link href="/primaire/niveaux/niveau4">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-blue-800 text-white gap-2 hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72">
            Géométrie
          </div>
        </Link>
        <Link href="/primaire/niveaux/niveau5">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-blue-500 text-white gap-2 hover:bg-green-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72">
            Exposants
          </div>
        </Link>
        <Link href="/primaire/niveaux/niveau6">
          <div className="rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center bg-purple-500 text-white gap-2 hover:bg-red-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72">
            Priorité d&#39;opération
          </div>
        </Link> 
      </div>
            {/* Animation de neige */}
            <ul className="snowfall absolute inset-0 pointer-events-none"></ul>
    </div>
  );
}



