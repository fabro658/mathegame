"use client";

import { useState } from "react";
import Link from "next/link";

export default function Soustraction() {
  // Déclarations des constantes
  const totalQuestions = 36;
  const questionsPerPage = 6; // 3 colonnes x 2 lignes
  const radius = 50; // Rayon du cercle
  const strokeWidth = 10; // Largeur du cercle
  const circumference = 2 * Math.PI * radius;

  // États
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Fonction pour mélanger un tableau
  const shuffleArray = (array: number[][]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Génération des questions
  const easyQuestions = Array.from({ length: 10 }, (_, index) => [index + 1, index + 1]); // Niveau 1 : Soustractions simples
  const mediumQuestions = Array.from({ length: 10 }, (_, index) => [10 + index - 9, 5 + index - 9]); // Niveau 2
  const hardQuestions = Array.from({ length: 10 }, () => {
    const a = Math.max(10, Math.floor(Math.random() * 41));
    const b = Math.floor(Math.random() * 41);
    return a >= b ? [a, b] : [b, a];
  }); // Niveau 3
  const veryHardQuestions = Array.from({ length: 6 }, () => {
    const a = 20 + Math.floor(Math.random() * 81);
    const b = 20 + Math.floor(Math.random() * 81);
    return a >= b ? [a, b] : [b, a];
  }); // Niveau 4
  const expertQuestions = Array.from({ length: 6 }, () => {
    const a = 50 + Math.floor(Math.random() * 51);
    const b = 50 + Math.floor(Math.random() * 51);
    return a >= b ? [a, b] : [b, a];
  }); // Niveau 5

  shuffleArray(easyQuestions);
  shuffleArray(mediumQuestions);
  shuffleArray(hardQuestions);
  shuffleArray(veryHardQuestions);
  shuffleArray(expertQuestions);

  const questions = [...easyQuestions, ...mediumQuestions, ...hardQuestions, ...veryHardQuestions, ...expertQuestions];

  // Calcul du pourcentage de progression
  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  // Gestion des réponses
  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseInt(value);
    newAnswers[index] = isNaN(parsedValue) ? null : parsedValue;
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
    let allCorrect = true;

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      const [a, b] = questions[globalIndex];
      if (answer !== a - b) {
        allCorrect = false;
        newAnswers[globalIndex] = null;
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);
    setHasPassed(allCorrect);
  };

  // Navigation
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

      <h1 className="text-4xl font-bold mb-6">Soustraction</h1>

      {/* Questions et réponses */}
      {!isValidated && (
        <>
          <div className="grid grid-cols-3 gap-6">
            {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(([a, b], index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">{a} - {b}</div>
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
          {hasPassed ? (
            <div>
              <p className="text-green-600 font-bold text-xl">Bravo ! Toutes vos réponses sont correctes.</p>
              <button className="mt-6 bg-blue-500 text-white py-3 px-6 rounded font-bold" onClick={handleNextPage}>
                Suivant
              </button>
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-bold text-xl">Certaines réponses sont incorrectes. Corrigez-les.</p>
              <button className="mt-6 bg-gray-500 text-white py-3 px-6 rounded font-bold" onClick={() => setIsValidated(false)}>
                Revenir pour corriger
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}