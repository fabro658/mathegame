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

  const startX = Math.floor(Math.random() * gridSize);
  const startY = Math.floor(Math.random() * gridSize);
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
  const totalQuestions = 20;
  const questionsPerPage = 5;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

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

  const validateOne = (index: number) => {
    const val = parseInt(answers[index]);
    if (isNaN(val)) {
      updateFeedback(index, "Veuillez entrer un nombre");
    } else if (val === questions[index].correctAnswer) {
      updateFeedback(index, "Réponse correcte");
    } else {
      updateFeedback(index, "Faux");
    }
  };

  const updateFeedback = (index: number, message: string) => {
    const newFeedback = [...feedback];
    newFeedback[index] = message;
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

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const startIndex = currentPage * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 text-black pt-8 px-4 pb-40">
      <h1 className="text-3xl font-bold mb-8 text-center">Aire en comptant les carrés</h1>

      <div className="flex flex-col gap-10 max-w-3xl mx-auto">
        {currentQuestions.map((q, i) => {
          const globalIndex = startIndex + i;
          return (
            <div key={q.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-bold">Question {globalIndex + 1} :</p>
                {feedback[globalIndex] && (
                  <span
                    className={`text-sm font-semibold ${
                      feedback[globalIndex] === "Réponse correcte"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {feedback[globalIndex]}
                  </span>
                )}
              </div>
              <div className="flex justify-center mb-4">
                {renderSVG(q.grid, colors[q.id % colors.length])}
              </div>
              <label className="block mb-2 font-semibold">
                Quelle est l’aire de cette figure (en unités carrées) ?
              </label>
              <div className="flex flex-col md:flex-row items-start gap-4">
                <input
                  type="text"
                  placeholder="ex: 23"
                  className="flex-1 border border-gray-400 p-3 text-lg rounded w-full"
                  value={answers[globalIndex]}
                  onChange={(e) => handleChange(globalIndex, e.target.value)}
                />
                <button
                  onClick={() => validateOne(globalIndex)}
                  className="text-red-600 font-bold border border-red-400 px-6 py-2 rounded hover:bg-red-100"
                >
                  Valider la réponse
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky footer with pagination */}
      <div className="sticky bottom-0 left-0 right-0 bg-white shadow-inner py-4 mt-8 flex justify-center gap-8 z-20 border-t border-gray-200">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className={`px-6 py-3 rounded font-bold ${
            currentPage === 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Page précédente
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className={`px-6 py-3 rounded font-bold ${
            currentPage === totalPages - 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Page suivante
        </button>
      </div>
    </div>
  );
}