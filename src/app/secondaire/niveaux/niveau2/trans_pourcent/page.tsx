"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ClasserNombresSpecials() {
  const totalQuestions = 20; // Nombre total de questions
  const questionsPerPage = 5; // Nombre de questions par vague

  const [questions, setQuestions] = useState<number[]>([]);
  const [answers, setAnswers] = useState<string[]>(Array(totalQuestions).fill(""));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const generateQuestions = () =>
      Array.from({ length: totalQuestions }, () => Math.floor(Math.random() * 100) + 1);
    setQuestions(generateQuestions());
  }, []);

  const isPrime = (num: number): boolean => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const isPerfectSquare = (num: number): boolean => {
    const sqrt = Math.sqrt(num);
    return sqrt === Math.floor(sqrt);
  };

  const handleAnswer = (index: number, answer: string): void => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleValidation = (): void => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    const correctAnswers = questions.slice(startIndex, endIndex).map((num) => {
      if (isPerfectSquare(num)) return "carré parfait";
      if (isPrime(num)) return "nombre premier";
      return "nombre composé";
    });

    const allAnswersFilled = pageAnswers.every((answer) => answer.trim() !== "");

    if (!allAnswersFilled) {
      alert("Veuillez répondre à toutes les questions avant de valider.");
      return;
    }

    const allCorrect = pageAnswers.every(
      (answer, idx) => answer === correctAnswers[idx]
    );

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

      <h1 className="text-3xl font-bold mb-6">
        Classez les nombres en carrés parfaits, nombres premiers, ou nombres composés
      </h1>

      {!isValidated && (
        <>
          <div className="flex flex-col gap-6">
            {questions
              .slice(
                currentPage * questionsPerPage,
                (currentPage + 1) * questionsPerPage
              )
              .map((number, index) => (
                <div key={index} className="flex flex-col items-start gap-2">
                  <div className="font-bold text-black">{number}</div>
                  <select
                    value={
                      answers[currentPage * questionsPerPage + index] || ""
                    }
                    onChange={(e) =>
                      handleAnswer(
                        currentPage * questionsPerPage + index,
                        e.target.value
                      )
                    }
                    className="border border-gray-300 p-2 rounded"
                  >
                    <option value="" disabled>
                      Choisissez une option
                    </option>
                    <option value="carré parfait">Carré Parfait</option>
                    <option value="nombre premier">Nombre Premier</option>
                    <option value="nombre composé">Nombre Composé</option>
                  </select>
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
              disabled={
                currentPage === Math.floor(totalQuestions / questionsPerPage) - 1
              }
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
