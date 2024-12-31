"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';

// Définir un type pour chaque question
type Question = 
  | { type: "addition"; question: string; correctAnswer: string }
  | { type: "subtraction"; question: string; correctAnswer: string }
  | { type: "fraction"; question: string; correctAnswer: string };

export default function Revision() {
  const totalQuestions = 50;
  const questionsPerPage = 10; // Nombre de questions par page
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const radius = 50; // Rayon du cercle
  const strokeWidth = 10; // Largeur du cercle
  const circumference = 2 * Math.PI * radius; // Circonférence du cercle

  // Calcul du pourcentage de progression en fonction de la page actuelle
  const completionPercentage = ((currentPage + 1) * 10 / totalQuestions) * 100;

  // Générer les questions pour chaque type d'opération
  const generateAddition = (): Question[] => {
    return Array.from({ length: totalQuestions / 3 }, () => {
      const a = Math.floor(Math.random() * 9) + 1;
      const b = Math.floor(Math.random() * 9) + 1;
      return {
        type: "addition",
        question: `${a} + ${b}`,
        correctAnswer: (a + b).toString(),
      };
    });
  };

  const generateSubtraction = (): Question[] => {
    return Array.from({ length: totalQuestions / 3 }, () => {
      const a = Math.floor(Math.random() * 9) + 1;
      const b = Math.floor(Math.random() * 9) + 1;
      return {
        type: "subtraction",
        question: `${a} - ${b}`,
        correctAnswer: (a - b).toString(),
      };
    });
  };

  const generateFraction = (): Question[] => {
    return Array.from({ length: totalQuestions / 3 }, () => {
      const a1 = Math.floor(Math.random() * 9) + 1;
      const b1 = Math.floor(Math.random() * 9) + 1;
      const a2 = Math.floor(Math.random() * 9) + 1;
      const b2 = Math.floor(Math.random() * 9) + 1;

      const commonDenominator = b1 * b2;
      const numerator1 = a1 * b2;
      const numerator2 = a2 * b1;

      const numeratorResult = numerator1 - numerator2;
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
      const divisor = gcd(numeratorResult, commonDenominator);
      const [simplifiedNumerator, simplifiedDenominator] = [numeratorResult / divisor, commonDenominator / divisor];

      return {
        type: "fraction",
        question: `${a1}/${b1} - ${a2}/${b2}`,
        correctAnswer: `${simplifiedNumerator}/${simplifiedDenominator}`,
      };
    });
  };

  // Générer les questions une seule fois au montage du composant
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setQuestions([
      ...generateAddition(),
      ...generateSubtraction(),
      ...generateFraction(),
    ]);
  }, []);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  const handleValidation = () => {
    const allCorrect = answers.every((answer, index) => answer === questions[index].correctAnswer);
    setIsValidated(true);
    setHasPassed(allCorrect);
  };

  const handleNextPage = () => {
    if (currentPage < totalQuestions / questionsPerPage - 1) {
      setCurrentPage(currentPage + 1);
      setIsValidated(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsValidated(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Barre circulaire */}
      <div className="absolute top-4 left-4 w-32 h-32">
        <svg className="transform -rotate-90" width="100%" height="100%">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="#e5e5e5"
            strokeWidth={strokeWidth}
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * completionPercentage) / 100}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-blue-500">{completionPercentage.toFixed(0)}%</span>
        </div>
      </div>

      {/* Boutons de navigation */}
      <Link
        href="/menu/apprendre"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/niveaux/niveaux1"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-3xl font-bold mb-6">Révision des Opérations</h1>

      {/* Formulaire de révision */}
      {!isValidated && (
        <>
          <div className="grid grid-cols-3 gap-6">
            {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ question }, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">
                  {question}
                </div>
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
          <div className="flex gap-4 mt-6">
            <button
              onClick={handlePreviousPage}
              className="bg-gray-500 text-white py-2 px-6 rounded font-bold"
              disabled={currentPage === 0}
            >
              Précédent
            </button>
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
            >
              Valider les réponses
            </button>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
              disabled={currentPage === totalQuestions / questionsPerPage - 1}
            >
              Suivant
            </button>
          </div>
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
