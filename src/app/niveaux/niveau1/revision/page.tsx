"use client";

import { useState, useEffect } from "react";

type Question =
  | { type: "addition"; question: string; correctAnswer: string }
  | { type: "subtraction"; question: string; correctAnswer: string }
  | { type: "fraction"; question: string; correctAnswer: string };

export default function Revision() {
  const totalQuestions = 36;
  const questionsPerPage = 6; // Nombre de questions par page
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);

  const radius = 50; // Rayon du cercle
  const strokeWidth = 10; // Largeur du cercle
  const circumference = 2 * Math.PI * radius; // Circonférence du cercle

  // Calcul du pourcentage de progression en fonction des réponses remplies
  const answeredCount = answers.filter((answer) => answer !== null).length;
  const completionPercentage = (answeredCount / totalQuestions) * 100;

  const generateAddition = (): Question[] => {
    return Array.from({ length: totalQuestions / 3 }, () => {
      const a = Math.floor(Math.random() * 9) + 1;
      const b = Math.floor(Math.random() * 9) + 1;
      return {
        type: "addition",
        question: `${a} + ${b}`,
        correctAnswer: (a + b).toString(),
      };
    });
  };

  const generateSubtraction = (): Question[] => {
    return Array.from({ length: totalQuestions / 3 }, () => {
      const a = Math.floor(Math.random() * 9) + 1;
      const b = Math.floor(Math.random() * 9) + 1;
      return {
        type: "subtraction",
        question: `${a} - ${b}`,
        correctAnswer: (a - b).toString(),
      };
    });
  };

  const generateFraction = (): Question[] => {
    return Array.from({ length: totalQuestions / 3 }, () => {
      const a1 = Math.floor(Math.random() * 9) + 1;
      const b1 = Math.floor(Math.random() * 9) + 1;
      const a2 = Math.floor(Math.random() * 9) + 1;
      const b2 = Math.floor(Math.random() * 9) + 1;

      const commonDenominator = b1 * b2;
      const numerator1 = a1 * b2;
      const numerator2 = a2 * b1;

      const numeratorResult = numerator1 - numerator2;
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
      const divisor = gcd(numeratorResult, commonDenominator);
      const [simplifiedNumerator, simplifiedDenominator] = [numeratorResult / divisor, commonDenominator / divisor];

      return {
        type: "fraction",
        question: `${a1}/${b1} - ${a2}/${b2}`,
        correctAnswer: `${simplifiedNumerator}/${simplifiedDenominator}`,
      };
    });
  };

  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setQuestions([
      ...generateAddition(),
      ...generateSubtraction(),
      ...generateFraction(),
    ]);
  }, []);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  const handleValidation = () => {
    const newAnswers = [...answers];

    for (let i = currentPage * questionsPerPage; i < (currentPage + 1) * questionsPerPage; i++) {
      const correctAnswer = questions[i]?.correctAnswer;
      if (answers[i] !== correctAnswer) {
        newAnswers[i] = null; // Réinitialiser la réponse incorrecte
      }
    }

    setAnswers(newAnswers);
  };

  const handleNextPage = () => {
    if (currentPage < totalQuestions / questionsPerPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Cercle de progression */}
      <div className="absolute top-4 left-4 w-32 h-32">
        <svg className="transform -rotate-90" width="100%" height="100%">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="#e5e5e5"
            strokeWidth={strokeWidth}
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * completionPercentage) / 100}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-blue-500">{Math.round(completionPercentage)}%</span>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">Révision des Opérations</h1>

      <div className="grid grid-cols-3 gap-6">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ question }, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">
              {question}
            </div>
            <input
              type="text"
              inputMode="numeric"
              className="border border-gray-400 p-4 rounded w-32 text-center text-black text-lg"
              value={answers[currentPage * questionsPerPage + index] || ""}
              onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handlePreviousPage}
          className="bg-gray-500 text-white py-2 px-6 rounded font-bold"
          disabled={currentPage === 0}
        >
          Précédent
        </button>
        <button
          onClick={handleValidation}
          className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
        >
          Valider les réponses
        </button>
        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
          disabled={currentPage === totalQuestions / questionsPerPage - 1}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
