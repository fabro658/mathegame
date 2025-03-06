"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SoustractionFractions() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [questions, setQuestions] = useState<{ fraction1: string; fraction2: string; correctAnswer: string }[]>([]);
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Simplification des fractions (résultats comme 2/2 = 1)
  const simplifyFraction = (numerator: number, denominator: number): [number, number] => {
    if (numerator === denominator) {
      return [1, 1]; // Si numérateur = dénominateur, simplifie en 1
    }
    return [numerator, denominator];
  };

  useEffect(() => {
    const generateQuestions = () =>
      Array.from({ length: totalQuestions }, () => {
        const a1 = Math.floor(Math.random() * 3) + 1; // Numérateur fraction 1 (1 à 3)
        const b1 = Math.floor(Math.random() * 3) + 1; // Dénominateur fraction 1 (1 à 3)
        const a2 = Math.floor(Math.random() * 3) + 1; // Numérateur fraction 2 (1 à 3)
        const b2 = Math.floor(Math.random() * 3) + 1; // Dénominateur fraction 2 (1 à 3)

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

  const handleChange = (index: number, value: string): void => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  const handleValidation = (): void => {
    const allCorrect = answers.every((answer, index) => {
      const normalizedAnswer = answer ? normalizeAnswer(answer) : "";
      const normalizedCorrectAnswer = normalizeAnswer(questions[index]?.correctAnswer || "");
      return normalizedAnswer === normalizedCorrectAnswer;
    });
    setIsValidated(true);
    setHasPassed(allCorrect);
  };

  const normalizeAnswer = (answer: string): string => {
    const normalized = answer.replace(/\s+/g, "").toLowerCase();
    if (normalized === "2/2") return "1"; // S'assure que 2/2 est considéré comme 1
    return normalized;
  };

  const handleNextPage = (): void => {
    if (currentPage < totalQuestions / questionsPerPage - 1) {
      setCurrentPage(currentPage + 1);
      setIsValidated(false);
    }
  };

  const handlePreviousPage = (): void => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsValidated(false);
    }
  };

  // Vérifie si toutes les réponses sont remplies sur la page actuelle
  const areAllAnswersFilled = (): boolean => {
    return answers.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).every((answer) => answer !== null && answer.trim() !== "");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <Link href="/menu/apprendre/fraction" 
      className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold">
        Apprendre
      </Link>
      <Link href="/secondaire/niveaux/niveau2" 
      className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold">
        Retour
      </Link>

      <h1 className="text-4xl font-bold mb-8">Soustraction de Fractions</h1>

      {!isValidated && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ fraction1, fraction2 }, index) => (
              <div key={index} className="flex items-center gap-6">
                <button className="bg-blue-500 text-white font-bold py-4 px-8 rounded-lg w-full" disabled>
                  {fraction1} - {fraction2}
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  className="border border-gray-400 p-4 rounded w-32 text-center text-black text-lg"
                  value={answers[currentPage * questionsPerPage + index] || ""}
                  onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-4">
            <button onClick={handlePreviousPage} className="bg-gray-500 text-white py-3 px-8 rounded font-bold" disabled={currentPage === 0}>
              Précédent
            </button>
            <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-8 rounded font-bold">
              Valider les réponses
            </button>
            <button onClick={handleNextPage} className="bg-blue-500 text-white py-3 px-8 rounded font-bold" disabled={currentPage === Math.floor(totalQuestions / questionsPerPage) - 1 || !areAllAnswersFilled()}>
              Suivant
            </button>
          </div>
        </>
      )}
      
      {isValidated && (
        <>
          {hasPassed ? (
            <div>
              <p className="text-green-600 font-bold text-2xl">Bravo ! Toutes vos réponses sont correctes.</p>
              <button className="mt-8 bg-blue-500 text-white py-3 px-8 rounded-lg font-bold" onClick={() => alert("Vous avez complété toutes les questions !")}>
                Terminer
              </button>
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-bold text-2xl">Certaines réponses sont incorrectes. Corrigez-les.</p>
              <button className="mt-8 bg-gray-500 text-white py-3 px-8 rounded-lg font-bold" onClick={() => setIsValidated(false)}>
                Revenir pour corriger
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
