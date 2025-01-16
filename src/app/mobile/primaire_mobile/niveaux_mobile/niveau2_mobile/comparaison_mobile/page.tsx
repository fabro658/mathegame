"use client";

import { useState } from "react";
import Link from "next/link";

export default function ComparerEntiers() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const questions = Array.from({ length: totalQuestions }, () => {
    const number1 = Math.floor(Math.random() * 100) + 1;
    const number2 = Math.floor(Math.random() * 100) + 1;
    const correctAnswer = number1 > number2 ? ">" : number1 < number2 ? "<" : "=";
    return { type: "compare", numbers: [number1, number2], correctAnswer };
  });

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
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
    let allCorrect = true;
    const newAnswers = [...answers];

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      const question = questions[globalIndex];
      if (answer !== question.correctAnswer) {
        newAnswers[globalIndex] = null;
        hasErrors = true;
        allCorrect = false;
      }
    });

    setAnswers(newAnswers);

    if (hasErrors) {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez corriger les erreurs.");
    } else if (allCorrect) {
      setFeedbackMessage("Bravo ! Toutes les réponses sont correctes.");
      if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
        setCurrentPage(currentPage + 1);
      } else {
        setFeedbackMessage("Bravo ! Vous avez terminé toutes les questions.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100 text-black py-6 px-4">
      {/* Conteneur pour les boutons */}
      <div className="flex justify-between w-full mb-6">
        <Link 
          href="/mobile/menu_mobile/apprendre_mobile/opérations arithmétiques_mobile" 
          className="bg-black text-white py-3 px-8 rounded font-bold">
          Apprendre
        </Link>
        <Link 
        href="/mobile/primaire_mobile/niveaux_mobile/niveau2_mobile"
        className="bg-orange-500 text-white py-3 px-8 rounded font-bold">
          Retour
        </Link>
      </div>

      {/* Titre */}
      <h1 className="text-4xl font-bold mb-6">Comparaison</h1>

      {/* Feedback */}
      {feedbackMessage && (
        <p 
          className={`text-xl mb-4 ${feedbackMessage.includes("incorrectes") || feedbackMessage.includes("remplir") ? "text-red-500" : "text-green-500"}`}
        >
          {feedbackMessage}
        </p>
      )}

      {/* Questions et réponses */}
      <div className="flex flex-col gap-6 w-full max-w-lg">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map((question, globalIndex) => {
          return (
            <div key={globalIndex} className="bg-white p-4 rounded shadow-md text-center">
              <p className="text-lg font-bold mb-4">
                {`${question.numbers[0]} ? ${question.numbers[1]}`}
              </p>
              <select
                value={answers[globalIndex] || ""}
                onChange={(e) => handleChange(globalIndex, e.target.value)}
                className="py-2 px-4 rounded border-gray-300"
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

      {/* Bouton de validation */}
      <div className="mt-6 flex justify-center w-full">
        <button 
          onClick={handleValidation} 
          className="bg-blue-500 text-white py-3 px-6 rounded font-bold w-full max-w-xs"
        >
          Valider les réponses
        </button>
      </div>
    </div>
  );
}
