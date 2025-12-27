"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Equation {
  id: number;
  text: string;
  answer: number;
}

function fmt(n: number) {
  return n < 0 ? `(${n})` : n.toString();
}

export default function IsolerVariable() {
  const totalQuestions = 50;
  const questionsPerPage = 5;

  const [questions, setQuestions] = useState<Equation[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);

  // Générer les équations aléatoires (avec réponses entières)
  useEffect(() => {
    if (questions.length > 0) return;

    const randomInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const generateOne = (id: number): Equation => {
      // On boucle jusqu'à obtenir une question "propre"
      while (true) {
        const eqType = Math.floor(Math.random() * 2); // 0 ou 1
        const a = randomInt(1, 9); // coef de x (ou constante selon le type)
        const b = randomInt(-10, 10);
        const c = randomInt(-10, 10);

        // évite b = 0 quand b est un coefficient de x (sinon bx = ... impossible)
        if (eqType === 1 && b === 0) continue;

        let answer: number;
        let text: string;

        if (eqType === 0) {
          // ax + b = c  -> x = (c - b)/a
          answer = (c - b) / a;

          // BONUS: on veut une réponse entière
          if (!Number.isInteger(answer)) continue;

          text = `${a}x + ${fmt(b)} = ${fmt(c)}`;
        } else {
          // a + bx = c  -> x = (c - a)/b
          answer = (c - a) / b;

          // BONUS: on veut une réponse entière
          if (!Number.isInteger(answer)) continue;

          // Ici "a" est une constante, "b" est le coef de x
          text = `${fmt(a)} + ${fmt(b)}x = ${fmt(c)}`;
        }

        // Petite sécurité: évite des réponses trop grosses (optionnel)
        if (Math.abs(answer) > 20) continue;

        return { id, text, answer };
      }
    };

    const generatedQuestions: Equation[] = Array.from(
      { length: totalQuestions },
      (_, i) => generateOne(i + 1)
    );

    setQuestions(generatedQuestions);
  }, [questions.length]);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsed = parseFloat(value);
    newAnswers[index] = isNaN(parsed) ? null : parsed;
    setAnswers(newAnswers);
    setFeedbackMessage(null);
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null)) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    const newAnswers = [...answers];
    const incorrectIndices: number[] = [];
    let hasError = false;

    pageAnswers.forEach((ans, idx) => {
      const globalIndex = startIndex + idx;
      const correct = questions[globalIndex]?.answer;

      // Sécurité si jamais questions pas encore prêtes
      if (correct === undefined) return;

      if (ans !== correct) {
        newAnswers[globalIndex] = null;
        incorrectIndices.push(globalIndex);
        hasError = true;
      }
    });

    setAnswers(newAnswers);
    setIncorrectAnswers(incorrectIndices);

    if (hasError) {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez les corriger.");
    } else if (currentPage < Math.ceil(totalQuestions / questionsPerPage) - 1) {
      setFeedbackMessage("Toutes les réponses de cette page sont correctes !");
      setCurrentPage(currentPage + 1);
    } else {
      setFeedbackMessage("Bravo ! Vous avez terminé toutes les questions.");
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
      setFeedbackMessage(null);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setFeedbackMessage(null);
    }
  };

  const completedAnswers = answers.filter((a) => a !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link
        href="/menu/apprendre/algebre"
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

      <div className="absolute top-4 left-4 w-32 h-32">
        <svg className="transform -rotate-90" width="100%" height="100%">
          <circle cx="50%" cy="50%" r={50} fill="none" stroke="#e5e5e5" strokeWidth={10} />
          <circle
            cx="50%"
            cy="50%"
            r={50}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={10}
            strokeDasharray={2 * Math.PI * 50}
            strokeDashoffset={2 * Math.PI * 50 - ((2 * Math.PI * 50 * completionPercentage) / 100)}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-blue-500">{completionPercentage}%</span>
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-6">Isoler la variable</h1>

      {feedbackMessage && (
        <p
          className={`text-xl mb-4 ${
            feedbackMessage.includes("remplir toutes") || feedbackMessage.includes("incorrectes")
              ? "text-red-500"
              : "text-green-500"
          } text-center`}
        >
          {feedbackMessage}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {questions
          .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
          .map((q, index) => {
            const globalIndex = currentPage * questionsPerPage + index;

            return (
              <div key={q.id} className="flex items-center gap-4">
                <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">
                  {q.text}
                </div>

                <input
                  type="text"
                  inputMode="numeric"
                  className={`border border-gray-400 p-4 rounded w-32 text-center text-black text-lg ${
                    incorrectAnswers.includes(globalIndex) ? "border-red-500" : ""
                  }`}
                  value={answers[globalIndex] ?? ""}
                  onChange={(e) => handleChange(globalIndex, e.target.value)}
                />
              </div>
            );
          })}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handlePreviousPage}
          className="bg-gray-500 text-white py-3 px-6 rounded font-bold"
        >
          Précédent
        </button>

        <button
          onClick={handleValidation}
          className="bg-blue-500 text-white py-3 px-6 rounded font-bold"
        >
          Valider les réponses
        </button>

        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white py-3 px-6 rounded font-bold"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
