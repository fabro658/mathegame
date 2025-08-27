"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Multiplication() {
  const totalQuestions = 36;
  const questionsPerPage = 6;

  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackClass, setFeedbackClass] = useState("");
  const [questions, setQuestions] = useState<[number, number][]>([]);

  useEffect(() => {
    const generated: [number, number][] = Array.from({ length: totalQuestions }, () => {
      const factor1 = Math.floor(Math.random() * 12) + 1;
      const factor2 = Math.floor(Math.random() * 12) + 1;
      return [factor1, factor2];
    });
    setQuestions(generated);
  }, []);

  const correctAnswers = questions.map(([a, b]) => a * b);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsed = parseFloat(value);
    newAnswers[index] = isNaN(parsed) ? null : parsed;
    setAnswers(newAnswers);
    setFeedbackMessage("");
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null)) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      setFeedbackClass("text-red-400");
      return;
    }

    const newAnswers = [...answers];
    let allCorrect = true;

    pageAnswers.forEach((answer, idx) => {
      const globalIndex = startIndex + idx;
      if (answer !== correctAnswers[globalIndex]) {
        allCorrect = false;
        newAnswers[globalIndex] = null; // efface les mauvaises réponses
      }
    });

    setAnswers(newAnswers);

    const lastPageIndex = Math.floor(totalQuestions / questionsPerPage) - 1;
    if (allCorrect) {
      setFeedbackClass("text-green-400");
      if (currentPage < lastPageIndex) {
        setFeedbackMessage("Bravo ! Toutes les réponses sont correctes. Vous pouvez continuer.");
        setCurrentPage(currentPage + 1);
      } else {
        setFeedbackMessage("Bravo ! Vous avez terminé toutes les questions.");
      }
    } else {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez corriger les erreurs.");
      setFeedbackClass("text-red-400");
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
        <h1 className="text-3xl font-bold mb-6 text-center">Multiplication</h1>

        {/* Feedback */}
        {feedbackMessage && (
          <p className={`text-xl mb-6 text-center ${feedbackClass}`}>{feedbackMessage}</p>
        )}

        {/* Questions (page courante) */}
        <div className="flex flex-col items-center gap-4 w-full">
          {questions
            .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
            .map(([factor1, factor2], index) => (
              <div key={`${currentPage}-${index}`} className="flex items-center justify-between gap-6 w-full max-w-md">
                <div className="flex-1 bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-3xl text-center">
                  {factor1} × {factor2}
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  className="border border-gray-400 py-3 px-4 rounded-lg text-center text-black text-2xl w-32"
                  value={answers[currentPage * questionsPerPage + index] ?? ""}
                  onChange={(e) =>
                    handleChange(currentPage * questionsPerPage + index, e.target.value)
                  }
                />
              </div>
            ))}
        </div>

        {/* Bouton de validation */}
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
