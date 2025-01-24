"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdditionFractions() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [questions, setQuestions] = useState<{ fraction1: string; fraction2: string; correctAnswer: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Fonction pour simplifier les fractions
  const simplifyFraction = (numerator: number, denominator: number) => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(numerator, denominator);
    return [numerator / divisor, denominator / divisor];
  };

  // Fonction pour normaliser les réponses (en enlevant les espaces et en convertissant en format fraction)
  const normalizeAnswer = (answer: string) => {
    const normalized = answer.replace(/\s+/g, "").toLowerCase();
    
    // Si la réponse est de la forme "x/x", la convertir en "1"
    const match = normalized.match(/^(\d+)\/\1$/);
    if (match) {
      return "1";  // Normalisation des réponses comme "2/2" ou "3/3" en "1"
    }

    // Ajouter un cas de simplification pour "0/1"
    const zeroMatch = normalized.match(/^0\/\d+$/);
    if (zeroMatch) {
      return "0"; // Si la réponse est 0/n (n quelconque), on la normalise en "0"
    }

    return normalized;
  };

  // Fonction pour valider une fraction
  const isCorrectAnswer = (userAnswer: string, correctAnswer: string): boolean => {
    const normalizedUserAnswer = normalizeAnswer(userAnswer);
    const normalizedCorrectAnswer = normalizeAnswer(correctAnswer);

    return normalizedUserAnswer === normalizedCorrectAnswer;
  };

  // Générer les questions
  useEffect(() => {
    const generateQuestions = () =>
      Array.from({ length: totalQuestions }, () => {
        // Limiter les numérateurs et dénominateurs à des valeurs entre 1 et 5
        const a1 = Math.floor(Math.random() * 5) + 1;
        const b1 = Math.floor(Math.random() * 5) + 1;
        const a2 = Math.floor(Math.random() * 5) + 1;
        const b2 = Math.floor(Math.random() * 5) + 1;

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
    setFeedbackMessage(""); // Réinitialiser le message de feedback lors d'un changement
  };

  // Validation des réponses
  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null) || pageAnswers.includes("")) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    let allCorrect = true;
    const newAnswers = [...answers];

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;

      // Vérifier si la réponse est correcte
      const correctAnswer = questions[globalIndex]?.correctAnswer;
      if (answer && !isCorrectAnswer(answer, correctAnswer)) {
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

      {feedbackMessage && (
        <p className={`text-xl font-bold mb-6 text-center ${feedbackMessage.includes("incorrectes") || feedbackMessage.includes("remplir") ? "text-red-600" : "text-green-600"}`}>
          {feedbackMessage}
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

      <div className="mt-6 flex justify-center w-full">
        <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold w-full max-w-xs">
          Valider les réponses
        </button>
      </div>
    </div>
  );
}
