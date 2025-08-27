"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Division() {
  const totalQuestions = 36;
  const questionsPerPage = 6;

  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackClass, setFeedbackClass] = useState("");
  const [questions, setQuestions] = useState<[number, number][]>([]);

  useEffect(() => {
    const generateQuestions = (): [number, number][] => {
      return Array.from({ length: totalQuestions }, (_, index) => {
        let numerator: number, denominator: number;

        if (index < 10) {
          // Facile : dénominateurs 1..10
          denominator = Math.floor(Math.random() * 10) + 1;
          numerator = denominator * (Math.floor(Math.random() * 5) + 1); // multiples 1..5
        } else if (index < 20) {
          // Intermédiaire : dénominateurs 10..19
          denominator = Math.floor(Math.random() * 10) + 10;
          numerator = denominator * (Math.floor(Math.random() * 4) + 1); // multiples 1..4
        } else {
          // Avancé : dénominateurs 20..49
          denominator = Math.floor(Math.random() * 30) + 20;
          numerator = denominator * (Math.floor(Math.random() * 3) + 1); // multiples 1..3
        }

        return [numerator, denominator];
      });
    };

    setQuestions(generateQuestions());
  }, []);

  const correctAnswers = questions.map(([n, d]) => n / d);

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
      if (currentPage < lastPageIndex) {
        setFeedbackMessage("Bravo ! Toutes les réponses sont correctes. Vous pouvez continuer.");
        setFeedbackClass("text-green-400");
        setCurrentPage(currentPage + 1);
      } else {
        setFeedbackMessage("Bravo ! Vous avez terminé toutes les questions.");
        setFeedbackClass("text-green-400");
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
        <h1 className="text-3xl font-bold mb-6 text-center">Division</h1>

        {/* Feedback */}
        {feedbackMessage && (
          <p className={`text-xl mb-6 text-center ${feedbackClass}`}>{feedbackMessage}</p>
        )}

        {/* Questions (page courante) */}
        <div className="flex flex-col items-center gap-4 w-full">
          {questions
            .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
            .map(([numerator, denominator], index) => (
              <div
                key={`${currentPage}-${index}`}
                className="flex items-center justify-between gap-6 w-full max-w-md"
              >
                <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-3xl flex-grow text-center">
                  {numerator} ÷ {denominator}
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

        {/* Validation */}
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
