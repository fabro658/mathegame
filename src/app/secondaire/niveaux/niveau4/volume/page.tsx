'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Représentation d'une question avec SVG, bonne réponse et identifiant
interface AireQuestion {
  id: number;
  name: string;
  correctAnswer: number;
  Illustration: () => JSX.Element;
}

// Illustrations SVG
const Carre = () => (
  <svg width="120" height="120">
    <rect x="20" y="20" width="80" height="80" stroke="black" fill="none" strokeWidth="2" />
    <text x="60" y="15" textAnchor="middle">4 cm</text>
    <text x="105" y="60" textAnchor="middle" transform="rotate(90, 105, 60)">4 cm</text>
  </svg>
);
const Rectangle = () => (
  <svg width="160" height="100">
    <rect x="20" y="20" width="120" height="60" stroke="black" fill="none" strokeWidth="2" />
    <text x="80" y="15" textAnchor="middle">12 cm</text>
    <text x="10" y="50" textAnchor="middle" transform="rotate(-90, 10, 50)">6 cm</text>
  </svg>
);

// Génération de questions fixes avec leurs SVG et bonnes réponses
const generateAireQuestions = (): AireQuestion[] => [
  { id: 0, name: "Carré", correctAnswer: 16, Illustration: Carre },
  { id: 1, name: "Rectangle", correctAnswer: 72, Illustration: Rectangle },
  // tu peux en ajouter d'autres ici (triangle, cercle, trapèze)
];

export default function AireAvecSVG() {
  const questionsPerPage = 2;
  const questions = generateAireQuestions();
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [feedback, setFeedback] = useState<string[]>(Array(questions.length).fill(""));

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const validateAnswer = (index: number) => {
    const val = parseFloat(answers[index]);
    if (isNaN(val)) {
      feedback[index] = "Veuillez entrer un nombre";
    } else if (Math.abs(val - questions[index].correctAnswer) < 0.01) {
      feedback[index] = "Réponse correcte";
    } else {
      feedback[index] = "Réponse erronée";
    }
    setFeedback([...feedback]);
  };

  const start = currentPage * questionsPerPage;
  const currentQuestions = questions.slice(start, start + questionsPerPage);

  return (
    <div className="min-h-screen bg-[#0b0c2a] text-white p-6 space-y-10">
      <Link href="/menu/apprendre" className="fixed top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded font-bold">
        Retour
      </Link>

      <h1 className="text-3xl font-bold text-center">Calcul d’aire - Questions</h1>

      {currentQuestions.map((q, idx) => {
        const globalIndex = start + idx;
        return (
          <div key={q.id} className="bg-[#1e1f3d] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Question {globalIndex + 1} : {q.name}</h2>
            <div className="flex justify-center mb-4">
              <q.Illustration />
            </div>
            <label htmlFor={`answer-${q.id}`} className="block mb-2">
              Donne l’aire de cette forme (en cm²) :
            </label>
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <input
                id={`answer-${q.id}`}
                type="text"
                className="text-black p-2 rounded border border-gray-400"
                value={answers[globalIndex]}
                onChange={(e) => handleChange(globalIndex, e.target.value)}
              />
              <button
                onClick={() => validateAnswer(globalIndex)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Valider
              </button>
              {feedback[globalIndex] && (
                <span className={`font-bold ${feedback[globalIndex] === "Réponse correcte" ? "text-green-400" : "text-red-400"}`}>
                  {feedback[globalIndex]}
                </span>
              )}
            </div>
          </div>
        );
      })}

      {/* Pagination */}
      <div className="flex justify-between mt-10">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
          disabled={currentPage === 0}
          className={`px-6 py-2 rounded font-bold ${
            currentPage === 0 ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Page précédente
        </button>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
          className={`px-6 py-2 rounded font-bold ${
            currentPage === totalPages - 1 ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Page suivante
        </button>
      </div>
    </div>
  );
}
