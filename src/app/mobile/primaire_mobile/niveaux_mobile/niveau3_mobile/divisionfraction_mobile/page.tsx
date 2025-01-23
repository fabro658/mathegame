"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DivisionFraction() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);

  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [questions, setQuestions] = useState<{ fraction1: string; fraction2: string; correctAnswer: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Simplifie une fraction en utilisant le PGCD
  const simplifyFraction = (numerator: number, denominator: number): [number, number] => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
    return [numerator / divisor, denominator / divisor];
  };

  // Génère les questions de division de fractions
  const generateQuestions = () =>
    Array.from({ length: totalQuestions }, () => {
      const [a1, b1, a2, b2] = Array(4).fill(null).map(() => Math.floor(Math.random() * 9) + 1);

      const numerator = a1 * b2;
      const denominator = b1 * a2;
      const [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(numerator, denominator);

      return {
        fraction1: `${a1}/${b1}`,
        fraction2: `${a2}/${b2}`,
        correctAnswer: `${simplifiedNumerator}/${simplifiedDenominator}`,
      };
    });

  useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  // Gère les changements dans les réponses des utilisateurs
  const handleChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value.trim();
    setAnswers(updatedAnswers);
    setFeedbackMessage("");
  };

  // Valide les réponses de l'utilisateur pour la page actuelle
  const validateAnswers = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const currentAnswers = answers.slice(startIndex, endIndex);
    const currentQuestions = questions.slice(startIndex, endIndex);

    if (currentAnswers.some((answer) => !answer)) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    let allCorrect = true;
    const updatedAnswers = [...answers];

    currentAnswers.forEach((answer, index) => {
      const isCorrect = answer === currentQuestions[index].correctAnswer;
      if (!isCorrect) {
        allCorrect = false;
        updatedAnswers[startIndex + index] = null; // Réinitialise les mauvaises réponses
      }
    });

    setAnswers(updatedAnswers);
    setFeedbackMessage(
      allCorrect
        ? currentPage < totalPages - 1
          ? "Bravo ! Vous passez à la page suivante."
          : "Félicitations, vous avez terminé toutes les questions !"
        : "Certaines réponses sont incorrectes. Essayez à nouveau."
    );

    if (allCorrect && currentPage < totalPages - 1) {
      setTimeout(() => setCurrentPage(currentPage + 1), 1500); // Passe à la page suivante après un délai
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 text-black py-6 px-4">
      {/* Liens de navigation */}
      <div className="flex justify-between w-full max-w-4xl mb-6">
        <Link href="/mobile/menu_mobile/apprendre_mobile/fraction_mobile" className="bg-black text-white py-3 px-8 rounded font-bold">
          Apprendre
        </Link>
        <Link href="/mobile/primaire_mobile/niveaux_mobile/niveau3_mobile" className="bg-orange-500 text-white py-3 px-8 rounded font-bold">
          Retour
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Division de Fractions</h1>

      {/* Message de feedback */}
      {feedbackMessage && (
        <p
          className={`text-xl font-bold mb-6 text-center ${
            feedbackMessage.includes("incorrectes") || feedbackMessage.includes("remplir") ? "text-red-600" : "text-green-600"
          }`}
        >
          {feedbackMessage}
        </p>
      )}

      {/* Questions et réponses */}
      <div className="grid grid-cols-1 gap-4 w-full max-w-lg">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ fraction1, fraction2 }, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <span className="bg-blue-500 text-white py-2 px-4 rounded text-lg">{fraction1} ÷ {fraction2}</span>
            <input
              type="text"
              className="border border-gray-400 rounded px-3 py-2 w-28 text-center"
              placeholder="Réponse"
              value={answers[currentPage * questionsPerPage + index] || ""}
              onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Bouton de validation */}
      <button onClick={validateAnswers} className="bg-blue-500 text-white py-3 px-6 rounded font-bold mt-6">
        Valider les réponses
      </button>
    </div>
  );
}
