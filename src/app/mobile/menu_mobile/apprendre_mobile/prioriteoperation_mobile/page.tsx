"use client";

import { useState } from "react";
import Link from "next/link";

interface OperationRule {
  name: string;
  description: string;
  example: string;
}

export default function PrioritesOperationsLearning() {
  const [selectedRule, setSelectedRule] = useState<OperationRule | null>(null);

  const rules: OperationRule[] = [
    {
      name: "Parenthèses",
      description: "Les opérations entre parenthèses sont effectuées en premier.",
      example: "(3 + 2) × 4 = 5 × 4 = 20",
    },
    {
      name: "Exposants",
      description: "Les puissances et racines sont calculées après les parenthèses.",
      example: "2^3 × 4 = 8 × 4 = 32",
    },
    {
      name: "Multiplication et Division",
      description: "Ces opérations sont effectuées de gauche à droite après les exposants.",
      example: "10 ÷ 2 × 3 = 5 × 3 = 15",
    },
    {
      name: "Addition et Soustraction",
      description: "Elles sont effectuées en dernier, de gauche à droite.",
      example: "10 - 4 + 2 = 6 + 2 = 8",
    },
  ];

  const handleSelectRule = (rule: OperationRule): void => {
    setSelectedRule(rule);
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
        <h1 className="text-3xl font-bold">Priorités des opérations</h1>
        <p className="text-lg">Sélectionne une règle pour en apprendre plus</p>
      </div>

      {/* Boutons des règles en grille */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {rules.map((rule, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white py-2 px-6 rounded font-bold shadow-lg hover:bg-blue-700 transition-all duration-300"
            onClick={() => handleSelectRule(rule)}
          >
            {rule.name}
          </button>
        ))}
      </div>

      {/* Section des détails */}
      {selectedRule && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">{selectedRule.name}</h2>
          <p className="text-md mb-4">{selectedRule.description}</p>
          <p className="text-lg font-bold mb-2">Exemple :</p>
          <p className="text-lg">{selectedRule.example}</p>
        </div>
      )}
    </div>
  );
}
