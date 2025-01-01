"use client";

import { useState } from "react";
import Link from "next/link";

// Définir le type pour la forme géométrique
interface Shape {
  name: string;
  description: string;
  formula: string;
  example: string;
  imageUrl: string;  // URL de l'image pour chaque forme
}

export default function AireLearning() {
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);

  const shapes: Shape[] = [
    {
      name: "Carré",
      description: "L&apos;aire d&apos;un carré est calculée en multipliant la longueur de son côté par elle-même.",
      formula: "Aire = côté × côté",
      example: "Si le côté mesure 5 cm, l&apos;aire est : 5 × 5 = 25 cm²",
      imageUrl: "/images/carre.png",  // Image du carré
    },
    {
      name: "Rectangle",
      description: "L&apos;aire d&apos;un rectangle est calculée en multipliant sa longueur par sa largeur.",
      formula: "Aire = longueur × largeur",
      example: "Si la longueur est 6 cm et la largeur est 4 cm, l&apos;aire est : 6 × 4 = 24 cm²",
      imageUrl: "/images/rectangle.png",  // Image du rectangle
    },
    {
      name: "Triangle",
      description: "L&apos;aire d&apos;un triangle est calculée en utilisant la base et la hauteur.",
      formula: "Aire = (base × hauteur) ÷ 2",
      example: "Si la base mesure 8 cm et la hauteur est 5 cm, l&apos;aire est : (8 × 5) ÷ 2 = 20 cm²",
      imageUrl: "/images/triangle.png",  // Image du triangle
    },
    {
      name: "Trapèze",
      description: "L&apos;aire d&apos;un trapèze est calculée en faisant la moyenne des longueurs des deux bases et en multipliant par la hauteur.",
      formula: "Aire = ((base1 + base2) × hauteur) ÷ 2",
      example: "Si la base1 est 6 cm, la base2 est 10 cm, et la hauteur est 4 cm, l&apos;aire est : ((6 + 10) × 4) ÷ 2 = 32 cm²",
      imageUrl: "/images/trapeze.png",  // Image du trapèze
    },
    {
      name: "Cercle",
      description: "L&apos;aire d&apos;un cercle est calculée en utilisant le rayon.",
      formula: "Aire = π × rayon²",
      example: "Si le rayon est 7 cm, l&apos;aire est : 3.14 × 7² = 153.86 cm²",
      imageUrl: "/images/cercle.png",  // Image du cercle
    }
  ];

  const handleSelectShape = (shape: Shape): void => {
    setSelectedShape(shape);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      {/* Options des formes à gauche */}
      <div className="w-1/4 bg-white p-6 shadow-lg">
        <Link
          href="/niveaux/niveau2"
          className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
        >
          Retour
        </Link>

        <h1 className="text-3xl font-bold mb-6">Formes géométriques</h1>
        
        <div className="flex flex-col gap-6">
          <p className="text-lg mb-6">Sélectionne une forme pour apprendre comment calculer son aire :</p>
          {shapes.map((shape, index) => (
            <div key={index} className="flex flex-col items-center">
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded font-bold mb-4"
                onClick={() => handleSelectShape(shape)}
              >
                {shape.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Formules et explications au centre */}
      <div className="w-3/4 p-8">
        {selectedShape && (
          <div className="bg-white p-6 rounded-lg shadow-lg min-h-[70vh]">
            <h2 className="text-2xl font-bold mb-4">{selectedShape.name}</h2>
            <p className="text-md mb-4">{selectedShape.description}</p>
            <p className="text-lg font-bold mb-2">Formule :</p>
            <p className="text-lg mb-4">{selectedShape.formula}</p>
            <p className="text-lg font-bold mb-2">Exemple :</p>
            <p className="text-lg">{selectedShape.example}</p>
            
            {/* Afficher l'image sous l'espace des formules */}
            <div className="mt-6 flex justify-center">
              <img 
                src={selectedShape.imageUrl} 
                alt={selectedShape.name} 
                className="w-48 h-48 object-contain"  // Taille de l'image
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
