"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Soustraction() {
  const totalQuestions = 36;
  const questionsPerPage = 6;

  const [questions, setQuestions] = useState<[number, number][]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(totalQuestions).fill(null)
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Générer les questions avec une difficulté progressive (une seule fois)
  useEffect(() => {
    const generateQuestions = (): [number, number][] => {
      return Array.from({ length: totalQuestions }, (_, index): [number, number] => {
        let a: number, b: number;

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

        // On force a >= b pour éviter les résultats négatifs dans cet exercice
        return [Math.max(a, b), Math.min(a, b)];
      });
    };

    setQuestions(generateQuestions());
  }, []);

  const handleChange = (index: number, value: string) => {
    const next = [...answers];
    const parsed = parseInt(value);
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
      if (answer !== a - b) {
        next[globalIndex] = null; // efface les erreurs uniquement
        hasErrors = true;
      }
    });

    setAnswers(next);

    if (hasErrors) {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez corriger les erreurs.");
      return;
    }

    const lastPageIndex = Math.floor(totalQuestions / questionsPerPage) - 1;
    if (currentPage < lastPageIndex) {
      setFeedbackMessage("Bravo ! Toutes les réponses sont correctes. Vous pouvez continuer.");
      setCurrentPage((p) => p + 1);
    } else {
      setFeedbackMessage("Félicitations ! Vous avez terminé toutes les questions.");
    }
  };

  const startIndex = currentPage * questionsPerPage;
  const visible = questions.slice(startIndex, startIndex + questionsPerPage);

  return (
    // Page mobile : défilement isolé
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
          <h1 className="text-3xl font-bold mb-6 text-center">Différence</h1>

          {feedbackMessage && (
            <p
              className={`text-xl mb-6 text-center ${
                feedbackMessage.includes("incorrectes") ||
                feedbackMessage.includes("remplir")
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {feedbackMessage}
            </p>
          )}

          {/* Questions (6 par page) */}
          <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
            {visible.map(([a, b], idx) => {
              const globalIndex = startIndex + idx;
              return (
                <div
                  key={globalIndex}
                  className="flex items-center justify-between gap-4 w-full"
                >
                  <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-3xl flex-grow text-center">
                    {a} - {b} =
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

          {/* Bouton valider */}
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
