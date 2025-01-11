"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ExponentsPractice() {
  const totalQuestions = 30; // Nombre total de questions
  const questionsPerPage = 6; // Questions affichées par page (2 colonnes x 3 lignes)

  const [questions, setQuestions] = useState<{ questionText: string; correctAnswer: string }[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);

  // Génération des questions
  useEffect(() => {
    const generateQuestions = () => {
      const superscriptMap: Record<string, string> = {
        0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵",
        6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹",
      };

      return Array.from({ length: totalQuestions }, () => {
        const base = Math.floor(Math.random() * 10) + 1; // Base entre 1 et 10
        const exponent = 2; // Exposant fixé à 2
        const correctAnswer = Math.sqrt(base ** exponent).toString();

        const exponentUnicode = String(exponent)
          .split("")
          .map((digit) => superscriptMap[digit])
          .join("");

        const questionText = `Que vaut x si x${exponentUnicode} = ${base ** exponent} ?`;
        return { questionText, correctAnswer };
      });
    };

    setQuestions(generateQuestions());
  }, []);

  // Gestion des changements de réponse
  const handleChange = (index: number, value: string): void => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  // Validation des réponses
  const handleValidation = (): void => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);
    const pageCorrectAnswers = questions.slice(startIndex, endIndex).map((q) => q.correctAnswer);

    if (pageAnswers.some((answer) => !answer)) {
      alert("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    const allCorrect = pageAnswers.every((answer, idx) => answer === pageCorrectAnswers[idx]);
    if (!allCorrect) {
      const updatedAnswers = [...answers];
      pageAnswers.forEach((answer, idx) => {
        if (answer !== pageCorrectAnswers[idx]) {
          updatedAnswers[startIndex + idx] = null; // Réinitialise les réponses incorrectes
        }
      });
      setAnswers(updatedAnswers);
    }

    // Passe automatiquement à la page suivante si tout est correct
    if (allCorrect && currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
      }, 1500);
    }
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

  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  // Barre circulaire de progression
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Bouton "Retour" visible uniquement sur grand écran */}
      <Link
        href="/primaire/niveaux/niveau5"
        className="absolute top-4 left-4 bg-orange-500 text-white py-3 px-8 rounded font-bold hidden sm:block"
      >
        Retour
      </Link>

      {/* Barre de progression */}
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

      <h1 className="text-3xl font-bold mb-6">Niveau 1</h1>

      {/* Grille responsive : 2 colonnes sur grands écrans, 1 colonne sur mobiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {questions
          .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
          .map(({ questionText }, idx) => (
            <div key={idx} className="flex flex-col items-start gap-2">
              <div className="font-bold text-black">{questionText}</div>
              <input
                type="text"
                inputMode="numeric"
                className="border border-gray-400 p-4 rounded w-full sm:w-32 text-center text-black text-lg"
                value={answers[currentPage * questionsPerPage + idx] || ""}
                onChange={(e) => handleChange(currentPage * questionsPerPage + idx, e.target.value)}
              />
            </div>
          ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-8 w-full sm:w-auto">
        <button
          onClick={handlePreviousPage}
          className="bg-gray-500 text-white py-3 px-8 rounded font-bold"
          disabled={currentPage === 0}
        >
          Précédent
        </button>
        <button
          onClick={handleValidation}
          className="bg-blue-500 text-white py-3 px-8 rounded font-bold"
        >
          Valider les réponses
        </button>
        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white py-3 px-8 rounded font-bold"
          disabled={currentPage === Math.floor(totalQuestions / questionsPerPage) - 1}
        >
          Suivant
        </button>
      </div>

      {/* Le bouton "Apprendre" est sous les autres boutons sur mobile */}
      <div className="mt-6 w-full sm:hidden">
        <Link
          href="/menu/apprendre/exposant"
          className="w-full bg-black text-white py-3 px-8 rounded font-bold"
        >
          Apprendre
        </Link>
      </div>
    </div>
  );
}
