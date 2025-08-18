"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Addition() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const [questions, setQuestions] = useState<[number, number][]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]); 

  useEffect(() => {
    const generateQuestions = (): [number, number][] => {
      return Array.from({ length: totalQuestions }, (_, index) => {
        let a, b;
        if (index < 10) {
          a = Math.floor(Math.random() * 10) + 1;
          b = Math.floor(Math.random() * 10) + 1;
        } else if (index < 20) {
          a = Math.floor(Math.random() * 20) + 10;
          b = Math.floor(Math.random() * 20) + 5;
        } else if (index < 30) {
          do {
            a = Math.floor(Math.random() * 50) + 10;
            b = Math.floor(Math.random() * 50) + 10;
          } while (a === b);
        } else {
          a = Math.floor(Math.random() * 100) + 50;
          b = Math.floor(Math.random() * 100) + 50;
        }
        return [a, b];
      });
    };

    setQuestions(generateQuestions());
  }, []);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseInt(value);
    newAnswers[index] = isNaN(parsedValue) ? null : parsedValue;
    setAnswers(newAnswers);
    setFeedbackMessage(null); // Réinitialiser les messages de feedback
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null)) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    let hasError = false;
    const newAnswers = [...answers];
    const incorrect: number[] = []; // Déclaration explicite du type de incorrect

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      const [a, b] = questions[globalIndex];
      if (answer !== a + b) {
        newAnswers[globalIndex] = null; // Réinitialiser seulement les mauvaises réponses
        incorrect.push(globalIndex);
        hasError = true;
      }
    });

    setAnswers(newAnswers);
    setIncorrectAnswers(incorrect); // Garder trace des réponses incorrectes

    if (hasError) {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez les corriger.");
    } else if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setFeedbackMessage("Toutes les réponses de cette page sont correctes!");
      setCurrentPage(currentPage + 1);
    } else {
      setFeedbackMessage("Bravo ! Vous avez terminé toutes les questions.");
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
      setFeedbackMessage(null); // Réinitialiser le message de feedback
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setFeedbackMessage(null); // Réinitialiser le message de feedback
    }
  };

  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-black relative overflow-hidden bg-[#71c6f7] font-fredoka">
      
      {/* Décor ciel et nuages */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
          <div className="cloud absolute top-[30px] left-[40px] scale-[0.5]" />
          <div className="cloud absolute top-[50px] left-[50%] -translate-x-1/2 scale-[0.8]" />
          <div className="cloud absolute top-1/2 right-[30px] -translate-y-1/2 scale-[0.6]" />
        </div>
      </div>

      {/* Boutons de navigation */}
      <Link
        href="/menu/apprendre/opérations arithmétiques"
        className="absolute bottom-4 left-4 z-10 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/primaire/niveaux/niveau1"
        className="absolute top-4 right-4 z-10 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

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

      <h1 className="text-4xl font-bold mb-6">Addition</h1>

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

      <div className="grid grid-cols-3 gap-6">
        {questions
          .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
          .map(([a, b], index) => {
            const questionIndex = currentPage * questionsPerPage + index;
            return (
              <div key={questionIndex} className="flex items-center gap-4">
                <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">
                  {a} + {b}
                </div>
<input
  type="text"
  inputMode="numeric"
  className={`border border-gray-400 p-4 rounded w-32 text-center text-black text-lg ${
    incorrectAnswers.includes(questionIndex) ? "border-red-500" : ""
  }`}
  value={answers[questionIndex] ?? ""}
  onChange={(e) => handleChange(questionIndex, e.target.value)}
/>

              </div>
            );
          })}
      </div>
      
      <div className="mt-6 flex gap-4">
        <button onClick={handleNextPage} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">Suivant</button>
        <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">Valider les réponses</button>
        <button onClick={handlePreviousPage} className="bg-gray-500 text-white py-3 px-6 rounded font-bold">Précédent</button>
      </div>
    </div>
  );
}