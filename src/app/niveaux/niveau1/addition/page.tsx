"use client";

import { useState } from "react";

export default function Addition() {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(10).fill(null)); // État des réponses (10 questions)
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);

  const correctAnswers = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]; // Réponses correctes (exemple)

  // Calculer le pourcentage de réponses complétées
  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / answers.length) * 100);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseInt(value);
    newAnswers[index] = isNaN(parsedValue) ? null : parsedValue;
    setAnswers(newAnswers);
  };

  const handleValidation = () => {
    const allCorrect = answers.every((answer, index) => answer === correctAnswers[index]);
    setIsValidated(true);
    setHasPassed(allCorrect);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Suivi de la progression */}
      <div className="absolute top-4 left-4 bg-blue-500 text-white py-1 px-3 rounded font-bold">
        Progression : {completionPercentage}%
      </div>

      <h1 className="text-3xl font-bold mb-6">Addition</h1>

      {!isValidated && (
        <>
          <div className="grid grid-cols-2 gap-4">
            {answers.map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                  disabled
                >
                  {index + 1} + {index + 1}
                </button>
                <input
                  type="number"
                  className="border border-gray-400 p-2 rounded w-full text-center text-black"
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleValidation}
            className="mt-6 bg-blue-500 text-white py-2 px-6 rounded font-bold"
          >
            Valider les réponses
          </button>
        </>
      )}

      {isValidated && (
        <>
          {hasPassed ? (
            <div>
              <p className="text-green-600 font-bold text-xl">Bravo ! Toutes vos réponses sont correctes.</p>
              <button
                className="mt-6 bg-blue-500 text-white py-2 px-6 rounded font-bold"
                onClick={() => {
                  alert("Prochaine série de questions !");
                }}
              >
                Passer aux questions 10 à 20
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
