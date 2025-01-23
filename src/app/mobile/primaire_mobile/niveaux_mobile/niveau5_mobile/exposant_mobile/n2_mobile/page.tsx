"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ExponentsPractice() {
  const totalQuestions = 36; // Nombre total de questions
  const questionsPerPage = 6; // Questions affichées par page

  const [questions, setQuestions] = useState<{ questionText: string; correctAnswer: string }[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [messageColor, setMessageColor] = useState<string>("");

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
    setValidationMessage(""); // Réinitialiser le message de feedback lors d'un changement
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
      // Réinitialise les réponses et passe automatiquement à la page suivante si tout est correct
      setTimeout(() => {
        setAnswers(Array(totalQuestions).fill(null));
        if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
          setCurrentPage(currentPage + 1);
        }
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Boutons de navigation */}
      <div className="absolute top-4 left-4">
        <Link href="/menu/apprendre/exposant" className="bg-black text-white py-3 px-8 rounded font-bold">
          Apprendre
        </Link>
      </div>
      <div className="absolute top-4 right-4">
        <Link href="/mobile/primaire_mobile/niveaux_mobile/niveau5_mobile" className="bg-orange-500 text-white py-3 px-8 rounded font-bold">
          Retour
        </Link>
      </div>

      {/* Titre */}
      <h1 className="text-3xl font-bold mb-6 mt-16">Niveau 2</h1>

      {/* Message de validation */}
      {validationMessage && (
        <div className={`mt-4 ${messageColor} text-lg font-bold`}>{validationMessage}</div>
      )}

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

      <div className="mt-6 flex justify-center w-full">
        <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold w-full max-w-xs">
          Valider les réponses
        </button>
      </div>
    </div>
  );
}