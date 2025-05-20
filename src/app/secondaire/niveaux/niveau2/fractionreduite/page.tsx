"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

export default function DivisionFractions() {
  const totalQuestions = 36;
  const questionsPerPage = 6;

  const [questions, setQuestions] = useState<
    { fraction1: string; fraction2: string; correctAnswer: string }[]
  >([]);
  const [answers, setAnswers] = useState<string[]>(Array(totalQuestions).fill(""));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const simplifyFraction = (numerator: number, denominator: number): string => {
    if (denominator === 0) return `${numerator}/0`;
    if (numerator === 0) return "0";

    const div = gcd(numerator, denominator);
    const num = numerator / div;
    const den = denominator / div;

    return den === 1 ? `${num}` : `${num}/${den}`;
  };

  useEffect(() => {
    const generateQuestions = () =>
      Array.from({ length: totalQuestions }, () => {
        const a1 = Math.floor(Math.random() * 3) + 1;
        const b1 = Math.floor(Math.random() * 3) + 1;
        const a2 = Math.floor(Math.random() * 3) + 1;
        const b2 = Math.floor(Math.random() * 3) + 1;

        const num = a1 * b2;
        const den = b1 * a2;

        const correctAnswer = simplifyFraction(num, den);

        return {
          fraction1: `${a1}/${b1}`,
          fraction2: `${a2}/${b2}`,
          correctAnswer,
        };
      });

    setQuestions(generateQuestions());
  }, []);

  const handleAnswer = (index: number, value: string): void => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  const normalizeAnswer = (answer: string): string => {
    answer = answer.replace(/\s+/g, "").toLowerCase();
    if (/^\d+$/.test(answer)) return `${answer}`; // "2" reste "2"
    return answer;
  };

  const handleValidation = (): void => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;

    const pageAnswers = answers.slice(startIndex, endIndex);
    const correctAnswers = questions.slice(startIndex, endIndex).map((q) => q.correctAnswer);

    const allAnswersFilled = pageAnswers.every((answer) => answer !== "");

    if (!allAnswersFilled) {
      alert("Veuillez répondre à toutes les questions avant de valider.");
      return;
    }

    const allCorrect = pageAnswers.every(
      (answer, idx) => normalizeAnswer(answer) === normalizeAnswer(correctAnswers[idx])
    );

    setIsValidated(true);
    setHasPassed(allCorrect);

    if (allCorrect && currentPage < totalQuestions / questionsPerPage - 1) {
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsValidated(false);
      }, 1500);
    }
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

  const completedAnswers = answers.filter((answer) => answer.trim() !== "").length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link
        href="/menu/apprendre/fraction"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/secondaire/niveaux/niveau2"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

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

      <h1 className="text-3xl font-bold mb-6">Division de Fractions</h1>

      {!isValidated && (
        <>
          <div className="flex flex-col gap-6">
            {questions
              .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
              .map(({ fraction1, fraction2 }, index) => (
                <div key={index} className="flex flex-col items-start gap-2">
                  <div className="font-bold text-black text-xl">
                    {fraction1} ÷ {fraction2}
                  </div>
                  <input
                    type="text"
                    value={answers[currentPage * questionsPerPage + index] || ""}
                    onChange={(e) =>
                      handleAnswer(currentPage * questionsPerPage + index, e.target.value)
                    }
                    className="border border-gray-300 p-2 rounded"
                  />
                </div>
              ))}
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={handlePreviousPage}
              className="bg-gray-500 text-white py-3 px-8 rounded font-bold hover:bg-gray-600"
              disabled={currentPage === 0}
            >
              Précédent
            </button>
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-3 px-8 rounded font-bold hover:bg-blue-600"
            >
              Valider les réponses
            </button>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white py-3 px-8 rounded font-bold hover:bg-blue-600"
              disabled={currentPage === Math.floor(totalQuestions / questionsPerPage) - 1}
            >
              Suivant
            </button>
          </div>
        </>
      )}

      {isValidated && (
        <>
          {hasPassed ? (
            <div>
              <p className="text-green-600 font-bold text-xl">
                Bravo ! Toutes vos réponses sont correctes.
              </p>
              <button
                className="mt-6 bg-blue-500 text-white py-3 px-8 rounded font-bold"
                onClick={handleNextPage}
              >
                Suivant
              </button>
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-bold text-xl">
                Certaines réponses sont incorrectes. Corrigez-les.
              </p>
              <button
                className="mt-6 bg-gray-500 text-white py-3 px-8 rounded font-bold"
                onClick={() => setIsValidated(false)}
              >
                Revenir pour corriger
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
