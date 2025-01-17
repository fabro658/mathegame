"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdditionFractions() {
  const totalQuestions = 36;

  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [questions, setQuestions] = useState<{ fraction1: string; fraction2: string; correctAnswer: string }[]>([]);
  const [isValidated, setIsValidated] = useState(false);
  const [message, setMessage] = useState("");

  const simplifyFraction = (numerator: number, denominator: number) => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(numerator, denominator);
    return [numerator / divisor, denominator / divisor];
  };

  useEffect(() => {
    const generateQuestions = () =>
      Array.from({ length: totalQuestions }, () => {
        const a1 = Math.floor(Math.random() * 9) + 1;
        const b1 = Math.floor(Math.random() * 9) + 1;
        const a2 = Math.floor(Math.random() * 9) + 1;
        const b2 = Math.floor(Math.random() * 9) + 1;

        const commonDenominator = b1 * b2;
        const numerator1 = a1 * b2;
        const numerator2 = a2 * b1;

        const numeratorResult = numerator1 + numerator2;
        const [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(numeratorResult, commonDenominator);

        return {
          fraction1: `${a1}/${b1}`,
          fraction2: `${a2}/${b2}`,
          correctAnswer: `${simplifiedNumerator}/${simplifiedDenominator}`,
        };
      });

    setQuestions(generateQuestions());
  }, []);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  const handleValidation = () => {
    if (answers.includes(null) || answers.some((answer) => answer === "")) {
      setMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    let allCorrect = true;
    const newAnswers = [...answers];

    answers.forEach((answer, index) => {
      if (answer !== questions[index]?.correctAnswer) {
        allCorrect = false;
        newAnswers[index] = null; // Réinitialiser les mauvaises réponses
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);

    if (allCorrect) {
      setMessage("Bravo ! Toutes vos réponses sont correctes.");
    } else {
      setMessage("Certaines réponses sont incorrectes. Corrigez-les.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link
        href="/mobile/menu_mobile/apprendre_mobile/fraction_mobile"
        className="absolute top-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/mobile/primaire_mobile/niveaux_mobile/niveau3_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-4xl font-bold mb-8">Addition de Fractions</h1>

      <div className="grid grid-cols-1 gap-4 w-full max-w-3xl">
        {questions.map(({ fraction1, fraction2 }, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="w-1/2 text-right text-lg font-bold">{fraction1} + {fraction2}</span>
            <input
              type="text"
              inputMode="numeric"
              className="border border-gray-400 p-4 rounded w-1/2 text-center text-black text-lg"
              value={answers[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleValidation}
        className="mt-8 bg-blue-500 text-white py-3 px-8 rounded-lg font-bold hover:bg-blue-600"
      >
        Valider les réponses
      </button>

      {isValidated && (
        <p className={`mt-4 text-xl font-bold ${message.includes("Bravo") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
