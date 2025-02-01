"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Arrondissement() {
  const totalQuestions = 36;
  const questionsPerPage = 6; // 3 colonnes x 2 lignes

  // Fonction pour générer des questions avec contrôle des parenthèses
  const generateQuestions = (type: string) => {
    return Array.from({ length: totalQuestions }, () => {
      const number = Math.random() * 100;
      const rounded = type === "unité" ? Math.round(number) : parseFloat(number.toFixed(1));
      return {
        text: type === "unité" ? number.toFixed(0) : number.toFixed(1),
        correctAnswer: rounded,
      };
    });
  };

  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [questions, setQuestions] = useState(generateQuestions("unité"));

  // Utilisation du useEffect pour actualiser les questions lors du changement de page
  useEffect(() => {
    const newQuestions = generateQuestions(currentPage % 2 === 0 ? "unité" : "dixième");
    setQuestions(newQuestions);
  }, [answers, currentPage]);

  // Gestion des changements de réponse
  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseFloat(value);
    newAnswers[index] = isNaN(parsedValue) ? null : parsedValue;
    setAnswers(newAnswers);
  };

  // Validation des réponses sur la page actuelle
  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null)) {
      alert("Veuillez remplir toutes les réponses sur cette page avant de valider.");
      return;
    }

    let allCorrect = true;
    const newAnswers = [...answers]; // Copie des réponses existantes

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      const question = questions[globalIndex % questions.length];

      if (answer !== question.correctAnswer) {
        allCorrect = false;
        newAnswers[globalIndex] = null; // Réinitialiser la mauvaise réponse
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);
    setHasPassed(allCorrect);
  };

  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
      setIsValidated(false);
      setHasPassed(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsValidated(false);
      setHasPassed(false);
    }
  };

  const radius = 50; // Rayon du cercle
  const strokeWidth = 10; // Largeur du cercle
  const circumference = 2 * Math.PI * radius;
  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Boutons de navigation */}
      <Link
        href="/menu/apprendre"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/mobile/secondaire_mobile/niveaux_mobile/niveau2_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-4xl font-bold mb-6">Arrondissement</h1>

      {!isValidated && (
        <>
          <div className="grid grid-cols-3 gap-6">
            {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map((question, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">
                  {question.text}
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

          <div className="mt-6 flex justify-center w-full">
            <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold w-full max-w-xs">
              Valider les réponses
            </button>
          </div>
        </>
      )}
    </div>
  );
}
