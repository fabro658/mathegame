"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Question =
  | { type: "compare", fractions: [string, string], correctAnswer: "equal" | "not_equal" }
  | { type: "equivalence", fractions: string[], correctAnswer: string };

export default function ComparerFractions() {  // Nom modifié ici
  const totalQuestions = 30;
  const questionsPerPage = 3;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const generateQuestions = (): Question[] => {
    const generateSameDenominator = (): Question[] => {
      return Array.from({ length: totalQuestions / 6 }, () => {
        const denominator = Math.floor(Math.random() * 8) + 2;
        const num1 = Math.floor(Math.random() * 9) + 1;
        const num2 = Math.floor(Math.random() * 9) + 1;
        return {
          type: "compare",
          fractions: [`${num1}/${denominator}`, `${num2}/${denominator}`],
          correctAnswer: num1 === num2 ? "equal" : "not_equal",
        };
      });
    };

    const generateSameNumerator = (): Question[] => {
      return Array.from({ length: totalQuestions / 6 }, () => {
        const numerator = Math.floor(Math.random() * 9) + 1;
        const den1 = Math.floor(Math.random() * 8) + 2;
        const den2 = Math.floor(Math.random() * 8) + 2;
        return {
          type: "compare",
          fractions: [`${numerator}/${den1}`, `${numerator}/${den2}`],
          correctAnswer: den1 === den2 ? "equal" : "not_equal",
        };
      });
    };

    return [...generateSameDenominator(), ...generateSameNumerator()];
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
      return answer === questions[questionIndex].correctAnswer;
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

      <div className="absolute top-4 left-4 w-32 h-32">
        <svg className="transform -rotate-90" width="100%" height="100%">
          <circle
            cx="50%"
            cy="50%"
            r={50}
            fill="none"
            stroke="#e5e5e5"
            strokeWidth={10}
          />
          <circle
            cx="50%"
            cy="50%"
            r={50}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={10}
            strokeDasharray={2 * Math.PI * 50}
            strokeDashoffset={2 * Math.PI * 50 - (2 * Math.PI * 50 * (currentPage + 1)) / totalQuestions}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-blue-500">
            {Math.round(((currentPage + 1) / totalQuestions) * 100)}%
          </span>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">
        Comparaison de Fractions
      </h1>

      {!isValidated && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {currentQuestions.map((question, localIndex) => {
              const globalIndex = currentPage * questionsPerPage + localIndex;
              return (
                <div key={globalIndex} className="bg-white p-4 rounded shadow-md text-center">
                  <p className="text-lg font-bold mb-4">
                    {question.type === "compare"
                      ? `${question.fractions[0]} vs ${question.fractions[1]}`
                      : "Equivalence des fractions"}
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      className={`py-2 px-4 rounded font-bold ${
                        answers[globalIndex] === "equal"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => handleAnswer(globalIndex, "equal")}
                    >
                      =
                    </button>
                    <button
                      className={`py-2 px-4 rounded font-bold ${
                        answers[globalIndex] === "not_equal"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => handleAnswer(globalIndex, "not_equal")}
                    >
                      ≠
                    </button>
                  </div>
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
            onClick={() => setIsValidated(false)}
            className="mt-4 bg-gray-500 text-white py-2 px-6 rounded"
          >
            Revoir les réponses
          </button>
        </div>
      )}
    </div>
  );
}
