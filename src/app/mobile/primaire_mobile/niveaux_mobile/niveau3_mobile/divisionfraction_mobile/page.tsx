'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DivisionFraction() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [questions, setQuestions] = useState<{ fraction1: string; fraction2: string; correctAnswer: string }[]>([]);
  const [isValidated, setIsValidated] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  // Fonction pour simplifier une fraction
  const simplifyFraction = (numerator: number, denominator: number) => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(numerator, denominator);
    return [numerator / divisor, denominator / divisor];
  };

  // Génération des questions
  useEffect(() => {
    const generateQuestions = () =>
      Array.from({ length: totalQuestions }, () => {
        const a1 = Math.floor(Math.random() * 9) + 1;
        const b1 = Math.floor(Math.random() * 9) + 1;
        const a2 = Math.floor(Math.random() * 9) + 1;
        const b2 = Math.floor(Math.random() * 9) + 1;

        const numeratorResult = a1 * b2; // Numérateur après division
        const denominatorResult = b1 * a2; // Dénominateur après division

        const [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(numeratorResult, denominatorResult);

        return {
          fraction1: `${a1}/${b1}`,
          fraction2: `${a2}/${b2}`,
          correctAnswer: `${simplifiedNumerator}/${simplifiedDenominator}`,
        };
      });

    setQuestions(generateQuestions());
  }, []);

  // Gestion des changements de réponse
  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  // Validation des réponses
  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null) || pageAnswers.includes("")) {
      setMessage("Veuillez remplir toutes les réponses avant de valider.");
      setMessageColor("text-red-600");
      return;
    }

    let allCorrect = true;
    const newAnswers = [...answers];

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      if (answer !== questions[globalIndex]?.correctAnswer) {
        allCorrect = false;
        newAnswers[globalIndex] = null; // Réinitialiser les mauvaises réponses
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);

    if (allCorrect) {
      setMessage("Bravo ! Toutes vos réponses sont correctes.");
      setMessageColor("text-green-600");
    } else {
      setMessage("Certaines réponses sont incorrectes. Corrigez-les.");
      setMessageColor("text-yellow-600");
    }
  };

  // Passer à la page suivante
  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
      setIsValidated(false);
      setMessage("");
      setMessageColor("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative py-6 px-4">
      <div className="flex justify-between w-full mb-6">
        <Link 
          href="/mobile/menu_mobile/apprendre_mobile/fraction_mobile" 
          className="bg-black text-white py-3 px-8 rounded font-bold">
          Apprendre
        </Link>
        <Link 
          href="/mobile/primaire_mobile/niveaux_mobile/niveau3_mobile" 
          className="bg-orange-500 text-white py-3 px-8 rounded font-bold">
          Retour
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Division de fractions</h1>

      {message && (
        <p className={`text-xl font-bold mb-6 text-center ${messageColor}`}>
          {message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 w-full max-w-lg">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ fraction1, fraction2 }, index) => (
          <div key={index} className="flex items-center justify-center gap-4 mb-4">
            <div className="bg-blue-500 text-white font-bold py-4 px-6 rounded-lg text-2xl w-48 text-center">
              {fraction1} ÷ {fraction2}
            </div>
            <input
              type="text"
              className="border border-gray-400 p-4 rounded w-32 text-center text-black text-2xl"
              onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
              value={answers[currentPage * questionsPerPage + index] || ""}
            />
          </div>
        ))}
      </div>

      {!isValidated && (
        <button
          onClick={handleValidation}
          className="bg-blue-500 text-white py-3 px-8 rounded font-bold hover:bg-blue-600 w-full max-w-xs mt-6"
        >
          Valider les réponses
        </button>
      )}

      {isValidated && (
        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white py-3 px-8 rounded font-bold hover:bg-blue-600 w-full max-w-xs mt-6"
        >
          Passer à la série suivante
        </button>
      )}
    </div>
  );
}
