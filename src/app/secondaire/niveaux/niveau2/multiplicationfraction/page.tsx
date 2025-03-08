'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MultiplicationFraction() {
  const totalQuestions = 36;
  const questionsPerPage = 6; // 3 colonnes x 2 lignes
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null)); // État des réponses
  const [questions, setQuestions] = useState<{ fraction1: string; fraction2: string; correctAnswer: string }[]>([]); // État des questions
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // Page actuelle

  // Fonction pour simplifier les fractions
  const simplifyFraction = (numerator: number, denominator: number) => {
    if (numerator === denominator) return "1"; // Si le numérateur et le dénominateur sont égaux, simplifie à 1
    return `${numerator}/${denominator}`;
  };

  // Génération des questions et des réponses correctes, seulement une fois
  useEffect(() => {
    const generateQuestions = () =>
      Array.from({ length: totalQuestions }, () => {
        const a1 = Math.floor(Math.random() * 9) + 1;
        const b1 = Math.floor(Math.random() * 9) + 1;
        const a2 = Math.floor(Math.random() * 9) + 1;
        const b2 = Math.floor(Math.random() * 9) + 1;

        const numeratorResult = a1 * a2;
        const denominatorResult = b1 * b2;

        const [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(numeratorResult, denominatorResult);

        return {
          fraction1: `${a1}/${b1}`,
          fraction2: `${a2}/${b2}`,
          correctAnswer: `${simplifiedNumerator}/${simplifiedDenominator}`,
        };
      });

    setQuestions(generateQuestions());
  }, []); // Générer les questions une seule fois au montage initial

  const correctAnswers = questions.map((q) => q.correctAnswer); // Réponses correctes

  // Calculer le pourcentage de réponses complétées
  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    // Vérification si toutes les réponses sont remplies
    if (pageAnswers.includes(null)) {
      alert("Veuillez remplir toutes les réponses sur cette page avant de valider.");
      return;
    }
    // Validation des réponses
    const newAnswers = [...answers];
    let allCorrect = true;

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      if (answer !== correctAnswers[globalIndex]) {
        allCorrect = false;
        newAnswers[globalIndex] = null; // Réinitialiser uniquement les mauvaises réponses
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);
    setHasPassed(allCorrect);
  };

  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
      setIsValidated(false); // Réinitialiser la validation pour la page suivante
      setHasPassed(false); // Réinitialiser l'état de réussite pour la page suivante
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsValidated(false); // Réinitialiser la validation pour revenir à la page précédente
      setHasPassed(false); // Réinitialiser l'état de réussite pour la page précédente
    }
  };

  const radius = 50; // Rayon du cercle
  const strokeWidth = 10; // Largeur du cercle
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Boutons de navigation */}
      <Link
       href="/menu/apprendre/fraction" 
      className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
       href="/secondaire/niveaux/niveau2" 
      className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>


      {/* Cercle de progression */}
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
          <span className="text-xl font-bold text-blue-500">{completionPercentage}%</span>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">Multiplication de fractions</h1>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
  {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ fraction1, fraction2 }, index) => (
    <div key={index} className="flex items-center gap-6">
      <button className="bg-blue-500 text-white font-bold py-4 px-8 rounded-lg w-full" disabled>
        {fraction1} × {fraction2}
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
