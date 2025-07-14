"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PrioOperation() {
  const totalQuestions = 36;
  const questionsPerPage = 6;

  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Générer les questions
  useEffect(() => {
    const generateQuestions = () => {
      const operations = ["+", "-", "*", "/"];
      const questionsArray: string[] = [];

      for (let i = 0; i < totalQuestions; i++) {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const num3 = Math.floor(Math.random() * 10) + 1;
        const num4 = Math.floor(Math.random() * 10) + 1;
        const op1 = operations[Math.floor(Math.random() * operations.length)];
        const op2 = operations[Math.floor(Math.random() * operations.length)];
        const op3 = operations[Math.floor(Math.random() * operations.length)];
        const op4 = operations[Math.floor(Math.random() * operations.length)];

        if (i < totalQuestions / 4) {
          questionsArray.push(`(${num1} ${op1} ${num2})`);
        } else if (i < totalQuestions / 2) {
          questionsArray.push(`(${num1} ${op1} ${num2}) ${op2} ${num3}`);
        } else if (i < (3 * totalQuestions) / 4) {
          questionsArray.push(`(${num1} ${op1} ${num2}) ${op2} (${num3} ${op3} ${num4})`);
        } else {
          questionsArray.push(`(${num1} ${op1} (${num2} ${op2} ${num3})) ${op3} (${num4} ${op4} ${num1})`);
        }
      }

      setQuestions(questionsArray);
    };

    generateQuestions();
  }, []);

  // Calculer les réponses correctes
  const correctAnswers = questions.map((question) => {
    try {
      return parseFloat(eval(question).toFixed(2));
    } catch {
      return null;
    }
  });

  // Mettre à jour les réponses utilisateur
  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value === "" ? null : value;
    setAnswers(newAnswers);
    setFeedbackMessage(""); // Réinitialiser le message de feedback lors d'un changement
  };

  // Valider les réponses de la page courante
  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null)) {
      setFeedbackMessage("Veuillez remplir toutes les réponses sur cette page avant de valider.");
      return;
    }

    let allCorrect = true;
    const newAnswers = [...answers];

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      const correctAnswer = correctAnswers[globalIndex];

      if (answer !== null) {
        try {
          const parsedAnswer = parseFloat(answer);
          if (parsedAnswer !== correctAnswer) {
            allCorrect = false;
            newAnswers[globalIndex] = null;
          }
        } catch {
          allCorrect = false;
          newAnswers[globalIndex] = null;
        }
      }
    });

    setAnswers(newAnswers);
    setFeedbackMessage(allCorrect ? "Bravo ! Toutes les réponses sont correctes !" : "Certaines réponses sont incorrectes. Réessayez !");

    if (allCorrect) {
      if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
        setTimeout(() => {
          setCurrentPage(currentPage + 1);
        }, 1500);
      } else {
        setFeedbackMessage("Félicitations, vous avez terminé toutes les séries !");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Boutons en haut */}
      <Link
        href="/mobile/menu_mobile/apprendre_mobile/prioriteoperation_mobile"
        className="absolute top-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/mobile/secondaire_mobile/niveaux_mobile/niveau3_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      {/* Titre */}
      <h1 className="text-3xl font-bold mb-10 mt-20">Priorités des Opérations</h1>

      {feedbackMessage && (
        <p className={`text-xl font-bold mb-6 text-center ${feedbackMessage.includes("incorrectes") || feedbackMessage.includes("remplir") ? "text-red-600" : "text-green-600"}`}>
          {feedbackMessage}
        </p>
      )}

      {/* Questions et réponses */}
      <div className="flex flex-col gap-4 items-center">
        {questions
          .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
          .map((question, index) => (
            <div key={index} className="flex items-center gap-4 w-full max-w-md">
              <div className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg text-lg flex-grow text-center">
                {question}
              </div>
              <input
              type="text"
              className="border border-gray-400 p-4 rounded-lg w-1/3 text-center text-lg"
              value={answers[currentPage * questionsPerPage + index] || ""}
              onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
            />
          </div>
          ))}
      </div>

      {/* Bouton Valider */}
      <div className="mt-10">
        <button
          onClick={handleValidation}
          className="bg-blue-500 text-white py-3 px-6 rounded font-bold"
        >
          Valider les réponses
        </button>
      </div>
    </div>
  );
}
