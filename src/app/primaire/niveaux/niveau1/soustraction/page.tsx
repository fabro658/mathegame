"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Soustraction() {
  const totalQuestions = 36;
  const questionsPerPage = 6;

  const [questions, setQuestions] = useState<number[][]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);

  // Seed aléatoire unique, stocké dans l'état local
  const [seed, setSeed] = useState<number | null>(null);

  // Générateur pseudo-aléatoire basé sur un seed
  const random = (s: number) => {
    const x = Math.sin(s++) * 10000;
    return x - Math.floor(x);
  };

  // Fonction pour mélanger un tableau en fonction d'un seed
  const shuffleArrayWithSeed = (array: number[][], s: number) => {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(random(s) * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  };

  // Génération des questions
  useEffect(() => {
    // Si aucun seed n'existe, générez-en un
    if (seed === null) {
      const newSeed = Math.floor(Math.random() * 100000); // Seed aléatoire entre 0 et 100000
      setSeed(newSeed);
    } else {
      const easyQuestions = Array.from({ length: 10 }, (_, index) => [index + 1, index + 1]);
      const mediumQuestions = Array.from({ length: 10 }, (_, index) => [10 + index - 9, 5 + index - 9]);
      const hardQuestions = Array.from({ length: 10 }, () => {
        const a = Math.max(10, Math.floor(Math.random() * 41));
        const b = Math.floor(Math.random() * 41);
        return a >= b ? [a, b] : [b, a];
      });
      const veryHardQuestions = Array.from({ length: 6 }, () => {
        const a = 20 + Math.floor(Math.random() * 81);
        const b = 20 + Math.floor(Math.random() * 81);
        return a >= b ? [a, b] : [b, a];
      });
      const expertQuestions = Array.from({ length: 6 }, () => {
        const a = 50 + Math.floor(Math.random() * 51);
        const b = 50 + Math.floor(Math.random() * 51);
        return a >= b ? [a, b] : [b, a];
      });

      const allQuestions = [
        ...easyQuestions,
        ...mediumQuestions,
        ...hardQuestions,
        ...veryHardQuestions,
        ...expertQuestions,
      ];

      shuffleArrayWithSeed(allQuestions, seed);
      setQuestions(allQuestions);
    }
  }, [seed]);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseInt(value);
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
      if (answer !== a - b) {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <h1 className="text-4xl font-bold mb-6">Soustraction</h1>
      <div className="grid grid-cols-3 gap-6">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(([a, b], index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">{a} - {b}</div>
            <input
              type="text"
              inputMode="numeric"
              className="border border-gray-400 p-4 rounded w-32 text-center text-black text-lg"
              value={answers[currentPage * questionsPerPage + index] || ""}
              onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-4">
        <button onClick={handlePreviousPage} className="bg-gray-500 text-white py-3 px-6 rounded font-bold">
          Précédent
        </button>
        <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">
          Valider les réponses
        </button>
        <button onClick={handleNextPage} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">
          Suivant
        </button>
      </div>
    </div>
  );
}
