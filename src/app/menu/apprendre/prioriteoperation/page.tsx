"use client";

import { useState } from "react";
import Link from "next/link";

export default function PrioriteOperationsLearning() {
  const [selectedExample, setSelectedExample] = useState<string | null>(null);

  const examples = [
    {
      name: "Exemple 1 : Addition et multiplication",
      description: "Lorsque l&apos;addition et la multiplication apparaissent dans une même expression, on effectue d&apos;abord la multiplication.",
      formula: "Exemple : 3 + 5 × 2",
      solution: "3 + (5 × 2) = 3 + 10 = 13",
    },
    {
      name: "Exemple 2 : Parenthèses d&apos;abord",
      description: "Les parenthèses ont la priorité sur les autres opérations, quelle que soit l&apos;opération à l&apos;intérieur.",
      formula: "Exemple : (2 + 3) × 4",
      solution: "(2 + 3) × 4 = 5 × 4 = 20",
    },
    {
      name: "Exemple 3 : Division avant addition",
      description: "La division est effectuée avant l&apos;addition si elles apparaissent dans la même expression sans parenthèses.",
      formula: "Exemple : 8 ÷ 4 + 3",
      solution: "(8 ÷ 4) + 3 = 2 + 3 = 5",
    },
    {
      name: "Exemple 4 : Parenthèses avec plusieurs opérations",
      description: "Les parenthèses doivent être résolues en premier, peu importe les opérations à l&apos;intérieur.",
      formula: "Exemple : (2 + 3) × (4 + 1)",
      solution: "(2 + 3) × (4 + 1) = 5 × 5 = 25",
    }
  ];

  const handleSelectExample = (example: string): void => {
    setSelectedExample(example);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      {/* Options d'exemples à gauche */}
      <div className="w-1/4 bg-white p-6 shadow-lg">
        <Link
          href="/menu/apprendre"
          className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
        >
          Retour
        </Link>

        <h1 className="text-3xl font-bold mb-6">Priorité des Opérations</h1>
        
        <div className="flex flex-col gap-6">
          <p className="text-lg mb-6">Sélectionne un exemple pour apprendre les priorités d&apos;opérations :</p>
          {examples.map((example, index) => (
            <div key={index} className="flex flex-col items-center">
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded font-bold mb-4"
                onClick={() => handleSelectExample(example.name)}
              >
                {example.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Formules et explications au centre */}
      <div className="w-3/4 p-8">
        {selectedExample && (
          <div className="bg-white p-6 rounded-lg shadow-lg min-h-[70vh]">
            <h2 className="text-2xl font-bold mb-4">{selectedExample}</h2>
            <p className="text-md mb-4">
              {examples.find((example) => example.name === selectedExample)?.description}
            </p>
            <p className="text-lg font-bold mb-2">Formule :</p>
            <p className="text-lg mb-4">
              {examples.find((example) => example.name === selectedExample)?.formula}
            </p>
            <p className="text-lg font-bold mb-2">Solution :</p>
            <p className="text-lg">
              {examples.find((example) => example.name === selectedExample)?.solution}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
