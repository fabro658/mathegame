"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Perimetre() {
  const totalQuestions = 30; // 30 questions au total
  const questionsPerPage = 3; // 3 questions par vague
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [questions, setQuestions] = useState<{ questionText: string; correctAnswer: string }[]>([]);
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, () => {
        const shapeType = Math.floor(Math.random() * 4);
        let questionText = "";
        let correctAnswer = 0;

        if (shapeType === 0) {
          const side = Math.floor(Math.random() * 10) + 1;
          questionText = `Quel est le périmètre d'un carré de côté ${side} cm ?`;
          correctAnswer = 4 * side;
        } else if (shapeType === 1) {
          const length = Math.floor(Math.random() * 10) + 1;
          const width = Math.floor(Math.random() * 10) + 1;
          questionText = `Quel est le périmètre d'un rectangle de longueur ${length} cm et de largeur ${width} cm ?`;
          correctAnswer = 2 * (length + width);
        } else if (shapeType === 2) {
          const radius = Math.floor(Math.random() * 10) + 1;
          questionText = `Quel est le périmètre d'un cercle de rayon ${radius} cm ? (π = 3.14)`;
          correctAnswer = 2 * Math.PI * radius;
        } else {
          const side1 = Math.floor(Math.random() * 10) + 1;
          const side2 = Math.floor(Math.random() * 10) + 1;
          const side3 = Math.floor(Math.random() * 10) + 1;
          questionText = `Quel est le périmètre d'un triangle avec des côtés de ${side1} cm, ${side2} cm et ${side3} cm ?`;
          correctAnswer = side1 + side2 + side3;
        }

        return {
          questionText,
          correctAnswer: correctAnswer.toFixed(2),
        };
      });
    };

    setQuestions(generateQuestions());
  }, []); // La liste de dépendances vide garantit que cette fonction est exécutée une seule fois.

  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  const handleChange = (index: number, value: string): void => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  const handleValidation = (): void => {
    const currentAnswers = answers.slice(
      currentPage * questionsPerPage,
      (currentPage + 1) * questionsPerPage
    );

    const allFilled = currentAnswers.every((answer) => answer !== null && answer.trim() !== "");
    if (!allFilled) {
      alert("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    const updatedAnswers = [...answers];
    let allCorrect = true;

    answers.forEach((answer, index) => {
      if (answer !== questions[index]?.correctAnswer) {
        updatedAnswers[index] = null; // Efface uniquement les réponses incorrectes
        allCorrect = false;
      }
    });

    setAnswers(updatedAnswers);
    setIsValidated(true);
    setHasPassed(allCorrect);
  };

  const handleNextPage = (): void => {
    if (currentPage < totalQuestions / questionsPerPage - 1) {
      setCurrentPage(currentPage + 1);
      setIsValidated(false);
    }
  };

  const handlePreviousPage = (): void => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsValidated(false);
    }
  };

  // Variables pour la barre circulaire
  const radius = 50; // Rayon du cercle
  const strokeWidth = 10; // Largeur du cercle
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link
        href="/menu/apprendre"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/niveaux/niveau3"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

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

      {!isValidated && (
        <>
          <div className="flex flex-col gap-6">
            {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ questionText }, index) => {
              const globalIndex = currentPage * questionsPerPage + index;
              const isIncorrect =
                isValidated && answers[globalIndex] !== questions[globalIndex]?.correctAnswer;

              return (
                <div key={index} className="flex flex-col items-start gap-2">
                  <div
                    className={`font-bold text-black ${isIncorrect ? "text-red-600" : ""}`}
                  >
                    {questionText}
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    className={`border p-4 rounded w-32 text-center text-black text-lg ${
                      isIncorrect ? "border-red-600" : "border-gray-400"
                    }`}
                    value={answers[globalIndex] || ""}
                    onChange={(e) => handleChange(globalIndex, e.target.value)}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={handlePreviousPage}
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
              onClick={handleNextPage}
              className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
              disabled={!isValidated || currentPage === totalQuestions / questionsPerPage - 1}
            >
              Suivant
            </button>
          </div>
        </>
      )}

      {isValidated && (
        <>
          {hasPassed ? (
            <div>
              <p className="text-green-600 font-bold text-xl">
                Bravo ! Toutes vos réponses sont correctes.
              </p>
              <button
                className="mt-6 bg-blue-500 text-white py-2 px-6 rounded font-bold"
                onClick={() => alert("Vous avez complété toutes les questions !")}
              >
                Terminer
              </button>
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-bold text-xl">
                Certaines réponses sont incorrectes. Corrigez-les.
              </p>
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
