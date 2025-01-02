"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Définir le type pour les concepts des exposants
interface ExponentConcept {
  name: string;
  description: string;
  formula: string;
  example: string;
  imageUrl: string; // URL de l'image pour chaque concept
}

export default function ExponentsLearning() {
  const [selectedConcept, setSelectedConcept] = useState<ExponentConcept | null>(null);

  const concepts: ExponentConcept[] = [
    {
      name: "Multiplication d'exposants",
      description: "Lorsque les bases sont identiques, on additionne les exposants.",
      formula: "aⁿ × aᵐ = aⁿ⁺ᵐ",
      example: "Exemple : 2³ × 2² = 2³⁺² = 2⁵ = 32",
      imageUrl: "/images/multiplication.png", // Image à remplacer
    },
    {
      name: "Division d'exposants",
      description: "Lorsque les bases sont identiques, on soustrait les exposants.",
      formula: "aⁿ ÷ aᵐ = aⁿ⁻ᵐ",
      example: "Exemple : 2⁵ ÷ 2² = 2⁵⁻² = 2³ = 8",
      imageUrl: "/images/division.png", // Image à remplacer
    },
    {
      name: "Puissance d'une puissance",
      description: "On multiplie les exposants lorsqu'une puissance est élevée à une autre.",
      formula: "(aⁿ)ᵐ = aⁿ×ᵐ",
      example: "Exemple : (2³)² = 2³×² = 2⁶ = 64",
      imageUrl: "/images/puissance.png", // Image à remplacer
    },
    {
      name: "Exposant zéro",
      description: "Tout nombre élevé à la puissance zéro est égal à 1, sauf 0⁰ qui est indéfini.",
      formula: "a⁰ = 1 (pour a ≠ 0)",
      example: "Exemple : 5⁰ = 1",
      imageUrl: "/images/exposant-zero.png", // Image à remplacer
    },
    {
      name: "Exposant négatif",
      description: "Un exposant négatif correspond à l'inverse du nombre élevé à l'exposant positif.",
      formula: "a⁻ⁿ = 1 / aⁿ",
      example: "Exemple : 2⁻³ = 1 / 2³ = 1 / 8",
      imageUrl: "/images/exposant-negatif.png", // Image à remplacer
    },
  ];

  const handleSelectConcept = (concept: ExponentConcept): void => {
    setSelectedConcept(concept);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      {/* Options des concepts à gauche */}
      <div className="w-1/4 bg-white p-6 shadow-lg">
        <Link
          href="/menu/apprendre"
          className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
        >
          Retour
        </Link>

        <h1 className="text-3xl font-bold mb-6">Apprendre les exposants</h1>

        <div className="flex flex-col gap-6">
          <p className="text-lg mb-6">Sélectionne un concept pour en apprendre davantage :</p>
          {concepts.map((concept, index) => (
            <div key={index} className="flex flex-col items-center">
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded font-bold mb-4"
                onClick={() => handleSelectConcept(concept)}
              >
                {concept.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Formules et explications */}
      <div className="w-3/4 p-8 mt-12">
        {selectedConcept && (
          <div className="bg-white p-6 rounded-lg shadow-lg min-h-[70vh]">
            <h2 className="text-2xl font-bold mb-4">{selectedConcept.name}</h2>
            <p className="text-md mb-4">{selectedConcept.description}</p>
            <p className="text-lg font-bold mb-2">Formule :</p>
            <p className="text-lg mb-4">{selectedConcept.formula}</p>
            <p className="text-lg font-bold mb-2">Exemple :</p>
            <p className="text-lg">{selectedConcept.example}</p>

            {/* Afficher l'image */}
            <div className="mt-6 flex justify-center">
              <Image 
                src={selectedConcept.imageUrl} 
                alt={selectedConcept.name} 
                width={192} 
                height={192} 
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
