"use client";

import { useState } from "react";
import Link from 'next/link';

export default function AdditionFractions() {
  const totalQuestions = 50;
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

  // Génération des questions et réponses pour addition de fractions
  const questions = Array.from({ length: totalQuestions }, () => {
    const a1 = Math.floor(Math.random() * 9) + 1;
    const b1 = Math.floor(Math.random() * 9) + 1;
    const a2 = Math.floor(Math.random() * 9) + 1;
    const b2 = Math.floor(Math.random() * 9) + 1;

    const commonDenominator = b1 * b2;
    const numerator1 = a1 * b2;
    const numerator2 = a2 * b1;

    const numeratorResult = numerator1 + numerator2;
    const [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(numeratorResult, commonDenominator);

    return {
      fraction1: `${a1}/${b1}`,
      fraction2: `${a2}/${b2}`,
      correctAnswer: `${simplifiedNumerator}/${simplifiedDenominator}`,
    };
  });

  // Calculer le pourcentage de réponses complétées
  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  const handleValidation = () => {
    const allCorrect = answers.every((answer, index) => answer === questions[index].correctAnswer);
    setIsValidated(true);
    setHasPassed(allCorrect);
  };

  const handleNextPage = () => {
    if (currentPage < totalQuestions / 10 - 1) {
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
      <Link href="/menu/apprendre" className="absolute top-4 right-4 bg-blue-500 text-white py-3 px-6 rounded-lg font-bold">
        Apprendre
      </Link>

      <div className="absolute top-4 left-4 bg-blue-500 text-white py-2 px-5 rounded font-bold">
        Progression : {completionPercentage}%
      </div>

      <h1 className="text-4xl font-bold mb-8">Addition de Fractions</h1>

      {!isValidated && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {questions.slice(currentPage * 10, (currentPage + 1) * 10).map(({ fraction1, fraction2 }, index) => (
              <div key={index} className="flex items-center gap-6">
                <button
                  className="bg-blue-500 text-white font-bold py-4 px-8 rounded-lg w-full"
                  disabled
                >
                  {fraction1} + {fraction2}
                </button>
                <input
                  type="text"
                  className="border border-gray-400 p-4 rounded-lg w-full text-center text-black"
                  onChange={(e) => handleChange(currentPage * 10 + index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-6 mt-8">
            <button
              onClick={handlePreviousPage}
              className="bg-gray-500 text-white py-3 px-8 rounded-lg font-bold"
              disabled={currentPage === 0}
            >
              Précédent
            </button>
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-3 px-8 rounded-lg font-bold"
            >
              Valider les réponses
            </button>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white py-3 px-8 rounded-lg font-bold"
              disabled={currentPage === totalQuestions / 10 - 1}
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
              <p className="text-green-600 font-bold text-2xl">Bravo ! Toutes vos réponses sont correctes.</p>
              <button
                className="mt-8 bg-blue-500 text-white py-3 px-8 rounded-lg font-bold"
                onClick={() => alert("Vous avez complété toutes les questions !")}
              >
                Terminer
              </button>
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-bold text-2xl">Certaines réponses sont incorrectes. Corrigez-les.</p>
              <button
                className="mt-8 bg-gray-500 text-white py-3 px-8 rounded-lg font-bold"
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
