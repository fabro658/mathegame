'use client';

import { useState } from "react";
import Link from "next/link";

interface FunctionConcept {
  name: string;
  description: React.ReactNode;
  formula: string;
  example: string;
  visual: React.ReactNode;
}

// Axes XY
const Axes = () => (
  <>
    <line x1="-10" y1="0" x2="10" y2="0" stroke="gray" strokeWidth="0.05" />
    <line x1="0" y1="-10" x2="0" y2="10" stroke="gray" strokeWidth="0.05" />
  </>
);

// Fonctions visuelles
const LinearFunctionVisual = () => {
  const [a, setA] = useState(2); // pente
  const [b, setB] = useState(1); // ordonnée à l'origine
  const [showParams, setShowParams] = useState(false);

  const x1 = -5;
  const y1 = a * x1 + b;
  const x2 = 5;
  const y2 = a * x2 + b;

  return (
    <div className="flex flex-col items-center">
      <svg width="300" height="300" viewBox="-10 -10 20 20">
        <Axes />
        <line x1={x1} y1={-y1} x2={x2} y2={-y2} stroke="blue" strokeWidth="0.2" />
      </svg>

      <button
        onClick={() => setShowParams(!showParams)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {showParams ? "Masquer les paramètres" : "Modifier les paramètres"}
      </button>

      {showParams && (
        <div className="mt-4 w-full max-w-sm space-y-4">
          <div>
            <label className="block mb-1 font-semibold">a (pente) = {a}</label>
            <input
              type="range"
              min={-5}
              max={5}
              step={0.1}
              value={a}
              onChange={(e) => setA(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">b (ordonnée à l’origine) = {b}</label>
            <input
              type="range"
              min={-10}
              max={10}
              step={0.1}
              value={b}
              onChange={(e) => setB(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};


const QuadraticFunctionVisual = () => {
  const [a, setA] = useState(-1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [showParams, setShowParams] = useState(false);

  const points = Array.from({ length: 201 }, (_, i) => {
    const x = (i - 100) / 10;
    const y = a * x * x + b * x + c;
    return `${x},${-y}`;
  }).join(" ");

  return (
    <div className="flex flex-col items-center">
      <svg width="300" height="300" viewBox="-10 -10 20 20">
        <Axes />
        <polyline fill="none" stroke="green" strokeWidth="0.2" points={points} />
      </svg>

      <button
        onClick={() => setShowParams(!showParams)}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        {showParams ? "Masquer les paramètres" : "Modifier les paramètres"}
      </button>

      {showParams && (
        <div className="mt-4 w-full max-w-sm space-y-4">
          <div>
            <label className="block mb-1 font-semibold">a = {a}</label>
            <input
              type="range"
              min={-5}
              max={5}
              step={0.1}
              value={a}
              onChange={(e) => setA(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">b = {b}</label>
            <input
              type="range"
              min={-10}
              max={10}
              step={0.1}
              value={b}
              onChange={(e) => setB(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">c = {c}</label>
            <input
              type="range"
              min={-10}
              max={10}
              step={0.1}
              value={c}
              onChange={(e) => setC(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
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
      <polyline fill="none" stroke="orange" strokeWidth="0.2" points={points} />
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
      <polyline fill="none" stroke="red" strokeWidth="0.2" points={points} />
    </svg>
  );
};

const StepFunctionVisual = () => {
  const steps = Array.from({ length: 20 }, (_, i) => {
    const x = i - 10;
    const y = -Math.floor(x);
    return (
      <g key={i}>
        <line x1={x} y1={y} x2={x + 1} y2={y} stroke="purple" strokeWidth="0.2" />
        <circle cx={x} cy={y} r={0.15} fill="black" />
        <circle cx={x + 1} cy={y} r={0.15} fill="white" stroke="black" strokeWidth="0.1" />
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

const functionConcepts: FunctionConcept[] = [
  {
    name: "Fonction linéaire",
    description: (
      <>
        <p>Une fonction linéaire est une fonction dont le graphique est une droite.</p>
        <p className="mt-2">
          Elle s’écrit sous la forme <strong>f(x) = ax + b</strong>, où <strong>a</strong> est la pente et <strong>b</strong> est l’endroit où la droite coupe l’axe vertical.
        </p>
      </>
    ),
    formula: "f(x) = 2x + 1",
    example: "f(4) = 2(4) + 1 = 9",
    visual: <LinearFunctionVisual />,
  },
  {
    name: "Fonction quadratique",
    description: "Une fonction quadratique est une fonction polynomiale de degré 2. Son graphique est une parabole qui peut s’ouvrir vers le haut ou vers le bas.",
    formula: "f(x) = x²",
    example: "f(3) = 3² = 9",
    visual: <QuadraticFunctionVisual />,
  },
  {
    name: "Fonction valeur absolue",
    description: "La fonction valeur absolue donne toujours un résultat positif ou nul.",
    formula: "f(x) = |x|",
    example: "f(-5) = |-5| = 5",
    visual: <AbsoluteFunctionVisual />,
  },
  {
    name: "Fonction exponentielle",
    description: "La fonction exponentielle modélise une croissance très rapide. Elle s’écrit f(x) = aˣ avec a > 1. Plus x augmente, plus f(x) augmente rapidement.",
    formula: "f(x) = 2ˣ",
    example: "f(3) = 2³ = 8",
    visual: <ExponentialFunctionVisual />,
  },
  {
    name: "Fonction en escalier (partie entière)",
    description: "La fonction en escalier, ou fonction partie entière, associe à chaque nombre le plus grand entier inférieur ou égal à ce nombre. Son graphique ressemble à des marches.",
    formula: "f(x) = ⌊x⌋",
    example: "f(3.7) = 3",
    visual: <StepFunctionVisual />,
  },
];

// Composant principal
export default function FonctionLearning() {
  const [selectedConcept, setSelectedConcept] = useState<FunctionConcept | null>(null);

  return (
    <main className="flex h-screen overflow-y-auto bg-gray-100 text-black relative">
      {/* Bouton retour en haut à droite */}
      <Link
        href="/menu/apprendre"
        className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Colonne gauche */}
      <div className="w-1/4 bg-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Les Fonctions</h1>
        <p className="text-lg mb-6">Sélectionne un concept pour en apprendre davantage :</p>
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

      {/* Colonne droite */}
      <div className="w-3/4 p-10 flex flex-col items-center overflow-y-auto">
        {selectedConcept && (
          <div className="bg-white p-8 rounded-lg shadow-lg mt-10 w-full max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">{selectedConcept.name}</h2>
            <div className="text-lg mb-6">{selectedConcept.description}</div>
            <p className="text-2xl font-bold mb-4">Formule :</p>
            <p className="text-lg mb-6">{selectedConcept.formula}</p>
            <p className="text-2xl font-bold mb-4">Exemple :</p>
            <p className="text-lg mb-6">{selectedConcept.example}</p>
            <div className="mt-8 flex justify-center">{selectedConcept.visual}</div>
          </div>
        )}
      </div>
    </main>
  );
}
