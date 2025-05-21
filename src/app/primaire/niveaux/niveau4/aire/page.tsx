"use client";

import { useState, useEffect } from "react";

type Cell = 0 | 1;

interface Question {
  id: number;
  grid: Cell[][];
  correctAnswer: number;
}

const gridSize = 10;
const colors = ["#60a5fa", "#f87171", "#34d399", "#fbbf24", "#a78bfa"];

const generateConnectedShape = (maxBlocks = 20): Cell[][] => {
  const grid: Cell[][] = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
  const stack: [number, number][] = [];
  const visited = new Set<string>();

  const startX = Math.floor(gridSize / 2);
  const startY = Math.floor(gridSize / 2);
  stack.push([startX, startY]);

  let blocks = 0;
  while (stack.length > 0 && blocks < maxBlocks) {
    const [x, y] = stack.pop()!;
    const key = `${x},${y}`;
    if (
      x >= 0 &&
      x < gridSize &&
      y >= 0 &&
      y < gridSize &&
      !visited.has(key) &&
      grid[y][x] === 0
    ) {
      grid[y][x] = 1;
      visited.add(key);
      blocks++;

      const neighbors: [number, number][] = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ];
      // shuffle neighbors
      neighbors.sort(() => Math.random() - 0.5);
      stack.push(...neighbors);
    }
  }

  return grid;
};

const generateQuestion = (id: number): Question => {
  const shape = generateConnectedShape(15 + Math.floor(Math.random() * 10));
  const correctAnswer = shape.flat().filter((v) => v === 1).length;
  return { id, grid: shape, correctAnswer };
};

export default function AreaByCounting() {
  const totalQuestions = 10;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string[]>([]);

  // Initialiser UNE SEULE FOIS les questions
  useEffect(() => {
    if (questions.length === 0) {
      const qs = Array.from({ length: totalQuestions }, (_, i) => generateQuestion(i));
      setQuestions(qs);
      setAnswers(Array(totalQuestions).fill(""));
      setFeedback(Array(totalQuestions).fill(""));
    }
  }, [questions]);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const validateAnswers = () => {
    const newFeedback = questions.map((q, i) => {
      const entered = parseInt(answers[i]);
      if (isNaN(entered)) return "⚠️ Entrez un nombre";
      return entered === q.correctAnswer
        ? "Correct !"
        : ` Faux. Réponse : ${q.correctAnswer}`;
    });
    setFeedback(newFeedback);
  };

  const renderSVG = (grid: Cell[][], color: string) => {
    const cellSize = 30;
    return (
      <svg
        width={gridSize * cellSize}
        height={gridSize * cellSize}
        style={{ border: "1px solid #ddd" }}
      >
        {/* Grille */}
        {grid.map((row, y) =>
          row.map((_, x) => (
            <rect
              key={`bg-${x}-${y}`}
              x={x * cellSize}
              y={y * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#fff"
              stroke="#ccc"
            />
          ))
        )}
        {/* Forme */}
        {grid.map((row, y) =>
          row.map((val, x) =>
            val === 1 ? (
              <rect
                key={`shape-${x}-${y}`}
                x={x * cellSize}
                y={y * cellSize}
                width={cellSize}
                height={cellSize}
                fill={color}
                stroke="#000"
              />
            ) : null
          )
        )}
      </svg>
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-black flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-center"> Aire en comptant les carrés</h1>

      <div className="flex flex-col gap-10 w-full max-w-3xl">
        {questions.map((q, i) => (
          <div key={q.id} className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg font-bold mb-4">Question {i + 1} :</p>
            <div className="flex justify-center mb-4">
              {renderSVG(q.grid, colors[i % colors.length])}
            </div>
            <label className="block mb-2 font-semibold">
              Quelle est l’aire de cette figure (en unités carrées) ?
            </label>
            <input
              type="text"
              placeholder="ex: 23"
              className="w-full border border-gray-400 p-3 text-lg rounded"
              value={answers[i]}
              onChange={(e) => handleChange(i, e.target.value)}
            />
            {feedback[i] && (
              <p
                className={`mt-2 font-bold ${
                  feedback[i].includes("") ? "text-green-600" : "text-red-600"
                }`}
              >
                {feedback[i]}
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={validateAnswers}
        className="mt-10 bg-blue-600 text-white px-10 py-4 rounded-lg font-bold text-xl hover:bg-blue-700"
      >
        Valider toutes les réponses
      </button>
    </div>
  );
}
