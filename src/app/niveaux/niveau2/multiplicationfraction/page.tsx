"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MultiplicationFraction() {
  const totalQuestions = 50;
  const questionsPerPage = 10;

  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Fonction pour simplifier une fraction
  const simplifyFraction = (numerator: number, denominator: number) => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(numerator, denominator);
    return [numerator / divisor, denominator / divisor];
  };

  // Génération des questions lors de la première exécution
  useEffect(() => {
    const generateQuestions = () =>
      Array.from({ length: totalQuestions }, () => {
        const a1 = Math.floor(Math.random() * 9) + 1;
        const b1 = Math.floor(Math.random() * 9) + 1;
        const a2 = Math.floor(Math.random() * 9) + 1;
        const b2 = Math.floor(Math.random() * 9) + 1;

        const numeratorResult = a1 * a2;
        const denominatorResult = b1 * b2;

        const [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(
          numeratorResult,
          denominatorResult
        );

        return {
          fraction1: `${a1}/${b1}`,
          fraction2: `${a2}/${b2}`,
          correctAnswer: `${simplifiedNumerator}/${simplifiedDenominator}`,
        };
      });

    setQuestions(generateQuestions());
  }, []);

  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
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
      if (answer !== questions[globalIndex].correctAnswer) {
        allCorrect = false;
        newAnswers[globalIndex] = null; // Réinitialiser uniquement les mauvaises réponses
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);
    setHasPassed(allCorrect);
  };

  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
      setIsValidated(false);
      setHasPassed(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsValidated(false);
      setHasPassed(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link href="/menu/apprendre" className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-4 rounded font-bold">
        Apprendre
      </Link>
      <div className="absolute top-4 left-4 bg-green-500 text-white py-1 px-3 rounded font-bold">
        Progression : {completionPercentage}%
      </div>
      <h1 className="text-3xl font-bold mb-6">Multiplication de fractions</h1>

      {!isValidated && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ fraction1, fraction2 }, index) => (
              <div key={index} className="flex items-center gap-4">
                <button
                  className="bg-blue-500 text-white font-bold py-4 px-6 rounded w-full"
                  disabled
                >
                  {fraction1} × {fraction2}
                </button>
                <input
                  type="text"
                  className="border border-gray-400 p-3 rounded w-full text-center text-black"
                  onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-4">
            {currentPage > 0 && (
              <button
                className="bg-gray-500 text-white py-2 px-6 rounded font-bold"
                onClick={handlePreviousPage}
              >
                Précédent
              </button>
            )}
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
            >
              Valider les réponses
            </button>
            {currentPage < Math.floor(totalQuestions / questionsPerPage) - 1 && (
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
                onClick={handleNextPage}
              >
                Suivant
              </button>
            )}
          </div>
        </>
      )}

      {isValidated && (
        <>
          {hasPassed ? (
            <div>
              <p className="text-green-600 font-bold text-xl">Bravo ! Toutes vos réponses sont correctes.</p>
              {currentPage < Math.floor(totalQuestions / questionsPerPage) - 1 ? (
                <button
                  className="mt-6 bg-blue-500 text-white py-2 px-6 rounded font-bold"
                  onClick={handleNextPage}
                >
                  Passer à la série suivante
                </button>
              ) : (
                <button
                  className="mt-6 bg-blue-500 text-white py-2 px-6 rounded font-bold"
                  onClick={() => alert("Vous avez complété toutes les questions !")}
                >
                  Terminer
                </button>
              )}
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-bold text-xl">Certaines réponses sont incorrectes. Corrigez-les.</p>
              <button
                className="mt-6 bg-gray-500 text-white py-2 px-6 rounded font-bold"
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
