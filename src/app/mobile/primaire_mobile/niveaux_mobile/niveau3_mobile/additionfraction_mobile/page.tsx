'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdditionFractions() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [questions, setQuestions] = useState<{ fraction1: string; fraction2: string; correctAnswer: string }[]>([]);
  const [isValidated, setIsValidated] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Message de réussite
  const [currentPage, setCurrentPage] = useState(0);

  // Fonction pour simplifier les fractions
  const simplifyFraction = (numerator: number, denominator: number) => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(numerator, denominator);
    return [numerator / divisor, denominator / divisor];
  };

  // Générer les questions
  useEffect(() => {
    const generateQuestions = () =>
      Array.from({ length: totalQuestions }, () => {
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
        newAnswers[globalIndex] = null;
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);

    if (allCorrect) {
      setMessage("Bravo ! Toutes vos réponses sont correctes.");
      setMessageColor("text-green-600");
      setSuccessMessage("Félicitations, vous avez réussi cette série !");
    } else {
      setMessage("Certaines réponses sont incorrectes. Corrigez-les.");
      setMessageColor("text-yellow-600");
      setSuccessMessage(""); // Réinitialiser le message de réussite en cas d'erreur
    }
  };

  // Passer à la page suivante
  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
      setIsValidated(false);
      setMessage("");
      setMessageColor("");
      setSuccessMessage(""); // Réinitialiser le message de réussite pour la série suivante
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 text-black pt-16">
      <Link
        href="/mobile/menu_mobile/apprendre_mobile/fraction_mobile"
        className="absolute top-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/mobile/primaire_mobile/niveaux_mobile/niveau3_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-4xl font-bold mb-4">Addition de Fractions</h1>
      {successMessage && (
        <p className="text-2xl font-bold mb-6 text-center text-green-600">
          {successMessage}
        </p>
      )}

      {message && (
        <p className={`text-xl font-bold mb-6 text-center ${messageColor}`}>
          {message}
        </p>
      )}

      <div className="flex flex-col gap-4 w-full max-w-3xl">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ fraction1, fraction2 }, index) => (
          <div key={index} className="flex items-center justify-center gap-4 mb-4">
            <button
              className="bg-blue-500 text-white font-bold py-4 px-6 rounded-lg text-2xl"
              disabled
            >
              {fraction1} + {fraction2}
            </button>
            <input
              type="text"
              className="border border-gray-400 p-4 rounded-lg w-1/3 text-center text-lg"
              value={answers[currentPage * questionsPerPage + index] || ""}
              onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
            />
          </div>
        ))}
      </div>

      {!isValidated && (
        <div className="mt-6">
          <button
            onClick={handleValidation}
            className="bg-blue-500 text-white py-3 px-8 rounded font-bold hover:bg-blue-600"
          >
            Valider les réponses
          </button>
        </div>
      )}

      {isValidated && (
        <div className="mt-6">
          <button
            onClick={handleNextPage}
            className="bg-blue-500 text-white py-3 px-8 rounded font-bold hover:bg-blue-600"
          >
            Passer à la série suivante
          </button>
        </div>
      )}
    </div>
  );
}
