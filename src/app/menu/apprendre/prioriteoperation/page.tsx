"use client";

import { useState } from "react";
import Link from "next/link";

// Définir le type pour la priorité d'opération
interface Operation {
  name: string;
  description: string;
  formula: string;
  example: string;
}

export default function PrioriteOperation() {
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);

  const operations: Operation[] = [
    {
      name: "Addition",
      description: "L'addition est une opération mathématique qui consiste à additionner deux nombres.",
      formula: "A + B",
      example: "Si A = 3 et B = 5, l'addition donne : 3 + 5 = 8",
    },
    {
      name: "Soustraction",
      description: "La soustraction est une opération mathématique qui consiste à soustraire un nombre d'un autre.",
      formula: "A - B",
      example: "Si A = 8 et B = 5, la soustraction donne : 8 - 5 = 3",
    },
    {
      name: "Multiplication",
      description: "La multiplication est une opération mathématique qui consiste à multiplier deux nombres.",
      formula: "A × B",
      example: "Si A = 4 et B = 6, la multiplication donne : 4 × 6 = 24",
    },
    {
      name: "Division",
      description: "La division est une opération mathématique qui consiste à diviser un nombre par un autre.",
      formula: "A ÷ B",
      example: "Si A = 12 et B = 3, la division donne : 12 ÷ 3 = 4",
    }
  ];

  const handleSelectOperation = (operation: Operation): void => {
    setSelectedOperation(operation);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      {/* Options des opérations à gauche */}
      <div className="w-full sm:w-1/4 bg-white p-6 shadow-lg">
        <Link
          href="/menu/apprendre"
          className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
        >
          Retour
        </Link>

        <h1 className="text-3xl font-bold mb-6 text-center">Opérations mathématiques</h1>
        
        <div className="flex flex-col gap-6">
          <p className="text-lg mb-6 text-center">Sélectionne une opération pour apprendre à la réaliser :</p>
          {operations.map((operation, index) => (
            <div key={index} className="flex flex-col items-center">
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded font-bold mb-4 transition-all duration-300 hover:bg-blue-700"
                onClick={() => handleSelectOperation(operation)}
              >
                {operation.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Formules et explications au centre */}
      <div className="w-full sm:w-3/4 p-8">
        {selectedOperation && (
          <div className="bg-white p-6 rounded-lg shadow-lg min-h-[70vh]">
            <h2 className="text-2xl font-bold mb-6">{selectedOperation.name}</h2>
            <p className="text-md mb-6">{selectedOperation.description}</p>

            {/* Ajout d'un espacement plus modéré avant les formules */}
            <div className="mt-8">
              <p className="text-lg font-bold mb-2">Formule :</p>
              <p className="text-lg mb-4">{selectedOperation.formula}</p>
              <p className="text-lg font-bold mb-2">Exemple :</p>
              <p className="text-lg">{selectedOperation.example}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
