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
    },
  ];

  const handleSelectOperation = (operation: Operation): void => {
    setSelectedOperation(operation);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
      {/* Bouton Retour */}
      <Link
        href="/mobile/menu_mobile/apprendre_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded font-bold shadow-md hover:bg-orange-700"
      >
        Retour
      </Link>

      {/* Titre et sous-titre */}
      <div className="text-center mt-16 mb-8">
        <h1 className="text-3xl font-bold mb-4">Opérations mathématiques</h1>
        <p className="text-lg text-gray-700">
          Sélectionne une opération pour apprendre à la réaliser :
        </p>
      </div>

      {/* Boutons en ligne */}
      <div className="flex justify-center gap-4 mb-8">
        {operations.map((operation, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg font-bold transition-all duration-300 hover:bg-blue-700"
            onClick={() => handleSelectOperation(operation)}
          >
            {operation.name}
          </button>
        ))}
      </div>

      {/* Section de contenu */}
      <div>
        {selectedOperation ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{selectedOperation.name}</h2>
            <p className="text-md mb-6">{selectedOperation.description}</p>
            <div>
              <p className="text-lg font-bold mb-2">Formule :</p>
              <p className="text-lg mb-4">{selectedOperation.formula}</p>
              <p className="text-lg font-bold mb-2">Exemple :</p>
              <p className="text-lg">{selectedOperation.example}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-700">
            Veuillez sélectionner une opération pour voir les détails.
          </p>
        )}
      </div>
    </div>
  );
}
