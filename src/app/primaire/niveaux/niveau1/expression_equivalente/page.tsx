"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function EquationsEquivalentes() {
  const totalQuestions = 30; // Nombre total de questions
  const questionsPerPage = 3; // Nombre de questions par vague

  const [questions, setQuestions] = useState<
    { equationLeft: string; equationRight: string }[]
  >([]);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(totalQuestions).fill(null)
  );
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, () => {
        const leftSide = `${Math.floor(Math.random() * 10) + 1} + ${
          Math.floor(Math.random() * 10) + 1
        }`;
        const rightSide = `${Math.floor(Math.random() * 10) + 1} - ${
          Math.floor(Math.random() * 10) + 1
        }`;

        return {
          equationLeft: leftSide,
          equationRight: rightSide,
        };
      });
    };

    // Génération initiale des questions
    setQuestions(generateQuestions());
  }, []);

  // Gestion des réponses
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

    // Vérifier si toutes les réponses sont remplies
    const allAnswersFilled = pageAnswers.every(
      (answer) => answer && answer.trim() !== ""
    );

    if (!allAnswersFilled) {
      alert("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    // Validation des équations
    let allCorrect = true;
    const updatedAnswers = [...answers];
    pageAnswers.forEach((answer, index) => {
      const userAnswer = parseFloat(answer || "0");
      const question = questions[startIndex + index];

      const leftValue = eval(question.equationLeft); // Évalue l'équation de gauche
      const rightValue = eval(question.equationRight); // Évalue l'équation de droite

      if (userAnswer !== leftValue && userAnswer !== rightValue) {
        updatedAnswers[startIndex + index] = null; // Efface la réponse incorrecte
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
  const completionPercentage = Math.round(
    (completedAnswers / totalQuestions) * 100
  );

  const radius = 50; // Rayon pour la barre circulaire
  const strokeWidth = 10; // Largeur de la barre
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
            strokeDashoffset={
              circumference - (circumference * completionPercentage) / 100
            }
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-blue-500">
            {completionPercentage}%
          </span>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">
        Questions sur les équations équivalentes
      </h1>

      {!isValidated && (
        <>
          <div className="flex flex-col gap-6">
            {questions
              .slice(
                currentPage * questionsPerPage,
                (currentPage + 1) * questionsPerPage
              )
              .map(({ equationLeft, equationRight }, index) => (
                <div key={index} className="flex flex-col items-start gap-2">
                  <div className="font-bold text-black">
                    {equationLeft} = {equationRight}
                  </div>
                  <input
                    type="text"
                    inputMode="text"
                    className="border border-gray-400 p-6 rounded w-96 text-center text-black text-lg mx-auto"
                    value={
                      answers[currentPage * questionsPerPage + index] || ""
                    }
                    onChange={(e) =>
                      handleChange(
                        currentPage * questionsPerPage + index,
                        e.target.value
                      )
                    }
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
              <p className="text-green-600 font-bold text-xl">
                Bravo ! Toutes vos réponses sont correctes.
              </p>
              <button
                className="mt-6 bg-blue-500 text-white py-3 px-8 rounded font-bold"
                onClick={handleNextPage}
              >
                Suivant
              </button>
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-bold text-xl">
                Certaines réponses sont incorrectes. Corrigez-les.
              </p>
              <button
                className="mt-6 bg-gray-500 text-white py-3 px-8 rounded font-bold"
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
