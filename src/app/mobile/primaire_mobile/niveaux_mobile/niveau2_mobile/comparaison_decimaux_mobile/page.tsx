"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Question = {
  type: "compare";
  numbers: [number, number];
  correctAnswer: string;
};

export default function ComparerDecimaux() {
  const totalQuestions = 36;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);

  const generateQuestions = (): Question[] => {
    return Array.from({ length: totalQuestions }, () => {
      const number1 = (Math.random() * 100).toFixed(2);
      const number2 = (Math.random() * 100).toFixed(2);
      const correctAnswer =
        parseFloat(number1) > parseFloat(number2)
          ? ">"
          : parseFloat(number1) < parseFloat(number2)
          ? "<"
          : "=";
      return {
        type: "compare",
        numbers: [parseFloat(number1), parseFloat(number2)],
        correctAnswer,
      };
    });
  };

  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  const handleAnswer = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleValidation = () => {
    if (answers.includes(null)) {
      alert("Veuillez répondre à toutes les questions avant de valider.");
      return;
    }

    let allCorrect = true;
    const newAnswers = [...answers];

    answers.forEach((answer, index) => {
      if (questions[index] && answer !== questions[index].correctAnswer) {
        allCorrect = false;
        newAnswers[index] = null;
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);
    setHasPassed(allCorrect);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100 text-black py-6 px-4">
      {/* Conteneur pour les boutons */}
      <div className="flex justify-between w-full mb-6">
        <Link 
          href="/mobile/menu_mobile/apprendre_mobile/opérations arithmétiques_mobile" 
          className="bg-black text-white py-3 px-8 rounded font-bold">
          Apprendre
        </Link>
        <Link 
        href="/mobile/primaire_mobile/niveaux_mobile/niveau2_mobile"
        className="bg-orange-500 text-white py-3 px-8 rounded font-bold">
          Retour
        </Link>
      </div>

      {/* Titre */}
      <h1 className="text-4xl font-bold mb-6">Comparaison</h1>

      {!isValidated && (
        <div className="flex flex-col items-center gap-4">
          {questions.map((question, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded shadow-md text-center w-full max-w-md"
            >
              <p className="text-lg font-bold mb-4">
                {`${question.numbers[0]} ? ${question.numbers[1]}`}
              </p>
              <select
                value={answers[index] || ""}
                onChange={(e) => handleAnswer(index, e.target.value)}
                className="py-2 px-4 rounded border-gray-300 w-full"
              >
                <option value="" disabled>
                  Choisissez
                </option>
                <option value="<">&lt;</option>
                <option value=">">&gt;</option>
                <option value="=">=</option>
              </select>
              {answers[index] === null && isValidated && (
                <p className="text-red-500 text-sm mt-2">Réponse manquante</p>
              )}
              {answers[index] !== null && answers[index] !== question.correctAnswer && isValidated && (
                <p className="text-red-500 text-sm mt-2">Erreur dans la réponse</p>
              )}
              {answers[index] === question.correctAnswer && isValidated && (
                <p className="text-green-500 text-sm mt-2">Réponse correcte</p>
              )}
            </div>
          ))}
          <button
            onClick={handleValidation}
            className="bg-blue-500 text-white py-2 px-6 rounded mt-4"
          >
            Valider
          </button>
        </div>
      )}

      {isValidated && (
        <div className="text-center">
          {hasPassed ? (
            <p className="text-green-500 font-bold text-lg">
              Toutes les réponses sont correctes !
            </p>
          ) : (
            <p className="text-red-500 font-bold text-lg">
              Certaines réponses sont incorrectes.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
