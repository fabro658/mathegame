"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Comparaison() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [questions, setQuestions] = useState<{ fraction1: string; fraction2: string; correctAnswer: string }[]>([]);
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Fonction pour générer des questions avec fractions et comparer les résultats
  const generateQuestions = () => {
    return Array.from({ length: totalQuestions }, (_, index) => {
      let fraction1, fraction2, correctAnswer;

      // Augmenter la difficulté avec les index des questions
      if (index < 10) {
        fraction1 = [Math.floor(Math.random() * 5) + 1, Math.floor(Math.random() * 5) + 1]; // Petites fractions
        fraction2 = [Math.floor(Math.random() * 5) + 1, Math.floor(Math.random() * 5) + 1];
      } else if (index < 20) {
        fraction1 = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1]; // Moyennes fractions
        fraction2 = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
      } else {
        fraction1 = [Math.floor(Math.random() * 20) + 1, Math.floor(Math.random() * 20) + 1]; // Grandes fractions
        fraction2 = [Math.floor(Math.random() * 20) + 1, Math.floor(Math.random() * 20) + 1];
      }

      const num1 = fraction1[0] * fraction2[1];
      const num2 = fraction2[0] * fraction1[1];

      // Comparaison des fractions
      if (num1 < num2) {
        correctAnswer = "<";
      } else if (num1 > num2) {
        correctAnswer = ">";
      } else {
        correctAnswer = "=";
      }

      return {
        fraction1: `${fraction1[0]}/${fraction1[1]}`,
        fraction2: `${fraction2[0]}/${fraction2[1]}`,
        correctAnswer,
      };
    });
  };

  useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null) || pageAnswers.some((answer) => answer === "")) {
      alert("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    const newAnswers = [...answers];
    let allCorrect = true;

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      if (answer !== questions[globalIndex]?.correctAnswer) {
        allCorrect = false;
        newAnswers[globalIndex] = null; // Réinitialiser les mauvaises réponses
      }
    });

    setAnswers(newAnswers);
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

  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link
        href="/menu/apprendre"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/primaire/niveaux/niveau3"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <div className="absolute top-4 left-4 w-32 h-32">
        <svg className="transform -rotate-90" width="100%" height="100%">
          <circle cx="50%" cy="50%" r={radius} fill="none" stroke="#e5e5e5" strokeWidth={strokeWidth} />
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
          <span className="text-xl font-bold text-blue-500">{completionPercentage}%</span>
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-8">Comparer les Fractions</h1>

      {!isValidated && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ fraction1, fraction2 }, index) => (
              <div key={index} className="flex items-center gap-6">
                <button className="bg-blue-500 text-white font-bold py-4 px-8 rounded-lg w-full" disabled>
                  {fraction1} et {fraction2}
                </button>
                
                {/* Menu déroulant pour la comparaison */}
                <select
                  className="border border-gray-400 p-4 rounded w-32 text-center text-black text-lg"
                  value={answers[currentPage * questionsPerPage + index] || ""}
                  onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
                >
                  <option value="">Choisir</option>
                  <option value="<">&lt;</option>
                  <option value=">">&gt;</option>
                  <option value="=">=</option>
                </select>
              </div>
            ))}
          </div>
          <div className="flex gap-6 mt-8">
            <button
              onClick={handlePreviousPage}
              className="bg-gray-500 text-white py-3 px-8 rounded-lg font-bold"
              disabled={currentPage === 0}
            >
              Précédent
            </button>
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-3 px-8 rounded-lg font-bold"
            >
              Valider les réponses
            </button>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white py-3 px-8 rounded-lg font-bold"
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
              <p className="text-green-600 font-bold text-2xl">Bravo ! Toutes vos réponses sont correctes.</p>
              <button
                className="mt-8 bg-blue-500 text-white py-3 px-8 rounded-lg font-bold"
                onClick={() => alert("Vous avez complété toutes les questions !")}
              >
                Terminer
              </button>
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-bold text-2xl">Certaines réponses sont incorrectes. Corrigez-les.</p>
              <button
                className="mt-8 bg-gray-500 text-white py-3 px-8 rounded-lg font-bold"
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
