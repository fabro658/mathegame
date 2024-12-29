"use client";

import { useState } from "react";
import Link from "next/link";

export default function Aire() {
  const totalQuestions = 30; // 30 questions au total
  const questionsPerPage = 3; // 3 questions par vague
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const questions = Array.from({ length: totalQuestions }, () => {
    const shapeType = Math.floor(Math.random() * 4);
    let questionText = "";
    let correctAnswer = 0;

    if (shapeType === 0) {
      const side = Math.floor(Math.random() * 10) + 1;
      questionText = `Quelle est l&apos;aire d&apos;un carré de côté ${side} cm ?`;
      correctAnswer = side * side;
    } else if (shapeType === 1) {
      const length = Math.floor(Math.random() * 10) + 1;
      const width = Math.floor(Math.random() * 10) + 1;
      questionText = `Quelle est l&apos;aire d&apos;un rectangle de longueur ${length} cm et de largeur ${width} cm ?`;
      correctAnswer = length * width;
    } else if (shapeType === 2) {
      const radius = Math.floor(Math.random() * 10) + 1;
      questionText = `Quelle est l&apos;aire d&apos;un cercle de rayon ${radius} cm ? (π = 3.14)`;
      correctAnswer = Math.PI * radius * radius;
    } else {
      const base = Math.floor(Math.random() * 10) + 1;
      const height = Math.floor(Math.random() * 10) + 1;
      questionText = `Quelle est l&apos;aire d&apos;un triangle de base ${base} cm et de hauteur ${height} cm ?`;
      correctAnswer = 0.5 * base * height;
    }

    return {
      questionText,
      correctAnswer: correctAnswer.toFixed(2),
    };
  });

  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  const handleChange = (index: number, value: string): void => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  const handleValidation = (): void => {
    const allCorrect = answers.every((answer, index) => answer === questions[index].correctAnswer);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link href="/menu/apprendre" className="absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-lg font-bold">
        Apprendre
      </Link>

      {/* Barre de progression */}
      <div className="absolute top-4 left-4 w-1/2 bg-gray-300 rounded-full h-4">
        <div
          className="bg-blue-500 h-4 rounded-full"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      <div className="absolute top-10 left-4 text-blue-500 font-bold">
        Progression : {completionPercentage}%
      </div>

      <h1 className="text-3xl font-bold mb-6">Questions sur l&apos;Aire</h1>

      {!isValidated && (
        <>
          <div className="flex flex-col gap-6">
            {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ questionText }, index) => (
              <div key={index} className="flex flex-col items-start gap-2">
                <div className="font-bold text-black">{questionText}</div>
                <input
                  type="number"
                  className="border border-gray-400 p-2 rounded w-full text-center text-black"
                  onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
                />
              </div>
            ))}
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
              disabled={currentPage === totalQuestions / questionsPerPage - 1}
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
              <p className="text-green-600 font-bold text-xl">Bravo ! Toutes vos réponses sont correctes.</p>
              <button
                className="mt-6 bg-blue-500 text-white py-2 px-6 rounded font-bold"
                onClick={() => alert("Vous avez complété toutes les questions !")}
              >
                Terminer
              </button>
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
