'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MultiplicationFraction() {
  const totalQuestions = 36;
  const questionsPerPage = 6; // 6 questions par page
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null)); // État des réponses
  const [questions, setQuestions] = useState<{ fraction1: string; fraction2: string; correctAnswer: string }[]>([]); // État des questions
  const [isValidated, setIsValidated] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Message de retour
  const [currentPage, setCurrentPage] = useState(0); // Page actuelle

  // Fonction pour simplifier une fraction
  const simplifyFraction = (numerator: number, denominator: number) => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(numerator, denominator);
    return [numerator / divisor, denominator / divisor];
  };

  // Génération des questions et des réponses correctes, seulement une fois
  useEffect(() => {
    const generateQuestions = () =>
      Array.from({ length: totalQuestions }, () => {
        const a1 = Math.floor(Math.random() * 9) + 1;
        const b1 = Math.floor(Math.random() * 9) + 1;
        const a2 = Math.floor(Math.random() * 9) + 1;
        const b2 = Math.floor(Math.random() * 9) + 1;

        const numeratorResult = a1 * a2;
        const denominatorResult = b1 * b2;

        const [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(numeratorResult, denominatorResult);

        return {
          fraction1: `${a1}/${b1}`,
          fraction2: `${a2}/${b2}`,
          correctAnswer: `${simplifiedNumerator}/${simplifiedDenominator}`,
        };
      });

    setQuestions(generateQuestions());
  }, []); // Générer les questions une seule fois au montage initial

  const correctAnswers = questions.map((q) => q.correctAnswer); // Réponses correctes

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    // Vérification si toutes les réponses sont remplies
    if (pageAnswers.includes(null)) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    // Validation des réponses
    const newAnswers = [...answers];
    let allCorrect = true;

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      if (answer !== correctAnswers[globalIndex]) {
        allCorrect = false;
        newAnswers[globalIndex] = null; // Réinitialiser uniquement les mauvaises réponses
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);

    if (allCorrect) {
      setFeedbackMessage("Toutes les réponses sont correctes. Passez à la série suivante !");
    } else {
      setFeedbackMessage("Certaines réponses sont incorrectes. Corrigez-les.");
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
      setIsValidated(false); // Réinitialiser la validation pour la page suivante
      setFeedbackMessage(""); // Réinitialiser le message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
    {/* Boutons de navigation */}
    <Link
      href="/mobile/menu_mobile/apprendre_mobile/fraction_mobile"
      className="absolute top-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
    >
      Apprendre
    </Link>
    <Link
      href="/mobile/primair_mobile/niveaux_mobile/niveau3_mobile"
      className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
    >
      Retour
    </Link>

      <h1 className="text-3xl font-bold mb-6">Multiplication de fractions</h1>

      {/* Message de validation */}
      {feedbackMessage && (
        <p
          className={`text-xl font-bold text-center mb-6 ${
            feedbackMessage.includes("incorrectes") ? "text-red-600" : "text-green-600"
          }`}
        >
          {feedbackMessage}
        </p>
      )}

      {/* Questions et réponses */}
      {!isValidated && (
        <div className="grid grid-cols-2 gap-4">
          {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ fraction1, fraction2 }, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              {/* Question */}
              <button
                className="bg-blue-500 text-white font-bold py-4 px-6 rounded w-48 text-center"
                disabled
              >
                {fraction1} × {fraction2}
              </button>

              {/* Réponse */}
              <input
                type="text"
                className="border border-gray-400 p-3 rounded w-32 text-center text-black"
                onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
                value={answers[currentPage * questionsPerPage + index] || ""}
              />
            </div>
          ))}
        </div>
      )}

      {/* Validation des réponses */}
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

      {/* Boutons de validation */}
      {!isValidated && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleValidation}
            className="bg-blue-500 text-white py-3 px-8 rounded font-bold hover:bg-blue-600"
          >
            Valider les réponses
          </button>
        </div>
      )}
    </div>
  );
}
