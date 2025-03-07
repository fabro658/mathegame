"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Perimetre() {
  const totalQuestions = 36;
  const questionsPerPage = 3;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [questions, setQuestions] = useState<{ questionText: string; correctAnswer: string }[]>([]);
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, (_, index) => {
        let questionText = "";
        let correctAnswer = 0;

        if (index < 12) {
          const side = Math.floor(Math.random() * 10) + 1;
          questionText = `Quel est le périmètre d'un carré de côté ${side} cm ?`;
          correctAnswer = 4 * side;
        } else if (index < 24) {
          const length = Math.floor(Math.random() * 10) + 1;
          const width = Math.floor(Math.random() * 10) + 1;
          questionText = `Quel est le périmètre d'un rectangle de longueur ${length} cm et de largeur ${width} cm ?`;
          correctAnswer = 2 * (length + width);
        } else {
          const side1 = Math.floor(Math.random() * 10) + 1;
          const side2 = Math.floor(Math.random() * 10) + 1;
          const side3 = Math.floor(Math.random() * 10) + 1;
          questionText = `Quel est le périmètre d'un triangle avec des côtés de ${side1} cm, ${side2} cm et ${side3} cm ?`;
          correctAnswer = side1 + side2 + side3;
        }

        return {
          questionText,
          correctAnswer: correctAnswer.toString(),
        };
      });
    };

    setQuestions(generateQuestions());
  }, []);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Boutons de navigation */}
      <Link
        href="/menu/apprendre/opérations arithmétiques"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/secondaire/niveaux/niveau1"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      {/* Barre circulaire */}
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
            strokeDashoffset={circumference - (circumference * completionPercentage) / 100}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-blue-500">{completionPercentage}%</span>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">Questions sur le périmètre</h1>




          {/* Questions et réponses */}
          {!isValidated && (
        <>
          <div className="grid grid-cols-3 gap-6">
            {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ questionText }, index) => (
              <div key={index} className="flex flex-col items-start gap-2">
                <div className="font-bold text-black">{questionText}</div>
                <input
                  type="text"
                  className="border border-gray-400 p-6 rounded w-96 text-center text-black text-lg mx-auto"
                  value={answers[currentPage * questionsPerPage + index] || ""}
                  onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
                  />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handlePreviousPage}
                  className="bg-gray-500 text-white py-3 px-6 rounded font-bold"
                  disabled={currentPage === 0}
                >
                  Précédent
                </button>
                <button
                  onClick={handleValidation}
                  className="bg-blue-500 text-white py-3 px-6 rounded font-bold"
                >
                  Valider les réponses
                </button>
                <button
                  onClick={handleNextPage}
                  className="bg-blue-500 text-white py-3 px-6 rounded font-bold"
                  disabled={currentPage === Math.floor(totalQuestions / questionsPerPage) - 1}
                >
                  Suivant
                </button>
              </div>
            </>
          )}

      {/* Résultats après validation */}
      {isValidated && (
        <>
          {hasPassed ? (
            <div>
              <p className="text-green-600 font-bold text-xl">Bravo ! Toutes vos réponses sont correctes.</p>
              <button className="mt-6 bg-blue-500 text-white py-3 px-6 rounded font-bold" onClick={handleNextPage}>
                Suivant
              </button>
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-bold text-xl">Certaines réponses sont incorrectes. Corrigez-les.</p>
              <button className="mt-6 bg-gray-500 text-white py-3 px-6 rounded font-bold" onClick={() => setIsValidated(false)}>
                Revenir pour corriger
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}