"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ExponentsPractice() {
  const totalQuestions = 36; // Nombre total de questions
  const questionsPerPage = 6; // Questions affichées par page (2 colonnes x 3 lignes)

  const [questions, setQuestions] = useState<{ questionText: string; correctAnswer: string }[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [messageColor, setMessageColor] = useState<string>("");

  // Génération des questions
  useEffect(() => {
    const generateQuestions = () => {
      const superscriptMap: Record<string, string> = {
        0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵",
        6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹",
      };

      return Array.from({ length: totalQuestions }, () => {
        const base = Math.floor(Math.random() * 10) + 1; // Base entre 1 et 10
        const exponent = 2; // Exposant fixé à 2
        const correctAnswer = Math.sqrt(base ** exponent).toString();

        const exponentUnicode = String(exponent)
          .split("")
          .map((digit) => superscriptMap[digit])
          .join("");

        const questionText = `Que vaut x si x${exponentUnicode} = ${base ** exponent} ?`;
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

    if (pageAnswers.some((answer) => !answer)) {
      setValidationMessage("Veuillez remplir toutes les réponses avant de valider.");
      setMessageColor("text-red-500");
      return;
    }

    const allCorrect = pageAnswers.every((answer, idx) => answer === pageCorrectAnswers[idx]);
    if (!allCorrect) {
      const updatedAnswers = [...answers];
      pageAnswers.forEach((answer, idx) => {
        if (answer !== pageCorrectAnswers[idx]) {
          updatedAnswers[startIndex + idx] = null; // Réinitialise les réponses incorrectes
        }
      });
      setAnswers(updatedAnswers);
      setValidationMessage("Certaines réponses sont incorrectes.");
      setMessageColor("text-red-500");
    } else {
      setValidationMessage("Toutes les réponses sont correctes !");
      setMessageColor("text-green-500");
      // Passe automatiquement à la page suivante si tout est correct
      if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
        setTimeout(() => {
          setCurrentPage(currentPage + 1);
        }, 1500);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Bouton "Retour" visible uniquement sur grand écran */}
      <Link
        href="/mobile/primaire_mobile/niveaux_mobile/niveau5_mobile"
        className="absolute top-4 left-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      {/* Titre */}
      <h1 className="text-3xl font-bold mb-6">Niveau 1</h1>

      {/* Grille de questions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
      {validationMessage && (
        <div className={`mt-4 ${messageColor} text-lg font-bold`}>{validationMessage}</div>
      )}

      {/* Bouton "Apprendre" */}
      <div className="absolute top-4 left-4">
        <Link
          href="/mobile/menu_mobile/apprendre_mobile/exposant_mobile"
          className="bg-black text-white py-3 px-8 rounded font-bold"
        >
          Apprendre
        </Link>
      </div>

      {/* Validation des réponses */}
      <div className="mt-6 w-full sm:w-auto">
        <button
          onClick={handleValidation}
          className="bg-blue-500 text-white py-3 px-8 rounded font-bold"
        >
          Valider les réponses
        </button>
      </div>
    </div>
  );
}
