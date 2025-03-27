"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function EquationsEquivalentes() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const [questions, setQuestions] = useState<{ equationLeft: string; equationRight: string }[]>([]);
  const [selectedButtons, setSelectedButtons] = useState<string[]>(Array(totalQuestions).fill(""));
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const generateEquation = () => {
    const operations = ["+", "-", "*", "/"];
    const op = operations[Math.floor(Math.random() * operations.length)];
    let left, right;

    if (op === "+") {
      left = Math.floor(Math.random() * 20) + 1;
      right = Math.floor(Math.random() * 20) + 1;
    } else if (op === "-") {
      left = Math.floor(Math.random() * 20) + 10;
      right = Math.floor(Math.random() * 10) + 1;
    } else if (op === "*") {
      left = Math.floor(Math.random() * 10) + 1;
      right = Math.floor(Math.random() * 10) + 1;
    } else if (op === "/") {
      right = Math.floor(Math.random() * 9) + 1;
      left = right * (Math.floor(Math.random() * 10) + 1);
    }

    return { equation: `${left} ${op} ${right}`, result: eval(`${left} ${op} ${right}`) };
  };

  const formatEquation = (equation: string) => {
    return equation.replace(/\*/g, "x");
  };

  useEffect(() => {
    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, () => {
        const leftEquation = generateEquation(); // Générer une équation à gauche
        const isEquivalent = Math.random() > 0.5;
        let rightEquation;

        if (isEquivalent) {
          rightEquation = leftEquation; // L'équation de droite est équivalente à celle de gauche
        } else {
          do {
            rightEquation = generateEquation(); // Générer une nouvelle équation à droite
          } while (rightEquation.result === leftEquation.result); // Assurer que les résultats ne sont pas égaux
        }

        return { equationLeft: leftEquation.equation, equationRight: rightEquation.equation };
      });
    };

    setQuestions(generateQuestions());
  }, []);

  const handleAnswer = (index: number, isTrue: boolean): void => {
    const newSelectedButtons = [...selectedButtons];
    newSelectedButtons[index] = isTrue ? "true" : "false";
    setSelectedButtons(newSelectedButtons);
    setFeedbackMessage(null); // Réinitialiser les messages de feedback
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = selectedButtons.slice(startIndex, endIndex);

    if (pageAnswers.includes("")) {
      setFeedbackMessage("Veuillez répondre à toutes les questions avant de valider.");
      return;
    }

    let hasError = false;
    const newAnswers = [...selectedButtons];

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      const { equationLeft, equationRight } = questions[globalIndex];
      const leftResult = eval(equationLeft);
      const rightResult = eval(equationRight);
      const correctAnswer = leftResult === rightResult ? "true" : "false";

      if (answer !== correctAnswer) {
        newAnswers[globalIndex] = "";
        hasError = true;
      }
    });

    setSelectedButtons(newAnswers);

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

  const completedAnswers = selectedButtons.filter((answer) => answer !== "").length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link
        href="/menu/apprendre"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/secondaire/niveaux/niveau3"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
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

      <h1 className="text-4xl font-bold mb-6">Equations Equivalentes</h1>

      {feedbackMessage && (
        <p
          className={`text-xl mb-4 ${
            feedbackMessage.includes("incorrectes") ? "text-red-500" : "text-green-500"
          } text-center`}
        >
          {feedbackMessage}
        </p>
      )}

<div className="grid grid-cols-2 gap-6 mb-6">
  {questions
    .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
    .map(({ equationLeft, equationRight }, index) => {
      const questionIndex = currentPage * questionsPerPage + index;
      return (
        <div key={questionIndex} className="bg-white p-4 rounded shadow-md text-center">
          <p className="text-lg font-bold mb-4">
            {equationLeft} = {equationRight}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleAnswer(questionIndex, true)}
              className={`py-2 px-4 rounded font-bold ${
                selectedButtons[questionIndex] === "true"
                  ? "bg-orange-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              Vrai
            </button>
            <button
              onClick={() => handleAnswer(questionIndex, false)}
              className={`py-2 px-4 rounded font-bold ${
                selectedButtons[questionIndex] === "false"
                  ? "bg-orange-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              Faux
            </button>
          </div>
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
