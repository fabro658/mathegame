"use client";

import { useState } from "react";
import Link from "next/link";

interface FunctionQuestion {
  questionText: string;
  correctAnswer: string;
  Graph: () => JSX.Element; // fonction qui rend un SVG
}

export default function TestFonctions() {
  const totalQuestions = 5; // pour l'exemple
  const questionsPerPage = 2;

  const [questions] = useState<FunctionQuestion[]>([
    {
      questionText: "Quelle est la pente a de cette fonction linéaire f(x) = ax + b ?",
      correctAnswer: "2",
      Graph: () => (
        <svg width={200} height={200} viewBox="0 0 10 10" className="border">
          <line x1={0} y1={8} x2={10} y2={0} stroke="blue" strokeWidth={0.2} />
          <line x1={0} y1={0} x2={0} y2={10} stroke="black" />
          <line x1={0} y1={8} x2={10} y2={8} stroke="black" />
        </svg>
      ),
    },
    {
      questionText: "Quel est le sommet et la formule de cette fonction quadratique ?",
      correctAnswer: "f(x) = (x-1)^2",
      Graph: () => (
        <svg width={200} height={200} viewBox="0 0 4 4" className="border">
          <path d="M0,1 L1,0 L2,1 L3,4" stroke="blue" fill="transparent" strokeWidth={0.05} />
          <line x1={0} y1={2} x2={4} y2={2} stroke="black" />
          <line x1={1} y1={0} x2={1} y2={4} stroke="black" />
        </svg>
      ),
    },
    {
      questionText: "Quel est a dans cette fonction exponentielle f(x) = a^x ?",
      correctAnswer: "2",
      Graph: () => (
        <svg width={200} height={200} viewBox="0 0 4 4" className="border">
          <path d="M0,3 L1,1.5 L2,0.75 L3,0.375 L4,0.2" stroke="blue" fill="transparent" strokeWidth={0.05} />
          <line x1={0} y1={0} x2={0} y2={4} stroke="black" />
          <line x1={0} y1={4} x2={4} y2={4} stroke="black" />
        </svg>
      ),
    },
    {
      questionText: "Quel est h et b dans f(x) = |x-h| + b ?",
      correctAnswer: "f(x) = |x-3| + 1",
      Graph: () => (
        <svg width={200} height={200} viewBox="0 0 6 6" className="border">
          <path d="M0,4 L3,1 L6,4" stroke="blue" fill="transparent" strokeWidth={0.1} />
          <line x1={0} y1={0} x2={0} y2={6} stroke="black" />
          <line x1={0} y1={6} x2={6} y2={6} stroke="black" />
        </svg>
      ),
    },
    {
      questionText: "Quelle est la fonction inverse représentée ici ?",
      correctAnswer: "f(x) = 1/x",
      Graph: () => (
        <svg width={200} height={200} viewBox="0 0 5 5" className="border">
          <path d="M0,5 L1,2.5 L2,1.66 L3,1.25 L4,1" stroke="blue" fill="transparent" strokeWidth={0.05} />
          <line x1={0} y1={0} x2={0} y2={5} stroke="black" />
          <line x1={0} y1={5} x2={5} y2={5} stroke="black" />
        </svg>
      ),
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
        href="/secondaire/niveaux/niveau5"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-3xl font-bold mb-6">Test sur les Fonctions</h1>

      <div className="flex flex-col gap-6">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
          .map(({ questionText, Graph }, index) => (
          <div key={index} className="flex flex-col items-start gap-2">
            <div className="font-bold text-black">{questionText}</div>
            <Graph />
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
