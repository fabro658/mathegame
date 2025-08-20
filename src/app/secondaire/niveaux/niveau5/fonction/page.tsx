"use client";

import { useState } from "react";
import Link from "next/link";

type Question = {
  questionText: string;
  correctAnswer: string;
  Graph: React.FC; // un composant React qui rend le graphique
};

const width = 300;
const height = 300;
const scale = 20; // 1 unité = 20px
const originX = width / 2;
const originY = height / 2;

// === Générateur de grille et axes ===
const GridAndAxes: React.FC = () => {
  const lines = [];

  // lignes verticales
  for (let x = 0; x <= width; x += scale) {
    lines.push(
      <line
        key={`v${x}`}
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        stroke="#ddd"
        strokeWidth={1}
      />
    );
  }

  // lignes horizontales
  for (let y = 0; y <= height; y += scale) {
    lines.push(
      <line
        key={`h${y}`}
        x1={0}
        y1={y}
        x2={width}
        y2={height}
        stroke="#ddd"
        strokeWidth={1}
      />
    );
  }

  return (
    <g>
      {lines}
      {/* Axes */}
      <line
        x1={0}
        y1={originY}
        x2={width}
        y2={originY}
        stroke="black"
        strokeWidth={1.5}
      />
      <line
        x1={originX}
        y1={0}
        x2={originX}
        y2={height}
        stroke="black"
        strokeWidth={1.5}
      />
    </g>
  );
};

// === Fonctions graphiques ===
const LineGraph: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const points: string[] = [];
  for (let x = -10; x <= 10; x += 0.1) {
    const y = a * x + b;
    const svgX = originX + x * scale;
    const svgY = originY - y * scale;
    points.push(`${svgX},${svgY}`);
  }

  return (
    <svg width={width} height={height} style={{ border: "1px solid #ccc" }}>
      <GridAndAxes />
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke="blue"
        strokeWidth={1}
      />
    </svg>
  );
};

const QuadraticGraph: React.FC<{ a: number; b: number; c: number }> = ({
  a,
  b,
  c,
}) => {
  const points: string[] = [];
  for (let x = -10; x <= 10; x += 0.1) {
    const y = a * x * x + b * x + c;
    const svgX = originX + x * scale;
    const svgY = originY - y * scale;
    points.push(`${svgX},${svgY}`);
  }

  return (
    <svg width={width} height={height} style={{ border: "1px solid #ccc" }}>
      <GridAndAxes />
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke="red"
        strokeWidth={1}
      />
    </svg>
  );
};

const AbsoluteGraph: React.FC<{ a: number; h: number; b: number }> = ({
  a,
  h,
  b,
}) => {
  const points: string[] = [];
  for (let x = -10; x <= 10; x += 0.1) {
    const y = a * Math.abs(x - h) + b;
    const svgX = originX + x * scale;
    const svgY = originY - y * scale;
    points.push(`${svgX},${svgY}`);
  }

  return (
    <svg width={width} height={height} style={{ border: "1px solid #ccc" }}>
      <GridAndAxes />
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke="green"
        strokeWidth={1}
      />
    </svg>
  );
};

const ExponentialGraph: React.FC<{ a: number; b: number; h: number; k: number }> = ({
  a,
  b,
  h,
  k,
}) => {
  const points: string[] = [];
  for (let x = -10; x <= 10; x += 0.1) {
    const y = a * Math.pow(b, x - h) + k;
    const svgX = originX + x * scale;
    const svgY = originY - y * scale;
    if (svgY < 1000 && svgY > -1000) {
      points.push(`${svgX},${svgY}`);
    }
  }

  return (
    <svg width={width} height={height} style={{ border: "1px solid #ccc" }}>
      <GridAndAxes />
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke="purple"
        strokeWidth={1}
      />
    </svg>
  );
};

// === Liste des questions ===
const questions: Question[] = [
  {
    questionText: "Quelle est la pente de la droite y = 2x + 1 ?",
    correctAnswer: "2",
    Graph: () => <LineGraph a={2} b={1} />,
  },
  {
    questionText: "Quel est le sommet de la parabole y = x² - 4x + 3 ?",
    correctAnswer: "(2, -1)",
    Graph: () => <QuadraticGraph a={1} b={-4} c={3} />,
  },
  {
    questionText: "Où est le sommet de la fonction valeur absolue y = |x-2| - 3 ?",
    correctAnswer: "(2, -3)",
    Graph: () => <AbsoluteGraph a={1} h={2} b={-3} />,
  },
  {
    questionText: "Quelle est l’asymptote horizontale de y = 2 * 3^(x-1) + 1 ?",
    correctAnswer: "y = 1",
    Graph: () => <ExponentialGraph a={2} b={3} h={1} k={1} />,
  },
];

export default function TestFonctions() {
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (answer.trim() === questions[current].correctAnswer) {
      setFeedback("Bonne réponse !");
    } else {
      setFeedback(`Mauvaise réponse. Réponse attendue: ${questions[current].correctAnswer}`);
    }
  };

  const nextQuestion = () => {
    setCurrent((prev) => (prev + 1) % questions.length);
    setAnswer("");
    setFeedback("");
  };

  const CurrentGraph = questions[current].Graph;

  return (
    <div className="p-6">
      <Link href="/secondaire/niveaux" className="text-blue-500 underline">
        Retour
      </Link>

      <h2 className="text-xl font-bold my-4">{questions[current].questionText}</h2>

      <CurrentGraph />

      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="border p-2 my-2"
        placeholder="Votre réponse"
      />
      <button
        onClick={handleSubmit}
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Valider
      </button>

      {feedback && <p className="mt-2">{feedback}</p>}

      <button
        onClick={nextQuestion}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Question suivante
      </button>
    </div>
  );
}
