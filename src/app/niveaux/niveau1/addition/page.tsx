"use client";

import { useState } from "react";

export default function Addition() {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(10).fill(null)); // État des réponses (10 questions)
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);

  const correctAnswers = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]; // Réponses correctes (exemple)

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Addition</h1>

      {!isValidated && (
        <>
          {answers.map((_, index) => (
            <div key={index} className="mb-2">
              <label>
                {index + 1} + {index + 1} ={" "}
                <input
                  type="number"
                  className="border p-1"
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              </label>
            </div>
          ))}
          <button
            onClick={handleValidation}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Valider les réponses
          </button>
        </>
      )}

      {isValidated && (
        <>
          {hasPassed ? (
            <div>
              <p className="text-green-600 font-bold">Bravo ! Toutes vos réponses sont correctes.</p>
              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => {
                  alert("Prochaine série de questions !");
                }}
              >
                Passer aux questions 10 à 20
              </button>
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-bold">Certaines réponses sont incorrectes. Corrigez-les.</p>
              <button
                className="mt-4 bg-gray-500 text-white py-2 px-4 rounded"
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