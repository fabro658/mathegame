"use client";

import { useState } from "react";
import Link from "next/link";

interface FunctionQuestion {
  questionText: string;
  correctAnswer: string;
}

export default function TestFonctions() {
  const totalQuestions = 10;
  const questionsPerPage = 3;

  const [questions] = useState<FunctionQuestion[]>([
    {
      questionText: "Quelle est la définition d'une fonction ?",
      correctAnswer: "Relation où chaque élément de l'ensemble de départ est associé à un seul élément de l'ensemble d'arrivée.",
    },
    {
      questionText: "Donnez la formule générale d'une fonction linéaire.",
      correctAnswer: "f(x) = ax + b",
    },
    {
      questionText: "Quelle est la valeur de f(x) = 2x + 3 pour x = 5 ?",
      correctAnswer: "13",
    },
    {
      questionText: "Donnez un exemple de fonction quadratique.",
      correctAnswer: "f(x) = x^2 + 2x + 1",
    },
    {
      questionText: "Quelle est la fonction inverse de f(x) = x^2 ?",
      correctAnswer: "f(x) = √x",
    },
    {
      questionText: "Quelle est la valeur de f(x) = |x| pour x = -7 ?",
      correctAnswer: "7",
    },
    {
      questionText: "Donnez la formule d'une fonction exponentielle.",
      correctAnswer: "f(x) = a^x",
    },
    {
      questionText: "Quelle est la fonction en escalier qui associe à x son entier inférieur ?",
      correctAnswer: "f(x) = ⌊x⌋",
    },
    {
      questionText: "Quelle est la valeur de sin(π/2) ?",
      correctAnswer: "1",
    },
    {
      questionText: "Donnez un exemple de fonction rationnelle.",
      correctAnswer: "f(x) = (x+1)/(x-1)",
    },
  ]);

  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const handleChange = (index: number, value: string): void => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  const handleValidation = (): void => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;

    const pageAnswers = answers.slice(startIndex, endIndex);
    const pageCorrectAnswers = questions.slice(startIndex, endIndex).map(q => q.correctAnswer);

    const allAnswersFilled = pageAnswers.every(answer => answer && answer.trim() !== "");

    if (!allAnswersFilled) {
      alert("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    const updatedAnswers = [...answers];

    pageAnswers.forEach((answer, index) => {
      if (answer?.toLowerCase() !== pageCorrectAnswers[index].toLowerCase()) {
        updatedAnswers[startIndex + index] = null;
      }
    });

    setAnswers(updatedAnswers);
    setIsValidated(true);
  };

  const handleNextPage = (): void => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage)) {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <Link
        href="/menu/apprendre/fonction"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/menu/niveau5"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-3xl font-bold mb-6">Test sur les Fonctions</h1>

      <div className="flex flex-col gap-6">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ questionText }, index) => (
          <div key={index} className="flex flex-col items-start gap-2">
            <div className="font-bold text-black">{questionText}</div>
            <input
              type="text"
              className="border border-gray-400 p-4 rounded w-96 text-black text-lg"
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
          disabled={currentPage >= Math.floor(totalQuestions / questionsPerPage) - 1}
        >
          Suivant
        </button>
      </div>

      {isValidated && (
        <div className="mt-6">
          <p className="text-green-600 font-bold text-xl">Vérifiez vos réponses et passez à la suite !</p>
        </div>
      )}
    </div>
  );
}
