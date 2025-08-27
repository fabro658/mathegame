'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

type Cell = 0 | 1;

interface Question {
  id: number;
  grid: Cell[][];
  correctAnswer: number;
}

const gridSize = 10;
const colors = ["#60a5fa", "#f87171", "#34d399", "#fbbf24", "#a78bfa"];

const calculatePerimeter = (grid: Cell[][]): number => {
  let perimeter = 0;
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (grid[y][x] === 1) {
        if (x === 0 || grid[y][x - 1] === 0) perimeter++;
        if (x === gridSize - 1 || grid[y][x + 1] === 0) perimeter++;
        if (y === 0 || grid[y - 1][x] === 0) perimeter++;
        if (y === gridSize - 1 || grid[y + 1][x] === 0) perimeter++;
      }
    }
  }
  return perimeter;
};

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
  const correctAnswer = calculatePerimeter(shape);
  return { id, grid: shape, correctAnswer };
};

export default function PerimetreByCounting() {
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
        style={{ backgroundColor: '#1e1f3d', border: "1px solid #333" }}
      >
        {grid.map((row, y) =>
          row.map((_, x) => (
            <rect
              key={`bg-${x}-${y}`}
              x={x * cellSize}
              y={y * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#2e2f4d"
              stroke="#555"
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
    <div className="h-screen overflow-y-auto flex justify-center items-start bg-[#0b0c2a] text-white p-4 relative">

      {/* Boutons fixes en haut */}
      <Link
        href="/menu/apprendre/perimetre"
        className="fixed top-4 left-4 bg-black text-white py-3 px-8 rounded font-bold z-50"
      >
        Apprendre
      </Link>
      <Link
        href="/primaire/niveaux/niveau4"
        className="fixed top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-50"
      >
        Retour
      </Link>

      {/* Contenu des questions */}
      <div className="max-w-4xl w-full bg-[#1c1d3a] p-6 rounded-lg shadow-lg pb-40 space-y-12">
        <h1 className="text-3xl font-bold text-center text-white">
          Périmètre en comptant les côtés
        </h1>

        {currentQuestions.map((q, i) => {
          const globalIndex = startIndex + i;
          return (
            <div key={q.id} className="bg-[#2c2e50] p-6 rounded-lg shadow-md border border-gray-600">
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-bold text-white">Question {globalIndex + 1} :</p>
                {feedback[globalIndex] && (
                  <span
                    className={`text-xl font-semibold ${
                      feedback[globalIndex] === "Réponse correcte"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {feedback[globalIndex]}
                  </span>
                )}
              </div>
              <div className="flex justify-center mb-4">
                {renderSVG(q.grid, colors[q.id % colors.length])}
              </div>
              <label className="block mb-2 font-semibold text-white">
                Quel est le périmètre de cette figure (en unités) ?
              </label>
              <div className="flex flex-col md:flex-row items-start gap-4">
                <input
                  type="text"
                  placeholder="Réponse"
                  className="flex-1 border border-gray-400 p-3 text-lg rounded w-full text-black"
                  value={answers[globalIndex]}
                  onChange={(e) => handleChange(globalIndex, e.target.value)}
                />
                <button
                  onClick={() => validateOne(globalIndex)}
                  className="text-blue-400 font-bold border border-blue-400 px-6 py-2 rounded hover:bg-blue-800"
                >
                  Valider la réponse
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination en bas */}
      <div className="fixed bottom-4 right-4 bg-[#1c1d3a] border-t border-gray-600 shadow-md px-6 py-3 rounded-lg flex gap-6 z-50">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className={`px-6 py-2 rounded font-bold ${
            currentPage === 0
              ? "bg-gray-500 text-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Page précédente
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className={`px-6 py-2 rounded font-bold ${
            currentPage === totalPages - 1
              ? "bg-gray-500 text-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Page suivante
        </button>
      </div>
    </div>
  );
}
