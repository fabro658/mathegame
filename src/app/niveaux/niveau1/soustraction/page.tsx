"use client";

import { useState } from "react";
import Link from "next/link";

export default function Soustraction() {
  const totalQuestions = 50;
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Génération des questions
  const questions = Array.from({ length: totalQuestions }, (_, index) => {
    if (index < 10) return [index + 1, index + 1]; // Niveau 1 : Soustractions simples
    if (index < 20) return [10 + index - 9, 5 + index - 9]; // Niveau 2
    if (index < 30) return [10 + Math.floor(Math.random() * 41), Math.floor(Math.random() * 41)]; // Niveau 3
    if (index < 40) return [20 + Math.floor(Math.random() * 81), 20 + Math.floor(Math.random() * 81)]; // Niveau 4
    return [50 + Math.floor(Math.random() * 51), 50 + Math.floor(Math.random() * 51)]; // Niveau 5
  });

  const correctAnswers = questions.map(([a, b]) => a - b); // Réponses correctes

  // Fonction pour gérer les changements de réponses
  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseInt(value);
    newAnswers[index] = isNaN(parsedValue) ? null : parsedValue;
    setAnswers(newAnswers);
  };

  // Fonction de validation des réponses
  const handleValidation = () => {
    const allCorrect = answers.every((answer, index) => answer === correctAnswers[index]);
    setIsValidated(true);
    setHasPassed(allCorrect);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Bouton vers Apprendre */}
      <Link href="/menu/apprendre">
        <button className="absolute top-4 right-4 bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Apprendre
        </button>
      </Link>

      {/* Progression */}
      <div className="absolute top-4 left-4 bg-blue-500 text-white py-1 px-3 rounded font-bold">
        Progression : {Math.round((answers.filter((a) => a !== null).length / totalQuestions) * 100)}%
      </div>

      <h1 className="text-3xl font-bold mb-6">Soustraction</h1>

      {!isValidated ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {questions.slice(currentPage * 10, (currentPage + 1) * 10).map(([a, b], index) => (
              <div key={index} className="flex items-center gap-4 border-2 border-blue-500 p-6 rounded-xl bg-white shadow-lg">
                <button className="bg-blue-500 text-white font-bold py-3 px-5 rounded-lg text-lg" disabled>
                  {a} - {b}
                </button>
                <input
                  type="text"
                  className="border border-gray-400 p-3 rounded-lg w-full text-center text-black"
                  onChange={(e) => handleChange(currentPage * 10 + index, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              className="bg-gray-500 text-white py-2 px-6 rounded font-bold"
              disabled={currentPage === 0}
            >
              Précédent
            </button>
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
            >
              Valider les réponses
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(Math.floor(totalQuestions / 10) - 1, currentPage + 1))}
              className="bg-gray-500 text-white py-2 px-6 rounded font-bold"
              disabled={currentPage === Math.floor(totalQuestions / 10) - 1}
            >
              Suivant
            </button>
          </div>
        </>
      ) : (
        <>
          {hasPassed ? (
            <p className="text-green-600 font-bold text-xl">Bravo ! Toutes vos réponses sont correctes.</p>
          ) : (
            <p className="text-red-600 font-bold text-xl">Certaines réponses sont incorrectes. Corrigez-les.</p>
          )}
          <button
            onClick={() => setIsValidated(false)}
            className="mt-6 bg-blue-500 text-white py-2 px-6 rounded font-bold"
          >
            Revenir pour corriger
          </button>
        </>
      )}
    </div>
  );
}
