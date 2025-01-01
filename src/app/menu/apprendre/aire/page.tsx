"use client";

import { useState } from "react";
import Link from "next/link";

// Définir le type pour la forme géométrique
interface Shape {
  name: string;
  description: string;
  formula: string;
  example: string;
}

export default function AireLearning() {
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);

  const shapes: Shape[] = [
    {
      name: "Carré",
      description: "L&apos;aire d&apos;un carré est calculée en multipliant la longueur de son côté par elle-même.",
      formula: "Aire = côté × côté",
      example: "Si le côté mesure 5 cm, l&apos;aire est : 5 × 5 = 25 cm²",
    },
    {
      name: "Rectangle",
      description: "L&apos;aire d&apos;un rectangle est calculée en multipliant sa longueur par sa largeur.",
      formula: "Aire = longueur × largeur",
      example: "Si la longueur est 6 cm et la largeur est 4 cm, l&apos;aire est : 6 × 4 = 24 cm²",
    },
    {
      name: "Triangle",
      description: "L&apos;aire d&apos;un triangle est calculée en utilisant la base et la hauteur.",
      formula: "Aire = (base × hauteur) ÷ 2",
      example: "Si la base mesure 8 cm et la hauteur est 5 cm, l&apos;aire est : (8 × 5) ÷ 2 = 20 cm²",
    },
    {
      name: "Trapèze",
      description: "L&apos;aire d&apos;un trapèze est calculée en faisant la moyenne des longueurs des deux bases et en multipliant par la hauteur.",
      formula: "Aire = ((base1 + base2) × hauteur) ÷ 2",
      example: "Si la base1 est 6 cm, la base2 est 10 cm, et la hauteur est 4 cm, l&apos;aire est : ((6 + 10) × 4) ÷ 2 = 32 cm²",
    },
    {
      name: "Cercle",
      description: "L&apos;aire d&apos;un cercle est calculée en utilisant le rayon.",
      formula: "Aire = π × rayon²",
      example: "Si le rayon est 7 cm, l&apos;aire est : 3.14 × 7² = 153.86 cm²",
    }
  ];

  const handleSelectShape = (shape: Shape): void => {
    setSelectedShape(shape);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link
        href="/menu/apprendre"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/niveaux/niveau2"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-3xl font-bold mb-6">Apprendre à calculer l&apos;aire des formes géométriques</h1>
      
      <div className="flex flex-col gap-6">
        <p className="text-lg mb-6">Sélectionne une forme pour apprendre comment calculer son aire :</p>
        {shapes.map((shape, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
            onClick={() => handleSelectShape(shape)}
          >
            {shape.name}
          </button>
        ))}
      </div>

      {selectedShape && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg w-80">
          <h2 className="text-2xl font-bold mb-4">{selectedShape.name}</h2>
          <p className="text-md mb-4">{selectedShape.description}</p>
          <p className="text-lg font-bold mb-2">Formule :</p>
          <p className="text-lg mb-4">{selectedShape.formula}</p>
          <p className="text-lg font-bold mb-2">Exemple :</p>
          <p className="text-lg">{selectedShape.example}</p>
        </div>
      )}
    </div>
  );
}
