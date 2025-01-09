"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function GeometryPractice() {
  const totalQuestions = 36;
  const questionsPerPage = 3;
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, () => {
        let questionText = "";
        let correctAnswer = "";

        const conceptChoice = Math.floor(Math.random() * 2);

        if (conceptChoice === 0) {
          // Question sur les formes géométriques
          const sides = Math.floor(Math.random() * 6) + 3; // Choisir un nombre de côtés entre 3 et 8
          questionText = `Comment appelle-t-on un polygone à ${sides} côtés ?`;
          correctAnswer = ["triangle", "quadrilatère", "pentagone", "hexagone", "heptagone", "octogone"][sides - 3];
        }

        return {
          questionText,
          correctAnswer,
        };
      });
    };

    setQuestions(generateQuestions());
  }, []);

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);
    const pageCorrectAnswers = questions.slice(startIndex, endIndex).map((q) => q.correctAnswer);

    const allAnswersFilled = pageAnswers.every((answer) => answer && answer.trim() !== "");

    if (!allAnswersFilled) {
      alert("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    let allCorrect = true;
    const updatedAnswers = [...answers];

    pageAnswers.forEach((answer, idx) => {
      if (answer !== pageCorrectAnswers[idx]) {
        updatedAnswers[startIndex + idx] = null;
        allCorrect = false;
      }
    });

    setAnswers(updatedAnswers);
    setIsValidated(true);
    setHasPassed(allCorrect);

    if (allCorrect && currentPage < totalQuestions / questionsPerPage - 1) {
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsValidated(false);
      }, 1500);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalQuestions / questionsPerPage - 1) {
      setCurrentPage(currentPage + 1);
      setIsValidated(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsValidated(false);
    }
  };

  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  // Fonction pour générer des formes en SVG
  const generateShape = (sides) => {
    const radius = 50; // Rayon pour les formes
    const points = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides;
      points.push(`${radius + radius * Math.cos(angle)},${radius + radius * Math.sin(angle)}`);
    }

    return (
      <svg width="100" height="100">
        <polygon points={points.join(" ")} fill="lightblue" stroke="black" strokeWidth="2" />
      </svg>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link href="/menu/apprendre" className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold">Apprendre</Link>
      <Link href="/primaire/niveaux/niveau4" className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold">Retour</Link>

      <h1 className="text-3xl font-bold mb-6">Pratique de la Géométrie</h1>

      {!isValidated && (
        <>
          <div className="flex flex-col gap-6">
            {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ questionText, correctAnswer }, idx) => (
              <div key={idx} className="flex flex-col items-start gap-2">
                <div className="font-bold text-black">{questionText}</div>
                {/* Générer l'image de la forme géométrique */}
                {generateShape(correctAnswer === "triangle" ? 3 : correctAnswer === "quadrilatère" ? 4 : correctAnswer === "pentagone" ? 5 : correctAnswer === "hexagone" ? 6 : correctAnswer === "heptagone" ? 7 : 8)}
                <select
                  className="border border-gray-400 p-2 rounded w-96 text-center text-black text-lg mx-auto"
                  value={answers[currentPage * questionsPerPage + idx] || ""}
                  onChange={(e) => handleChange(currentPage * questionsPerPage + idx, e.target.value)}
                >
                  <option value="">Choisir une forme</option>
                  <option value="triangle">Triangle</option>
                  <option value="quadrilatère">Quadrilatère</option>
                  <option value="pentagone">Pentagone</option>
                  <option value="hexagone">Hexagone</option>
                  <option value="heptagone">Heptagone</option>
                  <option value="octogone">Octogone</option>
                </select>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={handlePreviousPage}
              className="bg-gray-500 text-white py-3 px-8 rounded font-bold"
              disabled={currentPage === 0}
            >
              Précédent
            </button>
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-3 px-8 rounded font-bold"
            >
              Valider les réponses
            </button>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white py-3 px-8 rounded font-bold"
              disabled={currentPage === Math.floor(totalQuestions / questionsPerPage) - 1}
            >
              Suivant
            </button>
          </div>
        </>
      )}

      {isValidated && (
        <>
          {hasPassed ? (
            <div>
              <p className="text-green-600 font-bold text-xl">Bravo ! Toutes vos réponses sont correctes.</p>
              <button
                className="mt-6 bg-blue-500 text-white py-3 px-8 rounded font-bold"
                onClick={handleNextPage}
              >
                Suivant
              </button>
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-bold text-xl">Certaines réponses sont incorrectes. Corrigez-les.</p>
              <button
                className="mt-6 bg-gray-500 text-white py-3 px-8 rounded font-bold"
                onClick={() => setIsValidated(false)}
              >
                Revenir pour corriger
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
