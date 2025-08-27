"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Question = {
  type: "compare";
  numbers: [number, number];
  correctAnswer: "<" | ">" | "=";
};

export default function ComparerDecimaux() {
  const totalQuestions = 36;
  const questionsPerPage = 6;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const generateQuestions = (): Question[] => {
    return Array.from({ length: totalQuestions }, () => {
      const n1 = (Math.random() * 200 - 100).toFixed(2); // [-100, 100]
      const n2 = (Math.random() * 200 - 100).toFixed(2);
      const a = parseFloat(n1);
      const b = parseFloat(n2);
      const correct: "<" | ">" | "=" = a > b ? ">" : a < b ? "<" : "=";
      return { type: "compare", numbers: [a, b], correctAnswer: correct };
    });
  };

  useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value as "<" | ">" | "=" | string;
    setAnswers(newAnswers);
    setFeedbackMessage("");
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;

    const pageAnswers = answers.slice(startIndex, endIndex);
    if (pageAnswers.includes(null)) {
      setFeedbackMessage("Veuillez répondre à toutes les questions avant de valider.");
      return;
    }

    let hasErrors = false;
    const newAnswers = [...answers];

    pageAnswers.forEach((answer, idx) => {
      const globalIndex = startIndex + idx;
      const expected = questions[globalIndex]?.correctAnswer;
      if (answer !== expected) {
        hasErrors = true;
        newAnswers[globalIndex] = null; // efface la mauvaise réponse
      }
    });

    setAnswers(newAnswers);

    const lastPageIndex = Math.floor(totalQuestions / questionsPerPage) - 1;
    if (hasErrors) {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez réessayer.");
    } else if (currentPage < lastPageIndex) {
      setFeedbackMessage("Bravo ! Toutes les réponses sont correctes. Vous pouvez continuer.");
      setCurrentPage(currentPage + 1);
    } else {
      setFeedbackMessage("Excellent ! Vous avez terminé toutes les questions.");
    }
  };

  const startIndex = currentPage * questionsPerPage;
  const visibleQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  return (
<div className="h-screen overflow-y-auto flex justify-center items-start bg-gray-100 text-black p-4 relative">
      {/* Boutons fixes en haut */}
      <Link
        href="/mobile/menu_mobile/apprendre_mobile/operations_arithmetiques_mobile"
        className="fixed top-4 left-4 bg-black text-white py-3 px-8 rounded font-bold z-50"
      >
        Apprendre
      </Link>
      <Link
        href="/mobile/primaire_mobile/niveaux_mobile/niveau2_mobile"
        className="fixed top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-50"
      >
        Retour
      </Link>

      {/* Contenu scrollable */}
      <div className="max-w-4xl w-full bg-[#1e1f3d] p-6 rounded-lg shadow-lg pb-24 mt-16">
        <h1 className="text-3xl font-bold mb-6 text-center">Comparaison de décimaux</h1>

        {feedbackMessage && (
          <p
            className={`text-xl mb-6 text-center ${
              feedbackMessage.includes("incorrectes") ||
              feedbackMessage.includes("réessayer") ||
              feedbackMessage.includes("toutes les questions")
                ? "text-red-400"
                : "text-green-400"
            }`}
          >
            {feedbackMessage}
          </p>
        )}

        {/* 6 questions de la page courante */}
        <div className="flex flex-col gap-10 w-full max-w-lg mx-auto">
          {visibleQuestions.map((q, idx) => {
            const globalIndex = startIndex + idx;
            return (
              <div
                key={globalIndex}
                className="flex flex-col items-center justify-center gap-4"
              >
                {/* Enoncé */}
                <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-3xl text-center w-full">
                  {q.numbers[0].toFixed(2)} ? {q.numbers[1].toFixed(2)}
                </div>
                {/* Réponse en dessous */}
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
    </div>
  );
}
