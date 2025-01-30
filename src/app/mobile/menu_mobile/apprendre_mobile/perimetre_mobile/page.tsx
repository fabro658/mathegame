"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Importation du composant Image de Next.js

interface Shape {
  name: string;
  description: string;
  formula: string;
  example: string;
  imageUrl: string; // URL de l'image pour chaque forme
}

export default function PerimetreLearning() {
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);

  const shapes: Shape[] = [
    {
      name: "Carré",
      description: "Le périmètre d'un carré est calculé en multipliant la longueur de son côté par 4.",
      formula: "Périmètre = 4 × côté",
      example: "Si le côté mesure 5 cm, le périmètre est : 4 × 5 = 20 cm",
      imageUrl: "/images/carre.png", // Image du carré
    },
    {
      name: "Rectangle",
      description:
        "Le périmètre d'un rectangle est calculé en ajoutant la longueur et la largeur, puis en multipliant par 2.",
      formula: "Périmètre = 2 × (longueur + largeur)",
      example: "Si la longueur est 6 cm et la largeur est 4 cm, le périmètre est : 2 × (6 + 4) = 20 cm",
      imageUrl: "/images/rectangle.png", // Image du rectangle
    },
    {
      name: "Triangle",
      description: "Le périmètre d'un triangle est calculé en additionnant les longueurs de ses trois côtés.",
      formula: "Périmètre = côté1 + côté2 + côté3",
      example: "Si les côtés mesurent 5 cm, 6 cm et 7 cm, le périmètre est : 5 + 6 + 7 = 18 cm",
      imageUrl: "/images/triangle.png", // Image du triangle
    },
    {
      name: "Cercle",
      description: "Le périmètre (ou circonférence) d'un cercle est calculé en multipliant le rayon par 2π.",
      formula: "Périmètre = 2 × π × rayon",
      example: "Si le rayon est 7 cm, le périmètre est : 2 × 3.14 × 7 = 43.96 cm",
      imageUrl: "/images/cercle.png", // Image du cercle
    },
    {
      name: "Trapeze",
      description: "Le périmètre (ou circonférence) d'un cercle est calculé en multipliant le rayon par 2π.",
      formula: "Périmètre = 2 × π × rayon",
      example: "Si le rayon est 7 cm, le périmètre est : 2 × 3.14 × 7 = 43.96 cm",
      imageUrl: "/images/trapeze.png", // Image du trapeze
    },
    {
      name: "Polygone",
      description: "Le périmètre (ou circonférence) d'un cercle est calculé en multipliant le rayon par 2π.",
      formula: "Périmètre = 2 × π × rayon",
      example: "Si le rayon est 7 cm, le périmètre est : 2 × 3.14 × 7 = 43.96 cm",
      imageUrl: "/images/polygone.png", // Image du polygone
    },
  ];

  const handleSelectShape = (shape: Shape): void => {
    setSelectedShape(shape);
  };
  return (
    <div className="min-h-screen bg-gray-100 text-black p-4">
      {/* Bouton Retour */}
      <Link
        href="/mobile/menu_mobile/apprendre_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded font-bold hover:bg-orange-700"
      >
        Retour
      </Link>

      {/* Titre et sous-titre */}
      <div className="text-center mb-8 mt-16">
        <h1 className="text-3xl font-bold text-center mt-8 mb-4">Calculer le périmètre</h1>
        <p className="text-lg text-center mb-6">Sélectionne une forme pour apprendre a calculer le périmetre</p>
      </div>

       {/* Boutons des opérations en 2 colonnes de 2 lignes */}
       <div className="grid grid-cols-2 gap-4 mb-8">
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

      {/* Section des détails */}
      {selectedShape && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">{selectedShape.name}</h2>
          <p className="text-md mb-4">{selectedShape.description}</p>

          <div>
            <p className="text-lg font-bold mb-2">Formule :</p>
            <p className="text-lg mb-4">{selectedShape.formula}</p>
            <p className="text-lg font-bold mb-2">Exemple :</p>
            <p className="text-lg">{selectedShape.example}</p>
          </div>

          {/* Image de la forme */}
          <div className="mt-6 flex justify-center">
            <Image
              src={selectedShape.imageUrl}
              alt={selectedShape.name}
              width={192}
              height={192}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
