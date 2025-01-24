"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SoustractionFractions() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [questions, setQuestions] = useState<{ fraction1: string; fraction2: string; correctAnswer: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const simplifyFraction = (numerator: number, denominator: number) => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
    return [numerator / divisor, denominator / divisor];
  };

  useEffect(() => {
    const generateQuestions = () =>
      Array.from({ length: totalQuestions }, () => {
        // Limiter les numérateurs et dénominateurs entre 1 et 3
        const a1 = Math.floor(Math.random() * 3) + 1; // Numérateur fraction 1 (1 à 3)
        const b1 = Math.floor(Math.random() * 3) + 1; // Dénominateur fraction 1 (1 à 3)
        const a2 = Math.floor(Math.random() * 3) + 1; // Numérateur fraction 2 (1 à 3)
        const b2 = Math.floor(Math.random() * 3) + 1; // Dénominateur fraction 2 (1 à 3)

        const commonDenominator = b1 * b2;  // On choisit un dénominateur commun simple
        const numerator1 = a1 * b2;
        const numerator2 = a2 * b1;

        const numeratorResult = Math.max(numerator1, numerator2) - Math.min(numerator1, numerator2); // Résultat toujours positif
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
    setFeedbackMessage(""); // Réinitialise le feedback
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);
    const pageQuestions = questions.slice(startIndex, endIndex);

    if (pageAnswers.includes(null) || pageAnswers.includes("")) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    let allCorrect = true;
    const updatedAnswers = [...answers];

    pageAnswers.forEach((answer, index) => {
      const questionIndex = startIndex + index;
      if (answer !== pageQuestions[index].correctAnswer) {
        allCorrect = false;
        updatedAnswers[questionIndex] = null; // Réinitialise les réponses incorrectes
      }
    });

    setAnswers(updatedAnswers);

    if (allCorrect) {
      if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
        setFeedbackMessage("Bravo ! Vous passez à la page suivante.");
        setTimeout(() => {
          setCurrentPage(currentPage + 1);
          setFeedbackMessage("");
        }, 1500);
      } else {
        setFeedbackMessage("Félicitations, vous avez terminé toutes les questions !");
      }
    } else {
      setFeedbackMessage("Certaines réponses sont incorrectes. Essayez à nouveau.");
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

      <h1 className="text-4xl font-bold mb-6 text-center">Soustraction de Fractions</h1>

      {feedbackMessage && (
        <p
          className={`text-xl font-bold mb-6 text-center ${
            feedbackMessage.includes("incorrectes") || feedbackMessage.includes("remplir") ? "text-red-600" : "text-green-600"
          }`}
        >
          {feedbackMessage}
        </p>
      )}

      <div className="flex flex-col gap-4 w-full max-w-3xl">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ fraction1, fraction2 }, index) => (
          <div key={index} className="flex items-center justify-center gap-4 mb-4">
            <span className="bg-blue-500 text-white font-bold py-4 px-6 rounded-lg text-2xl">
              {fraction1} - {fraction2}
            </span>
            <input
              type="text"
              className="border border-gray-400 p-4 rounded-lg w-1/3 text-center text-lg"
              value={answers[currentPage * questionsPerPage + index] || ""}
              onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center w-full">
        <button
          onClick={handleValidation}
          className="bg-blue-500 text-white py-3 px-6 rounded font-bold w-full max-w-xs"
        >
          Valider les réponses
        </button>
      </div>
    </div>
  );
}
