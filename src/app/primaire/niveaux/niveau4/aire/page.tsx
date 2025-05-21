"use client";

import { useState, useEffect } from "react";

type Cell = 0 | 1;

interface Question {
  id: number;
  grid: Cell[][];
  correctAnswer: number;
}

const gridSize = 10;

const generateRandomGridShape = (): Cell[][] => {
  const grid: Cell[][] = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));

  let blocksToFill = Math.floor(Math.random() * 16) + 15; // 15 à 30 cases
  while (blocksToFill > 0) {
    const row = Math.floor(Math.random() * gridSize);
    const col = Math.floor(Math.random() * gridSize);
    if (grid[row][col] === 0) {
      grid[row][col] = 1;
      blocksToFill--;
    }
  }

  return grid;
};

const generateQuestion = (id: number): Question => {
  const grid = generateRandomGridShape();
  const correctAnswer = grid.flat().filter((v) => v === 1).length;

  return { id, grid, correctAnswer };
};

export default function AreaByCounting() {
  const totalQuestions = 10;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string[]>([]);

  useEffect(() => {
    const qs = Array.from({ length: totalQuestions }, (_, i) => generateQuestion(i));
    setQuestions(qs);
    setAnswers(Array(qs.length).fill(""));
    setFeedback(Array(qs.length).fill(""));
  }, []);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const validateAnswers = () => {
    const result = questions.map((q, i) => {
      const val = parseInt(answers[i]);
      if (isNaN(val)) return " Veuillez entrer un nombre";
      return val === q.correctAnswer ? " Correct !" : ` Faux. Réponse : ${q.correctAnswer}`;
    });
    setFeedback(result);
  };

  const renderGridSVG = (grid: Cell[][]) => {
    const cellSize = 20;
    const colors = ["#60a5fa", "#f87171", "#34d399", "#fbbf24", "#a78bfa"];
    const fillColor = colors[Math.floor(Math.random() * colors.length)];

    return (
      <svg width={cellSize * gridSize} height={cellSize * gridSize}>
        {/* Quadrillage */}
        {grid.map((row, y) =>
          row.map((_, x) => (
            <rect
              key={`grid-${x}-${y}`}
              x={x * cellSize}
              y={y * cellSize}
              width={cellSize}
              height={cellSize}
              stroke="#ccc"
              fill="white"
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
                fill={fillColor}
              />
            ) : null
          )
        )}
      </svg>
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-6 text-center"> Aire sur quadrillage</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {questions.map((q, i) => (
          <div key={q.id} className="bg-white p-4 rounded-lg shadow-md">
            <p className="font-semibold mb-2">Question {i + 1} :</p>
            <div className="flex justify-center mb-3">{renderGridSVG(q.grid)}</div>
            <label className="block mb-2 font-medium">Quelle est l’aire de cette figure (en unités carrées) ?</label>
            <input
              type="number"
              className="w-full border border-gray-400 p-2 rounded"
              value={answers[i]}
              onChange={(e) => handleChange(i, e.target.value)}
            />
            {feedback[i] && (
              <p
                className={`mt-2 font-bold ${
                  feedback[i].startsWith("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {feedback[i]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={validateAnswers}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700"
        >
          Valider mes réponses
        </button>
      </div>
    </div>
  );
}
