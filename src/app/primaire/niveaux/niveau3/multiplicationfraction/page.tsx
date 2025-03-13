'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Addition() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<string[]>(Array(totalQuestions).fill(""));
  const [questions, setQuestions] = useState<{ num1: number; num2: number; correctAnswer: number }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  // Calcul du pourcentage de progression
  const completedAnswers = answers.filter((answer) => answer !== "").length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  useEffect(() => {
    const generateQuestions = () =>
      Array.from({ length: totalQuestions }, () => {
        const num1 = Math.floor(Math.random() * 10) + 1; // Premier nombre (1 à 10)
        const num2 = Math.floor(Math.random() * 10) + 1; // Deuxième nombre (1 à 10)

        // Addition des nombres : num1 + num2
        const correctAnswer = num1 + num2;

        return {
          num1,
          num2,
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

      if (normalizeAnswer(answer) !== correctAnswer.toString()) {
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
      {/* Boutons de navigation */}
      <Link
        href="/menu/apprendre/addition"
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

      {/* Cercle de progression en haut à gauche */}
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

      <h1 className="text-4xl font-bold mb-6">Addition de Nombres</h1>

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ num1, num2 }, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">{num1} + {num2}</div>
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
          onClick={handleNextPage}
          className="bg-blue-500 text-white py-3 px-6 rounded font-bold"
          disabled={currentPage === Math.floor(totalQuestions / questionsPerPage) - 1}
        >
          Suivant
        </button>
        <button
          onClick={handleValidation}
          className="bg-blue-500 text-white py-3 px-6 rounded font-bold"
        >
          Valider les réponses
        </button>
        <button
          onClick={handlePreviousPage}
          className="bg-gray-500 text-white py-3 px-6 rounded font-bold"
          disabled={currentPage === 0}
        >
          Précédent
        </button>
      </div>
    </div>
  );
}
