"use client";

import { useState } from "react";
import Link from "next/link";

export default function Addition() {
  const totalQuestions = 50;
  const questionsPerPage = 9; // Afficher 9 questions par page (3 colonnes x 3 lignes)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);

  const questions = Array.from({ length: totalQuestions }, (_, index) => {
    if (index < 10) return [index + 1, index + 1];
    if (index < 20) return [10 + index - 9, 5 + index - 9];
    if (index < 30) return [10 + Math.floor(Math.random() * 41), Math.floor(Math.random() * 41)];
    if (index < 40) return [20 + Math.floor(Math.random() * 81), 20 + Math.floor(Math.random() * 81)];
    return [50 + Math.floor(Math.random() * 51), 50 + Math.floor(Math.random() * 51)];
  });

  const correctAnswers = questions.map(([a, b]) => a + b);

  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseInt(value);
    newAnswers[index] = isNaN(parsedValue) ? null : parsedValue;
    setAnswers(newAnswers);
  };

  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link href="/menu/apprendre" className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-4 rounded font-bold">
        Retour au menu
      </Link>

      {/* Barre de progression */}
      <div className="absolute top-4 left-4 w-1/2 bg-gray-300 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      <div className="absolute top-10 left-4 text-green-500 font-bold">
        Progression : {completionPercentage}%
      </div>

      <h1 className="text-3xl font-bold mb-6">Addition</h1>

      <div className="grid grid-cols-3 gap-6">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(([a, b], index) => (
          <div key={index} className="flex flex-col items-center gap-2 bg-blue-500 text-white p-4 rounded-lg shadow-md">
            <span className="font-bold text-2xl">
              {a} + {b}
            </span>
            <input
              type="number"
              className="border border-gray-300 p-2 rounded w-20 text-center text-black"
              value={answers[currentPage * questionsPerPage + index] || ""}
              onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handlePreviousPage}
          className="bg-gray-500 text-white py-2 px-6 rounded font-bold"
          disabled={currentPage === 0}
        >
          Précédent
        </button>
        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
          disabled={currentPage === Math.floor(totalQuestions / questionsPerPage) - 1}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
