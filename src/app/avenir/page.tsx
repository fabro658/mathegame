import Link from "next/link";
import "../globals.css"; 
import React from "react";

interface CustomCSSProperties extends React.CSSProperties {
  '--flower-color'?: string;
}

export default function Primaire() {
  const colors = ["#EDC442", "#FF6347", "#8A2BE2", "#3CB371", "#FF69B4", "#1E90FF"];

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
      <div id="container">
        {colors.map((color, index) => (
          <div key={index} className="flower" style={{ '--flower-color': color } as CustomCSSProperties}>
            {[...Array(9)].map((_, petalIndex) => (
              <div key={petalIndex} className="petal">
                <div className="circle"></div>
                <div className="triangle"></div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Conteneur de l'animation */}
      <div className="loader">
        <div className="cir1"></div>
        <div className="cir2"></div>
        <div className="cir3"></div>
        <div className="cir4"></div>
        <div className="cir5"></div>
      </div>
    </div>
  );
}