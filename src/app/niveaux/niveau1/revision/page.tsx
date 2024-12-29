"use client";

import { useState } from "react";
import Link from 'next/link';

export default function Revision() {
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

  // Génération des questions (addition, soustraction, fractions)
  const generateQuestion = (index: number) => {
    const operation = Math.floor(Math.random() * 3); // 0 -> addition, 1 -> soustraction, 2 -> fraction

    if (operation === 0) {
      // Addition
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      return {
        question: `${num1} + ${num2}`,
        correctAnswer: `${num1 + num2}`,
      };
    } else if (operation === 1) {
      // Soustraction
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      return {
        question: `${num1} - ${num2}`,
        correctAnswer: `${num1 - num2}`,
      };
    } else {
      // Fraction
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
        question: `${a1}/${b1} + ${a2}/${b2}`,
        correctAnswer: `${simplifiedNumerator}/${simplifiedDenominator}`,
      };
    }
  };

  // Calculer le pourcentage de réponses complétées
  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  const handleValidation = () => {
    const allCorrect = answers.every((answer, index) => answer === generateQuestion(index).correctAnswer);
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
      <Link href="/menu/apprendre" className="absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-lg font-bold">
        Apprendre
      </Link>

      <div className="absolute top-4 left-4 bg-blue-500 text-white py-1 px-3 rounded font-bold">
        Progression : {completionPercentage}%
      </div>

      <h1 className="text-3xl font-bold mb-6">Révision : Addition, Soustraction et Fractions</h1>

      {!isValidated && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: totalQuestions }).slice(currentPage * 10, (currentPage + 1) * 10).map((_, index) => {
              const { question } = generateQuestion(index);
              return (
                <div key={index} className="flex items-center gap-2">
                  <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    disabled
                  >
                    {question}
                  </button>
                  <input
                    type="text"
                    className="border border-gray-400 p-2 rounded w-full text-center text-black"
                    onChange={(e) => handleChange(currentPage * 10 + index, e.target.value)}
                  />
                </div>
              );
            })}
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
              <p className="text-green-600 font-bold text-xl">Bravo ! Toutes vos réponses sont correctes.</p>
              <button
                className="mt-6 bg-blue-500 text-white py-2 px-6 rounded font-bold"
                onClick={() => alert("Vous avez complété toutes les questions !")}
              >
                Terminer
              </button>
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
