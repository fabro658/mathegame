"use client";

import { useState } from "react";
import Link from "next/link";

// Illustrations SVG pour chaque forme
const CarreIllustration = () => (
  <div className="flex flex-col items-center mt-6">
    <svg width="200" height="200">
      <rect x="40" y="40" width="120" height="120" stroke="black" fill="none" strokeWidth="2" />
      <text x="100" y="30" textAnchor="middle" fontSize="14">4 cm</text>
      <text x="100" y="185" textAnchor="middle" fontSize="14">4 cm</text>
      <text x="25" y="110" textAnchor="middle" fontSize="14" transform="rotate(-90 25,110)">4 cm</text>
      <text x="175" y="110" textAnchor="middle" fontSize="14" transform="rotate(90 175,110)">4 cm</text>
    </svg>
    <p className="mt-4 font-bold text-center">Le périmètre est donc la somme des côtés :<br />4 + 4 + 4 + 4 = 16</p>
  </div>
);

const RectangleIllustration = () => (
  <div className="flex flex-col items-center mt-6">
    <svg width="250" height="150">
      <rect x="50" y="30" width="150" height="80" stroke="black" fill="none" strokeWidth="2" />
      <text x="125" y="20" textAnchor="middle" fontSize="14">15 cm</text>
      <text x="125" y="130" textAnchor="middle" fontSize="14">15 cm</text>
      <text x="35" y="70" textAnchor="middle" fontSize="14" transform="rotate(-90 35,70)">8 cm</text>
      <text x="205" y="70" textAnchor="middle" fontSize="14" transform="rotate(90 205,70)">8 cm</text>
    </svg>
    <p className="mt-4 font-bold text-center">Périmètre = 2 × (15 + 8) = 46 cm</p>
  </div>
);

const TriangleIllustration = () => (
  <div className="flex flex-col items-center mt-6">
    <svg width="200" height="150">
      <polygon points="50,120 150,120 100,30" stroke="black" fill="none" strokeWidth="2" />
      <text x="100" y="135" textAnchor="middle" fontSize="14">10 cm</text>
      <text x="40" y="70" textAnchor="middle" fontSize="14" transform="rotate(-45 40,70)">8 cm</text>
      <text x="160" y="70" textAnchor="middle" fontSize="14" transform="rotate(45 160,70)">9 cm</text>
    </svg>
    <p className="mt-4 font-bold text-center">Périmètre = 10 + 8 + 9 = 27 cm</p>
  </div>
);

const CercleIllustration = () => (
  <div className="flex flex-col items-center mt-6">
    <svg width="300" height="300">
      <circle cx="150" cy="150" r="100" stroke="black" fill="none" strokeWidth="2" />
      <line x1="150" y1="150" x2="250" y2="150" stroke="red" strokeWidth="2" />
      <text x="200" y="140" textAnchor="middle" fontSize="14" fill="red">rayon = 10 cm</text>
    </svg>
    <p className="mt-4 font-bold text-center">Périmètre = 2 × π × 10 = 62.8 cm</p>
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

export default function PerimetreLearning() {
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);

  const shapes: Shape[] = [
    {
      name: "Carré",
      description: "Le périmètre d'un carré est calculé en multipliant la longueur de son côté par 4.",
      formula: "Périmètre = 4 × côté",
      example: "Si le côté mesure 5 cm, le périmètre est : 4 + 4 + 4 + 4 = 20 cm",
      imageComponent: <CarreIllustration />
    },
    {
      name: "Rectangle",
      description: "Le périmètre d'un rectangle est la somme de sa longueur et de sa largeur.",
      formula: "Périmètre = 2 × (longueur + largeur)",
      example: "Si la longueur est 15 cm et la largeur est 8 cm, le périmètre est : 2 × (15 + 8) = 46 cm",
      imageComponent: <RectangleIllustration />
    },
    {
      name: "Triangle",
      description: "Le périmètre d'un triangle est la somme de ses trois côtés.",
      formula: "Périmètre = côté1 + côté2 + côté3",
      example: "Si les côtés mesurent 10 cm, 8 cm et 9 cm, le périmètre est : 10 + 8 + 9 = 27 cm",
      imageComponent: <TriangleIllustration />
    },
    {
      name: "Cercle",
      description: "Le périmètre (ou circonférence) d'un cercle est 2 fois pi multiplié par le rayon.",
      formula: "Périmètre = 2 × π × rayon",
      example: "Si le rayon est 6 cm, le périmètre est : 2 × π × 6 = 37.70 cm",
      imageComponent: <CercleIllustration />
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
