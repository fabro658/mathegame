"use client";

import { useState } from "react";
import Link from "next/link";

type Question = {
  equation: string;
  solution: string;
};

export default function IsolerVariable() {
  // Banque de 20 équations
  const questions: Question[] = [
    { equation: "x + 3 = 7", solution: "4" },
    { equation: "2x = 10", solution: "5" },
    { equation: "x - 5 = 9", solution: "14" },
    { equation: "3x = 15", solution: "5" },
    { equation: "x/2 = 6", solution: "12" },
    { equation: "4x = 20", solution: "5" },
    { equation: "x + 8 = 12", solution: "4" },
    { equation: "7x = 21", solution: "3" },
    { equation: "x - 10 = 2", solution: "12" },
    { equation: "5x = 25", solution: "5" },
    { equation: "x/3 = 9", solution: "27" },
    { equation: "2x + 4 = 10", solution: "3" },
    { equation: "x/5 = 4", solution: "20" },
    { equation: "9x = 36", solution: "4" },
    { equation: "x - 7 = 1", solution: "8" },
    { equation: "6x = 18", solution: "3" },
    { equation: "x/4 = 5", solution: "20" },
    { equation: "10x = 100", solution: "10" },
    { equation: "x + 15 = 20", solution: "5" },
    { equation: "x/6 = 2", solution: "12" },
  ];

  // Sélection aléatoire d’une question
  const getRandomQuestion = () =>
    questions[Math.floor(Math.random() * questions.length)];

  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    getRandomQuestion()
  );
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const checkAnswer = () => {
    if (answer === currentQuestion.solution) {
      setFeedback("✅ Bravo ! C'est la bonne réponse.");
    } else {
      setFeedback(
        `❌ Mauvaise réponse. La solution correcte est : ${currentQuestion.solution}`
      );
    }
  };

  const nextQuestion = () => {
    setAnswer("");
    setFeedback("");
    setCurrentQuestion(getRandomQuestion());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 flex flex-col items-center justify-center p-6">
      {/* Bouton retour */}
      <Link
        href="/"
        className="absolute top-4 right-4 px-4 py-2 bg-white text-blue-600 rounded-lg shadow hover:bg-blue-100 transition"
      >
        Retour
      </Link>

      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">
          Isoler la variable (x)
        </h1>

        <p className="text-lg mb-4">Résous : {currentQuestion.equation}</p>

        <input
          type="text"
          placeholder="Ta réponse"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-32 text-center mb-4"
        />

        <div className="flex justify-center gap-4">
          <button
            onClick={checkAnswer}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            Vérifier
          </button>
          <button
            onClick={nextQuestion}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          >
            Nouvelle question
          </button>
        </div>

        {feedback && (
          <p className="mt-4 text-lg font-semibold text-gray-700">{feedback}</p>
        )}
      </div>
    </div>
  );
}
