"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Question =
  | { type: "compare", fractions: [string, string], correctAnswer: string }
  | { type: "equivalence", fractions: string[], correctAnswer: string };

export default function PractiqueFractions() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const generateSameDenominator = (): Question[] => {
    return Array.from({ length: totalQuestions / 6 }, () => {
      const denominator = Math.floor(Math.random() * 8) + 2;
      const num1 = Math.floor(Math.random() * 9) + 1;
      const num2 = Math.floor(Math.random() * 9) + 1;
      return {
        type: "compare",
        fractions: [`${num1}/${denominator}`, `${num2}/${denominator}`],
        correctAnswer: num1 > num2 ? "greater" : num1 < num2 ? "less" : "equal",
      };
    });
  };

  const generateSameNumerator = (): Question[] => {
    return Array.from({ length: totalQuestions / 6 }, () => {
      const numerator = Math.floor(Math.random() * 9) + 1;
      const den1 = Math.floor(Math.random() * 8) + 2;
      const den2 = Math.floor(Math.random() * 8) + 2;
      return {
        type: "compare",
        fractions: [`${numerator}/${den1}`, `${numerator}/${den2}`],
        correctAnswer: den1 > den2 ? "less" : den1 < den2 ? "greater" : "equal",
      };
    });
  };

  const generateNonReducedFractions = (): Question[] => {
    return Array.from({ length: totalQuestions / 6 }, () => {
      const multiplier1 = Math.floor(Math.random() * 5) + 1;
      const multiplier2 = Math.floor(Math.random() * 5) + 1;
      const num = Math.floor(Math.random() * 8) + 1;
      const den = Math.floor(Math.random() * 8) + 2;

      return {
        type: "compare",
        fractions: [`${num * multiplier1}/${den * multiplier1}`, `${num * multiplier2}/${den * multiplier2}`],
        correctAnswer: "equal",
      };
    });
  };

  const generateEquivalences = (): Question[] => {
    return Array.from({ length: totalQuestions / 6 }, () => {
      const num = Math.floor(Math.random() * 9) + 1;
      const den = Math.floor(Math.random() * 8) + 2;
      const multiplier1 = Math.floor(Math.random() * 5) + 1;
      const multiplier2 = Math.floor(Math.random() * 5) + 1;
      const nonEquivalent = `${num + 1}/${den + 1}`;

      return {
        type: "equivalence",
        fractions: [
          `${num}/${den}`,
          `${num * multiplier1}/${den * multiplier1}`,
          `${num * multiplier2}/${den * multiplier2}`,
          nonEquivalent,
        ],
        correctAnswer: `${num}/${den}`,
      };
    });
  };

  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setQuestions([
      ...generateSameDenominator(),
      ...generateSameNumerator(),
      ...generateNonReducedFractions(),
      ...generateEquivalences(),
    ]);
  }, []);

  const handleAnswer = (index: number, value: string) => {
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
      if (answer !== questions[globalIndex]?.correctAnswer) {
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

      <h1 className="text-3xl font-bold mb-6">Comparaison de Fractions</h1>

      {!isValidated && (
        <>
          <div className="grid grid-cols-3 gap-10"> {/* Augmenter l'espace entre les questions */}
            {questions
              .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
              .map((question, index) => (
                <div key={index} className="flex flex-col items-center gap-8"> {/* Augmenter l'espace entre les questions */}
                  {question.type === "compare" ? (
                    <div className="text-lg font-bold">
                      {question.fractions[0]} vs {question.fractions[1]}
                    </div>
                  ) : (
                    <div className="text-lg font-bold">
                      Quelles fractions sont équivalentes ?
                      <ul>
                        {question.fractions.map((frac, idx) => (
                          <li key={idx}>{frac}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex gap-8"> {/* Espacer les boutons */}
                    <button
                      className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
                      onClick={() => handleAnswer(currentPage * questionsPerPage + index, "greater")}
                    >
                      Vrai
                    </button>
                    <button
                      className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
                      onClick={() => handleAnswer(currentPage * questionsPerPage + index, "less")}
                    >
                      Faux
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-6 flex gap-4">
            {currentPage > 0 && (
              <button
                className="bg-gray-500 text-white py-2 px-6 rounded font-bold"
                onClick={handlePreviousPage}
              >
                Précédent
              </button>
            )}
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
            >
              Valider les réponses
            </button>
            {currentPage < Math.floor(totalQuestions / questionsPerPage) - 1 && (
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
                onClick={handleNextPage}
              >
                Suivant
              </button>
            )}
          </div>
        </>
      )}

      {isValidated && (
        <>
          {hasPassed ? (
            <p className="text-green-600 font-bold text-xl">Bravo ! Toutes vos réponses sont correctes.</p>
          ) : (
            <p className="text-red-600 font-bold text-xl">Certaines réponses sont incorrectes. Corrigez-les.</p>
          )}
          <button
            className="mt-6 bg-gray-500 text-white py-2 px-6 rounded font-bold"
            onClick={() => setIsValidated(false)}
          >
            Revenir pour corriger
          </button>
        </>
      )}
    </div>
  );
}
