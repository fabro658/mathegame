"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Question = {
  type: "compare";
  fractions: [string, string];
  correctAnswer: string;
};

export default function ComparerFractions() {
  const totalQuestions = 30;
  const questionsPerPage = 3;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);

  // Génération des questions
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

  useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  const handleAnswer = (globalIndex: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[globalIndex] = value;
    setAnswers(updatedAnswers);
  };

  const handleValidation = () => {
    const pageAnswers = answers.slice(0, questionsPerPage);

    if (pageAnswers.includes(null)) {
      alert("Veuillez répondre à toutes les questions avant de valider.");
      return;
    }

    const isCorrect = pageAnswers.every((answer, index) => {
      const questionIndex = index;
      return questions[questionIndex] && answer === questions[questionIndex].correctAnswer;
    });

    setIsValidated(true);
    setHasPassed(isCorrect);
  };

  const currentQuestions = questions.slice(0, questionsPerPage);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link
        href="/menu/apprendre"
        className="absolute top-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/primaire/niveaux/niveau2"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-3xl font-bold mb-6">Comparaison de Fractions</h1>

      {!isValidated && (
        <div className="flex flex-col items-center justify-center">
          {currentQuestions.map((question, localIndex) => {
            const globalIndex = localIndex;
            return (
              <div key={globalIndex} className="bg-white p-4 rounded shadow-md text-center mb-4">
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
                {answers[globalIndex] === null && (
                  <p className="text-red-500 text-sm">Réponse manquante</p>
                )}
              </div>
            );
          })}
          <div className="flex flex-col items-center mt-4">
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-2 px-6 rounded"
            >
              Valider
            </button>
          </div>
        </div>
      )}

      {isValidated && (
        <div className="text-center mt-4">
          {hasPassed ? (
            <p className="text-green-500 font-bold text-lg">Toutes les réponses sont correctes !</p>
          ) : (
            <p className="text-red-500 font-bold text-lg">Certaines réponses sont incorrectes.</p>
          )}
        </div>
      )}
    </div>
  );
}
