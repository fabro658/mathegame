"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Définir un type pour chaque question
type Question =
  | { type: "multiplication"; question: string; correctAnswer: string }
  | { type: "division"; question: string; correctAnswer: string }
  | { type: "fraction"; question: string; correctAnswer: string };

export default function RevisionNiveau2() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  const radius = 50; // Rayon du cercle
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  useEffect(() => {
    const generateQuestions = (): Question[] => {
      const generateMultiplication = (): Question[] => {
        return Array.from({ length: totalQuestions / 3 }, () => {
          const a = Math.floor(Math.random() * 9) + 1;
          const b = Math.floor(Math.random() * 9) + 1;
          return {
            type: "multiplication",
            question: `${a} × ${b}`,
            correctAnswer: (a * b).toString(),
          };
        });
      };

      const generateDivision = (): Question[] => {
        return Array.from({ length: totalQuestions / 3 }, () => {
          const a = Math.floor(Math.random() * 9) + 1;
          const b = Math.floor(Math.random() * 9) + 1;
          return {
            type: "division",
            question: `${a * b} ÷ ${b}`,
            correctAnswer: a.toString(),
          };
        });
      };

      const generateFractionOperations = (): Question[] => {
        return Array.from({ length: totalQuestions / 3 }, () => {
          const a1 = Math.floor(Math.random() * 9) + 1;
          const b1 = Math.floor(Math.random() * 9) + 1;
          const a2 = Math.floor(Math.random() * 9) + 1;
          const b2 = Math.floor(Math.random() * 9) + 1;

          const numerator = a1 * a2;
          const denominator = b1 * b2;

          return {
            type: "fraction",
            question: `${a1}/${b1} × ${a2}/${b2}`,
            correctAnswer: `${numerator}/${denominator}`,
          };
        });
      };

      return [
        ...generateMultiplication(),
        ...generateDivision(),
        ...generateFractionOperations(),
      ];
    };

    setQuestions(generateQuestions());
  }, []);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim() || null;
    setAnswers(newAnswers);
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null)) {
      alert("Veuillez remplir toutes les réponses sur cette page avant de valider.");
      return;
    }

    const newAnswers = [...answers];
    let allCorrect = true;

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      const correctAnswer = questions[globalIndex].correctAnswer;
      if (answer !== correctAnswer) {
        newAnswers[globalIndex] = null;
        allCorrect = false;
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);
    setHasPassed(allCorrect);
  };

  const handleNextPage = () => {
    if (currentPage < totalQuestions / questionsPerPage - 1) {
      setCurrentPage(currentPage + 1);
      setIsValidated(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsValidated(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Cercle de progression */}
      <div className="absolute top-4 left-4 w-32 h-32">
        <svg className="transform -rotate-90" width="100%" height="100%">
          <circle cx="50%" cy="50%" r={radius} fill="none" stroke="#e5e5e5" strokeWidth={strokeWidth} />
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
          <span className="text-xl font-bold text-blue-500">{completionPercentage}%</span>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">Révision Niveau 2</h1>

      {!isValidated && (
        <>
          <div className="grid grid-cols-3 gap-6">
            {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ question }, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">
                  {question}
                </div>
                <input
                  type="text"
                  className="border border-gray-400 p-4 rounded w-32 text-center text-black text-lg"
                  value={answers[currentPage * questionsPerPage + index] || ""}
                  onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-4">
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
              Valider
            </button>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
              disabled={currentPage === totalQuestions / questionsPerPage - 1}
            >
              Suivant
            </button>
          </div>
        </>
      )}

      {isValidated && (
        <>
          {hasPassed ? (
            <p className="text-green-600 font-bold text-xl">Bravo ! Toutes vos réponses sont correctes.</p>
          ) : (
            <p className="text-red-600 font-bold text-xl">Certaines réponses sont incorrectes. Corrigez-les.</p>
          )}
        </>
      )}
    </div>
  );
}
