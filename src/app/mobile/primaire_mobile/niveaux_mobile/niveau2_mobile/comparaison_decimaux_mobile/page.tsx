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
  const [isValidated, setIsValidated] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Ajout du feedback

  const generateQuestions = (): Question[] => {
    return Array.from({ length: totalQuestions }, () => {
      const number1 = (Math.random() * 200 - 100).toFixed(2); // Plage de -100 à 100
      const number2 = (Math.random() * 200 - 100).toFixed(2); // Plage de -100 à 100
      const correctAnswer =
        parseFloat(number1) > parseFloat(number2)
          ? ">"
          : parseFloat(number1) < parseFloat(number2)
          ? "<"
          : "=";
      return {
        type: "compare",
        numbers: [parseFloat(number1), parseFloat(number2)],
        correctAnswer,
      };
    });
  };

  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  const handleAnswer = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
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

    if (hasErrors) {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez réessayer.");
    } else {
      setFeedbackMessage("Bravo ! Vous avez répondu correctement à toutes les questions.");
    }

    setIsValidated(true);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100 text-black py-6 px-4">
      {/* Navigation Buttons */}
      <div className="flex justify-between w-full mb-6">
        <Link href="/mobile/menu_mobile/apprendre_mobile/opérations arithmétiques_mobile">
          <div className="bg-black text-white py-3 px-8 rounded font-bold w-40 text-center">
            Apprendre
            </div>
        </Link>
        <Link href="/mobile/primaire_mobile/niveaux_mobile/niveau2_mobile">
          <div className="bg-orange-500 text-white py-3 px-8 rounded font-bold w-40 text-center">
            Retour
            </div>
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">Comparaison</h1>

      {/* Feedback */}
      {feedbackMessage && (
        <p
          className={`text-xl mb-4 ${
            feedbackMessage.includes("réessayer") || feedbackMessage.includes("incorrectes")
              ? "text-red-500"
              : "text-green-500"
          } text-center`}
        >
          {feedbackMessage}
        </p>
      )}

      {/* Questions */}
      <div className="flex flex-col gap-6 w-full max-w-lg">
        {questions.map((question, index) => (
          <div key={index} className="flex items-center justify-center gap-6">
            <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-3xl">
              {question.numbers[0]} ? {question.numbers[1]}
            </div>
            <select
              value={answers[index] || ""}
              onChange={(e) => handleAnswer(index, e.target.value)}
              className="border border-gray-400 py-2 px-3 rounded text-center text-black text-lg w-24"
            >
              <option value="" disabled>
                Choisissez
              </option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
              <option value="=">=</option>
            </select>
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
