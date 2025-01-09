"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Question =
  | { type: "compare", fractions: [string, string], correctAnswer: string };

export default function ComparerFractions() {
  const totalQuestions = 30;
  const questionsPerPage = 3;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const generateQuestions = (): Question[] => {
    return Array.from({ length: totalQuestions }, () => {
      const numerator1 = Math.floor(Math.random() * 9) + 1;
      const denominator1 = Math.floor(Math.random() * 8) + 2;
      const numerator2 = Math.floor(Math.random() * 9) + 1;
      const denominator2 = Math.floor(Math.random() * 8) + 2;
      const fraction1 = `${numerator1}/${denominator1}`;
      const fraction2 = `${numerator2}/${denominator2}`;

      const value1 = numerator1 / denominator1;
      const value2 = numerator2 / denominator2;
      const correctAnswer = value1 > value2 ? ">" : value1 < value2 ? "<" : "=";

      return { type: "compare", fractions: [fraction1, fraction2], correctAnswer };
    });
  };

  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  const handleAnswer = (globalIndex: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[globalIndex] = value;
    setAnswers(updatedAnswers);
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null)) {
      alert("Veuillez répondre à toutes les questions avant de valider.");
      return;
    }

    const isCorrect = pageAnswers.every((answer, index) => {
      const questionIndex = startIndex + index;
      return questions[questionIndex] && answer === questions[questionIndex].correctAnswer;
    });

    setIsValidated(true);
    setHasPassed(isCorrect);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    setIsValidated(false);
    setHasPassed(false);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
    setIsValidated(false);
    setHasPassed(false);
  };

  const currentQuestions = questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link
        href="/menu/apprendre"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/primaire/niveaux/niveau3"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-3xl font-bold mb-6">Comparaison de Fractions</h1>

      {!isValidated && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {currentQuestions.map((question, localIndex) => {
              const globalIndex = currentPage * questionsPerPage + localIndex;
              return (
                <div key={globalIndex} className="bg-white p-4 rounded shadow-md text-center">
                  <p className="text-lg font-bold mb-4">
                    {`${question.fractions[0]} ? ${question.fractions[1]}`}
                  </p>
                  <select
                    value={answers[globalIndex] || ""}
                    onChange={(e) => handleAnswer(globalIndex, e.target.value)}
                    className="py-2 px-4 rounded border-gray-300"
                  >
                    <option value="" disabled>Choisissez</option>
                    <option value="<">&lt;</option>
                    <option value=">">&gt;</option>
                    <option value="=">=</option>
                  </select>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4">
            {currentPage > 0 && (
              <button
                onClick={handlePreviousPage}
                className="bg-gray-500 text-white py-2 px-6 rounded"
              >
                Précédent
              </button>
            )}
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-2 px-6 rounded"
            >
              Valider
            </button>
            {currentPage < Math.floor(totalQuestions / questionsPerPage) - 1 && (
              <button
                onClick={handleNextPage}
                className="bg-gray-500 text-white py-2 px-6 rounded"
              >
                Suivant
              </button>
            )}
          </div>
        </>
      )}

      {isValidated && (
        <div>
          {hasPassed ? (
            <p className="text-green-500 font-bold text-lg">Toutes les réponses sont correctes !</p>
          ) : (
            <p className="text-red-500 font-bold text-lg">Certaines réponses sont incorrectes.</p>
          )}
          <button
            onClick={handleNextPage}
            className="mt-4 bg-gray-500 text-white py-2 px-6 rounded"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}
