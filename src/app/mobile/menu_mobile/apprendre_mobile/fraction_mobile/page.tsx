"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface FractionOperation {
  name: string;
  description: string;
  formula: string;
  example: string;
  imageUrl?: string;
}

export default function FractionOperationsLearning() {
  const [selectedOperation, setSelectedOperation] = useState<FractionOperation | null>(null);

  const operations: FractionOperation[] = [
    {
      name: "Addition de fractions",
      description: "L'addition de fractions nécessite des dénominateurs identiques. Si les dénominateurs sont différents, il faut d'abord les rendre égaux.",
      formula: "A/B + C/B = (A + C)/B",
      example: "Si A/B = 1/4 et C/B = 2/4, on a : 1/4 + 2/4 = (1 + 2)/4 = 3/4",
      imageUrl: "/images/addition.png",
    },
    {
      name: "Soustraction de fractions",
      description: "La soustraction de fractions suit la même règle que l'addition. On doit rendre les dénominateurs égaux si nécessaire.",
      formula: "A/B - C/B = (A - C)/B",
      example: "Si A/B = 3/5 et C/B = 1/5, on a : 3/5 - 1/5 = (3 - 1)/5 = 2/5",
      imageUrl: "/images/soustraction.png",
    },
    {
      name: "Multiplication de fractions",
      description: "Pour multiplier des fractions, on multiplie les numérateurs entre eux et les dénominateurs entre eux.",
      formula: "A/B × C/D = (A×C)/(B×D)",
      example: "Si A/B = 1/2 et C/D = 3/4, on a : 1/2 × 3/4 = (1×3)/(2×4) = 3/8",
      imageUrl: "/images/multiplication.png",
    },
    {
      name: "Division de fractions",
      description: "Pour diviser des fractions, on multiplie la première fraction par l'inverse de la deuxième.",
      formula: "A/B ÷ C/D = A/B × D/C",
      example: "Si A/B = 3/4 et C/D = 1/2, on a : 3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 1 2/4 = 1 1/2",
      imageUrl: "/images/division.png",
    },
  ];

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
        <h1 className="text-3xl font-bold text-center mt-8 mb-4">Opérations sur les fractions</h1>
        <p className="text-lg text-center mb-6">Sélectionne une opération pour apprendre à la réaliser :</p>
      </div>

      {/* Boutons des opérations en 2 colonnes de 2 lignes */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {operations.map((operation, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white py-2 px-6 rounded font-bold shadow-lg hover:bg-blue-700 transition-all duration-300"
            onClick={() => setSelectedOperation(operation)}
          >
            {operation.name}
          </button>
        ))}
      </div>

      {/* Détails sur l'opération sélectionnée */}
      {selectedOperation && (
        <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">{selectedOperation.name}</h2>
          <p className="text-md mb-4">{selectedOperation.description}</p>
          <p className="text-lg font-bold mb-2">Formule :</p>
          <p className="text-lg mb-4">{selectedOperation.formula}</p>
          <p className="text-lg font-bold mb-2">Exemple :</p>
          <p className="text-lg">{selectedOperation.example}</p>
          {selectedOperation.imageUrl && (
            <div className="mt-6 flex justify-center">
              <Image
                src={selectedOperation.imageUrl}
                alt={selectedOperation.name}
                width={192}
                height={192}
                className="object-contain"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}