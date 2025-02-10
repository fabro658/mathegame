"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SoustractionFractions() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<string[]>(Array(totalQuestions).fill(""));
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [questions, setQuestions] = useState<{ fraction1: string; fraction2: string; correctAnswer: string }[]>([]);

  // Simplification des fractions (résultats comme 2/2 = 1)
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
        let a1, b1, a2, b2, numerator1, numerator2, numeratorResult;

        do {
          a1 = Math.floor(Math.random() * 7) - 3; // Numérateur fraction 1 (-3 à 3)
          b1 = Math.floor(Math.random() * 7) - 3; // Dénominateur fraction 1 (-3 à 3)
          a2 = Math.floor(Math.random() * 7) - 3; // Numérateur fraction 2 (-3 à 3)
          b2 = Math.floor(Math.random() * 7) - 3; // Dénominateur fraction 2 (-3 à 3)

          if (b1 === 0) b1 = 1; // Évite la division par zéro
          if (b2 === 0) b2 = 1; // Évite la division par zéro

          numerator1 = a1 * b2;
          numerator2 = a2 * b1;

          numeratorResult = numerator1 - numerator2;
        } while (numeratorResult < 0); // Répète jusqu'à ce que le résultat soit positif ou nul

        const [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(numeratorResult, b1 * b2);

        return {
          fraction1: `${a1}/${b1}`,
          fraction2: `${a2}/${b2}`,
          correctAnswer: `${simplifiedNumerator}/${simplifiedDenominator}`,
        };
      });

    setQuestions(generateQuestions());
  }, []);

  const handleChange = (index: number, value: string): void => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
    setFeedbackMessage(""); // Réinitialiser le message de feedback
  };

  const handleValidation = (): void => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes("")) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    let hasErrors = false;
    const newAnswers = [...answers];

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      const [a1, b1] = questions[globalIndex].fraction1.split("/").map(Number);
      const [a2, b2] = questions[globalIndex].fraction2.split("/").map(Number);
      const numerator1 = a1 * b2;
      const numerator2 = a2 * b1;
      const numeratorResult = numerator1 - numerator2;
      const [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(numeratorResult, b1 * b2);
      const correctAnswer = `${simplifiedNumerator}/${simplifiedDenominator}`;

      if (normalizeAnswer(answer) !== normalizeAnswer(correctAnswer)) {
        newAnswers[globalIndex] = "";
        hasErrors = true;
      }
    });

    setAnswers(newAnswers);

    if (hasErrors) {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez corriger les erreurs.");
    } else if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setFeedbackMessage("Toutes les réponses de cette page sont correctes. Vous pouvez continuer.");
      setCurrentPage(currentPage + 1);
    } else {
      setFeedbackMessage("Bravo ! Vous avez terminé toutes les questions.");
    }
  };

  const normalizeAnswer = (answer: string): string => {
    const normalized = answer.replace(/\s+/g, "").toLowerCase();
    if (normalized === "2/2") return "1"; // S'assure que 2/2 est considéré comme 1
    return normalized;
  };

  const handleNextPage = (): void => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = (): void => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Boutons de navigation */}
      <Link
        href="/menu/apprendre/fraction"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/primaire/niveaux/niveau3"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-4xl font-bold mb-6">Soustraction de Fractions</h1>

      {/* Feedback */}
      {feedbackMessage && (
        <p
          className={`text-xl mb-4 ${
            feedbackMessage.includes("remplir toutes les réponses") || feedbackMessage.includes("incorrectes")
              ? "text-red-500"
              : "text-green-500"
          } text-center`}
        >
          {feedbackMessage}
        </p>
      )}

      {/* Questions et réponses */}
      <div className="grid grid-cols-2 gap-6">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ fraction1, fraction2 }, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">{fraction1} - {fraction2}</div>
            <input
              type="text"
              inputMode="numeric"
              className="border border-gray-400 p-4 rounded w-32 text-center text-black text-lg"
              value={answers[currentPage * questionsPerPage + index]}
              onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handlePreviousPage}
          className="bg-gray-500 text-white py-3 px-6 rounded font-bold"
          disabled={currentPage === 0}
        >
          Précédent
        </button>
        <button
          onClick={handleValidation}
          className="bg-blue-500 text-white py-3 px-6 rounded font-bold"
        >
          Valider les réponses
        </button>
        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white py-3 px-6 rounded font-bold"
          disabled={currentPage === Math.floor(totalQuestions / questionsPerPage) - 1}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}