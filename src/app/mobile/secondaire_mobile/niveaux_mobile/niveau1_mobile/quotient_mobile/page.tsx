"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Division() {
  const totalQuestions = 36;
  const questionsPerPage = 6;

  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(totalQuestions).fill(null)
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackClass, setFeedbackClass] = useState("");
  const [questions, setQuestions] = useState<[number, number][]>([]);

  // Générer les questions une seule fois
  useEffect(() => {
    const generatedQuestions: [number, number][] = Array.from(
      { length: totalQuestions },
      (_, index) => {
        let numerator: number, denominator: number;

        if (index < 10) {
          // multiples simples
          denominator = Math.floor(Math.random() * 10) + 1; // 1..10
          numerator = denominator * (Math.floor(Math.random() * 10) + 1);
        } else if (index < 20) {
          numerator = Math.floor(Math.random() * 100) + 1;
          denominator = Math.floor(Math.random() * 10) + 1;
        } else if (index < 30) {
          numerator = Math.floor(Math.random() * 1000) + 1; // 1..1000
          denominator = Math.floor(Math.random() * 50) + 1;  // 1..50
        } else {
          numerator = Math.floor(Math.random() * 10000) + 1; // 1..10000
          denominator = Math.floor(Math.random() * 100) + 1;  // 1..100
        }

        return [numerator, denominator];
      }
    );
    setQuestions(generatedQuestions);
  }, []);

  const correctAnswers = questions.map(([n, d]) => n / d);

  const handleChange = (index: number, value: string) => {
    const next = [...answers];
    const parsed = parseFloat(value);
    next[index] = isNaN(parsed) ? null : parsed;
    setAnswers(next);
    setFeedbackMessage("");
    setFeedbackClass("");
  };

  const handleValidation = () => {
    if (questions.length === 0) return;

    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null)) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      setFeedbackClass("text-red-600");
      return;
    }

    let allCorrect = true;
    const next = [...answers];

    pageAnswers.forEach((answer, idx) => {
      const globalIndex = startIndex + idx;
      if (answer !== correctAnswers[globalIndex]) {
        allCorrect = false;
        next[globalIndex] = null; // efface seulement les mauvaises
      }
    });

    setAnswers(next);

    if (!allCorrect) {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez corriger les erreurs.");
      setFeedbackClass("text-red-600");
      return;
    }

    // Tout est correct
    const lastPageIndex = Math.floor(totalQuestions / questionsPerPage) - 1;
    if (currentPage < lastPageIndex) {
      setFeedbackMessage("Bravo ! Toutes les réponses sont correctes. Vous pouvez continuer.");
      setFeedbackClass("text-green-600");
      setCurrentPage((p) => p + 1);
    } else {
      setFeedbackMessage("Bravo ! Vous avez terminé toutes les questions.");
      setFeedbackClass("text-green-600");
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
          <h1 className="text-3xl font-bold mb-6 text-center">Quotient</h1>

          {/* Feedback */}
          {feedbackMessage && (
            <p className={`text-xl mb-6 text-center ${feedbackClass}`}>
              {feedbackMessage}
            </p>
          )}

          {/* Questions (6 par page) */}
          <div className="flex flex-col items-center gap-6 w-full">
            {visible.map(([numerator, denominator], idx) => {
              const globalIndex = startIndex + idx;
              return (
                <div
                  key={globalIndex}
                  className="flex items-center justify-between gap-6 w-full max-w-md"
                >
                  {/* Enoncé */}
                  <div className="flex-1 bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-3xl text-center">
                    {numerator} ÷ {denominator}
                  </div>
                  {/* Réponse */}
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
      </main>
    </div>
  );
}
