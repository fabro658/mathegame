"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SoustractionFractions() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(totalQuestions).fill(null)
  );
  const [questions, setQuestions] = useState<
    { fraction1: string; fraction2: string; correctAnswer: string }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Simplification
  const simplifyFraction = (numerator: number, denominator: number) => {
    const gcd = (a: number, b: number): number =>
      b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
    return [numerator / divisor, denominator / divisor];
  };

  // Normalisation
  const normalizeAnswer = (answer: string) => {
    const normalized = answer.replace(/\s+/g, "").toLowerCase();
    if (/^(\d+)\/\1$/.test(normalized)) return "1"; // ex: 2/2
    if (/^0\/\d+$/.test(normalized)) return "0";   // ex: 0/3
    return normalized;
  };

  // Générer questions
  useEffect(() => {
    const generateQuestions = () =>
      Array.from({ length: totalQuestions }, () => {
        let a1 = Math.floor(Math.random() * 3) + 1;
        let b1 = Math.floor(Math.random() * 3) + 1;
        let a2 = Math.floor(Math.random() * 3) + 1;
        let b2 = Math.floor(Math.random() * 3) + 1;

        const commonDen = b1 * b2;
        let num1 = a1 * b2;
        let num2 = a2 * b1;

        // Assurer num1 >= num2
        if (num1 < num2) {
          [num1, num2] = [num2, num1];
          [a1, a2] = [a2, a1];
          [b1, b2] = [b2, b1];
        }

        const numResult = num1 - num2;
        const [simplifiedNum, simplifiedDen] = simplifyFraction(numResult, commonDen);

        return {
          fraction1: `${a1}/${b1}`,
          fraction2: `${a2}/${b2}`,
          correctAnswer: `${simplifiedNum}/${simplifiedDen}`,
        };
      });

    setQuestions(generateQuestions());
  }, []);

  // Gestion réponse
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
      if (
        !answer ||
        normalizeAnswer(answer) !== normalizeAnswer(correct)
      ) {
        updated[globalIndex] = null;
        allCorrect = false;
      }
    });

    setAnswers(updated);

    if (allCorrect) {
      if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
        setFeedbackMessage("Bravo ! Toutes vos réponses sont correctes. Page suivante !");
        setTimeout(() => {
          setCurrentPage(currentPage + 1);
          setFeedbackMessage("");
        }, 1500);
      } else {
        setFeedbackMessage("Félicitations, vous avez terminé toutes les questions !");
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

      {/* Bloc central */}
      <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg pb-24 mt-16">
        <h1 className="text-3xl font-bold mb-6 text-center">Soustraction de Fractions</h1>

        {feedbackMessage && (
          <p
            className={`text-xl mb-6 text-center ${
              feedbackMessage.includes("incorrectes") ||
              feedbackMessage.includes("remplir")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {feedbackMessage}
          </p>
        )}

        {/* Questions */}
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
          {visibleQuestions.map(({ fraction1, fraction2 }, idx) => {
            const globalIndex = startIndex + idx;
            return (
              <div key={globalIndex} className="flex flex-col items-center gap-4">
                {/* Énoncé */}
                <div className="bg-blue-500 text-white font-bold py-4 px-6 rounded-lg text-2xl text-center w-full">
                  {fraction1} - {fraction2}
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
