"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Question {
  id: number;
  text: string;
  func: (x: number) => number;
  correctAnswer: string;
}

const width = 300;
const height = 300;
const scale = 25;
const originX = width / 2;
const originY = height / 2;

const generatePath = (f: (x: number) => number) => {
  let path = "";
  for (let px = 0; px <= width; px++) {
    const x = (px - originX) / scale;
    const y = f(x);
    const py = originY - y * scale;
    path += px === 0 ? `M ${px},${py}` : ` L ${px},${py}`;
  }
  return path;
};

const renderCartesian = (f: (x: number) => number) => {
  return (
    <svg width={width} height={height} style={{ border: "1px solid #ddd", background: "white" }}>
      {/* Grille */}
      {Array.from({ length: Math.floor(width / scale) }).map((_, i) => {
        const px = originX + (i - 6) * scale;
        return <line key={`v${i}`} x1={px} y1={0} x2={px} y2={height} stroke="#ccc" strokeWidth={0.5} />;
      })}
      {Array.from({ length: Math.floor(height / scale) }).map((_, i) => {
        const py = originY - (i - 6) * scale;
        return <line key={`h${i}`} x1={0} y1={py} x2={width} y2={py} stroke="#ccc" strokeWidth={0.5} />;
      })}

      {/* Axes */}
      <line x1={0} y1={originY} x2={width} y2={originY} stroke="black" strokeWidth={1} />
      <line x1={originX} y1={0} x2={originX} y2={height} stroke="black" strokeWidth={1} />

      {/* Graduations */}
      {Array.from({ length: 11 }).map((_, i) => {
        const val = i - 5;
        return (
          <text key={`lx${i}`} x={originX + val * scale} y={originY + 12} fontSize="10" textAnchor="middle">
            {val}
          </text>
        );
      })}
      {Array.from({ length: 11 }).map((_, i) => {
        const val = i - 5;
        return (
          <text key={`ly${i}`} x={originX + 12} y={originY - val * scale + 4} fontSize="10">
            {val}
          </text>
        );
      })}

      {/* Courbe */}
      <path d={generatePath(f)} stroke="blue" fill="none" strokeWidth={2} />
    </svg>
  );
};

export default function TestFonctions() {
  const totalQuestions = 20;
  const questionsPerPage = 3;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (questions.length === 0) {
      const qs: Question[] = [
        { id: 1, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => 2 * x + 1, correctAnswer: "1" },
        { id: 2, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => -x + 3, correctAnswer: "3" },
        { id: 3, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => x * x - 2, correctAnswer: "-2" },
        { id: 4, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => 0.5 * x - 4, correctAnswer: "-4" },
        { id: 5, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => -2 * x, correctAnswer: "0" },
        { id: 6, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => x * x + 5, correctAnswer: "5" },
        { id: 7, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => -0.5 * x + 2, correctAnswer: "2" },
        { id: 8, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => 3 * x - 7, correctAnswer: "-7" },
        { id: 9, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => x * x * x, correctAnswer: "0" },
        { id: 10, text: "Quelle est l’ordonnée à l’origine ?", func: () => 4, correctAnswer: "4" },
        { id: 11, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => -3 * x + 6, correctAnswer: "6" },
        { id: 12, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => x * x - 9, correctAnswer: "-9" },
        { id: 13, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => 2 * x - 8, correctAnswer: "-8" },
        { id: 14, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => -x * x + 10, correctAnswer: "10" },
        { id: 15, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => 0.25 * x + 1, correctAnswer: "1" },
        { id: 16, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => -4 * x + 12, correctAnswer: "12" },
        { id: 17, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => x * x / 2 - 3, correctAnswer: "-3" },
        { id: 18, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => 5 * x + 15, correctAnswer: "15" },
        { id: 19, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => -2 * x - 5, correctAnswer: "-5" },
        { id: 20, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => x * x - x, correctAnswer: "0" },
      ];
      setQuestions(qs);
      setAnswers(Array(qs.length).fill(""));
      setFeedback(Array(qs.length).fill(""));
    }
  }, [questions]);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const validateOne = (index: number) => {
    if (answers[index].trim() === questions[index].correctAnswer) {
      updateFeedback(index, "Réponse correcte");
    } else {
      updateFeedback(index, "Réponse erronée");
    }
  };

  const updateFeedback = (index: number, message: string) => {
    const newFeedback = [...feedback];
    newFeedback[index] = message;
    setFeedback(newFeedback);
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
      <Link href="/menu/apprendre/fonctions" className="fixed bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold z-50">
        Apprendre
      </Link>
      <Link href="/secondaire/niveaux/niveau5" className="fixed top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-50">
        Retour
      </Link>

      <div className="max-w-4xl w-full bg-[#1e1f3d] p-6 rounded-lg shadow-lg pb-40 space-y-12">
        <h1 className="text-3xl font-bold text-center">Questions sur les fonctions</h1>

        {currentQuestions.map((q, i) => {
          const globalIndex = startIndex + i;
          return (
            <div key={q.id} className="bg-[#2a2c50] p-6 rounded-lg shadow-md border border-gray-600">
              <p className="text-lg font-bold mb-2">Question {globalIndex + 1} :</p>
              <div className="flex justify-center mb-4">{renderCartesian(q.func)}</div>
              <p className="mb-2">{q.text}</p>
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
                  className="text-blue-300 font-bold border border-blue-400 px-6 py-2 rounded hover:bg-blue-800"
                >
                  Valider
                </button>
                {feedback[globalIndex] && (
                  <span
                    className={`text-lg font-semibold ${
                      feedback[globalIndex].includes("correcte") ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {feedback[globalIndex]}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-4 right-4 bg-[#1e1f3d] border-t border-gray-700 shadow-md px-6 py-3 rounded-lg flex gap-6 z-50">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className={`px-6 py-2 rounded font-bold ${
            currentPage === 0
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
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
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Page suivante
        </button>
      </div>
    </div>
  );
}
