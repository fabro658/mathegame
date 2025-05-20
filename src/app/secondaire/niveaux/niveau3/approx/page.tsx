"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Arrondissement() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const [questions, setQuestions] = useState<{ text: string; correctAnswer: number }[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);

  const completedAnswers = answers.filter((a) => a !== null && a !== "").length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  useEffect(() => {
    const generated = Array.from({ length: totalQuestions }, () => {
      const number = parseFloat((Math.random() * 100).toFixed(2));
      const rounded = parseFloat(number.toFixed(1));
      return {
        text: number.toFixed(2).replace(".", ","), // affichage avec virgule
        correctAnswer: rounded,
      };
    });
    setQuestions(generated);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]*([,.][0-9]?)?$/.test(value)) {
      const newAnswers = [...answers];
      newAnswers[index] = value.trim();
      setAnswers(newAnswers);
      setFeedbackMessage(null);
    }
  };

  const normalizeAnswer = (value: string): number | null => {
    const clean = value.replace(",", ".").trim();
    const parsed = parseFloat(clean);
    return isNaN(parsed) ? null : parseFloat(parsed.toFixed(1));
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.some((a) => !a || a.trim() === "")) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    const incorrect: number[] = [];
    let hasErrors = false;
    const newAnswers = [...answers];

    pageAnswers.forEach((answer, idx) => {
      const globalIndex = startIndex + idx;
      const userValue = normalizeAnswer(answer!);
      const correctValue = questions[globalIndex].correctAnswer;

      if (userValue !== correctValue) {
        incorrect.push(globalIndex);
        newAnswers[globalIndex] = "";
        hasErrors = true;
      }
    });

    setIncorrectAnswers(incorrect);
    setAnswers(newAnswers);

    if (hasErrors) {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez les corriger.");
    } else if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setFeedbackMessage("Toutes les réponses de cette page sont correctes !");
      setCurrentPage(currentPage + 1);
    } else {
      setFeedbackMessage("Bravo ! Vous avez terminé toutes les questions.");
      setIsValidated(true);
      setHasPassed(true);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
      setFeedbackMessage(null);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setFeedbackMessage(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link href="/menu/apprendre" className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold">
        Apprendre
      </Link>
      <Link href="/secondaire/niveaux/niveau3" className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold">
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

      <h1 className="text-4xl font-bold mb-6">Arrondir au dixième</h1>

      {feedbackMessage && (
        <p
          className={`text-xl mb-4 text-center ${
            feedbackMessage.includes("incorrectes") || feedbackMessage.includes("Veuillez")
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {feedbackMessage}
        </p>
      )}

      {!isValidated && (
        <>
          <div className="grid grid-cols-3 gap-6">
            {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map((question, index) => {
              const globalIndex = currentPage * questionsPerPage + index;
              return (
                <div key={globalIndex} className="flex items-center gap-4">
                  <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">
                    {question.text}
                  </div>
                  <input
                    type="text"
                    inputMode="decimal"
                    pattern="^[0-9]+([,.][0-9]?)?$"
                    placeholder="ex: 12,3"
                    className={`border p-4 rounded w-32 text-center text-black text-lg ${
                      incorrectAnswers.includes(globalIndex) ? "border-red-500" : "border-gray-400"
                    }`}
                    value={answers[globalIndex] ?? ""}
                    onChange={(e) => handleChange(globalIndex, e.target.value)}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex gap-4">
            <button onClick={handlePreviousPage} className="bg-gray-500 text-white py-3 px-6 rounded font-bold">
              Précédent
            </button>
            <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">
              Valider les réponses
            </button>
            <button onClick={handleNextPage} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  );
}
