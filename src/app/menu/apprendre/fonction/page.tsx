"use client";

import { useState } from "react";
import Link from "next/link";

interface FunctionConcept {
  name: string;
  description: string;
  formula: string;
  example: string;
  visual: React.ReactNode;
}

// 🔁 Composant réutilisable pour les axes
const Axes = () => (
  <>
    <line x1="-10" y1="0" x2="10" y2="0" stroke="gray" strokeWidth="0.05" />
    <line x1="0" y1="-10" x2="0" y2="10" stroke="gray" strokeWidth="0.05" />
  </>
);

// 📈 Fonctions visuelles

const LinearFunctionVisual = () => (
  <svg width="300" height="300" viewBox="-10 -10 20 20">
    <Axes />
    <line
      x1="-5"
      y1={-(2 * -5 + 1)}
      x2="5"
      y2={-(2 * 5 + 1)}
      stroke="blue"
      strokeWidth="0.2"
    />
  </svg>
);

const QuadraticFunctionVisual = () => {
  const points = Array.from({ length: 201 }, (_, i) => {
    const x = (i - 100) / 10;
    const y = -x * x;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width="300" height="300" viewBox="-10 -10 20 20">
      <Axes />
      <polyline
        fill="none"
        stroke="green"
        strokeWidth="0.2"
        points={points}
      />
    </svg>
  );
};

const AbsoluteFunctionVisual = () => {
  const points = Array.from({ length: 201 }, (_, i) => {
    const x = (i - 100) / 10;
    const y = -Math.abs(x);
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width="300" height="300" viewBox="-10 -10 20 20">
      <Axes />
      <polyline
        fill="none"
        stroke="orange"
        strokeWidth="0.2"
        points={points}
      />
    </svg>
  );
};

const ExponentialFunctionVisual = () => {
  const points = Array.from({ length: 101 }, (_, i) => {
    const x = (i - 50) / 10;
    const y = -Math.pow(2, x / 2);
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width="300" height="300" viewBox="-10 -10 20 20">
      <Axes />
      <polyline
        fill="none"
        stroke="red"
        strokeWidth="0.2"
        points={points}
      />
    </svg>
  );
};

const StepFunctionVisual = () => {
  const steps = Array.from({ length: 20 }, (_, i) => {
    const x1 = i - 10;
    const x2 = x1 + 1;
    const y = -Math.floor(x1);
    return (
      <g key={i}>
        <line x1={x1} y1={y} x2={x2} y2={y} stroke="purple" strokeWidth="0.2" />
        <line x1={x2} y1={y} x2={x2} y2={y - 0.1} stroke="purple" strokeWidth="0.2" />
      </g>
    );
  });
  return (
    <svg width="300" height="300" viewBox="-10 -10 20 20">
      <Axes />
      {steps}
    </svg>
  );
};

// 📚 Données de concepts

const functionConcepts: FunctionConcept[] = [
  {
    name: "Fonction linéaire",
    description: "Une fonction linéaire est de la forme f(x) = ax + b.",
    formula: "f(x) = 2x + 1",
    example: "f(4) = 2 × 4 + 1 = 9",
    visual: <LinearFunctionVisual />,
  },
  {
    name: "Fonction quadratique",
    description: "Fonction polynomiale de degré 2 : parabole.",
    formula: "f(x) = x²",
    example: "f(3) = 9",
    visual: <QuadraticFunctionVisual />,
  },
  {
    name: "Fonction valeur absolue",
    description: "Retourne toujours une valeur positive.",
    formula: "f(x) = |x|",
    example: "f(-5) = 5",
    visual: <AbsoluteFunctionVisual />,
  },
  {
    name: "Fonction exponentielle",
    description: "Croissance rapide selon la base.",
    formula: "f(x) = 2^x",
    example: "f(3) = 8",
    visual: <ExponentialFunctionVisual />,
  },
  {
    name: "Fonction en escalier (partie entière)",
    description: "Arrondit à l’entier inférieur.",
    formula: "f(x) = ⌊x⌋",
    example: "f(3.7) = 3",
    visual: <StepFunctionVisual />,
  }
];

// 🧠 Composant principal

export default function FonctionLearning() {
  const [selectedConcept, setSelectedConcept] = useState<FunctionConcept | null>(null);

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

        <h1 className="text-3xl font-bold mb-6">Les Fonctions</h1>
        <p className="text-lg mb-6">
          Sélectionne un concept pour en apprendre davantage :
        </p>

        <div className="flex flex-col gap-4">
          {functionConcepts.map((concept, index) => (
            <button
              key={index}
              className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
              onClick={() => setSelectedConcept(concept)}
            >
              {concept.name}
            </button>
          ))}
        </div>
      </div>

      {/* Section centrale */}
      <div className="w-3/4 p-10 flex flex-col items-center">
        {selectedConcept && (
          <div className="bg-white p-8 rounded-lg shadow-lg mt-10 w-full max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">{selectedConcept.name}</h2>
            <p className="text-lg mb-6">{selectedConcept.description}</p>
            <p className="text-2xl font-bold mb-4">Formule :</p>
            <p className="text-lg mb-6">{selectedConcept.formula}</p>
            <p className="text-2xl font-bold mb-4">Exemple :</p>
            <p className="text-lg mb-6">{selectedConcept.example}</p>

            <div className="mt-8 flex justify-center">
              {selectedConcept.visual}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
