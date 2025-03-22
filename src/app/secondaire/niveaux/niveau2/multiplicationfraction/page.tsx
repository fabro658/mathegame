'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

// Fonction pour calculer le PGDC (Plus Grand Diviseur Commun)
const gcd = (a: number, b: number): number => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

export default function MultiplicationFractions() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<string[]>(Array(totalQuestions).fill(""));
  const [questions, setQuestions] = useState<{ fraction1: string; fraction2: string; correctAnswer: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  // Calcul du pourcentage de progression
  const completedAnswers = answers.filter((answer) => answer !== "").length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  const simplifyFraction = (numerator: number, denominator: number): string => {
    if (denominator === 0) return `${numerator}/0`; // Évite la division par zéro
    if (numerator === 0) return "0"; // Cas où le numérateur est 0

    const gcdValue = gcd(Math.abs(numerator), Math.abs(denominator));
    const simplifiedNumerator = numerator / gcdValue;
    const simplifiedDenominator = denominator / gcdValue;

    return simplifiedDenominator === 1 ? `${simplifiedNumerator}` : `${simplifiedNumerator}/${simplifiedDenominator}`;
  };

  useEffect(() => {
    const generateQuestions = () =>
      Array.from({ length: totalQuestions }, () => {
        const a1 = Math.floor(Math.random() * 5) + 1; // Numérateur fraction 1 (1 à 5)
        const b1 = Math.floor(Math.random() * 5) + 1; // Dénominateur fraction 1 (1 à 5)
        const a2 = Math.floor(Math.random() * 5) + 1; // Numérateur fraction 2 (1 à 5)
        const b2 = Math.floor(Math.random() * 5) + 1; // Dénominateur fraction 2 (1 à 5)

        // Multiplication des fractions : a1/b1 × a2/b2
        const numeratorResult = a1 * a2;
        const denominatorResult = b1 * b2;

        const correctAnswer = simplifyFraction(numeratorResult, denominatorResult);

        return {
          fraction1: `${a1}/${b1}`,
          fraction2: `${a2}/${b2}`,
          correctAnswer,
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
      const { correctAnswer } = questions[globalIndex];

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

    // Vérifie si c'est un nombre entier qui doit être converti en fraction
    if (!normalized.includes("/") && !isNaN(Number(normalized))) {
      return normalized;
    }

    // Vérifie si c'est une fraction valide et simplifie
    const parts = normalized.split("/");
    if (parts.length === 2) {
      const num = parseInt(parts[0], 10);
      const den = parseInt(parts[1], 10);
      return simplifyFraction(num, den);
    }

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

      {/* Cercle de progression */}
      <div className="absolute top-4 left-4 w-32 h-32">
        <svg className="transform -rotate-90" width="100%" height="100%">
          <circle cx="50%" cy="50%" r={radius} fill="none" stroke="#e5e5e5" strokeWidth={strokeWidth} />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * completionPercentage) / 100}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-blue-500">{completionPercentage}%</span>
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-6">Multiplication de Fractions</h1>

      {/* Feedback */}
      {feedbackMessage && (
        <p className={`text-xl mb-4 ${feedbackMessage.includes("incorrectes") ? "text-red-500" : "text-green-500"} text-center`}>
          {feedbackMessage}
        </p>
      )}

      {/* Le reste du code reste inchangé */}
    </div>
  );
}
