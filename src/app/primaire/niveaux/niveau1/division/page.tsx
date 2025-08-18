"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Division() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [questions, setQuestions] = useState<[number, number][]>([]);

  // Génération des questions
  useEffect(() => {
    const generateQuestions = (): [number, number][] => {
      return Array.from({ length: totalQuestions }, (_, index) => {
        let denominator: number, quotient: number;

        if (index < 10) {
          denominator = Math.floor(Math.random() * 10) + 1;
          quotient = Math.floor(Math.random() * 10) + 1;
        } else if (index < 20) {
          denominator = Math.floor(Math.random() * 10) + 1;
          quotient = Math.floor(Math.random() * 20) + 1;
        } else if (index < 30) {
          denominator = Math.floor(Math.random() * 20) + 1;
          quotient = Math.floor(Math.random() * 10) + 1;
        } else {
          denominator = Math.floor(Math.random() * 50) + 1;
          quotient = Math.floor(Math.random() * 5) + 1;
        }

        const numerator = denominator * quotient;
        return [numerator, denominator];
      });
    };

    setQuestions(generateQuestions());
  }, []);

  const correctAnswers = questions.map(([numerator, denominator]) => numerator / denominator);

  // Progression
  const completedAnswers = answers.filter((a) => a !== null).length;
  const completionPercentage = Math.floor((completedAnswers / totalQuestions) * 100);

  // Changement de réponse
  const handleChange = (index: number, value: string) => {
    const parsedValue = parseFloat(value);
    const newAnswers = [...answers];
    newAnswers[index] = isNaN(parsedValue) ? null : parsedValue;
    setAnswers(newAnswers);
    setFeedbackMessage("");
  };

  // Validation
  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null)) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    let hasErrors = false;
    const newAnswers = [...answers];

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      if (answer !== correctAnswers[globalIndex]) {
        newAnswers[globalIndex] = null;
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

  // Navigation
  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
      setFeedbackMessage("");
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setFeedbackMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-black relative overflow-hidden bg-[#71c6f7] font-fredoka p-6">

      {/* Nuages décoratifs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="cloud absolute top-[30px] left-[40px] scale-[0.5]" />
        <div className="cloud absolute top-[50px] left-[50%] -translate-x-1/2 scale-[0.8]" />
        <div className="cloud absolute top-1/2 right-[30px] -translate-y-1/2 scale-[0.6]" />
      </div>

      {/* Boutons de navigation */}
      <Link href="/menu/apprendre/operations-arithmetiques" className="absolute bottom-4 left-4 z-10 bg-black text-white py-3 px-6 rounded font-bold">Menu</Link>
      <Link href="/primaire/niveaux/niveau1" className="absolute top-4 right-4 z-10 bg-orange-500 text-white py-3 px-6 rounded font-bold">Retour</Link>

      {/* Cercle de progression */}
      <div className="absolute top-4 left-4 w-32 h-32 z-10">
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

      <h1 className="text-3xl font-bold mb-6 z-10">Division</h1>

      {/* Feedback */}
      {feedbackMessage && (
        <p className={`text-xl mb-4 z-10 ${feedbackMessage.includes("remplir") || feedbackMessage.includes("incorrectes") ? "text-red-500" : "text-green-500"} text-center`}>
          {feedbackMessage}
        </p>
      )}

      {/* Questions */}
      <div className="grid grid-cols-3 gap-6 z-10">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(([numerator, denominator], index) => {
          const questionIndex = currentPage * questionsPerPage + index;
          return (
            <div key={questionIndex} className="flex items-center gap-4">
              <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">
                {numerator} ÷ {denominator}
              </div>
              <input
                type="text"
                inputMode="numeric"
                className="border border-gray-400 p-4 rounded w-32 text-center text-black text-lg"
                value={answers[questionIndex] !== null ? answers[questionIndex] : ""}
                onChange={(e) => handleChange(questionIndex, e.target.value)}
              />
            </div>
          );
        })}
      </div>

      {/* Boutons */}
      <div className="mt-6 flex gap-4 z-10">
        <button onClick={handlePreviousPage} className="bg-gray-500 text-white py-3 px-6 rounded font-bold">Précédent</button>
        <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">Valider</button>
        <button onClick={handleNextPage} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">Suivant</button>
      </div>
    </div>
  );
}
