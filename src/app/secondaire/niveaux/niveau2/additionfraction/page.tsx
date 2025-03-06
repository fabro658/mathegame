"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdditionFractions() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [questions, setQuestions] = useState<{ fraction1: string; fraction2: string; correctAnswer: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Fonction pour simplifier les fractions, en tenant compte des fractions comme 2/2 = 1
  const simplifyFraction = (numerator: number, denominator: number) => {
    if (numerator === denominator) return "1"; // Si le numérateur et le dénominateur sont égaux, simplifie à 1
    return `${numerator}/${denominator}`;
  };

  // Générer des questions aléatoires
  useEffect(() => {
    const generateQuestions = () =>
      Array.from({ length: totalQuestions }, () => {
        const a1 = Math.floor(Math.random() * 5) + 1; // Numérateur de 1 à 5
        const b1 = Math.floor(Math.random() * 5) + 1; // Dénominateur de 1 à 5
        const a2 = Math.floor(Math.random() * 5) + 1; // Numérateur de 1 à 5
        const b2 = Math.floor(Math.random() * 5) + 1; // Dénominateur de 1 à 5

        const commonDenominator = b1 * b2;
        const numerator1 = a1 * b2;
        const numerator2 = a2 * b1;

        const numeratorResult = numerator1 + numerator2;
        const simplifiedAnswer = simplifyFraction(numeratorResult, commonDenominator);

        return {
          fraction1: `${a1}/${b1}`,
          fraction2: `${a2}/${b2}`,
          correctAnswer: simplifiedAnswer,
        };
      });

    setQuestions(generateQuestions());
  }, []);

  // Met à jour les réponses
  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  // Valide les réponses de la page actuelle
  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null) || pageAnswers.some((answer) => answer === "")) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    let allCorrect = true;
    const updatedAnswers = [...answers];

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      if (answer !== questions[globalIndex]?.correctAnswer) {
        allCorrect = false;
        updatedAnswers[globalIndex] = null; // Réinitialiser les mauvaises réponses
      }
    });

    setAnswers(updatedAnswers);
    setFeedbackMessage(allCorrect ? "Bravo ! Vous avez bien répondu." : "Certaines réponses sont incorrectes. Essayez à nouveau.");
  };

  // Passe à la page suivante
  const handleNextPage = () => {
    if (currentPage < totalQuestions / questionsPerPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Retourne à la page précédente
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link href="/menu/apprendre/fraction" 
      className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold">
        Apprendre
      </Link>
      <Link href="/secondaire/niveaux/niveau2" 
      className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold">
        Retour
      </Link>

      <h1 className="text-4xl font-bold mb-8">Addition de Fractions</h1>

      {feedbackMessage && (
        <p className="text-xl font-bold text-center mb-6">
          {feedbackMessage}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ fraction1, fraction2 }, index) => (
          <div key={index} className="flex items-center gap-6">
            <button className="bg-blue-500 text-white font-bold py-4 px-8 rounded-lg w-full" disabled>
              {fraction1} + {fraction2}
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
        <button
          onClick={handlePreviousPage}
          className="bg-gray-500 text-white py-3 px-8 rounded font-bold hover:bg-gray-600"
          disabled={currentPage === 0}
        >
          Précédent
        </button>
        <button
          onClick={handleValidation}
          className="bg-blue-500 text-white py-3 px-8 rounded font-bold hover:bg-blue-600"
        >
          Valider les réponses
        </button>
        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white py-3 px-8 rounded font-bold hover:bg-blue-600"
          disabled={currentPage === Math.floor(totalQuestions / questionsPerPage) - 1}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
