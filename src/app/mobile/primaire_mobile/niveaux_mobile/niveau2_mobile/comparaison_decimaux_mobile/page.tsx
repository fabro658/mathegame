"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Question = {
  type: "compare";
  numbers: [number, number];
  correctAnswer: string;
};

export default function ComparerDecimaux() {
  const totalQuestions = 36;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const generateQuestions = (): Question[] => {
    return Array.from({ length: totalQuestions }, () => {
      const number1 = (Math.random() * 200 - 100).toFixed(2); // [-100, 100]
      const number2 = (Math.random() * 200 - 100).toFixed(2);
      const a = parseFloat(number1);
      const b = parseFloat(number2);
      const correctAnswer = a > b ? ">" : a < b ? "<" : "=";
      return { type: "compare", numbers: [a, b], correctAnswer };
    });
  };

  useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    setFeedbackMessage("");
  };

  const handleValidation = () => {
    if (answers.includes(null)) {
      setFeedbackMessage("Veuillez répondre à toutes les questions avant de valider.");
      return;
    }

    let hasErrors = false;
    const newAnswers = [...answers];

    answers.forEach((answer, index) => {
      if (questions[index] && answer !== questions[index].correctAnswer) {
        newAnswers[index] = null;
        hasErrors = true;
      }
    });

    setAnswers(newAnswers);
    setFeedbackMessage(
      hasErrors
        ? "Certaines réponses sont incorrectes. Veuillez réessayer."
        : "Bravo ! Vous avez répondu correctement à toutes les questions."
    );
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
        href="/mobile/primaire_mobile/niveaux_mobile/niveau2_mobile"
        className="fixed top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-50"
      >
        Retour
      </Link>

      {/* Contenu scrollable */}
      <div className="max-w-4xl w-full bg-[#1e1f3d] p-6 rounded-lg shadow-lg pb-24 mt-16">
        {/* Titre */}
        <h1 className="text-3xl font-bold mb-6 text-center">Comparaison</h1>

        {/* Feedback */}
        {feedbackMessage && (
          <p
            className={`text-xl mb-6 text-center ${
              feedbackMessage.includes("réessayer") || feedbackMessage.includes("incorrectes") || feedbackMessage.includes("répondre à toutes")
                ? "text-red-400"
                : "text-green-400"
            }`}
          >
            {feedbackMessage}
          </p>
        )}

        {/* Questions (toutes, avec scroll) */}
        <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
          {questions.map((q, index) => (
            <div key={index} className="flex items-center justify-center gap-6">
              <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-3xl">
                {q.numbers[0].toFixed(2)} ? {q.numbers[1].toFixed(2)}
              </div>
              <select
                value={answers[index] || ""}
                onChange={(e) => handleChange(index, e.target.value)}
                className="border border-gray-400 py-2 px-3 rounded text-center text-black text-lg w-28"
              >
                <option value="" disabled>Choisissez</option>
                <option value="<">&lt;</option>
                <option value=">">&gt;</option>
                <option value="=">=</option>
              </select>
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
