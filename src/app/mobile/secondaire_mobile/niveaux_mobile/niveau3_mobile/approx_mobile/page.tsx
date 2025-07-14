"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Arrondissement() {
  const totalQuestions = 36;
  const questionsPerPage = 6;

  const generateQuestions = (type: string) => {
    return Array.from({ length: totalQuestions }, () => {
      const number = Math.random() * 100;
      const rounded = type === "unité" ? Math.round(number) : parseFloat(number.toFixed(1));
      return {
        text: type === "unité" ? number.toFixed(0) : number.toFixed(1),
        correctAnswer: rounded,
      };
    });
  };

  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [questions, setQuestions] = useState(generateQuestions("unité"));
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    const newQuestions = generateQuestions(currentPage % 2 === 0 ? "unité" : "dixième");
    setQuestions(newQuestions);
  }, [answers, currentPage]);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseFloat(value);
    newAnswers[index] = isNaN(parsedValue) ? null : parsedValue;
    setAnswers(newAnswers);
    setFeedbackMessage("");
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null)) {
      setFeedbackMessage("Veuillez remplir toutes les réponses sur cette page avant de valider.");
      return;
    }

    let allCorrect = true;
    const newAnswers = [...answers];

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      const question = questions[globalIndex % questions.length];

      if (answer !== question.correctAnswer) {
        allCorrect = false;
        newAnswers[globalIndex] = null;
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);

    if (allCorrect) {
      setFeedbackMessage("Bravo ! Toutes vos réponses sont correctes.");
    } else {
      setFeedbackMessage("Certaines réponses sont incorrectes. Corrigez-les.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative py-6 px-4">
      <div className="flex justify-between w-full mb-6">
        <Link href="/menu/apprendre" className="bg-black text-white py-3 px-8 rounded font-bold">
          Apprendre
        </Link>
        <Link href="/mobile/secondaire_mobile/niveaux_mobile/niveau3_mobile" className="bg-orange-500 text-white py-3 px-8 rounded font-bold">
          Retour
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Arrondissement</h1>

      {feedbackMessage && (
        <p className={`text-xl font-bold mb-6 text-center ${feedbackMessage.includes("incorrectes") || feedbackMessage.includes("remplir") ? "text-red-600" : "text-green-600"}`}>
          {feedbackMessage}
        </p>
      )}

      <div className="flex flex-col gap-4 w-full max-w-3xl">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map((question, index) => (
          <div key={index} className="flex items-center justify-center gap-4 mb-4">
            <div className="bg-blue-500 text-white font-bold py-4 px-6 rounded-lg text-xl w-full">
              {question.text}
            </div>
            <input
              type="text"
              inputMode="numeric"
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

      {isValidated && currentPage < Math.floor(totalQuestions / questionsPerPage) - 1 && (
        <button onClick={() => setCurrentPage(currentPage + 1)} className="bg-green-500 text-white py-3 px-6 rounded font-bold w-full max-w-xs mt-6">
          Aller à la page suivante
        </button>
      )}
    </div>
  );
}
