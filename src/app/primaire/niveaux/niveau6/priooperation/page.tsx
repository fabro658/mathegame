"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PrioOperation() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  //  Fonction sécurisée pour évaluer les expressions mathématiques
  const safeEval = (expression: string): number | null => {
    try {
      return Function(`"use strict"; return (${expression})`)();
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const generateQuestions = () => {
      const operations = ["+", "-", "*"];
      const questionsArray: string[] = [];

      for (let i = 0; i < totalQuestions; i++) {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const num3 = Math.floor(Math.random() * 10) + 1;
        const num4 = Math.floor(Math.random() * 10) + 1;
        const op1 = operations[Math.floor(Math.random() * operations.length)];
        const op2 = operations[Math.floor(Math.random() * operations.length)];
        const op3 = operations[Math.floor(Math.random() * operations.length)];
        const op4 = operations[Math.floor(Math.random() * operations.length)];

        if (i < totalQuestions / 4) {
          questionsArray.push(`(${num1} ${op1} ${num2})`);
        } else if (i < totalQuestions / 2) {
          questionsArray.push(`(${num1} ${op1} ${num2}) ${op2} ${num3}`);
        } else if (i < (3 * totalQuestions) / 4) {
          questionsArray.push(`(${num1} ${op1} ${num2}) ${op2} (${num3} ${op3} ${num4})`);
        } else {
          questionsArray.push(`(${num1} ${op1} (${num2} ${op2} ${num3})) ${op3} (${num4} ${op4} ${num1})`);
        }
      }

      setQuestions(questionsArray);
    };

    generateQuestions();
  }, []);

  const correctAnswers = questions.map((question) => safeEval(question));

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value === "" ? null : value;
    setAnswers(newAnswers);
    setFeedbackMessage(null);
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null)) {
      setFeedbackMessage(" Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    let hasError = false;
    const newAnswers = [...answers];
    const incorrect: number[] = [];

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      const correctAnswer = correctAnswers[globalIndex];

      if (answer !== null) {
        const parsedAnswer = parseFloat(answer);
        if (parsedAnswer !== correctAnswer) {
          hasError = true;
          newAnswers[globalIndex] = null; // Réinitialiser seulement les mauvaises réponses
          incorrect.push(globalIndex);
        }
      }
    });

    setAnswers(newAnswers);
    setIncorrectAnswers(incorrect);

    if (hasError) {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez les corriger.");
    } else if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setFeedbackMessage(" Toutes les réponses de cette page sont correctes !");
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

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setFeedbackMessage(null);
    }
  };

  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link href="/menu/apprendre" className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold">
        Apprendre
      </Link>
      <Link href="/primaire/niveaux/niveau6" className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold">
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

      <h1 className="text-3xl font-bold mb-6">Priorités des Opérations</h1>

      {feedbackMessage && <p className="text-xl mb-4 text-center">{feedbackMessage}</p>}

      <div className="grid grid-cols-3 gap-6">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map((question, index) => {
          const questionIndex = currentPage * questionsPerPage + index;
          return (
            <div key={questionIndex} className="flex items-center gap-4">
              <button className="bg-blue-500 text-white font-bold py-4 px-6 rounded w-full" disabled>{question}</button>
              <input
                type="text"
                className={`border p-4 rounded w-32 text-center text-lg ${incorrectAnswers.includes(questionIndex) ? "border-red-500" : ""}`}
                value={answers[questionIndex] || ""}
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
