"use client";

import { useState } from "react";
import Link from "next/link";

export default function Addition() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const questions = Array.from({ length: totalQuestions }, (_, index) => {
    if (index < 10) return [index + 1, index + 1];
    if (index < 20) return [10 + index - 9, 5 + index - 9];
    if (index < 30) return [10 + Math.floor(Math.random() * 41), Math.floor(Math.random() * 41)];
    return [50 + Math.floor(Math.random() * 51), 50 + Math.floor(Math.random() * 51)];
  });

  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseInt(value, 10);
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
      const [a, b] = questions[globalIndex];
      if (answer !== a + b) {
        allCorrect = false;
        newAnswers[globalIndex] = null;
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);
  };

  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
      setIsValidated(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsValidated(false);
    }
  };

  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Bouton Apprendre */}
      <Link
        href="/menu/apprendre/opérations arithmétiques"
        className="absolute bottom-6 left-6 bg-black text-white py-3 px-8 rounded font-bold hover:bg-gray-700"
        style={{ height: "60px" }}
      >
        Apprendre
      </Link>

      {/* Bouton Retour */}
      <Link
        href="/primaire/niveaux/niveau1"
        className="absolute top-6 right-6 bg-orange-500 text-white py-3 px-8 rounded font-bold hover:bg-orange-600"
        style={{ height: "60px" }}
      >
        Retour
      </Link>

      {/* Barre circulaire */}
      <div className="absolute top-6 left-6 w-32 h-32">
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
            strokeDashoffset={circumference - (circumference * completionPercentage) / 100}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-blue-500">{completionPercentage}%</span>
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-6">Addition</h1>

      {!isValidated && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
            {questions
              .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
              .map(([a, b], index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between items-center bg-white rounded shadow p-4"
                  style={{ height: "70px" }}
                >
                  <span className="text-lg font-bold text-black">{a} + {b}</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="border border-gray-400 p-2 rounded w-32 text-center text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={answers[currentPage * questionsPerPage + index] || ""}
                    onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
                  />
                </div>
              ))}
          </div>

          <div className="mt-8 flex flex-row justify-center gap-4">
            <button
              onClick={handlePreviousPage}
              className="bg-gray-500 text-white py-3 px-8 rounded font-bold hover:bg-gray-600"
              style={{ height: "60px" }}
              disabled={currentPage === 0}
            >
              Précédent
            </button>
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-3 px-8 rounded font-bold hover:bg-blue-600"
              style={{ height: "60px" }}
            >
              Valider
            </button>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white py-3 px-8 rounded font-bold hover:bg-blue-600"
              style={{ height: "60px" }}
              disabled={currentPage === Math.floor(totalQuestions / questionsPerPage) - 1}
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  );
}
