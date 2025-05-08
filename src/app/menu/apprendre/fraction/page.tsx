"use client";

import { useState } from "react";
import Link from "next/link";

// Illustrations codées pour les opérations sur les fractions
const AdditionIllustration = () => (
  <div className="flex flex-col items-center mt-6">
    <div className="text-xl font-mono bg-gray-100 p-4 rounded border text-center">
      1/4 + 2/4 = (1 + 2)/4 = 3/4
      <br />
      🍰 | 🍰🍰 = 🍰🍰🍰 sur 4 parts
    </div>
  </div>
);

const SoustractionIllustration = () => (
  <div className="flex flex-col items-center mt-6">
    <div className="text-xl font-mono bg-gray-100 p-4 rounded border text-center">
      3/5 - 1/5 = (3 - 1)/5 = 2/5
      <br />
      🍕🍕🍕 - 🍕 = 🍕🍕 sur 5 parts
    </div>
  </div>
);

const MultiplicationIllustration = () => (
  <div className="flex flex-col items-center mt-6">
    <div className="text-xl font-mono bg-gray-100 p-4 rounded border text-center">
      1/2 × 3/4 = (1×3)/(2×4) = 3/8
      <br />
      1 demi × 3/4 = 3 parts sur 8 au total
    </div>
  </div>
);

const DivisionIllustration = () => (
  <div className="flex flex-col items-center mt-6">
    <div className="text-xl font-mono bg-gray-100 p-4 rounded border text-center">
      3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 1 2/4 = 1 1/2
      <br />
      🍎🍎🍎 ÷ 1/2 = 1 pomme et demie
    </div>
  </div>
);

interface FractionOperation {
  name: string;
  description: string;
  formula: string;
  example: string;
  illustration?: React.ReactNode;
}

export default function FractionOperationsLearning() {
  const [selectedOperation, setSelectedOperation] = useState<FractionOperation | null>(null);

  const operations: FractionOperation[] = [
    {
      name: "Addition de fractions",
      description: "L'addition de fractions nécessite des dénominateurs identiques. Si les dénominateurs sont différents, il faut d'abord les rendre égaux.",
      formula: "A/B + C/B = (A + C)/B",
      example: "Si A/B = 1/4 et C/B = 2/4, on a : 1/4 + 2/4 = (1 + 2)/4 = 3/4",
      illustration: <AdditionIllustration />
    },
    {
      name: "Soustraction de fractions",
      description: "La soustraction de fractions suit la même règle que l'addition. On doit rendre les dénominateurs égaux si nécessaire.",
      formula: "A/B - C/B = (A - C)/B",
      example: "Si A/B = 3/5 et C/B = 1/5, on a : 3/5 - 1/5 = (3 - 1)/5 = 2/5",
      illustration: <SoustractionIllustration />
    },
    {
      name: "Multiplication de fractions",
      description: "Pour multiplier des fractions, on multiplie les numérateurs entre eux et les dénominateurs entre eux.",
      formula: "A/B × C/D = (A×C)/(B×D)",
      example: "Si A/B = 1/2 et C/D = 3/4, on a : 1/2 × 3/4 = (1×3)/(2×4) = 3/8",
      illustration: <MultiplicationIllustration />
    },
    {
      name: "Division de fractions",
      description: "Pour diviser des fractions, on multiplie la première fraction par l'inverse de la deuxième.",
      formula: "A/B ÷ C/D = A/B × D/C",
      example: "Si A/B = 3/4 et C/D = 1/2, on a : 3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 1 2/4 = 1 1/2",
      illustration: <DivisionIllustration />
    },
  ];

  const handleSelectOperation = (operation: FractionOperation): void => {
    setSelectedOperation(operation);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
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

      <div className="w-full sm:w-3/4 p-8 mt-12">
        {selectedOperation && (
          <div className="bg-white p-6 rounded-lg shadow-lg min-h-[70vh]">
            <h2 className="text-2xl font-bold mb-4">{selectedOperation.name}</h2>
            <p className="text-md mb-4">{selectedOperation.description}</p>
            <p className="text-lg font-bold mb-2">Formule :</p>
            <p className="text-lg mb-4">{selectedOperation.formula}</p>
            <p className="text-lg font-bold mb-2">Exemple :</p>
            <p className="text-lg mb-4">{selectedOperation.example}</p>

            {selectedOperation.illustration && (
              <div className="mt-6 flex justify-center">
                {selectedOperation.illustration}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
