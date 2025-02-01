"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Aire() {
  const totalQuestions = 30; // 30 questions au total
  const questionsPerPage = 3; // 3 questions par vague

  const [questions, setQuestions] = useState<{ questionText: string; correctAnswer: string }[]>([]); // Typage explicite
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, () => {
        const shapeType = Math.floor(Math.random() * 4);
        let questionText = "";
        let correctAnswer = 0;

        if (shapeType === 0) {
          const side = Math.floor(Math.random() * 10) + 1;
          questionText = `Quelle est l'aire d'un carré de côté ${side} cm ?`;
          correctAnswer = side * side;
        } else if (shapeType === 1) {
          const length = Math.floor(Math.random() * 10) + 1;
          const width = Math.floor(Math.random() * 10) + 1;
          questionText = `Quelle est l'aire d'un rectangle de longueur ${length} cm et de largeur ${width} cm ?`;
          correctAnswer = length * width;
        } else if (shapeType === 2) {
          const radius = Math.floor(Math.random() * 10) + 1;
          questionText = `Quelle est l'aire d'un cercle de rayon ${radius} cm ? (π = 3.14)`;
          correctAnswer = Math.PI * radius * radius;
        } else {
          const base = Math.floor(Math.random() * 10) + 1;
          const height = Math.floor(Math.random() * 10) + 1;
          questionText = `Quelle est l'aire d'un triangle de base ${base} cm et de hauteur ${height} cm ?`;
          correctAnswer = 0.5 * base * height;
        }

        return {
          questionText,
          correctAnswer: correctAnswer.toFixed(2),
        };
      });
    };

    setQuestions(generateQuestions());
  }, []);

  // Gestion des changements de réponses
  const handleChange = (index: number, value: string): void => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
    setFeedbackMessage(""); // Réinitialiser le message de feedback lors d'un changement
  };

  // Validation des réponses
  const handleValidation = (): void => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);
    const pageCorrectAnswers = questions.slice(startIndex, endIndex).map((q: { correctAnswer: string }) => q.correctAnswer);

    // Vérifier si toutes les réponses sont remplies
    const allAnswersFilled = pageAnswers.every((answer) => answer && answer.trim() !== "");

    if (!allAnswersFilled) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return; // Empêche la validation si des réponses sont vides
    }

    // Vérifier les réponses avec une marge d'erreur
    const marginOfError = 0.01;
    let allCorrect = true;
    const updatedAnswers = [...answers];

    pageAnswers.forEach((answer, index) => {
      const userAnswer = parseFloat(answer || "0");
      const correctAnswer = parseFloat(pageCorrectAnswers[index]);

      if (Math.abs(userAnswer - correctAnswer) > marginOfError) {
        updatedAnswers[startIndex + index] = null; // Effacer la réponse incorrecte
        allCorrect = false;
      }
    });

    setAnswers(updatedAnswers); // Mettre à jour les réponses

    if (allCorrect) {
      setFeedbackMessage("Bravo ! Toutes vos réponses sont correctes.");
      if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
        setCurrentPage(currentPage + 1);
      } else {
        setFeedbackMessage("Félicitations, vous avez terminé toutes les séries !");
      }
    } else {
      setFeedbackMessage("Certaines réponses sont incorrectes. Corrigez-les.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link
        href="/menu/apprendre"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/niveaux/niveau3"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">Questions sur l&#39;aire</h1>

      {feedbackMessage && (
        <p className={`text-xl font-bold mb-6 text-center ${feedbackMessage.includes("incorrectes") || feedbackMessage.includes("remplir") ? "text-red-600" : "text-green-600"}`}>
          {feedbackMessage}
        </p>
      )}

      {/* Affichage des questions */}
      <div className="flex flex-col items-center gap-4">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ questionText }, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="font-bold text-black text-center">{questionText}</div>
            <input
              type="text"
              inputMode="numeric"
              className="border border-gray-400 p-4 rounded w-64 h-12 text-center text-black text-lg"
              value={answers[currentPage * questionsPerPage + index] || ""}
              onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-8 rounded font-bold">
          Valider les réponses
        </button>
      </div>
    </div>
  );
}