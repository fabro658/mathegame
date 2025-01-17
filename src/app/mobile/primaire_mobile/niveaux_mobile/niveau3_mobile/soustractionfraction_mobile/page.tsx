"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SoustractionFractions() {
  const totalQuestions = 36;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [questions, setQuestions] = useState<{ fraction1: string; fraction2: string; correctAnswer: string }[]>([]);
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [message, setMessage] = useState<string>("");

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

        const numeratorResult = numerator1 - numerator2;
        const [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(numeratorResult, commonDenominator);

        return {
          fraction1: `${a1}/${b1}`,
          fraction2: `${a2}/${b2}`,
          correctAnswer: `${simplifiedNumerator}/${simplifiedDenominator}`,
        };
      });

    setQuestions(generateQuestions());
  }, []);

  const simplifyFraction = (numerator: number, denominator: number): [number, number] => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(numerator, denominator);
    return [numerator / divisor, denominator / divisor];
  };

  const handleChange = (index: number, value: string): void => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  const handleValidation = (): void => {
    if (!areAllAnswersFilled()) {
      setMessage("Veuillez remplir toutes les réponses.");
      setIsValidated(false);
      return;
    }

    const allCorrect = answers.every((answer, index) => answer === questions[index]?.correctAnswer);
    setIsValidated(true);
    setHasPassed(allCorrect);

    if (allCorrect) {
      setMessage("Bravo ! Toutes vos réponses sont correctes.");
    } else {
      setMessage("Certaines réponses sont incorrectes. Corrigez-les.");
    }
  };

  // Fonction pour vérifier si toutes les réponses sont remplies
  const areAllAnswersFilled = (): boolean => {
    return answers.every((answer) => answer !== null && answer.trim() !== "");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Navigation */}
      <Link href="/menu/apprendre/fraction" 
        className="absolute top-4 left-4 bg-black text-white py-3 px-8 rounded font-bold">
        Apprendre
      </Link>
      <Link href="/primaire/niveaux/niveau3" 
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold">
        Retour
      </Link>

      <h1 className="text-4xl font-bold mb-8">Soustraction de Fractions</h1>

      {/* Questions et Réponses */}
      <div className="grid grid-cols-1 gap-8">
        {questions.map(({ fraction1, fraction2 }, index) => (
          <div key={index} className="flex items-center gap-6">
            <div className="w-full">
              <p className="text-xl font-bold">{fraction1} - {fraction2}</p>
            </div>
            <div className="w-1/4">
              <input
                type="text"
                inputMode="numeric"
                className="border border-gray-400 p-4 rounded w-full text-center text-black text-lg"
                value={answers[index] || ""}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Message de validation */}
      {message && (
        <div className={`mt-6 text-xl font-bold ${hasPassed ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </div>
      )}

      {/* Bouton de validation */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={handleValidation}
          className="bg-blue-500 text-white py-3 px-8 rounded font-bold hover:bg-blue-600"
        >
          Valider les réponses
        </button>
      </div>

      {/* Si tout est correct */}
      {hasPassed && (
        <div className="mt-8">
          <button className="bg-blue-500 text-white py-3 px-8 rounded-lg font-bold" onClick={() => alert("Vous avez complété toutes les questions !")}>
            Terminer
          </button>
        </div>
      )}
    </div>
  );
}
