"use client";

import { useState } from "react";
import Link from "next/link";

export default function Addition() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const questions = Array.from({ length: totalQuestions }, (_, index) => {
    if (index < 10) return [index + 1, index + 1];
    if (index < 20) return [10 + index + 9, 5 + index + 9];
    if (index < 30) return [Math.max(10, Math.floor(Math.random() * 41)), Math.floor(Math.random() * 41)];
    return [50 + Math.floor(Math.random() * 51), 50 + Math.floor(Math.random() * 51)];
  });

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
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100 text-black py-6 px-4">
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

{/* Boutons Questions */}
<div className="flex flex-col gap-6 w-full items-center">
{questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(([a, b], index) => (
<div key={index} className="flex justify-center items-center gap-6">
{/* Conteneur de la question */}
<div className="bg-blue-500 text-white py-3 px-6 rounded-lg font-bold text-3xl text-center flex-shrink-0">
  {a} + {b} =
</div>
{/* Input pour la réponse */}
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