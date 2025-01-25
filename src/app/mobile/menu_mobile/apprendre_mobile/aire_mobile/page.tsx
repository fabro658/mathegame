"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Shape {
  name: string;
  description: string;
  formula: string;
  example: string;
  imageUrl: string;
}

export default function AireLearning() {
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);

  const shapes: Shape[] = [
    {
      name: "Carré",
      description:
        "L'aire d'un carré est calculée en multipliant la longueur de son côté par elle-même.",
      formula: "Aire = côté × côté",
      example: "Si le côté mesure 5 cm, l'aire est : 5 × 5 = 25 cm²",
      imageUrl: "/airecarre.jpeg",
    },
    {
      name: "Rectangle",
      description:
        "L'aire d'un rectangle est calculée en multipliant sa longueur par sa largeur.",
      formula: "Aire = base × hauteur",
      example: "Si la longueur est 6 cm et la largeur est 4 cm, l'aire est : 6 × 4 = 24 cm²",
      imageUrl: "/airerectangle.jpeg",
    },
    {
      name: "Triangle",
      description:
        "L'aire d'un triangle est calculée en utilisant la base et la hauteur.",
      formula: "Aire = (base × hauteur) ÷ 2",
      example: "Si la base mesure 8 cm et la hauteur est 5 cm, l'aire est : (8 × 5) ÷ 2 = 20 cm²",
      imageUrl: "/airetriangle.jpeg",
    },
    {
      name: "Trapèze",
      description:
        "L'aire d'un trapèze est calculée en faisant la moyenne des longueurs des deux bases et en multipliant par la hauteur.",
      formula: "Aire = ((base1 + base2) × hauteur) ÷ 2",
      example:
        "Si la base1 est 6 cm, la base2 est 10 cm, et la hauteur est 4 cm, l'aire est : ((6 + 10) × 4) ÷ 2 = 32 cm²",
      imageUrl: "/airetrapeze.jpeg",
    },
    {
      name: "Cercle",
      description: "L'aire d'un cercle est calculée en utilisant le rayon.",
      formula: "Aire = π × rayon²",
      example: "Si le rayon est 7 cm, l'aire est : 3.14 × 7² = 153.86 cm²",
      imageUrl: "/airecercle.jpeg",
    },
  ];

  const handleSelectShape = (shape: Shape): void => {
    setSelectedShape(shape);
  };

  return (
    <main className="flex min-h-screen bg-gray-100 text-black">
      {/* Barre latérale */}
      <div className="w-1/4 bg-white p-6 shadow-lg">
        <Link
          href="/mobile/menu_mobile/apprendre_mobile"
          className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
        >
          Retour
        </Link>

        <h1 className="text-3xl font-bold mb-6">Calculer l&apos;aire</h1>

        <p className="text-lg mb-6">
          Sélectionne une forme pour apprendre comment calculer son aire :
        </p>

        <div className="flex flex-col gap-4">
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
      </div>

      {/* Section centrale agrandie */}
      <div className="w-3/4 p-10 flex flex-col items-center">
        {selectedShape && (
          <div className="bg-white p-8 rounded-lg shadow-lg mt-10 w-full max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">{selectedShape.name}</h2>
            <p className="text-lg mb-6">{selectedShape.description}</p>
            <p className="text-2xl font-bold mb-4">Formule :</p>
            <p className="text-lg mb-6">{selectedShape.formula}</p>
            <p className="text-2xl font-bold mb-4">Exemple :</p>
            <p className="text-lg mb-6">{selectedShape.example}</p>

            {/* Image beaucoup plus grande */}
            <div className="mt-8 flex justify-center">
              <Image
                src={selectedShape.imageUrl}
                alt={selectedShape.name}
                width={500} // Taille encore augmentée
                height={500}
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
