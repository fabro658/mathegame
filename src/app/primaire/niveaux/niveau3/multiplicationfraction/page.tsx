'use client'; 

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MultiplicationFraction() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [questions, setQuestions] = useState<{ fraction1: string; fraction2: string; correctAnswer: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Message de feedback

  const simplifyFraction = (numerator: number, denominator: number): [number, number] => {
    if (denominator === 0) {
      return [numerator, denominator]; // Évite la division par zéro
    }
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
    return [numerator / divisor, denominator / divisor];
  };

  useEffect(() => {
    const generateQuestions = () =>
      Array.from({ length: totalQuestions }, () => {
        const a1 = Math.floor(Math.random() * 7) - 3;
        let b1 = Math.floor(Math.random() * 7) - 3;
        const a2 = Math.floor(Math.random() * 7) - 3;
        let b2 = Math.floor(Math.random() * 7) - 3;

        if (b1 === 0) b1 = 1;
        if (b2 === 0) b2 = 1;

        const numeratorResult = a1 * a2;
        const denominatorResult = b1 * b2;

        const [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(numeratorResult, denominatorResult);
        let correctAnswer = `${simplifiedNumerator}/${simplifiedDenominator}`;
        if (simplifiedNumerator === simplifiedDenominator) {
          correctAnswer = "1";
        }

        return {
          fraction1: `${a1}/${b1}`,
          fraction2: `${a2}/${b2}`,
          correctAnswer,
        };
      });

    setQuestions(generateQuestions());
  }, []);

  const correctAnswers = questions.map((q) => q.correctAnswer);

  const completedAnswers = answers.filter((answer) => answer !== null && answer !== "").length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  const handleValidation = (): void => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes("")) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    const newAnswers = [...answers];
    let allCorrect = true;

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      if (answer !== correctAnswers[globalIndex]) {
        allCorrect = false;
        newAnswers[globalIndex] = null;
      }
    });

    setAnswers(newAnswers);

    if (allCorrect) {
      setFeedbackMessage("Toutes les réponses sont correctes !");
    } else {
      setFeedbackMessage("Certaines réponses sont incorrectes. Essayez encore !");
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const isCurrentPageComplete = !answers.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).includes(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link href="/menu/apprendre/fraction" className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold">
        Apprendre
      </Link>
      <Link href="/primaire/niveaux/niveau3" className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold">
        Retour
      </Link>

      <div className="absolute top-4 left-4 w-32 h-32">
        <svg className="transform -rotate-90" width="100%" height="100%">
          <circle cx="50%" cy="50%" r={50} fill="none" stroke="#e5e5e5" strokeWidth={10} />
          <circle
            cx="50%"
            cy="50%"
            r={50}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={10}
            strokeDasharray={2 * Math.PI * 50}
            strokeDashoffset={2 * Math.PI * 50 - (2 * Math.PI * 50 * completionPercentage) / 100}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-blue-500">{completionPercentage}%</span>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">Multiplication de fractions</h1>

      <div className="grid grid-cols-2 gap-6">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ fraction1, fraction2 }, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">{fraction1} × {fraction2}</div>
            <input
              type="text"
              inputMode="numeric"
              className="border border-gray-400 p-4 rounded w-32 text-center text-black text-lg"
              value={answers[currentPage * questionsPerPage + index] || ""}
              onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
              aria-label={`Réponse pour ${fraction1} × ${fraction2}`}
            />
          </div>
        ))}
      </div>

      {feedbackMessage && (
        <div className="mt-4 text-center text-lg font-semibold text-red-500">
          {feedbackMessage}
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <button onClick={handlePreviousPage} className="bg-gray-500 text-white py-3 px-6 rounded font-bold" disabled={currentPage === 0}>
          Précédent
        </button>
        <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">
          Valider les réponses
        </button>
        <button onClick={handleNextPage} className="bg-blue-500 text-white py-3 px-6 rounded font-bold" disabled={!isCurrentPageComplete}>
          Suivant
        </button>
      </div>
    </div>
  );
}
