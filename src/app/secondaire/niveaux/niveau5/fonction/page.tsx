"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Question {
  id: number;
  text: string;
  func: (x: number) => number;
  answerFunc: () => string;
}

const width = 300;
const height = 300;
const scale = 25; // 1 unité = 25 px
const originX = width / 2;
const originY = height / 2;

const generatePath = (f: (x: number) => number) => {
  let path = "";
  for (let px = 0; px <= width; px++) {
    const x = (px - originX) / scale;
    const y = f(x);
    const py = originY - y * scale;
    if (px === 0) path = `M ${px},${py}`;
    else path += ` L ${px},${py}`;
  }
  return path;
};

const renderCartesian = (f: (x: number) => number) => {
  return (
    <svg
      width={width}
      height={height}
      style={{ border: "1px solid #ddd", background: "white" }}
    >
      {/* Grille verticale */}
      {Array.from({ length: Math.floor(width / scale) }, (_, i) => i - 6).map((val, idx) => {
        const px = originX + val * scale;
        return <line key={idx} x1={px} y1={0} x2={px} y2={height} stroke="#ccc" strokeWidth={0.5} />;
      })}
      {/* Grille horizontale */}
      {Array.from({ length: Math.floor(height / scale) }, (_, i) => i - 6).map((val, idx) => {
        const py = originY - val * scale;
        return <line key={idx} x1={0} y1={py} x2={width} y2={py} stroke="#ccc" strokeWidth={0.5} />;
      })}

      {/* Axes */}
      <line x1={0} y1={originY} x2={width} y2={originY} stroke="black" strokeWidth={1} />
      <line x1={originX} y1={0} x2={originX} y2={height} stroke="black" strokeWidth={1} />

      {/* Graduations */}
      {Array.from({ length: 11 }, (_, i) => i - 5).map((val) => (
        <text key={`lx${val}`} x={originX + val * scale} y={originY + 12} fontSize="10" textAnchor="middle">
          {val}
        </text>
      ))}
      {Array.from({ length: 11 }, (_, i) => i - 5).map((val) => (
        <text key={`ly${val}`} x={originX + 12} y={originY - val * scale + 4} fontSize="10">
          {val}
        </text>
      ))}

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
        // Droites
        { id: 1, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => 2*x + 1, answerFunc: () => "1" },
        { id: 2, text: "Quelle est la pente de cette droite ?", func: (x) => -3*x + 4, answerFunc: () => "-3" },
        { id: 3, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => 0.5*x - 2, answerFunc: () => "-2" },

        // Paraboles
        { id: 4, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => x*x - 3, answerFunc: () => "-3" },
        { id: 5, text: "Quelle est l’abscisse du sommet ?", func: (x) => -x*x + 4*x - 1, answerFunc: () => "2" },
        { id: 6, text: "Quel est le sommet (x, y) ?", func: (x) => 2*x*x - 8*x + 5, answerFunc: () => "(2, -3)" },

        // Droites simples
        { id: 7, text: "Quelle est la pente ?", func: (x) => 3*x + 2, answerFunc: () => "3" },
        { id: 8, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => -0.5*x + 1, answerFunc: () => "1" },

        // Cubiques / Constantes
        { id: 9, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => x*x*x, answerFunc: () => "0" },
        { id: 10, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => 5, answerFunc: () => "5" },

        { id: 11, text: "Quelle est la pente ?", func: (x) => 4*x + 1, answerFunc: () => "4" },
        { id: 12, text: "Quel est le sommet (x, y) ?", func: (x) => -x*x + 6, answerFunc: () => "(0,6)" },
        { id: 13, text: "Quelle est l’abscisse du sommet ?", func: (x) => 2*x*x - 8*x + 6, answerFunc: () => "2" },

        // Droites
        { id: 14, text: "Quelle est la pente ?", func: (x) => -2*x + 3, answerFunc: () => "-2" },
        { id: 15, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => 0.25*x + 1, answerFunc: () => "1" },

        // Paraboles
        { id: 16, text: "Quel est le sommet (x, y) ?", func: (x) => -0.5*x*x + 3*x - 2, answerFunc: () => "(3, 2.5)" },
        { id: 17, text: "Quelle est l’abscisse du sommet ?", func: (x) => x*x - 4*x + 3, answerFunc: () => "2" },

        // Droites simples
        { id: 18, text: "Quelle est la pente ?", func: (x) => 5*x + 10, answerFunc: () => "5" },
        { id: 19, text: "Quelle est l’ordonnée à l’origine ?", func: (x) => -2*x - 5, answerFunc: () => "-5" },
        { id: 20, text: "Quel est le sommet (x, y) ?", func: (x) => -x*x + 4*x - 3, answerFunc: () => "(2,1)" },
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
    if (answers[index].trim() === questions[index].answerFunc()) {
      updateFeedback(index, "✅ Réponse correcte");
    } else {
      updateFeedback(index, "❌ Réponse erronée");
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
      {/* Navigation */}
      <Link
        href="/menu/apprendre/fonctions"
        className="fixed bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold z-50"
      >
        Apprendre
      </Link>
      <Link
        href="/secondaire/niveaux/niveau5"
        className="fixed top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-50"
      >
        Retour
      </Link>

      {/* Contenu */}
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

      {/* Pagination */}
      <div className="fixed bottom-4 right-4 bg-[#1e1f3d] border-t border-gray-700 shadow-md px-6 py-3 rounded-lg flex gap-6 z-50">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className={`px-6 py-2 rounded font-bold ${
            currentPage === 0 ? "bg-gray-600 text-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Page précédente
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className={`px-6 py-2 rounded font-bold ${
            currentPage === totalPages - 1 ? "bg-gray-600 text-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Page suivante
        </button>
      </div>
    </div>
  );
}
