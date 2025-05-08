"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Importation du composant Image de Next.js

// Définir le type pour la forme géométrique
interface Shape {
  name: string;
  description: string;
  formula: string;
  example: string;
  imageUrl: string;  // URL de l'image pour chaque forme
}

export default function PerimetreLearning() {
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);

  const shapes: Shape[] = [
    {
      name: "Carré",
      description: "Le périmètre d'un carré est calculé en multipliant la longueur de son côté par 4.",
      formula: "Périmètre = 4 × côté",
      example: "Si le côté mesure 5 cm, le périmètre est : 4 + 4 + 4 + 4 = 20 cm",
      imageUrl: "/perimetre_carre.jpeg",  // Image du carré
    },
    {
      name: "Rectangle",
      description: "Le périmètre d'un rectangle est calculé en ajoutant la longueur et la largeur, puis en multipliant par 2.",
      formula: "Périmètre = 2 × (longueur + largeur)",
      example: "Si la longueur est 6 cm et la largeur est 4 cm, le périmètre est : 2 × (6 + 4) = 20 cm",
      imageUrl: "/perimetre_rectangle.jpeg",  // Image du rectangle
    },
    {
      name: "Triangle",
      description: "Le périmètre d'un triangle est calculé en additionnant les longueurs de ses trois côtés.",
      formula: "Périmètre = côté1 + côté2 + côté3",
      example: "Si les côtés mesurent 5 cm, 6 cm et 7 cm, le périmètre est : 5 + 6 + 7 = 18 cm",
      imageUrl: "/perimetre_triangle.jpeg",  // Image du triangle
    },
    {
      name: "Cercle",
      description: "Le périmètre (ou circonférence) d'un cercle est calculé en multipliant le rayon par 2π.",
      formula: "Périmètre = 2 × π × rayon",
      example: "Si le rayon est 7 cm, le périmètre est : 2 × 3.14 × 7 = 43.96 cm",
      imageUrl: "/perimetre_cercle.jpeg",  // Image du cercle
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

        <h1 className="text-3xl font-bold mb-6 text-center">Formes géométriques</h1>
        <p className="text-lg mb-6">
          Sélectionne une forme pour apprendre comment calculer son périmetre :
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