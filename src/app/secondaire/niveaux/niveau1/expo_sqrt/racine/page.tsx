"use client";

import { useState } from "react";
import Link from "next/link";

export default function Racines() {
  // Déclarations des constantes
  const totalQuestions = 36;
  const questionsPerPage = 6; // 3 colonnes x 2 lignes
  const radius = 50; // Rayon du cercle
  const strokeWidth = 10; // Largeur du cercle
  const circumference = 2 * Math.PI * radius;

  // États
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Génération des questions
  const questions = Array.from({ length: totalQuestions }, (_, index) => {
    if (index < 12) return [index + 1, 'square']; // Racines carrées
    if (index < 24) return [index + 1, 'cube']; // Racines cubiques
    return [index + 1, Math.random() > 0.5 ? 'square' : 'cube']; // Mélange
  });

  // Calcul du pourcentage de progression
  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  // Gestion des réponses
  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseInt(value);

    if (isNaN(parsedValue) && value !== "") {
      // Gestion de l'entrée non numérique
      return;
    }

    newAnswers[index] = value === "" ? null : parsedValue;
    setAnswers(newAnswers);
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null)) {
      alert("Veuillez remplir toutes les réponses sur cette page avant de valider.");
      return;
    }

    const newAnswers = [...answers];

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      const [number, type] = questions[globalIndex];
      const correctAnswer = type === 'square' ? Math.sqrt(number) : Math.cbrt(number);
      if (answer !== Math.round(correctAnswer)) {
        newAnswers[globalIndex] = null;
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);
  };

  // Navigation
  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
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
      {/* Boutons de navigation */}
      <Link
        href="/menu/apprendre/opérations arithmétiques"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/primaire/niveaux/niveau1"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      {/* Cercle de progression */}
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

      <h1 className="text-4xl font-bold mb-6">Racines Carrées et Cubiques</h1>

      {/* Questions et réponses */}
      {!isValidated && (
        <>
          <div className="grid grid-cols-3 gap-6">
            {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(([number, type], index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">
                  {type === 'square' ? `√${number}` : `∛${number}`}
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  className="border border-gray-400 p-4 rounded w-32 text-center text-black text-lg"
                  value={answers[currentPage * questionsPerPage + index] || ""}
                  onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
                  style={{
                    borderColor: answers[currentPage * questionsPerPage + index] !== null ? (answers[currentPage * questionsPerPage + index] === Math.round((type === 'square' ? Math.sqrt(number) : Math.cbrt(number))) ? 'green' : 'red') : 'gray',
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-4">
            <button
              onClick={handlePreviousPage}
              className="bg-gray-500 text-white py-3 px-6 rounded font-bold"
              disabled={currentPage === 0}
            >
              Précédent
            </button>
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-3 px-6 rounded font-bold"
            >
              Valider les réponses
            </button>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white py-3 px-6 rounded font-bold"
              disabled={currentPage === Math.floor(totalQuestions / questionsPerPage) - 1}
            >
              Suivant
            </button>
          </div>
        </>
      )}

      {/* Résultats après validation */}
      {isValidated && (
        <>
          <p className={`text-xl font-bold ${answers.every((answer, index) => {
            const [number, type] = questions[index];
            const correctAnswer = type === 'square' ? Math.sqrt(number) : Math.cbrt(number);
            return answer === Math.round(correctAnswer);
          }) ? 'text-green-600' : 'text-red-600'}`}>
            {answers.every((answer, index) => {
              const [number, type] = questions[index];
              const correctAnswer = type === 'square' ? Math.sqrt(number) : Math.cbrt(number);
              return answer === Math.round(correctAnswer);
            })
              ? 'Bravo ! Toutes vos réponses sont correctes.'
              : 'Certaines réponses sont incorrectes. Corrigez-les.'}
          </p>
          <button
            className="mt-6 bg-blue-500 text-white py-3 px-6 rounded font-bold"
            onClick={handleNextPage}
          >
            Suivant
          </button>
        </>
      )}
    </div>
  );
}
