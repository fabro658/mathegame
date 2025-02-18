'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Perimetre() {
  const totalQuestions = 30;
  const questionsPerPage = 3;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [questions, setQuestions] = useState<{ questionText: string; correctAnswer: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);

  useEffect(() => {
    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, () => {
        const shapeType = Math.floor(Math.random() * 5);
        let questionText = "";
        let correctAnswer = 0;

        if (shapeType === 0) {
          const side = Math.floor(Math.random() * 10) + 1;
          questionText = `Quel est le périmètre d'un carré de côté ${side} cm ?`;
          correctAnswer = 4 * side;
        } else if (shapeType === 1) {
          const length = Math.floor(Math.random() * 10) + 1;
          const width = Math.floor(Math.random() * 10) + 1;
          questionText = `Quel est le périmètre d'un rectangle de longueur ${length} cm et de largeur ${width} cm ?`;
          correctAnswer = 2 * (length + width);
        } else if (shapeType === 2) {
          const side1 = Math.floor(Math.random() * 10) + 1;
          const side2 = Math.floor(Math.random() * 10) + 1;
          const side3 = Math.floor(Math.random() * 10) + 1;
          questionText = `Quel est le périmètre d'un triangle avec des côtés de ${side1} cm, ${side2} cm et ${side3} cm ?`;
          correctAnswer = side1 + side2 + side3;
        } else if (shapeType === 3) {
          const side = Math.floor(Math.random() * 10) + 1;
          questionText = `Quel est le périmètre d'un losange de côté ${side} cm ?`;
          correctAnswer = 4 * side;
        } else {
          const side1 = Math.floor(Math.random() * 10) + 1;
          const side2 = Math.floor(Math.random() * 10) + 1;
          const side3 = Math.floor(Math.random() * 10) + 1;
          const side4 = Math.floor(Math.random() * 10) + 1;
          questionText = `Quel est le périmètre d'un trapèze avec des côtés de ${side1} cm, ${side2} cm, ${side3} cm et ${side4} cm ?`;
          correctAnswer = side1 + side2 + side3 + side4;
        }

        return {
          questionText,
          correctAnswer: correctAnswer.toFixed(2),
        };
      });
    };

    setQuestions(generateQuestions());
  }, []);

  const completedAnswers = answers.filter((answer) => answer !== null && answer !== "").length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  const handleChange = (index: number, value: string): void => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
    setFeedbackMessage(null);
  };

  const handleValidation = (): void => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);
    const pageCorrectAnswers = questions.slice(startIndex, endIndex).map(q => q.correctAnswer);

    if (pageAnswers.includes(null) || pageAnswers.includes("")) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    const marginOfError = 0.01;
    let allCorrect = true;
    const incorrect: number[] = [];

    pageAnswers.forEach((answer, index) => {
      const userAnswer = parseFloat(answer || "0");
      const correctAnswer = parseFloat(pageCorrectAnswers[index]);
      
      if (Math.abs(userAnswer - correctAnswer) > marginOfError) {
        incorrect.push(startIndex + index);
        allCorrect = false;
      }
    });

    setIncorrectAnswers(incorrect);
    setFeedbackMessage(allCorrect ? "Toutes les réponses sont correctes !" : "Certaines réponses sont incorrectes. Veuillez réessayer.");

    if (allCorrect && currentPage < totalQuestions / questionsPerPage - 1) {
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setFeedbackMessage(null);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <h1 className="text-3xl font-bold mb-6">Questions sur le périmètre</h1>
      {feedbackMessage && (
        <div className={`mt-4 text-lg font-bold ${feedbackMessage.includes("correctes") ? "text-green-500" : "text-red-500"}`}>
          {feedbackMessage}
        </div>
      )}
      <div className="flex flex-col gap-4">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ questionText }, index) => (
          <div key={index} className="flex flex-col items-start gap-2">
            <div className="font-bold text-black">{questionText}</div>
            <input
              type="number"
              step="any"
              className={`border border-gray-400 p-6 rounded w-96 h-16 text-center text-black text-lg mx-auto ${
                incorrectAnswers.includes(currentPage * questionsPerPage + index) ? "border-red-500" : ""
              }`}
              value={answers[currentPage * questionsPerPage + index] || ""}
              onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-4">
        <button onClick={() => setCurrentPage(currentPage - 1)} className="bg-gray-500 text-white py-3 px-8 rounded font-bold" disabled={currentPage === 0}>
          Précédent
        </button>
        <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-8 rounded font-bold">
          Valider les réponses
        </button>
        <button onClick={() => setCurrentPage(currentPage + 1)} className="bg-blue-500 text-white py-3 px-8 rounded font-bold" disabled={currentPage === Math.floor(totalQuestions / questionsPerPage) - 1}>
          Suivant
        </button>
      </div>
    </div>
  );
}
