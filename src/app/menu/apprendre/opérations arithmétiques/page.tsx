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
      name: "Addition",
      description: "L'addition est une opération mathématique qui consiste à additionner deux nombres.",
      formula: "A + B",
      example: "Si A = 3 et B = 5, l'addition donne : 3 + 5 = 8",
      imageUrl:"/apprendre_addition.jpeg",
    },
    {
      name: "Soustraction",
      description: "La soustraction est une opération mathématique qui consiste à soustraire un nombre d'un autre.",
      formula: "A - B",
      example: "Si A = 8 et B = 5, la soustraction donne : 8 - 5 = 3",
      imageUrl:"/apprendre_addition.jpeg",
    },
    {
      name: "Multiplication",
      description: "La multiplication est une opération mathématique qui consiste à multiplier deux nombres.",
      formula: "A × B",
      example: "Si A = 4 et B = 6, la multiplication donne : 4 × 6 = 24",
      imageUrl:"/apprendre_multiplication.jpeg",
    },
    {
      name: "Division",
      description: "La division est une opération mathématique qui consiste à diviser un nombre par un autre.",
      formula: "A ÷ B",
      example: "Si A = 12 et B = 3, la division donne : 12 ÷ 3 = 4",
      imageUrl: "/apprendre_division.jpeg",
    }
  ];

  const handleSelectShape = (shape: Shape): void => {
    setSelectedShape(shape);
  };

  return (
    <main className="flex min-h-screen bg-gray-100 text-black">
      {/* Barre latérale */}
      <div className="w-1/4 bg-white p-6 shadow-lg">
        <Link
          href="/menu/apprendre"
          className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
        >
          Retour
        </Link>

        <h1 className="text-3xl font-bold mb-6">Opérations arithmétiques</h1>
        <p className="text-lg mb-6">Sélectionne une opération pour apprendre à la réaliser :</p>

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
