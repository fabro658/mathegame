"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Multiplication() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [questions, setQuestions] = useState<[number, number][]>([]);

  useEffect(() => {
    const generatedQuestions: [number, number][] = Array.from({ length: totalQuestions }, () => {
      const factor1 = Math.floor(Math.random() * 12) + 1;
      const factor2 = Math.floor(Math.random() * 12) + 1;
      return [factor1, factor2];
    });

    setQuestions(generatedQuestions);
  }, []);

  const correctAnswers = questions.map(([factor1, factor2]) => factor1 * factor2);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseFloat(value);
    newAnswers[index] = isNaN(parsedValue) ? null : parsedValue;
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

    const newAnswers = [...answers];
    let allCorrect = true;

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      if (answer !== correctAnswers[globalIndex]) {
        allCorrect = false;
        newAnswers[globalIndex] = 0; // Effacer la réponse incorrecte (affiche 0)
      }
    });

    setAnswers(newAnswers);

    if (allCorrect) {
      setFeedbackMessage("Bravo ! Toutes les réponses sont correctes.");
      if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
        setCurrentPage(currentPage + 1);
      } else {
        setFeedbackMessage("Bravo ! Vous avez terminé toutes les questions.");
      }
    } else {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez corriger les erreurs.");
    }

    setIsValidated(true);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100 text-black py-6 px-4">
      {/* Conteneur pour les boutons */}
      <div className="flex justify-between w-full mb-6">
        <Link href="/mobile/menu_mobile/apprendre_mobile/opérations arithmétiques_mobile" className="bg-black text-white py-3 px-8 rounded font-bold">
          Apprendre
        </Link>
        <Link href="/mobile/primaire_mobile/niveaux_mobile/niveau1_mobile" className="bg-orange-500 text-white py-3 px-8 rounded font-bold">
          Retour
        </Link>
      </div>

      {/* Titre */}
      <h1 className="text-4xl font-bold mb-6">Multiplication</h1>

      {/* Feedback */}
      {feedbackMessage && <p className={`text-xl mb-4 ${feedbackMessage.includes("incorrectes") ? "text-red-500" : "text-green-500"}`}>{feedbackMessage}</p>}

      {/* Questions et réponses */}
      <div className="flex flex-col gap-6 w-full max-w-lg">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(([factor1, factor2], index) => (
          <div key={index} className="flex items-center justify-center gap-6">
            <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-3xl">{factor1} × {factor2}</div>
            <input
              type="text"
              inputMode="numeric"
              className="border border-gray-400 p-4 rounded w-24 text-center text-black text-2xl"
              value={answers[currentPage * questionsPerPage + index] ?? ""}
              onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Bouton de validation */}
      <div className="mt-6 flex justify-center w-full">
        <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold w-full max-w-xs">
          Valider les réponses
        </button>
      </div>
    </div>
  );
}