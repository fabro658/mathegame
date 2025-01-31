"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ConversionDecimale() {
  const totalQuestions = 30; // Nombre total de questions
  const questionsPerPage = 3; // Nombre de questions par vague

  const [questions, setQuestions] = useState<
    { question: string; correctAnswer: string }[]
  >([]);
  const [answers, setAnswers] = useState<string[]>(Array(totalQuestions).fill(""));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, (_, index) => {
        // Génération des questions
        let question = "";
        let correctAnswer = "";

        if (index < totalQuestions / 3) {
          // Pourcentage -> Décimale
          const percentage = Math.floor(Math.random() * 100) + 1;
          question = `${percentage}%`;
          correctAnswer = (percentage / 100).toFixed(2);
        } else if (index < (2 * totalQuestions) / 3) {
          // Fraction -> Décimale
          const numerator = Math.floor(Math.random() * 20) + 1;
          const denominator = Math.floor(Math.random() * 20) + 1;
          question = `${numerator}/${denominator}`;
          correctAnswer = (numerator / denominator).toFixed(2);
        } else {
          // Mélange des pourcentages et des fractions
          const isPercentage = Math.random() > 0.5;
          if (isPercentage) {
            const percentage = Math.floor(Math.random() * 100) + 1;
            question = `${percentage}%`;
            correctAnswer = (percentage / 100).toFixed(2);
          } else {
            const numerator = Math.floor(Math.random() * 20) + 1;
            const denominator = Math.floor(Math.random() * 20) + 1;
            question = `${numerator}/${denominator}`;
            correctAnswer = (numerator / denominator).toFixed(2);
          }
        }

        return { question, correctAnswer };
      });
    };

    setQuestions(generateQuestions());
  }, []);

  const handleAnswer = (index: number, answer: string): void => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleValidation = (): void => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);
    const correctAnswers = questions
      .slice(startIndex, endIndex)
      .map((q) => q.correctAnswer);

    const allAnswersFilled = pageAnswers.every((answer) => answer.trim() !== "");

    if (!allAnswersFilled) {
      alert("Veuillez répondre à toutes les questions avant de valider.");
      return;
    }

    const allCorrect = pageAnswers.every(
      (answer, idx) => answer.trim() === correctAnswers[idx]
    );

    setIsValidated(true);
    setHasPassed(allCorrect);

    if (allCorrect && currentPage < totalQuestions / questionsPerPage - 1) {
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsValidated(false);
      }, 1500);
    }
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
      <Link
        href="/mobile/menu_mobile/apprendre_mobile/fraction_mobile"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/mobile/secondaire_mobile/niveaux_mobile/niveau2_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-3xl font-bold mb-6">
        Questions sur les conversions en décimale
      </h1>

      {!isValidated && (
        <>
          <div className="flex flex-col gap-6">
            {questions
              .slice(
                currentPage * questionsPerPage,
                (currentPage + 1) * questionsPerPage
              )
              .map(({ question }, index) => (
                <div key={index} className="flex flex-col items-start gap-2">
                  <div className="font-bold text-black">{question}</div>
                  <input
                    type="text"
                    value={
                      answers[currentPage * questionsPerPage + index] || ""
                    }
                    onChange={(e) =>
                      handleAnswer(
                        currentPage * questionsPerPage + index,
                        e.target.value
                      )
                    }
                    className="border border-gray-300 p-2 rounded"
                  />
                </div>
              ))}
          </div>

          <div className="mt-6 flex flex-col gap-4 items-center w-full max-w-md">
            <button
              onClick={handlePreviousPage}
              className="bg-gray-500 text-white py-3 px-8 rounded font-bold hover:bg-gray-600"
              disabled={currentPage === 0}
            >
              Précédent
            </button>
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-3 px-8 rounded font-bold hover:bg-blue-600"
            >
              Valider les réponses
            </button>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white py-3 px-8 rounded font-bold hover:bg-blue-600"
              disabled={currentPage === Math.floor(totalQuestions / questionsPerPage) - 1}
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
                className="mt-6 bg-blue-500 text-white py-3 px-8 rounded font-bold"
                onClick={handleNextPage}
              >
                Suivant
              </button>
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-bold text-xl">
                Certaines réponses sont incorrectes. Corrigez-les.
              </p>
              <button
                className="mt-6 bg-gray-500 text-white py-3 px-8 rounded font-bold"
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