'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ApprendreAlgebre() {
  const totalQuestions = 20;
  const questionsPerPage = 5;
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  type Question = {
    questionText: string;
    correctAnswer: string;
  };

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    const generateQuestions = (): Question[] => {
      return Array.from({ length: totalQuestions }, () => {
        const type = Math.floor(Math.random() * 3);

        let a, b, c, questionText, correctAnswer;

        switch (type) {
          case 0: // ax + b = c
            a = Math.floor(Math.random() * 9) + 1; // 1-9
            b = Math.floor(Math.random() * 10);
            c = Math.floor(Math.random() * 20) + b;
            questionText = `${a}x + ${b} = ${c}`;
            correctAnswer = ((c - b) / a).toString();
            break;

          case 1: // ax - b = c
            a = Math.floor(Math.random() * 9) + 1;
            b = Math.floor(Math.random() * 10);
            c = Math.floor(Math.random() * 20);
            questionText = `${a}x - ${b} = ${c}`;
            correctAnswer = ((c + b) / a).toString();
            break;

          default: // x / a + b = c
            a = Math.floor(Math.random() * 5) + 2;
            b = Math.floor(Math.random() * 10);
            c = Math.floor(Math.random() * 20) + b;
            questionText = `x ÷ ${a} + ${b} = ${c}`;
            correctAnswer = ((c - b) * a).toString();
            break;
        }

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

  const handleValidation = (): void => {
    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;
    const pageAnswers = answers.slice(start, end);
    const correctAnswers = questions.slice(start, end).map((q) => q.correctAnswer);

    if (pageAnswers.some((ans) => !ans || ans.trim() === "")) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    const updatedAnswers = [...answers];
    const incorrect: number[] = [];
    pageAnswers.forEach((answer, i) => {
      const globalIndex = start + i;
      if (answer !== correctAnswers[i]) {
        updatedAnswers[globalIndex] = null;
        incorrect.push(globalIndex);
      }
    });

    setAnswers(updatedAnswers);
    setIncorrectAnswers(incorrect);

    if (incorrect.length === 0) {
      const next = currentPage + 1;
      if (next < totalQuestions / questionsPerPage) {
        setCurrentPage(next);
        setFeedbackMessage("Toutes les réponses sont correctes !");
      } else {
        setFeedbackMessage("Félicitations ! Vous avez complété toutes les questions !");
      }
    } else {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez réessayer.");
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalQuestions / questionsPerPage - 1) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const completedAnswers = answers.filter((ans) => ans !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  return (
    <div className="relative min-h-screen font-fredoka overflow-hidden bg-green-100">

      {/* Bouton Retour */}
      <Link
        href="/primaire/niveaux/niveau6"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-30"
      >
        Retour
      </Link>

      {/* Bouton Apprendre */}
      <Link
        href="/menu/apprendre"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold z-30"
      >
        Apprendre
      </Link>

      {/* Progression */}
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

      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-32">
        <h1 className="text-3xl font-bold mb-6 text-black">Isoler la variable (x)</h1>

        {feedbackMessage && (
          <p
            className={`text-xl mb-4 text-center ${
              feedbackMessage.includes("incorrectes") || feedbackMessage.includes("remplir")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {feedbackMessage}
          </p>
        )}

        {/* Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map((question, i) => {
            const index = currentPage * questionsPerPage + i;
            return (
              <div key={index} className="flex items-center gap-4">
                <button className="bg-green-500 text-white font-bold py-4 px-6 rounded w-full" disabled>
                  {question.questionText}
                </button>
                <input
                  type="text"
                  className={`border p-4 rounded w-24 text-center text-lg ${
                    incorrectAnswers.includes(index) ? "border-red-500" : ""
                  }`}
                  value={answers[index] || ""}
                  onChange={(e) => handleChange(index, e.target.value)}
                  placeholder="x = ?"
                />
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex gap-4">
          <button onClick={handlePreviousPage} className="bg-gray-500 text-white py-3 px-6 rounded font-bold">
            Précédent
          </button>
          <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">
            Valider
          </button>
          <button onClick={handleNextPage} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
