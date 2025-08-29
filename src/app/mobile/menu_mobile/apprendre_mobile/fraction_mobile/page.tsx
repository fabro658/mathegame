"use client";

import { useState } from "react";
import Link from "next/link";

interface FractionCircleProps {
  numerator: number;
  denominator: number;
  fillColors: string[];
  position: { x: number; y: number };
}

const FractionCircle = ({ numerator, denominator, fillColors, position }: FractionCircleProps) => {
  const radius = 50;
  const paths: React.ReactNode[] = [];
  const lines: React.ReactNode[] = [];

  for (let i = 0; i < denominator; i++) {
    const startAngle = (2 * Math.PI * i) / denominator;
    const endAngle = (2 * Math.PI * (i + 1)) / denominator;

    const x1 = radius * Math.cos(startAngle);
    const y1 = radius * Math.sin(startAngle);
    const x2 = radius * Math.cos(endAngle);
    const y2 = radius * Math.sin(endAngle);

    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    const d = `
      M0,0
      L${x1},${y1}
      A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2}
      Z
    `;

    const isFilled = i < numerator;
    const fill = isFilled ? fillColors[i % fillColors.length] : "#eee";

    paths.push(<path key={`path-${i}`} d={d} fill={fill} stroke="black" strokeWidth="1" />);
    lines.push(<line key={`line-${i}`} x1={0} y1={0} x2={x1} y2={y1} stroke="black" strokeWidth="1" />);
  }

  return (
    <g transform={`translate(${position.x},${position.y})`}>
      {paths}
      {lines}
      <circle r={radius} fill="none" stroke="black" strokeWidth="2" />
    </g>
  );
};

/* ================= Illustrations (responsives) ================= */

const AdditionIllustration1 = () => (
  <svg viewBox="0 0 480 130" className="w-full h-auto max-w-[480px]">
    <FractionCircle numerator={1} denominator={4} fillColors={["lightblue"]} position={{ x: 60, y: 60 }} />
    <FractionCircle numerator={2} denominator={4} fillColors={["lightgreen"]} position={{ x: 180, y: 60 }} />
    <FractionCircle
      numerator={3}
      denominator={4}
      fillColors={["lightblue", "lightgreen", "lightgreen"]}
      position={{ x: 300, y: 60 }}
    />
  </svg>
);

const AdditionIllustration2 = () => (
  <svg viewBox="0 0 480 130" className="w-full h-auto max-w-[480px]">
    <text x="30" y="70" fontSize="20">1/3 + 1/4 = 4/12 + 3/12 = 7/12</text>
  </svg>
);

const SoustractionIllustration1 = () => (
  <svg viewBox="0 0 480 130" className="w-full h-auto max-w-[480px]">
    <FractionCircle numerator={3} denominator={5} fillColors={["lightcoral"]} position={{ x: 60, y: 60 }} />
    <FractionCircle numerator={1} denominator={5} fillColors={["lightsalmon"]} position={{ x: 180, y: 60 }} />
    <FractionCircle numerator={2} denominator={5} fillColors={["lightcoral", "lightcoral"]} position={{ x: 300, y: 60 }} />
  </svg>
);

const SoustractionIllustration2 = () => (
  <svg viewBox="0 0 480 130" className="w-full h-auto max-w-[480px]">
    <text x="20" y="70" fontSize="20">2/3 - 1/4 = 8/12 - 3/12 = 5/12</text>
  </svg>
);

const MultiplicationIllustration1 = () => (
  <svg viewBox="0 0 500 130" className="w-full h-auto max-w-[500px]">
    <FractionCircle numerator={1} denominator={2} fillColors={["#ADD8E6"]} position={{ x: 60, y: 60 }} />
    <FractionCircle numerator={3} denominator={4} fillColors={["#90EE90"]} position={{ x: 180, y: 60 }} />
    <FractionCircle
      numerator={3}
      denominator={8}
      fillColors={["#ADD8E6", "#90EE90", "#90EE90"]}
      position={{ x: 320, y: 60 }}
    />
  </svg>
);

const MultiplicationIllustration2 = () => (
  <svg viewBox="0 0 500 130" className="w-full h-auto max-w-[500px]">
    <FractionCircle numerator={2} denominator={3} fillColors={["#FFA07A"]} position={{ x: 60, y: 60 }} />
    <FractionCircle numerator={3} denominator={5} fillColors={["#8FBC8F"]} position={{ x: 180, y: 60 }} />
    <FractionCircle
      numerator={6}
      denominator={15}
      fillColors={["#FFA07A", "#FFA07A", "#8FBC8F", "#8FBC8F", "#8FBC8F", "#8FBC8F"]}
      position={{ x: 320, y: 60 }}
    />
  </svg>
);

const DivisionIllustration1 = () => (
  <svg viewBox="0 0 480 130" className="w-full h-auto max-w-[480px]">
    <FractionCircle numerator={3} denominator={4} fillColors={["#ADD8E6"]} position={{ x: 60, y: 60 }} />
    <FractionCircle numerator={1} denominator={2} fillColors={["#FFD700"]} position={{ x: 180, y: 60 }} />
    <FractionCircle
      numerator={6}
      denominator={4}
      fillColors={["#ADD8E6", "#ADD8E6", "#FFD700", "#FFD700", "#FFD700", "#FFD700"]}
      position={{ x: 300, y: 60 }}
    />
  </svg>
);

const DivisionIllustration2 = () => (
  <svg viewBox="0 0 480 130" className="w-full h-auto max-w-[480px]">
    <text x="10" y="70" fontSize="20">2/3 ÷ 5/6 = 2/3 × 6/5 = 12/15 = 4/5</text>
  </svg>
);

/* ================= Types & données ================= */

interface FractionExample {
  description: string;
  example: string;
  illustration: React.ReactNode;
}

interface FractionOperation {
  name: string;
  formula: string;
  examples: FractionExample[];
}

export default function FractionOperationsLearning() {
  // Opérations
  const operations: FractionOperation[] = [
    {
      name: "Addition de fractions",
      formula: "A/B + C/D = (A×D + C×B)/(B×D)",
      examples: [
        { description: "Addition avec dénominateurs identiques.", example: "1/4 + 2/4 = 3/4", illustration: <AdditionIllustration1 /> },
        { description: "Addition avec dénominateurs différents.", example: "1/3 + 1/4 = 4/12 + 3/12 = 7/12", illustration: <AdditionIllustration2 /> },
      ],
    },
    {
      name: "Soustraction de fractions",
      formula: "A/B - C/D = (A×D - C×B)/(B×D)",
      examples: [
        { description: "Soustraction avec dénominateurs identiques.", example: "3/5 - 1/5 = 2/5", illustration: <SoustractionIllustration1 /> },
        { description: "Soustraction avec dénominateurs différents.", example: "2/3 - 1/4 = 8/12 - 3/12 = 5/12", illustration: <SoustractionIllustration2 /> },
      ],
    },
    {
      name: "Multiplication de fractions",
      formula: "A/B × C/D = (A×C)/(B×D)",
      examples: [
        { description: "Multiplication simple.", example: "1/2 × 3/4 = 3/8", illustration: <MultiplicationIllustration1 /> },
        { description: "Multiplication avec réduction possible.", example: "2/3 × 3/5 = 6/15", illustration: <MultiplicationIllustration2 /> },
      ],
    },
    {
      name: "Division de fractions",
      formula: "A/B ÷ C/D = A/B × D/C",
      examples: [
        { description: "Division simple.", example: "3/4 ÷ 1/2 = 6/4 = 1 1/2", illustration: <DivisionIllustration1 /> },
        { description: "On inverse la 2e fraction (multiplication par l’inverse), puis on multiplie.", example: "2/3 ÷ 5/6 = 2/3 × 6/5 = 12/15 = 4/5", illustration: <DivisionIllustration2 /> },
      ],
    },
  ];

  // Sélection par défaut pour afficher du contenu dès l’ouverture
  const [selectedOperation, setSelectedOperation] = useState<FractionOperation>(operations[0]);
  const [exampleIndex, setExampleIndex] = useState(0);

  return (
    // Page mobile : scroll isolé + bouton fixe
    <div className="fixed inset-0 overflow-y-auto bg-gray-100 text-black">
      <main className="min-h-screen flex flex-col items-center p-4 pt-24 pb-28 relative">
        {/* Bouton Retour (fixe) */}
        <Link
          href="/mobile/menu_mobile/apprendre_mobile"
          className="fixed top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded font-bold z-50"
        >
          Retour
        </Link>

        {/* Titre */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Opérations sur les fractions</h1>
          <p className="text-lg mt-2">Sélectionne une opération :</p>
        </div>

        {/* Liste des opérations (verticale, mobile-first) */}
        <div className="w-full max-w-md grid grid-cols-1 gap-3 mb-8">
          {operations.map((op) => (
            <button
              key={op.name}
              className={`py-3 px-4 rounded font-bold transition 
                ${selectedOperation.name === op.name ? "bg-blue-600 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}`}
              onClick={() => {
                setSelectedOperation(op);
                setExampleIndex(0);
              }}
            >
              {op.name}
            </button>
          ))}
        </div>

        {/* Bloc central grand + scroll interne */}
        <div className="w-full max-w-3xl">
          <div className="bg-white p-6 rounded-lg shadow-lg min-h-[60vh] max-h-[82vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-2">{selectedOperation.name}</h2>

            <p className="text-lg mb-2 text-gray-700">
              {selectedOperation.examples[exampleIndex].description}
            </p>

            <p className="text-xl font-semibold mt-2 mb-1">Formule :</p>
            <p className="text-lg mb-4">{selectedOperation.formula}</p>

            <p className="text-xl font-semibold mb-1">Exemple :</p>
            <p className="text-lg mb-4">{selectedOperation.examples[exampleIndex].example}</p>

            <div className="mt-4 flex justify-center">
              {selectedOperation.examples[exampleIndex].illustration}
            </div>

            {selectedOperation.examples.length > 1 && (
              <div className="mt-6 flex justify-center">
                <button
                  className="bg-green-600 text-white py-2 px-6 rounded font-bold hover:bg-green-700 transition"
                  onClick={() =>
                    setExampleIndex((prev) => (prev + 1) % selectedOperation.examples.length)
                  }
                >
                  Exemple suivant
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
