"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Addition() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [questions, setQuestions] = useState<[number, number][]>([]);

  useEffect(() => {
    const generateQuestions = (): [number, number][] => {
      return Array.from({ length: totalQuestions }, (_, index): [number, number] => {
        let a: number, b: number;
  
        if (index < 10) {
          // Première vague : nombres petits et faciles
          a = Math.floor(Math.random() * 10) + 1; // [1, 10]
          b = Math.floor(Math.random() * 10) + 1; // [1, 10]
        } else if (index < 20) {
          // Deuxième vague : nombres plus grands et aléatoires
          const range = 20; // Étendre la plage
          a = Math.floor(Math.random() * range) + 10; // [10, 30]
          b = Math.floor(Math.random() * range) + 5; // [5, 25]
        } else if (index < 30) {
          // Troisième vague : plus difficile, nombres aléatoires non égaux
          do {
            a = Math.floor(Math.random() * 50) + 10; // [10, 60]
            b = Math.floor(Math.random() * 50) + 10; // [10, 60]
          } while (a === b); // Éviter les répétitions exactes
        } else {
          // Dernière vague : grands nombres
          a = Math.floor(Math.random() * 100) + 50; // [50, 150]
          b = Math.floor(Math.random() * 100) + 50; // [50, 150]
        }
  
        return [a, b];
      });
    };
  
    setQuestions(generateQuestions());
  }, []);
  
  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseFloat(value);
    newAnswers[index] = isNaN(parsedValue) ? null : parsedValue;
    setAnswers(newAnswers);
    setFeedbackMessage(""); // Reset feedback message on change
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
      if (answer !== a + b) {
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

  return (
<div className="flex flex-col items-center min-h-screen bg-gray-100 text-black py-6 px-4 overflow-y-auto">
{/* Navigation Buttons */}
      <div className="flex justify-between w-full mb-6">
        <Link href="/mobile/menu_mobile/apprendre_mobile/operations_arithmetiques_mobile">
          <div className="bg-black text-white py-3 px-8 rounded font-bold w-40 text-center">Apprendre</div>
        </Link>
        <Link href="/mobile/primaire_mobile/niveaux_mobile/niveau1_mobile">
          <div className="bg-orange-500 text-white py-3 px-8 rounded font-bold w-40 text-center">Retour</div>
        </Link>
      </div>
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">Addition</h1>

      {/* Feedback */}
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

      {/* Questions */}
      <div className="flex flex-col gap-6 w-full items-center">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(([a, b], index) => (
          <div key={index} className="flex justify-center items-center gap-6">
            <div className="bg-blue-500 text-white py-3 px-6 rounded-lg font-bold text-3xl text-center flex-shrink-0">
              {a} + {b} =
            </div>
            <input
              type="text"
              inputMode="numeric"
              className="w-24 border border-gray-400 py-2 px-3 rounded text-center text-black text-lg flex-shrink-0"
              value={answers[currentPage * questionsPerPage + index] ?? ""}
              onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Validate Button */}
      <div className="mt-6 flex justify-center w-full">
        <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold w-full max-w-xs">
          Valider les réponses
        </button>
      </div>
    </div>
  );
}

