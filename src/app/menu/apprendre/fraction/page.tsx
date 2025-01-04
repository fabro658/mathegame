"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Importation du composant Image de Next.js

// Définir le type pour l'opération sur les fractions
interface FractionOperation {
  name: string;
  description: string;
  formula: string;
  example: string;
  imageUrl?: string; // URL optionnelle pour l'image
}

export default function FractionOperationsLearning() {
  const [selectedOperation, setSelectedOperation] = useState<FractionOperation | null>(null);

  const operations: FractionOperation[] = [
    {
      name: "Addition de fractions",
      description: "L'addition de fractions nécessite des dénominateurs identiques. Si les dénominateurs sont différents, il faut d'abord les rendre égaux.",
      formula: "A/B + C/B = (A + C)/B",
      example: "Si A/B = 1/4 et C/B = 2/4, on a : 1/4 + 2/4 = (1 + 2)/4 = 3/4",
      imageUrl: "/images/addition.png", // Exemple d'image
    },
    {
      name: "Soustraction de fractions",
      description: "La soustraction de fractions suit la même règle que l'addition. On doit rendre les dénominateurs égaux si nécessaire.",
      formula: "A/B - C/B = (A - C)/B",
      example: "Si A/B = 3/5 et C/B = 1/5, on a : 3/5 - 1/5 = (3 - 1)/5 = 2/5",
      imageUrl: "/images/soustraction.png", // Exemple d'image
    },
    {
      name: "Multiplication de fractions",
      description: "Pour multiplier des fractions, on multiplie les numérateurs entre eux et les dénominateurs entre eux.",
      formula: "A/B × C/D = (A×C)/(B×D)",
      example: "Si A/B = 1/2 et C/D = 3/4, on a : 1/2 × 3/4 = (1×3)/(2×4) = 3/8",
      imageUrl: "/images/multiplication.png", // Exemple d'image
    },
    {
      name: "Division de fractions",
      description: "Pour diviser des fractions, on multiplie la première fraction par l'inverse de la deuxième.",
      formula: "A/B ÷ C/D = A/B × D/C",
      example: "Si A/B = 3/4 et C/D = 1/2, on a : 3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 1 2/4 = 1 1/2",
      imageUrl: "/images/division.png", // Exemple d'image
    },
  ];

  const handleSelectOperation = (operation: FractionOperation): void => {
    setSelectedOperation(operation);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      {/* Options des opérations sur les fractions à gauche */}
      <div className="w-full sm:w-1/4 bg-white p-6 shadow-lg">
        <Link
          href="/menu/apprendre"
          className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
        >
          Retour
        </Link>

        <h1 className="text-3xl font-bold mb-6 text-center">Opérations sur les fractions</h1>

        <p className="text-lg mb-6 text-center">Sélectionne une opération pour apprendre à la réaliser :</p>

        <div className="flex flex-col gap-6">
          {operations.map((operation, index) => (
            <button
              key={index}
              className="bg-blue-500 text-white py-2 px-6 rounded font-bold mb-4 transition-all duration-300 hover:bg-blue-700"
              onClick={() => handleSelectOperation(operation)}
            >
              {operation.name}
            </button>
          ))}
        </div>
      </div>

      {/* Formules et explications au centre */}
      <div className="w-full sm:w-3/4 p-8 mt-12"> {/* Ajout de mt-12 pour la marge en haut */}
        {selectedOperation && (
          <div className="bg-white p-6 rounded-lg shadow-lg min-h-[70vh]">
            <h2 className="text-2xl font-bold mb-4">{selectedOperation.name}</h2>
            <p className="text-md mb-4">{selectedOperation.description}</p>
            <p className="text-lg font-bold mb-2">Formule :</p>
            <p className="text-lg mb-4">{selectedOperation.formula}</p>
            <p className="text-lg font-bold mb-2">Exemple :</p>
            <p className="text-lg">{selectedOperation.example}</p>

            {/* Afficher l'image sous l'espace des formules en utilisant <Image /> */}
            {selectedOperation.imageUrl && (
              <div className="mt-6 flex justify-center">
                <Image 
                  src={selectedOperation.imageUrl} 
                  alt={selectedOperation.name} 
                  width={192}  // Largeur de l'image
                  height={192} // Hauteur de l'image
                  className="object-contain"  // Assurez-vous que l'image s'ajuste correctement
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
