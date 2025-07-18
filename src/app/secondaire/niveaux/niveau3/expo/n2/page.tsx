"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ExponentsPractice() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const [questions, setQuestions] = useState<{ questionText: string; correctAnswer: string }[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, (_, index) => {
        let base, exponent, questionText, correctAnswer;

        if (index < 10) {
          base = 2;
          exponent = index + 1;
        } else {
          base = Math.floor(Math.random() * 6) + 2;
          exponent = Math.floor(Math.random() * 3) + 1;

          if (index >= 15 && Math.random() > 0.5) {
            const baseAlt = base + Math.floor(Math.random() * 4) + 1;
            questionText = `Que vaut n si (${base} + ${baseAlt - base})ⁿ = ${Math.pow(baseAlt, exponent)}`;
            correctAnswer = exponent.toString();
          }
        }

        questionText = `n = ? si ${base}ⁿ = ${Math.pow(base, exponent)}`;
        correctAnswer = exponent.toString();

        return { questionText, correctAnswer };
      });
    };

    setQuestions(generateQuestions());
  }, []);

  const handleChange = (index: number, value: string): void => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
    setFeedbackMessage(null);
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
    const updatedAnswers = [...answers];
    const incorrect: number[] = [];

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      if (answer !== questions[globalIndex].correctAnswer) {
        updatedAnswers[globalIndex] = null;
        incorrect.push(globalIndex);
        hasError = true;
      }
    });

    setAnswers(updatedAnswers);
    setIncorrectAnswers(incorrect);

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
      setFeedbackMessage(null);
    }
  };

  const handlePreviousPage = () => { //  Correction : garder une seule déclaration
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setFeedbackMessage(null);
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

      <h1 className="text-3xl font-bold mb-6">Niveau 2</h1>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {questions
          .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
          .map(({ questionText }, idx) => {
            const questionIndex = currentPage * questionsPerPage + idx;
            return (
              <div key={questionIndex} className="flex items-center gap-4">
                <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">
                   {questionText}
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  className={`border border-gray-400 p-4 rounded w-32 text-center text-black text-lg ${
                    incorrectAnswers.includes(questionIndex) ? "border-red-500" : ""
                  }`}
                  value={answers[questionIndex] || ""}
                  onChange={(e) => handleChange(questionIndex, e.target.value)}
                />
              </div>
            );
          })}
      </div>
      <div className="mt-6 flex gap-4">
        <button onClick={handlePreviousPage} className="bg-gray-500 text-white py-3 px-6 rounded font-bold">Précédent</button>
        <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">Valider les réponses</button>
        <button onClick={handleNextPage} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">Suivant</button>
      </div>
    </div>
  );
}
