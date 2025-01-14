"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Division() {
  const totalQuestions = 36;
  const questionsPerPage = 6; 
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [questions, setQuestions] = useState<[number, number][]>([]);

  useEffect(() => {
    const generatedQuestions: [number, number][] = Array.from({ length: totalQuestions }, (_, index) => {
      let numerator: number, denominator: number;

      if (index < 10) {
        denominator = Math.floor(Math.random() * 10) + 1;
        numerator = denominator * (Math.floor(Math.random() * 10) + 1);
      } else if (index < 20) {
        numerator = Math.floor(Math.random() * 100) + 1;
        denominator = Math.floor(Math.random() * 10) + 1;
      } else if (index < 30) {
        numerator = Math.floor(Math.random() * 100) + 1;
        denominator = Math.floor(Math.random() * 20) + 1;
      } else {
        numerator = Math.floor(Math.random() * 100) + 1;
        denominator = Math.floor(Math.random() * 50) + 1;
      }

      return [numerator, denominator];
    });

    setQuestions(generatedQuestions);
  }, []);

  const correctAnswers = questions.map(([numerator, denominator]) => numerator / denominator);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link
        href="/mobile/menu_mobile/apprendre_mobile/opérations arithmétiques_mobile"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/mobile/primaire_mobile/niveaux_mobile/niveau1_mobile"
        className="absolute top-4 left-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-3xl font-bold mb-6 mt-12">Division</h1>

      {!isValidated && (
        <div className="space-y-6 w-full max-w-md">
          {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(([numerator, denominator], index) => (
            <div key={index} className="flex flex-col items-start gap-2">
              <p className="text-lg font-medium">{numerator} ÷ {denominator}</p>
              <input
                type="text"
                inputMode="numeric"
                className="border border-gray-400 p-3 rounded w-full text-black text-lg"
                value={answers[currentPage * questionsPerPage + index] || ""}
                onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 w-full max-w-md">
        <button
          onClick={handleValidation}
          className="bg-blue-500 text-white py-2 px-6 rounded font-bold w-full"
        >
          Valider les réponses
        </button>
      </div>

      {isValidated && (
        <div className="mt-6 text-center">
          {hasPassed ? (
            <p className="text-green-600 font-bold text-xl">Bravo ! Toutes vos réponses sont correctes.</p>
          ) : (
            <p className="text-red-600 font-bold text-xl">Certaines réponses sont incorrectes. Corrigez-les.</p>
          )}
        </div>
      )}
    </div>
  );
}
