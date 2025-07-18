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
  const [questions, setQuestions] = useState<{ fraction1: string; fraction2: string; correctAnswer: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  // Calcul du pourcentage de progression
  const completedAnswers = answers.filter((answer) => answer !== "").length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  // Simplification de la fraction
  const simplifyFraction = (numerator: number, denominator: number): [number, number] => {
    if (denominator === 0) {
      return [numerator, denominator]; // Évite la division par zéro
    }
    const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
    return [numerator / divisor, denominator / divisor];
  };

  useEffect(() => {
    const generateQuestions = () =>
      Array.from({ length: totalQuestions }, () => {
        const a1 = Math.floor(Math.random() * 5) + 3; // Numérateur fraction 1 (3 à 7) pour éviter les résultats négatifs
        const b1 = Math.floor(Math.random() * 5) + 1; // Dénominateur fraction 1 (1 à 5)
        const a2 = Math.floor(Math.random() * 5) + 1; // Numérateur fraction 2 (1 à 5)
        const b2 = Math.floor(Math.random() * 5) + 1; // Dénominateur fraction 2 (1 à 5)

        // Soustraction des fractions : (a1/b1) - (a2/b2)
        const denominatorResult = b1 * b2;
        const numeratorResult = (a1 * b2) + (a2 * b1);

        // Si la soustraction donne un résultat négatif, ajuster les numérateurs
        const [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(numeratorResult, denominatorResult);
        
        let correctAnswer = "";
        if (simplifiedDenominator === 1) {
          correctAnswer = `${simplifiedNumerator}`; // Stocke comme un entier
        } else {
          correctAnswer = `${simplifiedNumerator}/${simplifiedDenominator}`;
        }

        return {
          fraction1: `${a1}/${b1}`,
          fraction2: `${a2}/${b2}`,
          correctAnswer,
        };
      });

    setQuestions(generateQuestions());
  }, []);

  // Mettre à jour les réponses
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
    answer = answer.replace(/\s+/g, "").toLowerCase(); // Supprimer les espaces
    if (/^\d+$/.test(answer)) {
      return `${answer}/1`; // Convertir un entier en fraction (ex: "2" => "2/1")
    }
    return answer;
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
  <div className="flex flex-col items-center justify-center min-h-screen text-black relative overflow-hidden font-fredoka bg-gradient-to-b from-[#f8e9b8] to-[#eddca3]">

    {/* Boutons navigation */}
    <Link href="/menu/apprendre/fraction" className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold z-30">
      Apprendre
    </Link>
    <Link href="/primaire/niveaux/niveau3" className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-30">
      Retour
    </Link>

    {/* Cercle de progression */}
    <div className="absolute top-4 left-4 w-32 h-32 z-30">
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

    {/* Titre */}
    <h1 className="text-4xl font-bold mb-6 z-10">Addition de Fractions</h1>

    {/* Feedback */}
    {feedbackMessage && (
      <p className={`text-xl mb-4 text-center z-10 ${
        feedbackMessage.includes("incorrectes") || feedbackMessage.includes("remplir")
          ? "text-red-500"
          : "text-green-500"
      }`}>
        {feedbackMessage}
      </p>
    )}

    {/* Questions */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 z-10">
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

    {/* Boutons de page */}
    <div className="mt-6 flex gap-4 z-10">
      <button onClick={handleNextPage} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">Suivant</button>
      <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">Valider les réponses</button>
      <button onClick={handlePreviousPage} className="bg-gray-500 text-white py-3 px-6 rounded font-bold">Précédent</button>
    </div>
  </div>
  );
}