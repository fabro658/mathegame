"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Division() {
  const totalQuestions = 36;
  const questionsPerPage = 6; // 6 questions par page
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // Gestion de la page actuelle
  const [questions, setQuestions] = useState<[number, number][]>([]);

  // Génération des questions au chargement
  useEffect(() => {
    const generatedQuestions: [number, number][] = Array.from({ length: totalQuestions }, (_, index) => {
      let numerator: number, denominator: number;

      if (index < 10) {
        denominator = Math.floor(Math.random() * 10) + 1;
        numerator = denominator * (Math.floor(Math.random() * 10) + 1);
      } else if (index < 20) {
        numerator = Math.floor(Math.random() * 100) + 1;
        denominator = Math.floor(Math.random() * 10) + 1;
      } else if (index < 30) {
        numerator = Math.floor(Math.random() * 100) + 1;
        denominator = Math.floor(Math.random() * 20) + 1;
      } else {
        numerator = Math.floor(Math.random() * 100) + 1;
        denominator = Math.floor(Math.random() * 50) + 1;
      }

      return [numerator, denominator];
    });

    setQuestions(generatedQuestions);
  }, []);

  // Calcul des réponses correctes
  const correctAnswers = questions.map(([numerator, denominator]) => Number((numerator / denominator).toFixed(2)));

  // Gestion des changements dans les réponses
  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseFloat(value);
    newAnswers[index] = isNaN(parsedValue) ? null : parsedValue;
    setAnswers(newAnswers);
  };

  // Validation des réponses de la page
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
      if (answer !== correctAnswers[globalIndex]) {
        allCorrect = false;
        newAnswers[globalIndex] = 0; // Affiche 0 si la réponse est incorrecte
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);

    if (!allCorrect) {
      alert("Certaines réponses sont incorrectes. Corrigez-les avant de continuer.");
    } else {
      alert("Bravo ! Toutes vos réponses sont correctes.");
      setCurrentPage(currentPage + 1); // Passer à la page suivante
      setIsValidated(false); // Réinitialiser la validation pour la prochaine page
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Boutons de navigation */}
      <Link
        href="/mobile/menu_mobile/apprendre_mobile/opérations arithmétiques_mobile"
        className="absolute bottom-10 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/mobile/primaire_mobile/niveaux_mobile/niveau1_mobile"
        className="absolute top-4 left-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      {/* Titre */}
      <h1 className="text-3xl font-bold mb-6 mt-12">Division</h1>

      {!isValidated && (
        <div className="space-y-6 w-full max-w-md">
          {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(([numerator, denominator], index) => (
            <div key={index} className="flex flex-col items-start gap-2">
              <p className="text-lg font-medium">{numerator} ÷ {denominator}</p>
              <input
                type="text"
                inputMode="numeric"
                className="border border-gray-400 p-3 rounded w-full text-black text-lg"
                value={answers[currentPage * questionsPerPage + index] === null ? "" : answers[currentPage * questionsPerPage + index]}
                onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Affichage après validation */}
      {isValidated && (
        <p className="text-green-600 font-bold text-xl">
          Bravo ! Toutes les réponses sont correctes. Passage à la série suivante...
        </p>
      )}

      <div className="mt-6 w-full max-w-md">
        <button
          onClick={handleValidation}
          className="bg-blue-500 text-white py-2 px-6 rounded font-bold w-full"
        >
          Valider les réponses
        </button>
      </div>
    </div>
  );
}
