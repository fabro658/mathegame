"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ExponentsLevel3() {
  const totalQuestions = 30; // Nombre total de questions
  const questionsPerPage = 6; // 6 questions par page

  const [questions, setQuestions] = useState<{ questionText: string; correctAnswer: string }[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);

  // Génération des questions pour le niveau 3
  useEffect(() => {
    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, () => {
        const base1 = Math.floor(Math.random() * 5) + 2; // Base principale
        const base2 = Math.floor(Math.random() * 5) + 2; // Base secondaire
        const exponent = Math.floor(Math.random() * 4) + 1; // Exposant (1 à 4)

        let questionText = "";
        let correctAnswer = "";

        const type = Math.random();
        if (type < 0.33) {
          questionText = `Que vaut (${base1} + ${base2})^${exponent} ?`;
          correctAnswer = Math.pow(base1 + base2, exponent).toString();
        } else if (type < 0.66) {
          questionText = `Que vaut (${base1} * ${base2})^${exponent} ?`;
          correctAnswer = Math.pow(base1 * base2, exponent).toString();
        } else {
          questionText = `Que vaut (${base1} - ${base2})^${exponent} ?`;
          correctAnswer = Math.pow(base1 - base2, exponent).toString();
        }

        return {
          questionText,
          correctAnswer,
        };
      });
    };

    setQuestions(generateQuestions());
  }, []);

  // Gestion des réponses et de la progression
  const handleChange = (index: number, value: string): void => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  const handleValidation = (): void => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);
    const pageCorrectAnswers = questions.slice(startIndex, endIndex).map((q) => q.correctAnswer);

    const allAnswersFilled = pageAnswers.every((answer) => answer && answer.trim() !== "");

    if (!allAnswersFilled) {
      alert("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    let allCorrect = true;
    const updatedAnswers = [...answers];

    pageAnswers.forEach((answer, index) => {
      if (answer !== pageCorrectAnswers[index]) {
        updatedAnswers[startIndex + index] = null;
        allCorrect = false;
      }
    });

    setAnswers(updatedAnswers);

    if (allCorrect && currentPage < totalQuestions / questionsPerPage - 1) {
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
      }, 1500);
    }
  };

  const handleNextPage = (): void => {
    if (currentPage < totalQuestions / questionsPerPage - 1) {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link href="/menu/apprendre" 
      className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold">
        Apprendre
      </Link>
      <Link href="/secondaire/niveaux/niveau3" 
      className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold">
        Retour
      </Link>

      <div className="absolute top-4 left-4 w-32 h-32 sm:block hidden">
        <svg className="transform -rotate-90" width="100%" height="100%">
          <circle cx="50%" cy="50%" r={50} fill="none" stroke="#e5e5e5" strokeWidth={10} />
          <circle
            cx="50%"
            cy="50%"
            r={50}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={10}
            strokeDasharray={2 * Math.PI * 50}
            strokeDashoffset={2 * Math.PI * 50 - (2 * Math.PI * 50 * completionPercentage) / 100}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-blue-500">{completionPercentage}%</span>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">Niveau 3</h1>

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
    </div>
  );
}
