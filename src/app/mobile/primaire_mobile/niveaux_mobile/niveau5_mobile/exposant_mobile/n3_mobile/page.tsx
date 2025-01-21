"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ExponentsLevel3() {
  const totalQuestions = 30; // Nombre total de questions
  const questionsPerPage = 6; // 6 questions par page

  const [questions, setQuestions] = useState<{ questionText: string; correctAnswer: string }[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [messageColor, setMessageColor] = useState<string>("");

  // Génération des questions pour le niveau 3
  useEffect(() => {
    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, () => {
        const base1 = Math.floor(Math.random() * 5) + 2; // Base principale
        const base2 = Math.floor(Math.random() * 5) + 2; // Base secondaire
        const exponent = Math.floor(Math.random() * 4) + 1; // Exposant (1 à 4)

        let questionText = "";
        let correctAnswer = "";

        const type = Math.random();
        if (type < 0.33) {
          questionText = `Que vaut (${base1} + ${base2})^${exponent} ?`;
          correctAnswer = Math.pow(base1 + base2, exponent).toString();
        } else if (type < 0.66) {
          questionText = `Que vaut (${base1} * ${base2})^${exponent} ?`;
          correctAnswer = Math.pow(base1 * base2, exponent).toString();
        } else {
          questionText = `Que vaut (${base1} - ${base2})^${exponent} ?`;
          correctAnswer = Math.pow(base1 - base2, exponent).toString();
        }

        return {
          questionText,
          correctAnswer,
        };
      });
    };

    setQuestions(generateQuestions());
  }, []);

  // Gestion des réponses et de la progression
  const handleChange = (index: number, value: string): void => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
    setValidationMessage(""); // Réinitialiser le message de feedback lors d'un changement
  };

  const handleValidation = (): void => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);
    const pageCorrectAnswers = questions.slice(startIndex, endIndex).map((q) => q.correctAnswer);

    const allAnswersFilled = pageAnswers.every((answer) => answer && answer.trim() !== "");

    if (!allAnswersFilled) {
      setValidationMessage("Veuillez remplir toutes les réponses avant de valider.");
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
      setValidationMessage("Toutes les réponses sont correctes !");
      setMessageColor("text-green-500");
      if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
        setTimeout(() => {
          setCurrentPage(currentPage + 1);
        }, 1500);
      }
    } else {
      setValidationMessage("Certaines réponses sont incorrectes.");
      setMessageColor("text-red-500");
    }
  };

  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Boutons de navigation */}
      <div className="absolute top-4 left-4">
        <Link href="/menu/apprendre/exposant" className="bg-black text-white py-3 px-8 rounded font-bold">
          Apprendre
        </Link>
      </div>
      <div className="absolute top-4 right-4">
        <Link href="/primaire/niveaux/niveau5" className="bg-orange-500 text-white py-3 px-8 rounded font-bold">
          Retour
        </Link>
      </div>

      {/* Titre */}
      <h1 className="text-3xl font-bold mb-6 mt-16">Niveau 3</h1>

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

      {/* Afficher le nombre de réponses complètes */}
      <div className="mt-4 text-lg">
        {completedAnswers} réponses complètes
      </div>

      <div className="mt-6 flex justify-center w-full">
        <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold w-full max-w-xs">
          Valider les réponses
        </button>
      </div>
    </div>
  );
}