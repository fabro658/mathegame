"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Equation {
  id: number;
  text: string;
  answer: number;
}

export default function IsolerVariable() {
  const totalQuestions = 50;
  const questionsPerPage = 5;

  const [questions, setQuestions] = useState<Equation[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);

  // Générer des équations aléatoires
  useEffect(() => {
    if (questions.length === 0) {
      const generatedQuestions: Equation[] = Array.from({ length: totalQuestions }, (_, i) => {
        const type = Math.floor(Math.random() * 2); // 0 ou 1 → deux types d'équations
        let a = Math.floor(Math.random() * 9) + 1; // coef x, 1 à 9
        let b = Math.floor(Math.random() * 21) - 10; // constante b, -10 à 10
        let c = Math.floor(Math.random() * 21) - 10; // constante c, -10 à 10
        let text = "";
        let answer = 0;

        if (type === 0) {
          // ax + b = c
          answer = (c - b) / a;
          text = `${a}x + ${b} = ${c}`;
        } else {
          // a + bx = c
          answer = (c - a) / b;
          text = `${a} + ${b}x = ${c}`;
        }

        return { id: i + 1, text, answer };
      });
      setQuestions(generatedQuestions);
    }
  }, [questions]);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseFloat(value);
    newAnswers[index] = isNaN(parsedValue) ? null : parsedValue;
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
    const newAnswers = [...answers];
    const incorrect: number[] = [];

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      const correct = questions[globalIndex].answer;
      if (answer !== correct) {
        newAnswers[globalIndex] = null;
        incorrect.push(globalIndex);
        hasError = true;
      }
    });

    setAnswers(newAnswers);
    setIncorrectAnswers(incorrect);

    if (hasError) {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez les corriger.");
    } else if (currentPage < Math.ceil(totalQuestions / questionsPerPage) - 1) {
      setFeedbackMessage("Toutes les réponses de cette page sont correctes !");
      setCurrentPage(currentPage + 1);
    } else {
      setFeedbackMessage("Bravo ! Vous avez terminé toutes les questions.");
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalQuestions / questionsPerPage) - 1) {
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

  const completedAnswers = answers.filter((a) => a !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link
        href="/menu/apprendre/algebre"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/secondaire/niveaux/niveau1"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <div className="absolute top-4 left-4 w-32 h-32">
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
            strokeDashoffset={2 * Math.PI * 50 - ((2 * Math.PI * 50 * completionPercentage) / 100)}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-blue-500">{completionPercentage}%</span>
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-6">Isoler la variable</h1>

      {feedbackMessage && (
        <p
          className={`text-xl mb-4 ${
            feedbackMessage.includes("remplir toutes") || feedbackMessage.includes("incorrectes")
              ? "text-red-500"
              : "text-green-500"
          } text-center`}
        >
          {feedbackMessage}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {questions
          .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
          .map((q, index) => {
            const globalIndex = currentPage * questionsPerPage + index;
            return (
              <div key={q.id} className="flex items-center gap-4">
                <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">{q.text}</div>
                <input
                  type="text"
                  inputMode="numeric"
                  className={`border border-gray-400 p-4 rounded w-32 text-center text-black text-lg ${
                    incorrectAnswers.includes(globalIndex) ? "border-red-500" : ""
                  }`}
                  value={answers[globalIndex] || ""}
                  onChange={(e) => handleChange(globalIndex, e.target.value)}
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
