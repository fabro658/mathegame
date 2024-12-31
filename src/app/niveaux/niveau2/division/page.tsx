"use client";

import { useState } from "react";
import Link from "next/link";

export default function Division() {
  const totalQuestions = 36;
  const questionsPerPage = 6; // 3 colonnes x 2 lignes
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // SVG stroke width and radius for the circle
  const strokeWidth = 4;
  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  // Générer les questions
  const questions = Array.from({ length: totalQuestions }, () => {
    const numerator = Math.floor(Math.random() * 100) + 1;
    const denominator = Math.floor(Math.random() * 10) + 1;
    return [numerator, denominator];
  });

  const correctAnswers = questions.map(([numerator, denominator]) => numerator / denominator);

  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.floor((completedAnswers / totalQuestions) * 100);

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
      alert("Veuillez remplir toutes les réponses sur cette page avant de valider.");
      return;
    }

    const newAnswers = [...answers];
    let allCorrect = true;

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      if (answer !== correctAnswers[globalIndex]) {
        allCorrect = false;
        newAnswers[globalIndex] = null;
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);
    setHasPassed(allCorrect);
  };

  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
      setIsValidated(false);
      setHasPassed(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsValidated(false);
      setHasPassed(false);
    }
  };

  const offset = circumference - (completionPercentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link href="/menu/apprendre" className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-4 rounded font-bold">
        Apprendre
      </Link>

      {/* Cercle de progression */}
      <div className="absolute top-4 left-4 w-32 h-32">
        <svg className="transform -rotate-90" width="100%" height="100%">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="#e5e5e5"
            strokeWidth={strokeWidth}
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500"
          />
        </svg>
        <span className="font-bold">{completionPercentage}%</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">Division</h1>

      {/* Questions pour la page actuelle */}
      {!isValidated && (
        <>
          <div className="grid grid-cols-3 grid-rows-2 gap-6">
            {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(([numerator, denominator], index) => (
              <div key={index} className="flex items-center gap-4">
                <button
                  className="bg-blue-500 text-white font-bold py-4 px-6 rounded w-full"
                  disabled
                >
                  {numerator} ÷ {denominator}
                </button>
                <input
                  type="number"
                  className="border border-gray-400 p-3 rounded w-full text-center text-black"
                  value={answers[currentPage * questionsPerPage + index] || ""}
                  onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Boutons de validation et navigation */}
          <div className="mt-6 flex gap-4">
            {currentPage > 0 && (
              <button
                className="bg-gray-500 text-white py-2 px-6 rounded font-bold"
                onClick={handlePreviousPage}
              >
                Précédent
              </button>
            )}
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
            >
              Valider les réponses
            </button>
            {isValidated && hasPassed && currentPage < Math.floor(totalQuestions / questionsPerPage) - 1 && (
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
                onClick={handleNextPage}
              >
                Suivant
              </button>
            )}
          </div>
        </>
      )}

      {/* Résultats après validation */}
      {isValidated && (
        <>
          {hasPassed ? (
            <div>
              <p className="text-green-600 font-bold text-xl">Bravo ! Toutes vos réponses sont correctes.</p>
              {currentPage < Math.floor(totalQuestions / questionsPerPage) - 1 ? (
                <button
                  className="mt-6 bg-blue-500 text-white py-2 px-6 rounded font-bold"
                  onClick={handleNextPage}
                >
                  Passer à la série suivante
                </button>
              ) : (
                <button
                  className="mt-6 bg-blue-500 text-white py-2 px-6 rounded font-bold"
                  onClick={() => alert("Vous avez complété toutes les questions !")}
                >
                  Terminer
                </button>
              )}
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-bold text-xl">Certaines réponses sont incorrectes. Corrigez-les.</p>
              <button
                className="mt-6 bg-gray-500 text-white py-2 px-6 rounded font-bold"
                onClick={() => setIsValidated(false)}
              >
                Revenir pour corriger
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
