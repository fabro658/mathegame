"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function EquationsEquivalentes() {
  const totalQuestions = 30;
  const questionsPerPage = 6;

  const [questions, setQuestions] = useState<{ equationLeft: string; equationRight: string; isEquivalent: boolean }[]>([]);
  const [selectedButtons, setSelectedButtons] = useState<string[]>(Array(totalQuestions).fill(""));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackColor, setFeedbackColor] = useState<string>("text-black");

  // Génération aléatoire d'une équation
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
    } else {
      right = Math.floor(Math.random() * 9) + 1;
      left = right * (Math.floor(Math.random() * 10) + 1);
    }

    return { equation: `${left} ${op} ${right}`, result: eval(`${left} ${op} ${right}`) };
  };

  // Génération des questions
  useEffect(() => {
    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, () => {
        const leftEquation = generateEquation();
        const isEquivalent = Math.random() > 0.5;
        let rightEquation;

        if (isEquivalent) {
          rightEquation = leftEquation;
        } else {
          do {
            rightEquation = generateEquation();
          } while (rightEquation.result === leftEquation.result);
        }

        return {
          equationLeft: leftEquation.equation,
          equationRight: rightEquation.equation,
          isEquivalent,
        };
      });
    };

    setQuestions(generateQuestions());
  }, []);

  // Validation des réponses
  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = selectedButtons.slice(startIndex, endIndex);

    if (pageAnswers.includes("")) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      setFeedbackColor("text-red-500");
      return;
    }

    let hasErrors = false;
    const newAnswers = [...selectedButtons];

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      if ((answer === "true" && !questions[globalIndex].isEquivalent) || (answer === "false" && questions[globalIndex].isEquivalent)) {
        newAnswers[globalIndex] = "";
        hasErrors = true;
      }
    });

    setSelectedButtons(newAnswers);

    if (hasErrors) {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez corriger les erreurs.");
      setFeedbackColor("text-red-500");
    } else {
      setFeedbackMessage("Toutes les réponses de cette page sont correctes !");
      setFeedbackColor("text-green-500");
    }
  };

  // Sélection d'une réponse
  const handleAnswerSelection = (index: number, answer: string) => {
    const newAnswers = [...selectedButtons];
    newAnswers[index] = answer;
    setSelectedButtons(newAnswers);
    setFeedbackMessage(null);
  };

  // Changement de page
  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage)) {
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

  // Calcul de la progression
  const completedAnswers = selectedButtons.filter(answer => answer !== "").length;
  const progressPercentage = (completedAnswers / totalQuestions) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Équations Équivalentes</h1>

      {/* Cercle de progression */}
      <div className="relative w-24 h-24 mb-6">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle className="text-gray-200 stroke-current" strokeWidth="10" cx="50" cy="50" r="40" fill="none" />
          <circle
            className="text-green-500 stroke-current"
            strokeWidth="10"
            cx="50"
            cy="50"
            r="40"
            fill="none"
            strokeDasharray="251.2"
            strokeDashoffset={(1 - progressPercentage / 100) * 251.2}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
          {Math.round(progressPercentage)}%
        </span>
      </div>

      {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map((question, index) => {
        const globalIndex = currentPage * questionsPerPage + index;
        return (
          <div key={index} className="mb-4 p-4 border rounded-md bg-white shadow-md w-full max-w-lg">
            <p className="text-lg">{question.equationLeft} = {question.equationRight}</p>
            <div className="flex justify-between mt-2">
              <button
                className={`px-4 py-2 rounded ${selectedButtons[globalIndex] === "true" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => handleAnswerSelection(globalIndex, "true")}
              >
                Vrai
              </button>
              <button
                className={`px-4 py-2 rounded ${selectedButtons[globalIndex] === "false" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => handleAnswerSelection(globalIndex, "false")}
              >
                Faux
              </button>
            </div>
          </div>
        );
      })}

      {/* Feedback */}
      {feedbackMessage && (
        <p className={`text-xl mb-4 ${feedbackColor} text-center`}>
          {feedbackMessage}
        </p>
      )}

      {/* Navigation */}
      <div className="mt-6 flex gap-4">
        <button onClick={handlePreviousPage} className={`bg-gray-500 text-white py-3 px-6 rounded font-bold ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""}`} disabled={currentPage === 0}>Précédent</button>
        <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">Valider</button>
        <button onClick={handleNextPage} className={`bg-blue-500 text-white py-3 px-6 rounded font-bold ${currentPage >= Math.floor(totalQuestions / questionsPerPage) ? "opacity-50 cursor-not-allowed" : ""}`} disabled={currentPage >= Math.floor(totalQuestions / questionsPerPage)}>Suivant</button>
      </div>
    </div>
  );
}
