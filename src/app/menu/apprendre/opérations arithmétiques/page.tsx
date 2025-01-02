"use client";

import { useState } from "react";
import Link from "next/link";

// Définir le type pour les opérations
interface Operation {
  name: string;
  description: string;
  formula: string;
  example: string;
}

export default function OperationsLearning() {
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);

  const operations: Operation[] = [
    {
      name: "Addition",
      description: "L'addition consiste à ajouter des nombres ensemble.",
      formula: "A + B",
      example: "Exemple : 3 + 2 = 5",
    },
    {
      name: "Soustraction",
      description: "La soustraction consiste à retirer un nombre d'un autre.",
      formula: "A - B",
      example: "Exemple : 5 - 2 = 3",
    },
    {
      name: "Multiplication",
      description: "La multiplication est une manière rapide d'ajouter le même nombre plusieurs fois.",
      formula: "A × B",
      example: "Exemple : 3 × 2 = 6 (c'est comme ajouter 3 + 3)",
    },
    {
      name: "Division",
      description: "La division consiste à partager un nombre en parts égales.",
      formula: "A ÷ B",
      example: "Exemple : 6 ÷ 2 = 3 (on partage 6 en 2 parts égales)",
    }
  ];

  const handleSelectOperation = (operation: Operation): void => {
    setSelectedOperation(operation);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      {/* Options des opérations à gauche */}
      <div className="w-1/4 bg-white p-6 shadow-lg">
        <Link
          href="/menu/apprendre"
          className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
        >
          Retour
        </Link>

        <h1 className="text-3xl font-bold mb-6">Opérations arithmétiques</h1>
        
        <div className="flex flex-col gap-6">
          <p className="text-lg mb-6">Sélectionne une opération pour apprendre comment la faire :</p>
          {operations.map((operation, index) => (
            <div key={index} className="flex flex-col items-center">
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded font-bold mb-4"
                onClick={() => handleSelectOperation(operation)}
              >
                {operation.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Formules et explications au centre */}
      <div className="w-3/4 p-8">
        {selectedOperation && (
          <div className="bg-white p-6 rounded-lg shadow-lg min-h-[70vh]">
            <h2 className="text-2xl font-bold mb-4">{selectedOperation.name}</h2>
            <p className="text-md mb-4">{selectedOperation.description}</p>
            <p className="text-lg font-bold mb-2">Formule :</p>
            <p className="text-lg mb-4">{selectedOperation.formula}</p>
            <p className="text-lg font-bold mb-2">Exemple :</p>
            <p className="text-lg">{selectedOperation.example}</p>
          </div>
        )}
      </div>
    </div>
  );
}
