"use client";

import { useState } from "react";

export default function Fractions() {
  const totalQuestions = 50;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null)); // État des réponses
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);

  // Fonction pour simplifier les fractions
  const simplifyFraction = (numerator: number, denominator: number): string => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const commonDivisor = gcd(Math.abs(numerator), Math.abs(denominator));
    return `${numerator / commonDivisor}/${denominator / commonDivisor}`;
  };

  // Génération des questions et des réponses correctes
  const questions = Array.from({ length: totalQuestions }, (_, index) => {
    const num1 = Math.floor(Math.random() * 10) + 1; // Numérateur entre 1 et 10
    const denom1 = Math.floor(Math.random() * 10) + 1; // Dénominateur entre 1 et 10
    const num2 = Math.floor(Math.random() * 10) + 1;
    const denom2 = Math.floor(Math.random() * 10) + 1;

    // Niveau 1 : Addition ou soustraction de fractions simples
    if (index < 25) return [[num1, denom1], [num2, denom2], '+'];
    // Niveau 2 : Nombres plus complexes
    return [[num1, denom1], [num2, denom2], '-'];
  });

  const correctAnswers = questions.map(([fraction1, fraction2, operation]) => {
    const [num1, denom1] = fraction1;
    const [num2, denom2] = fraction2;
    let resultNumerator, resultDenominator;

    if (operation === '+') {
      resultNumerator = num1 * denom2 + num2 * denom1;
      resultDenominator = denom1 * denom2;
    } else {
      resultNumerator = num1 * denom2 - num2 * denom1;
      resultDenominator = denom1 * denom2;
    }

    return simplifyFraction(resultNumerator, resultDenominator);
  });

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
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
        Progression : {Math.round((answers.filter((a) => a !== null).length / totalQuestions) * 100)}%
      </div>

      <h1 className="text-3xl font-bold mb-6">Addition/Soustraction de Fractions</h1>

      {!isValidated && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {questions.map(([fraction1, fraction2, operation], index) => {
              const [num1, denom1] = fraction1;
              const [num2, denom2] = fraction2;
              return (
                <div key={index} className="flex items-center gap-2">
                  <button
                    className="bg-blue-500 text-white font-bold py-3 px-6 rounded text-lg"
                    disabled
                  >
                    {num1}/{denom1} {operation} {num2}/{denom2}
                  </button>
                  <input
                    type="text"
                    className="border border-gray-400 p-2 rounded w-full text-center text-black"
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                </div>
              );
            })}
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
