"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ExponentsPractice() {
  const totalQuestions = 36; // Nombre total de questions
  const questionsPerPage = 6; // Questions affichées par vague

  const [questions, setQuestions] = useState<{ questionText: string; correctAnswer: string }[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [messageColor, setMessageColor] = useState<string>('text-black');

  // Génération des questions
  useEffect(() => {
    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, (_, index) => {
        let base, exponent, questionText, correctAnswer;

        // Niveau 1 : Simple et progressif
        if (index < 10) {
          base = 2; // Base fixe
          exponent = index + 1; // Exposants croissants de 1 à 10
          questionText = `Que vaut ${base}ⁿ avec n = ${exponent} ?`;
          correctAnswer = Math.pow(base, exponent).toString();
        } else {
          // Niveau supérieur : Diversité
          base = Math.floor(Math.random() * 6) + 2;
          exponent = Math.floor(Math.random() * 3) + 1;

          questionText = `Que vaut ${base}ⁿ avec n = ${exponent} ?`;
          correctAnswer = Math.pow(base, exponent).toString();

          // Ajout de parenthèses ou bases plus complexes après la 15ᵉ question
          if (index >= 15 && Math.random() > 0.5) {
            const baseAlt = base + Math.floor(Math.random() * 4) + 1;
            questionText = `Que vaut (${base} + ${baseAlt - base})ⁿ avec n = ${exponent} ?`;
            correctAnswer = Math.pow(baseAlt, exponent).toString();
          }
        }

        return { questionText, correctAnswer };
      });
    };

    setQuestions(generateQuestions());
  }, []);

  // Gestion des changements de réponse
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
    const pageCorrectAnswers = questions.slice(startIndex, endIndex).map((q) => q.correctAnswer);

    const allAnswersFilled = pageAnswers.every((answer) => answer && answer.trim() !== "");

    if (!allAnswersFilled) {
      setMessage("Veuillez remplir toutes les réponses avant de valider.");
      setMessageColor("text-red-500");
      return;
    }

    let allCorrect = true;
    const updatedAnswers = [...answers];

    pageAnswers.forEach((answer, index) => {
      if (answer !== pageCorrectAnswers[index]) {
        updatedAnswers[startIndex + index] = null;
        allCorrect = false;
      }
    });

    setAnswers(updatedAnswers);

    if (allCorrect) {
      setMessage("Toutes les réponses sont correctes !");
      setMessageColor("text-green-500");
      if (currentPage < totalQuestions / questionsPerPage - 1) {
        setTimeout(() => {
          setCurrentPage(currentPage + 1);
        }, 1500);
      }
    } else {
      setMessage("Certaines réponses sont incorrectes.");
      setMessageColor("text-red-500");
    }
  };

  const completedAnswers = answers.filter((answer) => answer !== null).length;

  return (
    <div className="flex flex-col items-start justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Bouton "Apprendre" en haut à gauche */}
      <Link
        href="/menu/apprendre/exposant"
        className="absolute top-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>

      <h1 className="text-3xl font-bold mb-6">Niveau 2</h1>

      {/* Questions en colonne */}
      <div className="flex flex-col gap-6 w-full">
        {questions
          .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
          .map(({ questionText }, idx) => (
            <div key={idx} className="flex flex-col items-start gap-2">
              <div className="font-bold text-black">{questionText}</div>
              <input
                type="text"
                inputMode="numeric"
                className="border border-gray-400 p-4 rounded w-full sm:w-32 text-center text-black text-lg"
                value={answers[currentPage * questionsPerPage + idx] || ""}
                onChange={(e) => handleChange(currentPage * questionsPerPage + idx, e.target.value)}
              />
            </div>
          ))}
      </div>

      {/* Message de validation */}
      {message && <div className={`mt-6 text-xl font-bold ${messageColor}`}>{message}</div>}

      {/* Afficher le nombre de réponses complètes */}
      <div className="mt-4 text-lg">
        {completedAnswers} réponses complètes
      </div>

      {/* Ajouter un bouton de validation */}
      <button
        onClick={handleValidation}
        className="mt-8 bg-blue-500 text-white py-3 px-8 rounded-lg font-bold hover:bg-blue-600"
      >
        Valider les réponses
      </button>
    </div>
  );
}
