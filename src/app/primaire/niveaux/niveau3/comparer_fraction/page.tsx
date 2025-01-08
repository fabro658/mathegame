"use client";

import { useState, useEffect } from "react";

type Question =
  | { type: "compare", fractions: [string, string], correctAnswer: "greater" | "less" }
  | { type: "equivalence", fractions: string[], correctAnswer: string };

export default function PractiqueFractions() {
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
          correctAnswer: num1 > num2 ? "greater" : "less",
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
          correctAnswer: den1 > den2 ? "less" : "greater",
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Comparaison de Fractions</h1>

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
                        answers[globalIndex] === "greater"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => handleAnswer(globalIndex, "greater")}
                    >
                      Vrai
                    </button>
                    <button
                      className={`py-2 px-4 rounded font-bold ${
                        answers[globalIndex] === "less"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => handleAnswer(globalIndex, "less")}
                    >
                      Faux
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
