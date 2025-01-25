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
  ];

  const handleSelectShape = (shape: Shape): void => {
    setSelectedShape(shape);
  };

  return (
    <main className="min-h-screen bg-gray-100 text-black p-6">
      {/* Bouton retour */}
      <Link
        href="/mobile/menu_mobile/apprendre_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded font-bold shadow-md hover:bg-orange-700"
      >
        Retour
      </Link>

      {/* Titre et sous-titre */}
      <div className="text-center mt-16">
        <h1 className="text-4xl font-bold mb-4">Calculer l&apos;aire</h1>
        <p className="text-lg text-gray-700">
          Sélectionne une opération pour apprendre à calculer l&apos;aire
        </p>
      </div>

      {/* Boutons horizontaux */}
      <div className="flex justify-center gap-4 mt-8">
        {shapes.map((shape, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white py-3 px-6 rounded font-bold hover:bg-blue-700"
            onClick={() => handleSelectShape(shape)}
          >
            {shape.name}
          </button>
        ))}
      </div>

      {/* Section des détails de la forme sélectionnée */}
      <div className="mt-12 flex justify-center">
        {selectedShape && (
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
            <h2 className="text-3xl font-bold mb-6 text-center">{selectedShape.name}</h2>
            <p className="text-lg mb-4">{selectedShape.description}</p>
            <p className="text-xl font-semibold mb-2">Formule :</p>
            <p className="text-lg mb-4">{selectedShape.formula}</p>
            <p className="text-xl font-semibold mb-2">Exemple :</p>
            <p className="text-lg mb-6">{selectedShape.example}</p>
            <div className="flex justify-center mt-6">
              <Image
                src={selectedShape.imageUrl}
                alt={selectedShape.name}
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
