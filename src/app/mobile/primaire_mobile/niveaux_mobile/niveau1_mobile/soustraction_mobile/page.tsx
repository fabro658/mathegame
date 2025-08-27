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

  useEffect(() => {
    const generateQuestions = (): [number, number][] => {
      return Array.from({ length: totalQuestions }, (_, index): [number, number] => {
        let a: number, b: number;

        if (index < 10) {
          a = Math.floor(Math.random() * 10) + 1;
          b = Math.floor(Math.random() * 10) + 1;
        } else if (index < 20) {
          a = Math.floor(Math.random() * 20) + 10;
          b = Math.floor(Math.random() * 15) + 5;
        } else if (index < 30) {
          a = Math.floor(Math.random() * 50) + 20;
          b = Math.floor(Math.random() * 40) + 10;
        } else {
          a = Math.floor(Math.random() * 100) + 50;
          b = Math.floor(Math.random() * 80) + 30;
        }

        // s'assurer que a >= b
        return a >= b ? [a, b] : [b, a];
      });
    };

    setQuestions(generateQuestions());
  }, []);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseInt(value, 10);
    newAnswers[index] = isNaN(parsedValue) ? null : parsedValue;
    setAnswers(newAnswers);
    setFeedbackMessage("");
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

    pageAnswers.forEach((answer, idx) => {
      const globalIndex = startIndex + idx;
      const [a, b] = questions[globalIndex];
      if (answer !== a - b) {
        newAnswers[globalIndex] = null;
        hasErrors = true;
      }
    });

    setAnswers(newAnswers);

    const lastPageIndex = Math.floor(totalQuestions / questionsPerPage) - 1;
    if (hasErrors) {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez corriger les erreurs.");
    } else if (currentPage < lastPageIndex) {
      setFeedbackMessage("Bravo ! Toutes les réponses sont correctes. Vous pouvez continuer.");
      setCurrentPage(currentPage + 1);
    } else {
      setFeedbackMessage("Félicitations ! Vous avez terminé toutes les questions.");
    }
  };

  return (
    <div className="h-screen overflow-y-auto flex justify-center items-start bg-[#0b0c2a] text-white p-4 relative">
      {/* Boutons fixes en haut */}
      <Link
        href="/mobile/menu_mobile/apprendre_mobile/operations_arithmetiques_mobile"
        className="fixed top-4 left-4 bg-black text-white py-3 px-8 rounded font-bold z-50"
      >
        Apprendre
      </Link>
      <Link
        href="/mobile/primaire_mobile/niveaux_mobile/niveau1_mobile"
        className="fixed top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-50"
      >
        Retour
      </Link>

      {/* Contenu scrollable */}
      <div className="max-w-4xl w-full bg-[#1e1f3d] p-6 rounded-lg shadow-lg pb-24 mt-16">
        {/* Titre */}
        <h1 className="text-3xl font-bold mb-6 text-center">Soustraction</h1>

        {/* Feedback */}
        {feedbackMessage && (
          <p
            className={`text-xl mb-6 text-center ${
              feedbackMessage.includes("incorrectes") || feedbackMessage.includes("remplir")
                ? "text-red-400"
                : "text-green-400"
            }`}
          >
            {feedbackMessage}
          </p>
        )}

        {/* Questions (page courante) */}
        <div className="flex flex-col gap-6 w-full items-center">
          {questions
            .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
            .map(([a, b], index) => (
              <div key={`${currentPage}-${index}`} className="flex justify-center items-center gap-6">
                <div className="bg-blue-500 text-white py-3 px-6 rounded-lg font-bold text-3xl text-center flex-shrink-0">
                  {a} - {b} =
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  className="w-24 border border-gray-400 py-2 px-3 rounded text-center text-black text-lg flex-shrink-0"
                  value={answers[currentPage * questionsPerPage + index] ?? ""}
                  onChange={(e) =>
                    handleChange(currentPage * questionsPerPage + index, e.target.value)
                  }
                />
              </div>
            ))}
        </div>

        {/* Validation */}
        <div className="mt-8 flex justify-center w-full">
          <button
            onClick={handleValidation}
            className="bg-blue-600 text-white py-3 px-6 rounded font-bold w-full max-w-xs hover:bg-blue-700"
          >
            Valider les réponses
          </button>
        </div>
      </div>
    </div>
  );
}
