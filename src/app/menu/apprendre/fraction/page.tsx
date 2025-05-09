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
  const paths = [];
  const lines = [];

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

    paths.push(
      <path key={`path-${i}`} d={d} fill={fill} stroke="black" strokeWidth="1" />
    );

    lines.push(
      <line
        key={`line-${i}`}
        x1={0}
        y1={0}
        x2={x1}
        y2={y1}
        stroke="black"
        strokeWidth="1"
      />
    );
  }

  return (
    <g transform={`translate(${position.x},${position.y})`}>
      {paths}
      {lines}
      <circle r={radius} fill="none" stroke="black" strokeWidth="2" />
    </g>
  );
};

// Illustrations
const AdditionIllustration1 = () => (
  <svg width="480" height="130">
    <FractionCircle numerator={1} denominator={4} fillColors={["lightblue"]} position={{ x: 60, y: 60 }} />
    <FractionCircle numerator={2} denominator={4} fillColors={["lightgreen"]} position={{ x: 180, y: 60 }} />
    <FractionCircle numerator={3} denominator={4} fillColors={["lightblue", "lightgreen", "lightgreen"]} position={{ x: 300, y: 60 }} />
  </svg>
);

const AdditionIllustration2 = () => (
  <svg width="480" height="130">
    <text x="30" y="70" fontSize="20">1/3 + 1/4 = 4/12 + 3/12 = 7/12</text>
  </svg>
);

const SoustractionIllustration1 = () => (
  <svg width="480" height="130">
    <FractionCircle numerator={3} denominator={5} fillColors={["lightcoral"]} position={{ x: 60, y: 60 }} />
    <FractionCircle numerator={1} denominator={5} fillColors={["lightsalmon"]} position={{ x: 180, y: 60 }} />
    <FractionCircle numerator={2} denominator={5} fillColors={["lightcoral", "lightcoral"]} position={{ x: 300, y: 60 }} />
  </svg>
);

const SoustractionIllustration2 = () => (
  <svg width="480" height="130">
    <text x="20" y="70" fontSize="20">2/3 - 1/4 = 8/12 - 3/12 = 5/12</text>
  </svg>
);

const MultiplicationIllustration1 = () => (
  <svg width="500" height="130">
    {/* 1/2 */}
    <FractionCircle numerator={1} denominator={2} fillColors={["#ADD8E6"]} position={{ x: 60, y: 60 }} />

    {/* 3/4 */}
    <FractionCircle numerator={3} denominator={4} fillColors={["#90EE90"]} position={{ x: 180, y: 60 }} />

    {/* Résultat : 3/8 */}
    <FractionCircle numerator={3} denominator={8} fillColors={["#ADD8E6", "#90EE90", "#90EE90"]} position={{ x: 320, y: 60 }} />
  </svg>
);

const MultiplicationIllustration2 = () => (
  <svg width="500" height="130">
    {/* 2/3 */}
    <FractionCircle numerator={2} denominator={3} fillColors={["#FFA07A"]} position={{ x: 60, y: 60 }} />

    {/* 3/5 */}
    <FractionCircle numerator={3} denominator={5} fillColors={["#8FBC8F"]} position={{ x: 180, y: 60 }} />

    {/* Résultat : 6/15 */}
    <FractionCircle numerator={6} denominator={15} fillColors={["#FFA07A", "#FFA07A", "#8FBC8F", "#8FBC8F", "#8FBC8F", "#8FBC8F"]} position={{ x: 320, y: 60 }} />
  </svg>
);



const DivisionIllustration1 = () => (
  <svg width="480" height="130">
    <FractionCircle numerator={3} denominator={4} fillColors={["#ADD8E6"]} position={{ x: 60, y: 60 }} />
    <FractionCircle numerator={1} denominator={2} fillColors={["#FFD700"]} position={{ x: 180, y: 60 }} />
    <FractionCircle numerator={6} denominator={4} fillColors={["#ADD8E6", "#ADD8E6", "#FFD700", "#FFD700", "#FFD700", "#FFD700"]} position={{ x: 300, y: 60 }} />
  </svg>
);

const DivisionIllustration2 = () => (
  <svg width="480" height="130">
    <text x="10" y="70" fontSize="20">2/3 ÷ 5/6 = 2/3 × 6/5 = 12/15 = 4/5</text>
  </svg>
);

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
  const [selectedOperation, setSelectedOperation] = useState<FractionOperation | null>(null);
  const [exampleIndex, setExampleIndex] = useState(0);

  const operations: FractionOperation[] = [
    {
      name: "Addition de fractions",
      formula: "A/B + C/D = (A×D + C×B)/(B×D)",
      examples: [
        {
          description: "Addition avec dénominateurs identiques.",
          example: "1/4 + 2/4 = 3/4",
          illustration: <AdditionIllustration1 />,
        },
        {
          description: "Addition avec dénominateurs différents.",
          example: "1/3 + 1/4 = 4/12 + 3/12 = 7/12",
          illustration: <AdditionIllustration2 />,
        }
      ]
    },
    {
      name: "Soustraction de fractions",
      formula: "A/B - C/D = (A×D - C×B)/(B×D)",
      examples: [
        {
          description: "Soustraction avec dénominateurs identiques.",
          example: "3/5 - 1/5 = 2/5",
          illustration: <SoustractionIllustration1 />,
        },
        {
          description: "Soustraction avec dénominateurs différents.",
          example: "2/3 - 1/4 = 8/12 - 3/12 = 5/12",
          illustration: <SoustractionIllustration2 />,
        }
      ]
    },
    {
      name: "Multiplication de fractions",
      formula: "A/B × C/D = (A×C)/(B×D)",
      examples: [
        {
          description: "Multiplication simple.",
          example: "1/2 × 3/4 = 3/8",
          illustration: <MultiplicationIllustration1 />,
        },
        {
          description: "Multiplication avec réduction possible.",
          example: "2/3 × 3/5 = 6/15",
          illustration: <MultiplicationIllustration2 />,
        }
      ]
    },
    {
      name: "Division de fractions",
      formula: "A/B ÷ C/D = A/B × D/C",
      examples: [
        {
          description: "Division simple.",
          example: "3/4 ÷ 1/2 = 6/4 = 1 1/2",
          illustration: <DivisionIllustration1 />,
        },
        {
          description: "Division avec réduction.",
          example: "2/3 ÷ 5/6 = 2/3 × 6/5 = 12/15 = 4/5",
          illustration: <DivisionIllustration2 />,
        }
      ]
    }
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
        <p className="text-lg mb-6 text-center">Sélectionne une opération :</p>

        <div className="flex flex-col gap-6">
          {operations.map((operation, index) => (
            <button
              key={index}
              className="bg-blue-500 text-white py-2 px-6 rounded font-bold mb-4 transition-all duration-300 hover:bg-blue-700"
              onClick={() => {
                setSelectedOperation(operation);
                setExampleIndex(0);
              }}
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
            <p className="text-md mb-4">{selectedOperation.examples[exampleIndex].description}</p>
            <p className="text-lg font-bold mb-2">Formule :</p>
            <p className="text-lg mb-4">{selectedOperation.formula}</p>
            <p className="text-lg font-bold mb-2">Exemple :</p>
            <p className="text-lg mb-4">{selectedOperation.examples[exampleIndex].example}</p>
            <div className="mt-6 flex justify-center">{selectedOperation.examples[exampleIndex].illustration}</div>

            {selectedOperation.examples.length > 1 && (
              <div className="mt-8 flex justify-center">
                <button
                  className="bg-green-500 text-white py-2 px-6 rounded font-bold hover:bg-green-600"
                  onClick={() =>
                    setExampleIndex((prev) => (prev + 1) % selectedOperation.examples.length)
                  }
                >
                  Exemple suivant
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
