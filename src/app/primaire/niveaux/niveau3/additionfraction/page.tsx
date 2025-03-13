'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

// Fonction pour calculer le PGDC (Plus Grand Diviseur Commun)
const gcd = (a: number, b: number): number => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

export default function AdditionFractions() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<string[]>(Array(totalQuestions).fill(""));
  const [questions, setQuestions] = useState<{ fraction1: string; fraction2: string; correctAnswer: string; simplifiedAnswer: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Générer des questions aléatoires
  useEffect(() => {
    const generateQuestions = () =>
      Array.from({ length: totalQuestions }, () => {
        const a1 = Math.floor(Math.random() * 5) + 1; // Numérateur de 1 à 5
        const b1 = Math.floor(Math.random() * 5) + 1; // Dénominateur de 1 à 5
        const a2 = Math.floor(Math.random() * 5) + 1; // Numérateur de 1 à 5
        const b2 = Math.floor(Math.random() * 5) + 1; // Dénominateur de 1 à 5

        const commonDenominator = b1 * b2;
        const numerator1 = a1 * b2;
        const numerator2 = a2 * b1;

        const numeratorResult = numerator1 + numerator2;

        // Calculer le PGDC pour simplifier la fraction
        const pgdc = gcd(numeratorResult, commonDenominator);
        const simplifiedNumerator = numeratorResult / pgdc;
        const simplifiedDenominator = commonDenominator / pgdc;

        return {
          fraction1: `${a1}/${b1}`,
          fraction2: `${a2}/${b2}`,
          correctAnswer: `${numeratorResult}/${commonDenominator}`, // Réponse avec le plus grand dénominateur
          simplifiedAnswer: `${simplifiedNumerator}/${simplifiedDenominator}`, // Réponse simplifiée
        };
      });

    setQuestions(generateQuestions());
  }, []);

  // Met à jour les réponses
  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
    setFeedbackMessage(""); // Réinitialiser le message de feedback
  };

  // Valide les réponses de la page actuelle
  const handleValidation = () => {
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
      const { correctAnswer, simplifiedAnswer } = questions[globalIndex];

      if (
        normalizeAnswer(answer) !== normalizeAnswer(correctAnswer) &&
        normalizeAnswer(answer) !== normalizeAnswer(simplifiedAnswer)
      ) {
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
    return answer.replace(/\s+/g, "").toLowerCase();
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
      <Link href="/menu/apprendre/fraction" className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold">Apprendre</Link>
      <Link href="/primaire/niveaux/niveau3" className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold">Retour</Link>

      <h1 className="text-4xl font-bold mb-6">Addition de Fractions</h1>

      {feedbackMessage && (
        <p className={`text-xl mb-4 ${feedbackMessage.includes("incorrectes") ? "text-red-500" : "text-green-500"} text-center`}>{feedbackMessage}</p>
      )}

      <div className="grid grid-cols-2 gap-6">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ fraction1, fraction2 }, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">{fraction1} + {fraction2}</div>
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
    </div>
  );
}
