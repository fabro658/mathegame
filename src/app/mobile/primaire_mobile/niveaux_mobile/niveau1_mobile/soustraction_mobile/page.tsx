"use client";

import { useState } from "react";
import Link from "next/link";

export default function Soustraction() {
  // Déclarations des constantes
  const totalQuestions = 36;

  // États
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);

  // Génération des questions
  const questions = Array.from({ length: totalQuestions }, (_, index) => {
    if (index < 10) return [index + 1, index + 1]; // Niveau 1 : Soustractions simples
    if (index < 20) return [10 + index - 9, 5 + index - 9]; // Niveau 2
    if (index < 30) return [10 + Math.floor(Math.random() * 41), Math.floor(Math.random() * 41)]; // Niveau 3
    return [50 + Math.floor(Math.random() * 51), 50 + Math.floor(Math.random() * 51)]; // Niveau 4
  });

  // Gestion des réponses
  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseInt(value);
    newAnswers[index] = isNaN(parsedValue) ? null : parsedValue;
    setAnswers(newAnswers);
  };

  const handleValidation = () => {
    const newAnswers = [...answers];
    let allCorrect = true;

    questions.forEach(([a, b], index) => {
      const correctAnswer = a - b;
      if (answers[index] !== correctAnswer) {
        allCorrect = false;
        newAnswers[index] = null;
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);
    setHasPassed(allCorrect);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Boutons de navigation */}
      <Link
        href="/menu/apprendre/opérations arithmétiques"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/primaire/niveaux/niveau1"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-4xl font-bold mt-12 mb-6">Soustraction</h1>

      {/* Questions et réponses */}
      {!isValidated && (
        <div className="grid grid-cols-3 gap-6">
          {questions.map(([a, b], index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">{a} - {b}</div>
              <input
                type="text"
                inputMode="numeric"
                className="border border-gray-400 p-4 rounded w-32 text-center text-black text-lg"
                value={answers[index] || ""}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        {!isValidated && (
          <button
            onClick={handleValidation}
            className="bg-blue-500 text-white py-3 px-6 rounded font-bold"
          >
            Valider les réponses
          </button>
        )}

        {isValidated && (
          <div className="mt-6 text-center">
            {hasPassed ? (
              <p className="text-green-600 font-bold text-xl">Bravo ! Toutes vos réponses sont correctes.</p>
            ) : (
              <p className="text-red-600 font-bold text-xl">Certaines réponses sont incorrectes. Corrigez-les.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
