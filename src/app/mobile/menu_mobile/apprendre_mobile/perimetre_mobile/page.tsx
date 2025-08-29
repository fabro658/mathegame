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

export default function PerimetreLearning() {
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);

  const shapes: Shape[] = [
    {
      name: "Carré",
      description: "Le périmètre d'un carré est calculé en multipliant la longueur de son côté par 4.",
      formula: "Périmètre = 4 × côté",
      example: "Si le côté mesure 5 cm, le périmètre est : 4 × 5 = 20 cm",
      imageUrl: "/images/carre.png",
    },
    {
      name: "Rectangle",
      description:
        "Le périmètre d'un rectangle est calculé en ajoutant la longueur et la largeur, puis en multipliant par 2.",
      formula: "Périmètre = 2 × (longueur + largeur)",
      example: "Si la longueur est 6 cm et la largeur est 4 cm, le périmètre est : 2 × (6 + 4) = 20 cm",
      imageUrl: "/images/rectangle.png",
    },
    {
      name: "Triangle",
      description: "Le périmètre d'un triangle est calculé en additionnant les longueurs de ses trois côtés.",
      formula: "Périmètre = côté1 + côté2 + côté3",
      example: "Si les côtés mesurent 5 cm, 6 cm et 7 cm, le périmètre est : 5 + 6 + 7 = 18 cm",
      imageUrl: "/images/triangle.png",
    },
    {
      name: "Cercle",
      description: "Le périmètre (circonférence) d'un cercle est 2π fois le rayon.",
      formula: "Périmètre = 2 × π × rayon",
      example: "Si le rayon est 7 cm, le périmètre est : 2 × 3.14 × 7 = 43.96 cm",
      imageUrl: "/images/cercle.png",
    },
    {
      name: "Trapeze",
      description: "L'aire d'un trapèze est calculée en faisant la moyenne des bases multipliée par la hauteur.",
      formula: "Aire = ((base1 + base2) × hauteur) ÷ 2",
      example: "Si base1 = 6, base2 = 10 et h = 4, alors Aire = ((6+10)×4)÷2 = 32 cm²",
      imageUrl: "/images/trapeze.png",
    },
    {
      name: "Polygone",
      description: "Le périmètre d'un polygone régulier = nombre de côtés × longueur d'un côté.",
      formula: "Périmètre = n × c",
      example: "Si un polygone a 6 côtés de 4 cm, périmètre = 6 × 4 = 24 cm",
      imageUrl: "/images/polygone.png",
    },
  ];

  const handleSelectShape = (shape: Shape): void => setSelectedShape(shape);

  return (
    // Page avec scroll isolé
    <div className="fixed inset-0 overflow-y-auto bg-gray-100 text-black">
      {/* Contenu principal */}
      <main className="min-h-screen flex flex-col items-center p-4 pt-24 pb-28 relative">
        {/* Bouton Retour (fixe) */}
        <Link
          href="/mobile/menu_mobile/apprendre_mobile"
          className="fixed top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded font-bold hover:bg-orange-700 z-50"
        >
          Retour
        </Link>

        {/* Titre */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Calculer le périmètre</h1>
          <p className="text-lg">Sélectionne une forme pour apprendre à calculer le périmètre</p>
        </div>

        {/* Boutons des formes */}
        <div className="grid grid-cols-2 gap-4 mb-6 w-full max-w-md">
          {shapes.map((shape, index) => (
            <button
              key={index}
              className="bg-blue-500 text-white py-2 px-6 rounded font-bold shadow-lg hover:bg-blue-700 transition-all duration-300"
              onClick={() => handleSelectShape(shape)}
            >
              {shape.name}
            </button>
          ))}
        </div>

        {/* Bloc de détails avec scroll interne si contenu long */}
        {selectedShape && (
          <div className="w-full max-w-4xl">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-h-[68vh] overflow-y-auto">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
                {selectedShape.name}
              </h2>

              <p className="text-md sm:text-lg mb-4">{selectedShape.description}</p>

              <div>
                <p className="text-lg font-bold mb-2">Formule :</p>
                <p className="text-lg mb-4">{selectedShape.formula}</p>
                <p className="text-lg font-bold mb-2">Exemple :</p>
                <p className="text-lg">{selectedShape.example}</p>
              </div>

              <div className="mt-6 flex justify-center">
                <Image
                  src={selectedShape.imageUrl}
                  alt={selectedShape.name}
                  width={192}
                  height={192}
                  className="object-contain max-h-64 w-auto h-auto"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
