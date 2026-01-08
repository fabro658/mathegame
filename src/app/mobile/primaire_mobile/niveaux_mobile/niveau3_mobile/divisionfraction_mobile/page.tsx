"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DivisionFraction() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [questions, setQuestions] = useState<{ fraction1: string; fraction2: string; correctAnswer: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Fonction pour simplifier une fraction
  const simplifyFraction = (numerator: number, denominator: number) => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(numerator, denominator);
    return [numerator / divisor, denominator / divisor];
  };

  // Normaliser les réponses (ex: "2/2" -> "1")
  const normalizeAnswer = (answer: string) => {
    const normalized = answer.replace(/\s+/g, "").toLowerCase();
    const match = normalized.match(/^(\d+)\/\1$/);
    if (match) return "1";
    const zeroMatch = normalized.match(/^0\/\d+$/);
    if (zeroMatch) return "0";
    return normalized;
  };

  // Génération des questions
  useEffect(() => {
    const generateQuestions = () =>
      Array.from({ length: totalQuestions }, () => {
        const a1 = Math.floor(Math.random() * 5) + 1;
        const b1 = Math.floor(Math.random() * 5) + 1;
        const a2 = Math.floor(Math.random() * 5) + 1;
        const b2 = Math.floor(Math.random() * 5) + 1;

        const numeratorResult = a1 * b2;
        const denominatorResult = b1 * a2;

        const [simplifiedNum, simplifiedDen] = simplifyFraction(numeratorResult, denominatorResult);

        return {
          fraction1: `${a1}/${b1}`,
          fraction2: `${a2}/${b2}`,
          correctAnswer: `${simplifiedNum}/${simplifiedDen}`,
        };
      });

    setQuestions(generateQuestions());
  }, []);

  // Gestion des réponses
  const handleChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value.trim();
    setAnswers(updated);
    setFeedbackMessage("");
  };

  // Validation
  const handleValidation = () => {
    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;
    const pageAnswers = answers.slice(start, end);

    if (pageAnswers.includes(null) || pageAnswers.includes("")) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    let allCorrect = true;
    const updated = [...answers];

    pageAnswers.forEach((answer, i) => {
      const globalIndex = start + i;
      const correct = questions[globalIndex]?.correctAnswer;
      if (!answer || normalizeAnswer(answer) !== normalizeAnswer(correct)) {
        updated[globalIndex] = null;
        allCorrect = false;
      }
    });

    setAnswers(updated);

    if (allCorrect) {
      if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
        setFeedbackMessage("Bravo ! Toutes les réponses sont correctes. Vous pouvez continuer.");
        setCurrentPage(currentPage + 1);
      } else {
        setFeedbackMessage("Félicitations ! Vous avez terminé toutes les séries !");
      }
    } else {
      setFeedbackMessage("Certaines réponses sont incorrectes. Corrigez-les.");
    }
  };

  const startIndex = currentPage * questionsPerPage;
  const visibleQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 text-black p-4 relative">
      {/* Boutons fixes */}
      <Link
        href="/mobile/menu_mobile/apprendre_mobile/fraction_mobile"
        className="fixed top-4 left-4 bg-black text-white py-3 px-8 rounded font-bold z-50"
      >
        Apprendre
      </Link>
      <Link
        href="/mobile/primaire_mobile/niveaux_mobile/niveau3_mobile"
        className="fixed top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-50"
      >
        Retour
      </Link>

      {/* Bloc central blanc */}
      <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg pb-24 mt-16">
        <h1 className="text-3xl font-bold mb-6 text-center">Division de Fractions</h1>

        {/* Feedback */}
        {feedbackMessage && (
          <p
            className={`text-xl mb-6 text-center ${
              feedbackMessage.includes("incorrectes") || feedbackMessage.includes("remplir")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {feedbackMessage}
          </p>
        )}

        {/* Questions verticales */}
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
          {visibleQuestions.map(({ fraction1, fraction2 }, idx) => {
            const globalIndex = startIndex + idx;
            return (
              <div key={globalIndex} className="flex flex-col items-center justify-center gap-4">
                {/* Énoncé */}
                <div className="bg-blue-500 text-white font-bold py-4 px-6 rounded-lg text-2xl text-center w-full">
                  {fraction1} ÷ {fraction2}
                </div>
                {/* Réponse */}
                <input
                  type="text"
                  placeholder="Réponse (ex: 3/4)"
                  className="border border-gray-400 p-3 rounded-lg w-1/3 text-center text-lg"
                  value={answers[globalIndex] || ""}
                  onChange={(e) => handleChange(globalIndex, e.target.value)}
                />
              </div>
            );
          })}
        </div>

        {/* Bouton Valider */}
        <div className="mt-10 flex justify-center w-full">
          <button
            onClick={handleValidation}
            className="bg-blue-600 text-white py-3 px-6 rounded font-bold w-full max-w-xs hover:bg-blue-700"
          >
            Valider les réponses
          </button>
        </div>
      </div>
    </div>
  );
}
