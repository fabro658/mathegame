"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function GeometryPractice() {
  const totalQuestions = 30; // Nombre total de questions
  const questionsPerPage = 3; // Questions affichées par vague

  const [questions, setQuestions] = useState<{ questionText: string; correctAnswer: string }[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Génération des questions de géométrie
  useEffect(() => {
    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, (_, index) => {
        let questionText = "";
        let correctAnswer = "";

        const figureChoice = Math.floor(Math.random() * 3); // Choix aléatoire de la forme géométrique
        const dimension1 = Math.floor(Math.random() * 10) + 1; // Dimension aléatoire (par exemple, longueur)
        const dimension2 = Math.floor(Math.random() * 10) + 1; // Autre dimension (par exemple, largeur)

        if (figureChoice === 0) {
          // Question pour un rectangle
          questionText = `Quel est le périmètre d'un rectangle de longueur ${dimension1} et de largeur ${dimension2} ?`;
          correctAnswer = (2 * (dimension1 + dimension2)).toString();
        } else if (figureChoice === 1) {
          // Question pour un cercle
          questionText = `Quel est l'aire d'un cercle de rayon ${dimension1} ? (Utilisez π ≈ 3.14)`;
          correctAnswer = (Math.PI * dimension1 * dimension1).toFixed(2);
        } else {
          // Question pour un triangle rectangle
          questionText = `Quel est l'aire d'un triangle rectangle de base ${dimension1} et de hauteur ${dimension2} ?`;
          correctAnswer = ((dimension1 * dimension2) / 2).toString();
        }

        return {
          questionText,
          correctAnswer,
        };
      });
    };

    setQuestions(generateQuestions());
  }, []);

  // Gestion des changements de réponse
  const handleChange = (index: number, value: string): void => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  // Validation des réponses
  const handleValidation = (): void => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);
    const pageCorrectAnswers = questions.slice(startIndex, endIndex).map((q) => q.correctAnswer);

    const allAnswersFilled = pageAnswers.every((answer) => answer && answer.trim() !== "");

    if (!allAnswersFilled) {
      alert("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    let allCorrect = true;
    const updatedAnswers = [...answers];

    pageAnswers.forEach((answer, index) => {
      if (answer !== pageCorrectAnswers[index]) {
        updatedAnswers[startIndex + index] = null;
        allCorrect = false;
      }
    });

    setAnswers(updatedAnswers);
    setIsValidated(true);
    setHasPassed(allCorrect);

    if (allCorrect && currentPage < totalQuestions / questionsPerPage - 1) {
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsValidated(false);
      }, 1500);
    }
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

  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  // Barre circulaire de progression
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link
        href="/menu/apprendre"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/niveaux/niveau4"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

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

      <h1 className="text-3xl font-bold mb-6">Pratique de la Géométrie</h1>

      {!isValidated && (
        <>
          <div className="flex flex-col gap-6">
            {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ questionText }, index) => (
              <div key={index} className="flex flex-col items-start gap-2">
                <div className="font-bold text-black">{questionText}</div>
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
              className="bg-gray-500 text-white py-3 px-8 rounded font-bold"
              disabled={currentPage === 0}
            >
              Précédent
            </button>
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-3 px-8 rounded font-bold"
            >
              Valider les réponses
            </button>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white py-3 px-8 rounded font-bold"
              disabled={currentPage === Math.floor(totalQuestions / questionsPerPage) - 1}
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
                className="mt-6 bg-blue-500 text-white py-3 px-8 rounded font-bold"
                onClick={handleNextPage}
              >
                Suivant
              </button>
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-bold text-xl">Certaines réponses sont incorrectes. Corrigez-les.</p>
              <button
                className="mt-6 bg-gray-500 text-white py-3 px-8 rounded font-bold"
                onClick={() => setIsValidated(false)}
              >
                Revenir pour corriger
              </button>
            </div>
          )}
