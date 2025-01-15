"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Multiplication() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
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
      alert("Veuillez remplir toutes les réponses sur cette page avant de valider.");
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
    setIsValidated(true);

    if (!allCorrect) {
      alert("Certaines réponses sont incorrectes. Corrigez-les avant de continuer.");
    } else {
      setCurrentPage(currentPage + 1);
      setIsValidated(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link
        href="/menu/apprendre/opérations arithmétiques"
        className="absolute bottom-20 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/primaire/niveaux/niveau1"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-3xl font-bold mb-6">Multiplication</h1>

      {!isValidated && (
        <>
          <div className="flex flex-col gap-4">
            {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(([factor1, factor2], index) => (
              <div key={index} className="flex items-center gap-4">
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-6 rounded w-full"
                  disabled
                >
                  {factor1} × {factor2}
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  className="border border-gray-400 p-2 rounded w-32 text-center text-black text-lg"
                  value={answers[currentPage * questionsPerPage + index]?.toString() || ""}
                  onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-2 px-6 rounded font-bold w-full"
            >
              Valider les réponses
            </button>
          </div>
        </>
      )}

      {isValidated && (
        <p className="text-green-600 font-bold text-xl">
          Bravo ! Toutes les réponses sont correctes. Passage à la série suivante...
        </p>
      )}
    </div>
  );
}
