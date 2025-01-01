"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Aire() {
  const totalQuestions = 30; // 30 questions au total
  const questionsPerPage = 3; // 3 questions par vague

  const [questions, setQuestions] = useState<{ questionText: string; correctAnswer: string }[]>([]); // Typage explicite
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, () => {
        const shapeType = Math.floor(Math.random() * 4);
        let questionText = "";
        let correctAnswer = 0;

        if (shapeType === 0) {
          const side = Math.floor(Math.random() * 10) + 1;
          questionText = `Quelle est l&#39;aire d&#39;un carré de côté ${side} cm ?`;
          correctAnswer = side * side;
        } else if (shapeType === 1) {
          const length = Math.floor(Math.random() * 10) + 1;
          const width = Math.floor(Math.random() * 10) + 1;
          questionText = `Quelle est l&#39;aire d&#39;un rectangle de longueur ${length} cm et de largeur ${width} cm ?`;
          correctAnswer = length * width;
        } else if (shapeType === 2) {
          const radius = Math.floor(Math.random() * 10) + 1;
          questionText = `Quelle est l&#39;aire d&#39;un cercle de rayon ${radius} cm ? (π = 3.14)`;
          correctAnswer = Math.PI * radius * radius;
        } else {
          const base = Math.floor(Math.random() * 10) + 1;
          const height = Math.floor(Math.random() * 10) + 1;
          questionText = `Quelle est l&#39;aire d&#39;un triangle de base ${base} cm et de hauteur ${height} cm ?`;
          correctAnswer = 0.5 * base * height;
        }

        return {
          questionText,
          correctAnswer: correctAnswer.toFixed(2),
        };
      });
    };

    setQuestions(generateQuestions());
  }, []);

  // Gestion des changements de réponses
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
    const pageCorrectAnswers = questions.slice(startIndex, endIndex).map((q: { correctAnswer: string }) => q.correctAnswer);

    // Vérifier si toutes les réponses sont remplies
    const allAnswersFilled = pageAnswers.every((answer) => answer && answer.trim() !== "");

    if (!allAnswersFilled) {
      alert("Veuillez remplir toutes les réponses avant de valider.");
      return; // Empêche la validation si des réponses sont vides
    }

    // Vérifier les réponses avec une marge d'erreur
    const marginOfError = 0.01;
    let allCorrect = true;
    const updatedAnswers = [...answers];

    pageAnswers.forEach((answer, index) => {
      const userAnswer = parseFloat(answer || "0");
      const correctAnswer = parseFloat(pageCorrectAnswers[index]);

      if (Math.abs(userAnswer - correctAnswer) > marginOfError) {
        updatedAnswers[startIndex + index] = null; // Effacer la réponse incorrecte
        allCorrect = false;
      }
    });

    setAnswers(updatedAnswers); // Mettre à jour les réponses
    setIsValidated(true);
    setHasPassed(allCorrect);

    if (allCorrect && currentPage < totalQuestions / questionsPerPage - 1) {
      // Passer à la série suivante si toutes les réponses sont correctes
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsValidated(false);
      }, 1500); // Attendre un peu avant de passer à la série suivante pour l'effet
    }
  };

  // Navigation entre les pages de questions
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

  // Calcul de la progression
  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  // Variables pour la barre circulaire
  const radius = 50; // Rayon du cercle
  const strokeWidth = 10; // Largeur du cercle
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
        href="/niveaux/niveau3"
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

      <h1 className="text-3xl font-bold mb-6">Questions sur l&#39;aire</h1>

      {/* Affichage des questions */}
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

      {/* Résultats de validation */}
      {isValidated && (
        <>
          {!hasPassed && (
            <div>
              <p className="text-red-600 font-bold text-2xl">Certaines réponses sont incorrectes. Corrigez-les.</p>
              <button className="mt-8 bg-gray-500 text-white py-3 px-8 rounded-lg font-bold" onClick={() => setIsValidated(false)}>
                Revenir pour corriger
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
