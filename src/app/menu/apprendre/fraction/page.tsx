"use client";

import { useState } from "react";
import Link from "next/link";

interface FractionCircleProps {
  numerator: number;
  denominator: number;
  fillColor: string;
  position: { x: number; y: number };
}

const FractionCircle = ({ numerator, denominator, fillColor, position }: FractionCircleProps) => {
  const radius = 50;
  const paths = [];

  for (let i = 0; i < numerator; i++) {
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

    paths.push(
      <path key={i} d={d} fill={fillColor} stroke="black" strokeWidth="1" />
    );
  }

  return (
    <g transform={`translate(${position.x},${position.y})`}>
      <circle r={radius} fill="#eee" stroke="black" strokeWidth="2" />
      {paths}
    </g>
  );
};

const OperationExample = ({ a, b, r, colorA, colorB, colorR }: any) => (
  <svg width="480" height="130">
    <FractionCircle numerator={a.n} denominator={a.d} fillColor={colorA} position={{ x: 60, y: 60 }} />
    <FractionCircle numerator={b.n} denominator={b.d} fillColor={colorB} position={{ x: 180, y: 60 }} />
    <FractionCircle numerator={r.n} denominator={r.d} fillColor={colorR} position={{ x: 300, y: 60 }} />
  </svg>
);

const AdditionIllustration = () => (
  <div className="flex flex-col items-center gap-10 mt-6">
    <OperationExample a={{ n: 1, d: 4 }} b={{ n: 2, d: 4 }} r={{ n: 3, d: 4 }} colorA="lightblue" colorB="lightgreen" colorR="lightcoral" />
    <p>1/4 + 2/4 = 3/4</p>

    <OperationExample a={{ n: 2, d: 5 }} b={{ n: 1, d: 5 }} r={{ n: 3, d: 5 }} colorA="lightblue" colorB="lightgreen" colorR="lightcoral" />
    <p>2/5 + 1/5 = 3/5</p>
  </div>
);

const SoustractionIllustration = () => (
  <div className="flex flex-col items-center gap-10 mt-6">
    <OperationExample a={{ n: 3, d: 5 }} b={{ n: 1, d: 5 }} r={{ n: 2, d: 5 }} colorA="lightcoral" colorB="lightsalmon" colorR="orange" />
    <p>3/5 - 1/5 = 2/5</p>

    <OperationExample a={{ n: 5, d: 6 }} b={{ n: 2, d: 6 }} r={{ n: 3, d: 6 }} colorA="lightcoral" colorB="lightsalmon" colorR="orange" />
    <p>5/6 - 2/6 = 3/6 = 1/2</p>
  </div>
);

const MultiplicationIllustration = () => (
  <div className="flex flex-col items-center gap-10 mt-6">
    <OperationExample a={{ n: 1, d: 2 }} b={{ n: 3, d: 4 }} r={{ n: 3, d: 8 }} colorA="#ADD8E6" colorB="#FFD700" colorR="#90EE90" />
    <p>1/2 × 3/4 = 3/8</p>

    <OperationExample a={{ n: 2, d: 3 }} b={{ n: 3, d: 5 }} r={{ n: 6, d: 15 }} colorA="#ADD8E6" colorB="#FFD700" colorR="#90EE90" />
    <p>2/3 × 3/5 = 6/15</p>
  </div>
);

const DivisionIllustration = () => (
  <div className="flex flex-col items-center gap-10 mt-6">
    <OperationExample a={{ n: 3, d: 4 }} b={{ n: 1, d: 2 }} r={{ n: 6, d: 4 }} colorA="#ADD8E6" colorB="#FFD700" colorR="#FFA07A" />
    <p>3/4 ÷ 1/2 = 6/4 = 1 1/2</p>

    <OperationExample a={{ n: 2, d: 3 }} b={{ n: 2, d: 5 }} r={{ n: 10, d: 6 }} colorA="#ADD8E6" colorB="#FFD700" colorR="#FFA07A" />
    <p>2/3 ÷ 2/5 = 10/6 = 1 2/3</p>
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
      example: "1/4 + 2/4 = 3/4",
      illustration: <AdditionIllustration />
    },
    {
      name: "Soustraction de fractions",
      description: "La soustraction de fractions suit la même règle que l'addition. On doit rendre les dénominateurs égaux si nécessaire.",
      formula: "A/B - C/B = (A - C)/B",
      example: "3/5 - 1/5 = 2/5",
      illustration: <SoustractionIllustration />
    },
    {
      name: "Multiplication de fractions",
      description: "Pour multiplier des fractions, on multiplie les numérateurs entre eux et les dénominateurs entre eux.",
      formula: "A/B × C/D = (A×C)/(B×D)",
      example: "1/2 × 3/4 = 3/8",
      illustration: <MultiplicationIllustration />
    },
    {
      name: "Division de fractions",
      description: "Pour diviser des fractions, on multiplie la première fraction par l'inverse de la deuxième.",
      formula: "A/B ÷ C/D = A/B × D/C",
      example: "3/4 ÷ 1/2 = 6/4 = 1 1/2",
      illustration: <DivisionIllustration />
    },
  ];

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
              onClick={() => setSelectedOperation(operation)}
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
              <div className="mt-6 flex flex-col items-center gap-10">
                {selectedOperation.illustration}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
