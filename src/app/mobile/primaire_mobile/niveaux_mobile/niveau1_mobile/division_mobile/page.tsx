"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Division() {
  const totalQuestions = 36;
  const questionsPerPage = 6; // 6 questions par page
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0); // Gestion de la page actuelle
  const [questions, setQuestions] = useState<[number, number][]>([]);
  const [message, setMessage] = useState<string>("");
  const [messageColor, setMessageColor] = useState<string>("");

  // Génération des questions au chargement
  useEffect(() => {
    const generatedQuestions: [number, number][] = Array.from({ length: totalQuestions }, (_, index) => {
      let numerator: number, denominator: number;

      if (index < 10) {
        denominator = Math.floor(Math.random() * 10) + 1;
        numerator = denominator * (Math.floor(Math.random() * 10) + 1);
      } else if (index < 20) {
        numerator = Math.floor(Math.random() * 100) + 1;
        denominator = Math.floor(Math.random() * 10) + 1;
      } else if (index < 30) {
        numerator = Math.floor(Math.random() * 100) + 1;
        denominator = Math.floor(Math.random() * 20) + 1;
      } else {
        numerator = Math.floor(Math.random() * 100) + 1;
        denominator = Math.floor(Math.random() * 50) + 1;
      }

      return [numerator, denominator];
    });

    setQuestions(generatedQuestions);
  }, []);

  // Calcul des réponses correctes
  const correctAnswers = questions.map(([numerator, denominator]) => Number((numerator / denominator).toFixed(2)));

  // Gestion des changements dans les réponses
  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseFloat(value);
    newAnswers[index] = isNaN(parsedValue) ? null : parsedValue;
    setAnswers(newAnswers);
  };

  // Validation des réponses de la page
  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null)) {
      setMessage("Veuillez remplir toutes les réponses sur cette page avant de valider.");
      setMessageColor("text-red-500");
      return;
    }

    const newAnswers = [...answers];
    let allCorrect = true;

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      if (answer !== correctAnswers[globalIndex]) {
        allCorrect = false;
      }
    });

    if (!allCorrect) {
      setMessage("Certaines réponses sont incorrectes. Corrigez-les avant de continuer.");
      setMessageColor("text-red-500");
    } else {
      setMessage("Bravo ! Toutes vos réponses sont correctes.");
      setMessageColor("text-green-500");
      setCurrentPage(currentPage + 1); // Passer à la page suivante
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100 text-black py-6 px-4">
      {/* Conteneur pour les boutons */}
      <div className="flex justify-between w-full mb-6">
        <Link href="/mobile/menu_mobile/apprendre_mobile/opérations arithmétiques_mobile" className="bg-black text-white py-3 px-8 rounded font-bold">
          Apprendre
        </Link>
        <Link href="/mobile/primaire_mobile/niveaux_mobile/niveau1_mobile" className="bg-orange-500 text-white py-3 px-8 rounded font-bold">
          Retour
        </Link>
      </div>

      {/* Titre */}
      <h1 className="text-3xl font-bold mb-8">Division</h1>

      <div className="space-y-4 w-full max-w-md">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(([numerator, denominator], index) => (
          <div key={index} className="flex items-center justify-center gap-6">
            <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-3xl">
              {numerator} ÷ {denominator}
            </div>
            <input
              type="text"
              inputMode="numeric"
              className="border border-gray-300 p-2 rounded w-24 text-center"
              value={answers[currentPage * questionsPerPage + index] ?? ""}
              onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
            />
          </div>
        ))}
      </div>

      {message && <div className={`mt-4 text-lg font-bold ${messageColor}`}>{message}</div>}

      <button
        onClick={handleValidation}
        className="mt-8 bg-blue-500 text-white py-3 px-8 rounded font-bold w-full max-w-md"
      >
        Valider les réponses
      </button>
    </div>
  );
}
