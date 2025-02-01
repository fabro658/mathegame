"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Soustraction() {
  const totalQuestions = 36;
  const questionsPerPage = 6;

  const [questions, setQuestions] = useState<[number, number][]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Générer les questions avec une difficulté progressive
  useEffect(() => {
    const generateQuestions = (): [number, number][] => {
      return Array.from({ length: totalQuestions }, (_, index): [number, number] => {
        let a, b;

        if (index < 10) {
          a = index + 1;
          b = index + 1;
        } else if (index < 20) {
          a = 10 + (index - 9);
          b = 5 + (index - 9);
        } else if (index < 30) {
          a = 100 + Math.floor(Math.random() * 400);
          b = 50 + Math.floor(Math.random() * 200);
        } else {
          a = 100 + Math.floor(Math.random() * 800);
          b = 100 + Math.floor(Math.random() * 800);
        }

        return [Math.max(a, b), Math.min(a, b)];
      });
    };

    setQuestions(generateQuestions());
  }, []);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseInt(value);
    newAnswers[index] = isNaN(parsedValue) ? null : parsedValue;
    setAnswers(newAnswers);
    setFeedbackMessage(""); // Réinitialiser le message de feedback
  };

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
      const [a, b] = questions[globalIndex];
      if (answer !== a - b) {
        newAnswers[globalIndex] = null;
        hasErrors = true;
      }
    });

    setAnswers(newAnswers);

    if (hasErrors) {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez corriger les erreurs.");
    } else {
      setFeedbackMessage("Bravo ! Toutes les réponses sont correctes.");
      if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
        setCurrentPage(currentPage + 1);
      } else {
        setFeedbackMessage("Félicitations ! Vous avez terminé toutes les questions.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100 text-black py-6 px-4">
      <div className="flex justify-between w-full mb-6">
        <Link
          href="/mobile/menu_mobile/apprendre_mobile/operations_arithmetiques_mobile"
          className="bg-black text-white py-3 px-8 rounded font-bold"
        >
          Apprendre
        </Link>
        <Link
         href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile"
          className="bg-orange-500 text-white py-3 px-8 rounded font-bold"
        >
          Retour
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-6">Différence</h1>

      {feedbackMessage && (
        <p
          className={`text-xl mb-4 ${
            feedbackMessage.includes("incorrectes") || feedbackMessage.includes("remplir")
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {feedbackMessage}
        </p>
      )}

      {/* Questions */}
      <div className="flex flex-col gap-6 w-full items-center">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(([a, b], index) => (
          <div key={`${currentPage}-${index}`} className="flex items-center justify-between gap-6 w-full max-w-md">
            <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-3xl flex-grow text-center">
              {a} - {b} =
            </div>
            <input
              type="text"
              inputMode="numeric"
              className="border border-gray-400 py-3 px-4 rounded-lg text-center text-black text-2xl w-32"
              id={`input-${currentPage * questionsPerPage + index}`}
              value={answers[currentPage * questionsPerPage + index] ?? ""}
              onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center w-full">
        <button
          onClick={handleValidation}
          className="bg-blue-500 text-white py-3 px-6 rounded font-bold w-full max-w-xs"
        >
          Valider les réponses
        </button>
      </div>
    </div>
  );
}
