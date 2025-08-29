"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Addition() {
  const totalQuestions = 36;
  const questionsPerPage = 6;

  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(totalQuestions).fill(null)
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [questions, setQuestions] = useState<[number, number][]>([]);

  useEffect(() => {
    const generated: [number, number][] = Array.from(
      { length: totalQuestions },
      (_, index) => {
        if (index < 12) {
          return [
            Math.floor(Math.random() * 90) + 10,
            Math.floor(Math.random() * 90) + 10,
          ];
        } else if (index < 24) {
          return [
            Math.floor(Math.random() * 900) + 100,
            Math.floor(Math.random() * 900) + 100,
          ];
        } else {
          return [
            Math.floor(Math.random() * 9000) + 1000,
            Math.floor(Math.random() * 9000) + 1000,
          ];
        }
      }
    );
    setQuestions(generated);
  }, []);

  const handleChange = (index: number, value: string) => {
    const next = [...answers];
    const parsed = parseFloat(value);
    next[index] = isNaN(parsed) ? null : parsed;
    setAnswers(next);
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
    const next = [...answers];

    pageAnswers.forEach((answer, idx) => {
      const globalIndex = startIndex + idx;
      const [a, b] = questions[globalIndex];
      if (answer !== a + b) {
        next[globalIndex] = null; // efface seulement les mauvaises
        hasErrors = true;
      }
    });

    setAnswers(next);

    const lastPageIndex = Math.floor(totalQuestions / questionsPerPage) - 1;
    if (hasErrors) {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez corriger les erreurs.");
    } else if (currentPage < lastPageIndex) {
      setFeedbackMessage("Toutes les réponses de cette page sont correctes. Vous pouvez continuer.");
      setCurrentPage((p) => p + 1);
    } else {
      setFeedbackMessage("Bravo ! Vous avez terminé toutes les questions.");
    }
  };

  const startIndex = currentPage * questionsPerPage;
  const visible = questions.slice(startIndex, startIndex + questionsPerPage);

  return (
    // Page à défilement isolé
    <div className="fixed inset-0 overflow-y-auto bg-gray-100 text-black">
      {/* Boutons fixes en haut */}
      <Link
        href="/mobile/menu_mobile/apprendre_mobile/operations_arithmetiques_mobile"
        className="fixed top-4 left-4 bg-black text-white py-3 px-8 rounded font-bold z-50"
      >
        Apprendre
      </Link>
      <Link
        href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile"
        className="fixed top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-50"
      >
        Retour
      </Link>

      {/* Contenu central (carte blanche) */}
      <main className="min-h-screen flex justify-center items-start p-4 pt-24 pb-28">
        <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg">
          {/* Titre */}
          <h1 className="text-3xl font-bold mb-6 text-center">Somme</h1>

          {/* Feedback */}
          {feedbackMessage && (
            <p
              className={`text-xl mb-6 text-center ${
                feedbackMessage.includes("incorrectes") ||
                feedbackMessage.includes("Veuillez remplir")
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {feedbackMessage}
            </p>
          )}

          {/* Questions (6 par page) */}
          <div className="flex flex-col gap-6 w-full items-center">
            {visible.map(([a, b], idx) => {
              const globalIndex = startIndex + idx;
              return (
                <div
                  key={globalIndex}
                  className="flex items-center justify-between gap-6 w-full max-w-md"
                >
                  <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-3xl flex-grow text-center">
                    {a} + {b} =
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="border border-gray-400 py-3 px-4 rounded-lg text-center text-black text-2xl w-32"
                    value={answers[globalIndex] ?? ""}
                    onChange={(e) => handleChange(globalIndex, e.target.value)}
                  />
                </div>
              );
            })}
          </div>

          {/* Bouton Valider */}
          <div className="mt-8 flex justify-center w-full">
            <button
              onClick={handleValidation}
              className="bg-blue-600 text-white py-3 px-6 rounded font-bold w-full max-w-xs hover:bg-blue-700"
            >
              Valider les réponses
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
