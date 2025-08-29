"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Question = {
  type: "compare";
  numbers: [number, number];
  correctAnswer: "<" | ">" | "=";
};

export default function ComparerEntiers() {
  const totalQuestions = 36;
  const questionsPerPage = 6;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(totalQuestions).fill(null)
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Génère les questions une fois
  useEffect(() => {
    const generated: Question[] = Array.from({ length: totalQuestions }, () => {
      const a = Math.floor(Math.random() * 100) + 1; // [1..100]
      const b = Math.floor(Math.random() * 100) + 1; // [1..100]
      const correct: "<" | ">" | "=" = a > b ? ">" : a < b ? "<" : "=";
      return { type: "compare", numbers: [a, b], correctAnswer: correct };
    });
    setQuestions(generated);
  }, []);

  const handleChange = (index: number, value: string) => {
    const next = [...answers];
    next[index] = value as "<" | ">" | "=" | string;
    setAnswers(next);
    setFeedbackMessage(""); // clear feedback dès changement
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
      const expected = questions[globalIndex]?.correctAnswer;
      if (answer !== expected) {
        hasErrors = true;
        next[globalIndex] = null; // efface seulement les mauvaises
      }
    });

    setAnswers(next);

    const lastPageIndex = Math.floor(totalQuestions / questionsPerPage) - 1;
    if (hasErrors) {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez corriger les erreurs.");
      return; // on ne change pas de page
    }

    // si tout est bon
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
    // Page à scroll isolé
    <div className="fixed inset-0 overflow-y-auto bg-gray-100 text-black">
      {/* Boutons fixes en haut */}
      <Link
        href="/menu/apprendre"
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
        <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg pb-24">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Comparaison de nombres entiers
          </h1>

          {feedbackMessage && (
            <p
              className={`text-xl mb-6 text-center ${
                feedbackMessage.includes("incorrectes") ||
                feedbackMessage.includes("toutes les réponses")
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {feedbackMessage}
            </p>
          )}

          {/* 6 questions de la page */}
          <div className="flex flex-col gap-8 w-full max-w-lg mx-auto">
            {visible.map((q, idx) => {
              const globalIndex = startIndex + idx;
              return (
                <div
                  key={globalIndex}
                  className="flex flex-col items-center justify-center gap-4"
                >
                  {/* Enoncé */}
                  <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-3xl text-center w-full">
                    {q.numbers[0]} ? {q.numbers[1]}
                  </div>

                  {/* Réponse */}
                  <select
                    value={answers[globalIndex] || ""}
                    onChange={(e) => handleChange(globalIndex, e.target.value)}
                    className="border border-gray-400 py-2 px-3 rounded text-center text-black text-lg w-28"
                  >
                    <option value="" disabled>
                      Choisissez
                    </option>
                    <option value="<">&lt;</option>
                    <option value=">">&gt;</option>
                    <option value="=">=</option>
                  </select>
                </div>
              );
            })}
          </div>

          {/* Valider */}
          <div className="mt-10 flex justify-center w-full">
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
