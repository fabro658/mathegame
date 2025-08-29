"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Multiplication() {
  const totalQuestions = 36;
  const questionsPerPage = 6;

  const [questions, setQuestions] = useState<[number, number][]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(totalQuestions).fill(null)
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackClass, setFeedbackClass] = useState("");

  useEffect(() => {
    // Génération des questions (1er rendu)
    const generated: [number, number][] = Array.from(
      { length: totalQuestions },
      () => {
        const factor1 = Math.floor(Math.random() * 90) + 100; // 3 chiffres
        const factor2 = Math.floor(Math.random() * 9) + 10;   // 2 chiffres
        return [factor1, factor2];
      }
    );
    setQuestions(generated);
  }, []);

  const correctAnswers = questions.map(([a, b]) => a * b);

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
        next[globalIndex] = null; // efface uniquement les mauvaises
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
      {/* Boutons fixes */}
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

      {/* Contenu central */}
      <main className="min-h-screen flex justify-center items-start p-4 pt-24 pb-28">
        <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg">
          {/* Titre */}
          <h1 className="text-3xl font-bold mb-6 text-center">Produit</h1>

          {/* Feedback */}
          {feedbackMessage && (
            <p className={`text-xl mb-6 text-center ${feedbackClass}`}>
              {feedbackMessage}
            </p>
          )}

          {/* Questions (6 par page) */}
          <div className="flex flex-col items-center gap-6 w-full">
            {visible.map(([factor1, factor2], idx) => {
              const globalIndex = startIndex + idx;
              return (
                <div
                  key={globalIndex}
                  className="flex items-center justify-between gap-6 w-full max-w-md"
                >
                  {/* Enoncé */}
                  <div className="flex-1 bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-3xl text-center">
                    {factor1} × {factor2}
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
