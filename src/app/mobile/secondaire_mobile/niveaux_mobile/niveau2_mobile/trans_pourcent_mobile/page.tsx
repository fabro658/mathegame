"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ConversionDecimale() {
  const totalQuestions = 30; // Nombre total de questions
  const questionsPerPage = 6; // Nombre de questions par vague

  const [questions, setQuestions] = useState<
    { question: string; correctAnswer: string }[]
  >([]);
  const [answers, setAnswers] = useState<string[]>(Array(totalQuestions).fill(""));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, (_, index) => {
        // Génération des questions
        let question = "";
        let correctAnswer = "";

        if (index < totalQuestions / 3) {
          // Pourcentage -> Décimale
          const percentage = Math.floor(Math.random() * 100) + 1;
          question = `${percentage}%`;
          correctAnswer = (percentage / 100).toFixed(2);
        } else if (index < (2 * totalQuestions) / 3) {
          // Fraction -> Décimale
          const numerator = Math.floor(Math.random() * 20) + 1;
          const denominator = Math.floor(Math.random() * 20) + 1;
          question = `${numerator}/${denominator}`;
          correctAnswer = (numerator / denominator).toFixed(2);
        } else {
          // Mélange des pourcentages et des fractions
          const isPercentage = Math.random() > 0.5;
          if (isPercentage) {
            const percentage = Math.floor(Math.random() * 100) + 1;
            question = `${percentage}%`;
            correctAnswer = (percentage / 100).toFixed(2);
          } else {
            const numerator = Math.floor(Math.random() * 20) + 1;
            const denominator = Math.floor(Math.random() * 20) + 1;
            question = `${numerator}/${denominator}`;
            correctAnswer = (numerator / denominator).toFixed(2);
          }
        }

        return { question, correctAnswer };
      });
    };

    setQuestions(generateQuestions());
  }, []);

  const handleValidation = (): void => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);
    const correctAnswers = questions
      .slice(startIndex, endIndex)
      .map((q) => q.correctAnswer);

    const allAnswersFilled = pageAnswers.every((answer) => answer.trim() !== "");

    if (!allAnswersFilled) {
      setFeedbackMessage("Veuillez répondre à toutes les questions avant de valider.");
      return;
    }

    const allCorrect = pageAnswers.every(
      (answer, idx) => answer.trim() === correctAnswers[idx]
    );

    if (allCorrect) {
      setFeedbackMessage("Toutes les réponses sont correctes !");
      if (currentPage < totalQuestions / questionsPerPage - 1) {
        setTimeout(() => {
          setCurrentPage(currentPage + 1);
          setFeedbackMessage("");
        }, 1500);
      }
    } else {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez réessayer.");
    }
  };

  const handleChange = (index: number, value: string): void => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 text-black pt-16">
      <Link
        href="/mobile/menu_mobile/apprendre_mobile/fraction_mobile"
        className="absolute top-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/mobile/secondaire_mobile/niveaux_mobile/niveau2_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-4xl font-bold mb-4">Transformer en nombre décimale</h1>

      {feedbackMessage && (
        <p className={`text-xl font-bold mb-6 text-center ${feedbackMessage.includes("incorrectes") || feedbackMessage.includes("remplir") ? "text-red-600" : "text-green-600"}`}>
          {feedbackMessage}
        </p>
      )}

      <div className="flex flex-col gap-4 w-full max-w-3xl">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ question }, index) => (
          <div key={index} className="flex items-center justify-center gap-4 mb-4">
            <button
              className="bg-blue-500 text-white font-bold py-4 px-6 rounded-lg text-2xl"
              disabled
            >
              {question}
            </button>
            <input
              type="text"
              className="border border-gray-400 p-4 rounded-lg w-1/3 text-center text-lg"
              value={answers[currentPage * questionsPerPage + index] || ""}
              onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center w-full">
        <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold w-full max-w-xs">
          Valider les réponses
        </button>
      </div>
    </div>
  );
}