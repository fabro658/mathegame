"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Comparison() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [questions, setQuestions] = useState<{ left: string; right: string; answer: string }[]>([]);

  useEffect(() => {
    const generatedQuestions = Array.from({ length: totalQuestions }, (_, index) => {
      let left = 0;
      let right = 0;
      let answer = '';

      if (index < 12) {
        // Questions avec des nombres entiers
        left = Math.floor(Math.random() * 90) + 10;
        right = Math.floor(Math.random() * 90) + 10;
      } else if (index < 24) {
        // Questions avec des nombres entiers plus grands
        left = Math.floor(Math.random() * 900) + 100;
        right = Math.floor(Math.random() * 900) + 100;
      } else {
        // Questions avec des fractions
        const numerator1 = Math.floor(Math.random() * 9) + 1;
        const denominator1 = Math.floor(Math.random() * 9) + 1;
        const numerator2 = Math.floor(Math.random() * 9) + 1;
        const denominator2 = Math.floor(Math.random() * 9) + 1;
        left = `${numerator1}/${denominator1}`;
        right = `${numerator2}/${denominator2}`;

        // Calculer les valeurs des fractions pour comparaison
        const leftValue = numerator1 * denominator2;
        const rightValue = numerator2 * denominator1;

        // Comparer les fractions
        if (leftValue < rightValue) {
          answer = "<";
        } else if (leftValue > rightValue) {
          answer = ">";
        } else {
          answer = "=";
        }
      }

      return { left: left.toString(), right: right.toString(), answer };
    });

    setQuestions(generatedQuestions);
  }, []);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
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
      if (answer !== questions[globalIndex].answer) {
        allCorrect = false;
        newAnswers[globalIndex] = null;
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Navigation */}
      <Link
        href="/menu/apprendre"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/secondaire/niveaux/niveau1"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-3xl font-bold mb-6">Comparaison</h1>

      {/* Questions pour la page actuelle */}
      {!isValidated && (
        <>
          <div className="grid grid-cols-3 grid-rows-2 gap-6">
            {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ left, right }, index) => (
              <div key={index} className="flex items-center gap-4">
                <button
                  className="bg-blue-500 text-white font-bold py-4 px-6 rounded w-full"
                  disabled
                >
                  {left} ? {right}
                </button>
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

          <div className="mt-6 flex gap-4">
            {currentPage > 0 && (
              <button
                className="bg-gray-500 text-white py-2 px-6 rounded font-bold w-full"
                onClick={handlePreviousPage}
              >
                Précédent
              </button>
            )}
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-2 px-6 rounded font-bold w-full"
            >
              Valider les réponses
            </button>
            {isValidated && hasPassed && currentPage < Math.floor(totalQuestions / questionsPerPage) - 1 && (
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded font-bold w-full"
                onClick={handleNextPage}
              >
                Suivant
              </button>
            )}
          </div>
        </>
      )}

      {/* Résultats après validation */}
      {isValidated && (
        <>
          {hasPassed ? (
            <div>
              <p className="text-green-600 font-bold text-xl">Bravo ! Toutes vos réponses sont correctes.</p>
              {currentPage < Math.floor(totalQuestions / questionsPerPage) - 1 ? (
                <button
                  className="mt-6 bg-blue-500 text-white py-2 px-6 rounded font-bold w-full"
                  onClick={handleNextPage}
                >
                  Passer à la série suivante
                </button>
              ) : (
                <button
                  className="mt-6 bg-blue-500 text-white py-2 px-6 rounded font-bold w-full"
                  onClick={() => alert("Vous avez complété toutes les questions !")}
                >
                  Terminer
                </button>
              )}
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-bold text-xl">Certaines réponses sont incorrectes. Corrigez-les.</p>
              <button
                className="mt-6 bg-gray-500 text-white py-2 px-6 rounded font-bold w-full"
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
