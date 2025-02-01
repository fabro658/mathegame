"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MultiplicationFraction() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null)); // État des réponses
  const [questions, setQuestions] = useState<{ fraction1: string; fraction2: string; correctAnswer: string }[]>([]); // État des questions
  const [currentPage, setCurrentPage] = useState(0); // Page actuelle
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Message de retour

  // Fonction pour simplifier une fraction
  const simplifyFraction = (numerator: number, denominator: number) => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(numerator, denominator);
    return [numerator / divisor, denominator / divisor];
  };

  // Fonction pour normaliser les réponses (en enlevant les espaces et en convertissant en format fraction)
  const normalizeAnswer = (answer: string) => {
    return answer.replace(/\s+/g, "").toLowerCase();
  };

  // Génération des questions et des réponses correctes, seulement une fois
  useEffect(() => {
    const generateQuestions = () =>
      Array.from({ length: totalQuestions }, () => {
        const a1 = Math.floor(Math.random() * 5) + 1; // Limiter à 1-5
        const b1 = Math.floor(Math.random() * 5) + 1; // Limiter à 1-5
        const a2 = Math.floor(Math.random() * 5) + 1; // Limiter à 1-5
        const b2 = Math.floor(Math.random() * 5) + 1; // Limiter à 1-5

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

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
    setFeedbackMessage(""); // Réinitialiser le message de feedback lors d'un changement
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    // Vérification si toutes les réponses sont remplies
    if (pageAnswers.includes(null) || pageAnswers.includes("")) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    // Validation des réponses
    const newAnswers = [...answers];
    let allCorrect = true;

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;

      // Normalisation de la réponse de l'utilisateur
      const normalizedAnswer = answer ? normalizeAnswer(answer) : "";
      const normalizedCorrectAnswer = normalizeAnswer(questions[globalIndex]?.correctAnswer); // Normaliser la réponse correcte

      if (normalizedAnswer !== normalizedCorrectAnswer) {
        allCorrect = false;
        newAnswers[globalIndex] = null; // Réinitialiser uniquement les mauvaises réponses
      }
    });

    setAnswers(newAnswers);

    if (allCorrect) {
      setFeedbackMessage("Bravo ! Toutes vos réponses sont correctes.");
      if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
        setCurrentPage(currentPage + 1);
      } else {
        setFeedbackMessage("Félicitations, vous avez terminé toutes les séries !");
      }
    } else {
      setFeedbackMessage("Certaines réponses sont incorrectes. Corrigez-les.");
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
        href="/mobile/secondaire_mobile/niveaux_mobile/niveau2_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      {/* Titre avec un espacement suffisant */}
      <h1 className="text-3xl font-bold mb-8 mt-20">Multiplication de fractions</h1>

      {/* Message de validation */}
      {feedbackMessage && (
        <p
          className={`text-xl font-bold text-center mb-6 ${
            feedbackMessage.includes("incorrectes") || feedbackMessage.includes("remplir") ? "text-red-600" : "text-green-600"
          }`}
        >
          {feedbackMessage}
        </p>
      )}

        <div className="grid grid-cols-1 gap-4 w-full max-w-lg">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ fraction1, fraction2 }, index) => (
          <div key={index} className="flex items-center justify-center gap-4 mb-4">
            <div className="bg-blue-500 text-white font-bold py-4 px-6 rounded-lg text-2xl">
              {fraction1} × {fraction2}
               </div>
              <input
              type="text"
              className="border border-gray-400 p-4 rounded-lg w-1/3 text-center text-lg"
              onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
              value={answers[currentPage * questionsPerPage + index] || ""}
            />
          </div>
        ))}
      </div>

      {/* Validate Button */}
      <div className="mt-6 flex justify-center w-full">
        <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold w-full max-w-xs">
          Valider les réponses
        </button>
      </div>
    </div>
  );
}
