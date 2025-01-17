'use client'; // Marquer comme un composant côté client

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdditionFractions() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [questions, setQuestions] = useState<{ fraction1: string; fraction2: string; correctAnswer: string }[]>([]);
  const [isValidated, setIsValidated] = useState(false);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const simplifyFraction = (numerator: number, denominator: number) => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(numerator, denominator);
    return [numerator / divisor, denominator / divisor];
  };

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

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    // Vérifier si toutes les réponses sont remplies
    if (pageAnswers.includes(null) || pageAnswers.includes("")) {
      setMessage("use client"); // Message pour indiquer qu'il manque des réponses
      return;
    }

    let allCorrect = true;
    const newAnswers = [...answers];

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      if (answer !== questions[globalIndex]?.correctAnswer) {
        allCorrect = false;
        newAnswers[globalIndex] = null; // Réinitialiser uniquement les mauvaises réponses
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);

    if (allCorrect) {
      setMessage("Bravo ! Toutes vos réponses sont correctes.");
    } else {
      setMessage("Certaines réponses sont incorrectes. Corrigez-les.");
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
      setIsValidated(false); // Réinitialiser la validation pour la page suivante
      setMessage(""); // Réinitialiser le message
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 text-black pt-16">
      {/* Bouton "Apprendre" en haut à gauche */}
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

      <h1 className="text-4xl font-bold mb-8">Addition de Fractions</h1>

      {/* Message de validation */}
      {message && (
        <p
          className={`text-xl font-bold mb-6 text-center ${
            message === "use client" || message.includes("incorrectes")
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}

      {/* Questions et réponses */}
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

      {/* Validation des réponses */}
      {!isValidated && (
        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={handleValidation}
            className="bg-blue-500 text-white py-3 px-8 rounded font-bold hover:bg-blue-600"
          >
            Valider les réponses
          </button>
        </div>
      )}

      {/* Bouton pour passer à la page suivante */}
      {isValidated && (
        <div className="mt-6 flex gap-4 justify-center">
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
