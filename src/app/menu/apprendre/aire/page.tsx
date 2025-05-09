"use client";

import { useState } from "react";
import Link from "next/link";

// Illustrations SVG pour chaque forme
const CarreIllustration = () => (
  <div className="flex flex-col items-center mt-6">
    <svg width="200" height="200">
      <rect x="40" y="40" width="120" height="120" stroke="black" fill="none" strokeWidth="2" />
      <text x="100" y="30" textAnchor="middle" fontSize="14">4 cm</text>
      <text x="175" y="110" textAnchor="middle" fontSize="14" transform="rotate(90 175,110)">4 cm</text>
    </svg>
    <p className="mt-4 font-bold text-center">L&rsquo;aire du carré est le produit de sa base et de sa hauteur :<br />4 × 4 = 16cm²</p>
  </div>
);

const RectangleIllustration = () => (
  <div className="flex flex-col items-center mt-6">
    <svg width="250" height="150">
      <rect x="50" y="30" width="150" height="80" stroke="black" fill="none" strokeWidth="2" />
      <text x="125" y="20" textAnchor="middle" fontSize="14">15 cm</text>
      <text x="35" y="70" textAnchor="middle" fontSize="14" transform="rotate(-90 35,70)">8 cm</text>
    </svg>
    <p className="mt-4 font-bold text-center">L&rsquo;aire du rectangle est le produit de sa base et de sa hauteur :<br />15 × 8 = 120 cm²</p>
  </div>
);

const TriangleIllustration = () => (
  <div className="flex flex-col items-center mt-6">
    <svg width="200" height="150">
      {/* Triangle */}
      <polygon points="50,120 150,120 100,30" stroke="black" fill="none" strokeWidth="2" />
      
      {/* Ligne de hauteur */}
      <line x1="100" y1="30" x2="100" y2="120" stroke="red" strokeWidth="2" strokeDasharray="4" />
      
      {/* Mesures */}
      <text x="100" y="135" textAnchor="middle" fontSize="14">10 cm</text>
      <text x="90" y="75" textAnchor="end" fontSize="14" fill="red">8 cm</text>
    </svg>

    <div className="mt-4 text-center font-bold text-lg">
      Aire = 
      <div style={{ display: 'inline-block', lineHeight: 1.4, marginLeft: 8 }}>
        <div style={{ borderBottom: '2px solid black' }}>base × hauteur</div>
        <div>2</div>
      </div>
      <p className="mt-4 font-bold text-center">L&rsquo;aire du triangle est : <br />
      (10 × 8) / 2 = 40 cm²</p>
    </div>
  </div>
);
const TrapezeIllustration = () => (
  <div className="flex flex-col items-center mt-6">
    <svg width="300" height="200">
      {/* Trapèze */}
      <polygon points="80,50 220,50 180,150 120,150" stroke="black" fill="none" strokeWidth="2" />

      {/* Hauteur */}
      <line x1="100" y1="50" x2="100" y2="150" stroke="red" strokeWidth="2" strokeDasharray="4" />

      {/* Mesures */}
      <text x="150" y="40" textAnchor="middle" fontSize="14">base1 = 140 cm</text>
      <text x="150" y="170" textAnchor="middle" fontSize="14">base2 = 60 cm</text>
      <text x="90" y="100" textAnchor="end" fontSize="14" fill="red">hauteur = 100 cm</text>
    </svg>
    <p className="mt-4 font-bold text-center">
      L&rsquo;aire du trapèze est :<br />
      ((140 + 60) × 100) / 2 = 10 000 cm²
    </p>
  </div>
);
const CercleIllustration = () => (
  <div className="flex flex-col items-center mt-6">
    <svg width="300" height="300">
      <circle cx="150" cy="150" r="100" stroke="black" fill="none" strokeWidth="2" />
      <line x1="150" y1="150" x2="250" y2="150" stroke="red" strokeWidth="2" />
      <text x="200" y="140" textAnchor="middle" fontSize="14" fill="red">rayon = 10 cm</text>
    </svg>
    <p className="mt-4 font-bold text-center">L&rsquo;aire du cercle est ::<br /> π × 10² = 314.16 cm</p>
  </div>
);

// Type des formes
interface Shape {
  name: string;
  description: string;
  formula: string;
  example: string;
  imageComponent?: React.ReactNode;
}

export default function AireLearning() {
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);

  const shapes: Shape[] = [
    {
      name: "Carré",
      description: "L'aire d'un carré est calculé en multipliant la longueur de son côté par 4.",
      formula: "Aire = base × hauteur",
      example: "Si le côté mesure 4 cm, l'aire est : 4 × 4 = 16 cm²",
      imageComponent: <CarreIllustration />
    },
    {
      name: "Rectangle",
      description: "L'aire d'un rectangle est la somme de sa longueur et de sa largeur.",
      formula: "Aire = base × hauteur",
      example: "Si la base est 15 cm et la hauteur est 8 cm, l'aire est : 15 × 8 = 120 cm²",
      imageComponent: <RectangleIllustration />
    },
    {
      name: "Triangle",
      description: "L'aire d'un triangle est la somme de ses trois côtés.",
      formula: "Aire = (base × hauteur)/2",
      example: "Si la base mesure 10 cm et la hauteur 8 cm, l'aire est : (10× 8)/2 = 40 cm²",
      imageComponent: <TriangleIllustration />
    },
    {
      name: "Cercle",
      description: "L'aire (ou circonférence) d'un cercle est 2 fois pi multiplié par le rayon.",
      formula: "Aire = π × rayon²",
      example: "Si le rayon est 10 cm, l'aire est : π × 10² = 314,16 cm²",
      imageComponent: <CercleIllustration />
    },
    {
      name: "Trapèze",
      description: "L'aire d'un trapèze est égale à la moyenne des deux bases multipliée par la hauteur.",
      formula: "Aire = ((base1 + base2) × hauteur) / 2",
      example: "Si base1 = 140 cm, base2 = 60 cm, et hauteur = 100 cm, alors l'aire est : ((140 + 60) × 100) / 2 = 10 000 cm²",
      imageComponent: <TrapezeIllustration />
    }    
  ];

  return (
    <main className="flex min-h-screen bg-gray-100 text-black">
      <div className="w-1/4 bg-white p-6 shadow-lg">
        <Link href="/menu/apprendre" className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold">Retour</Link>
        <h1 className="text-3xl font-bold mb-6 text-center">Formes géométriques</h1>
        <p className="text-lg mb-6">Sélectionne une forme pour apprendre comment calculer son périmètre :</p>
        <div className="flex flex-col gap-4">
          {shapes.map((shape, index) => (
            <button
              key={index}
              className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
              onClick={() => setSelectedShape(shape)}
            >
              {shape.name}
            </button>
          ))}
        </div>
      </div>

      <div className="w-3/4 p-10 flex flex-col items-center">
        {selectedShape && (
          <div className="bg-white p-8 rounded-lg shadow-lg mt-10 w-full max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">{selectedShape.name}</h2>
            <p className="text-lg mb-6">{selectedShape.description}</p>
            <p className="text-2xl font-bold mb-4">Formule :</p>
            <p className="text-lg mb-6">{selectedShape.formula}</p>
            <p className="text-2xl font-bold mb-4">Exemple :</p>
            <p className="text-lg mb-6">{selectedShape.example}</p>
            <div className="mt-8 flex justify-center">
              {selectedShape.imageComponent}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
