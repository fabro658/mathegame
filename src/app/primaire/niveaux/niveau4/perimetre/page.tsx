"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Perimetre() {
  const totalQuestions = 30;
  const questionsPerPage = 3;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [questions, setQuestions] = useState<{ questionText: string; correctAnswer: string }[]>([]);
  const [isValidated, setIsValidated] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  // Générer de nouvelles questions
  const generateQuestions = () => {
    return Array.from({ length: totalQuestions }, () => {
      const shapeType = Math.floor(Math.random() * 5);
      let questionText = "";
      let correctAnswer = 0;

      if (shapeType === 0) {
        const side = Math.floor(Math.random() * 10) + 1;
        questionText = `Quel est le périmètre d'un carré de côté ${side} cm ?`;
        correctAnswer = 4 * side;
      } else if (shapeType === 1) {
        const length = Math.floor(Math.random() * 10) + 1;
        const width = Math.floor(Math.random() * 10) + 1;
        questionText = `Quel est le périmètre d'un rectangle de longueur ${length} cm et de largeur ${width} cm ?`;
        correctAnswer = 2 * (length + width);
      } else if (shapeType === 2) {
        const side1 = Math.floor(Math.random() * 10) + 1;
        const side2 = Math.floor(Math.random() * 10) + 1;
        const side3 = Math.floor(Math.random() * 10) + 1;
        questionText = `Quel est le périmètre d'un triangle avec des côtés de ${side1} cm, ${side2} cm et ${side3} cm ?`;
        correctAnswer = side1 + side2 + side3;
      } else if (shapeType === 3) {
        const side = Math.floor(Math.random() * 10) + 1;
        questionText = `Quel est le périmètre d'un losange de côté ${side} cm ?`;
        correctAnswer = 4 * side;
      } else {
        const side1 = Math.floor(Math.random() * 10) + 1;
        const side2 = Math.floor(Math.random() * 10) + 1;
        const side3 = Math.floor(Math.random() * 10) + 1;
        const side4 = Math.floor(Math.random() * 10) + 1;
        questionText = `Quel est le périmètre d'un trapèze avec des côtés de ${side1} cm, ${side2} cm, ${side3} cm et ${side4} cm ?`;
        correctAnswer = side1 + side2 + side3 + side4;
      }

      return {
        questionText,
        correctAnswer: correctAnswer.toFixed(2),
      };
    });
  };

  // Charger les questions initiales
  useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  const completedAnswers = answers.filter((answer) => answer !== null && answer !== "").length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  const handleChange = (index: number, value: string): void => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
    setFeedbackMessage(null); // Réinitialiser le message de feedback
  };

  const handleValidation = (): void => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    // Vérifier si toutes les réponses sont remplies
    if (pageAnswers.some(answer => answer === null || answer === "")) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    const pageCorrectAnswers = questions.slice(startIndex, endIndex).map(q => q.correctAnswer);
    const marginOfError = 0.01;
    let allCorrect = true;
    const updatedAnswers = [...answers];

    pageAnswers.forEach((answer, index) => {
      const userAnswer = parseFloat(answer || "0");
      const correctAnswer = parseFloat(pageCorrectAnswers[index]);
      
      if (Math.abs(userAnswer - correctAnswer) > marginOfError) {
        updatedAnswers[startIndex + index] = null;
        allCorrect = false;
      }
    });

    setAnswers(updatedAnswers);
    setIsValidated(true);

    if (allCorrect) {
      setFeedbackMessage("Toutes les réponses sont correctes !");
      // Réinitialiser les réponses pour la nouvelle série de questions
      setAnswers(Array(totalQuestions).fill(null));
      // Passer à la série suivante de questions
      if (currentPage < totalQuestions / questionsPerPage - 1) {
        setTimeout(() => {
          setCurrentPage(currentPage + 1);
          setIsValidated(false);
          setFeedbackMessage(null); // Réinitialiser le message de feedback
        }, 1500);
      }
    } else {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez les corriger.");
    }
  };

  const handleNextPage = (): void => {
    if (currentPage < totalQuestions / questionsPerPage - 1) {
      setCurrentPage(currentPage + 1);
      setIsValidated(false);
      setFeedbackMessage(null); // Réinitialiser le message de feedback
    }
  };

  const handlePreviousPage = (): void => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsValidated(false);
      setFeedbackMessage(null); // Réinitialiser le message de feedback
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link href="/menu/apprendre" className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold">
        Apprendre
      </Link>
      <Link href="/secondaire/niveaux/niveau4" 
      className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold">
        Retour
      </Link>

      <div className="absolute top-4 left-4 w-32 h-32">
        <svg className="transform -rotate-90" width="100%" height="100%">
          <circle cx="50%" cy="50%" r={radius} fill="none" stroke="#e5e5e5" strokeWidth={strokeWidth} />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * completionPercentage) / 100}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-blue-500">{completionPercentage}%</span>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">Questions sur le périmètre</h1>

      {/* Feedback */}
      {feedbackMessage && (
        <p
          className={`text-xl mb-4 text-center ${
            feedbackMessage.includes("incorrectes") || feedbackMessage.includes("remplir")
              ? "text-red-500" // Messages d'erreur en rouge
              : "text-green-500" // Messages de succès en vert
          }`}
        >
          {feedbackMessage}
        </p>
      )}

      {/* Affichage des questions */}
      {!isValidated && (
        <>
          <div className="flex flex-col gap-4">
            {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ questionText }, index) => (
              <div key={index} className="flex flex-col items-start gap-2">
                <div className="font-bold text-black">{questionText}</div>
                <input
                   type="text"
                   inputMode="numeric"
                   className="border border-gray-400 p-6 rounded w-96 h-16 text-center text-black text-lg mx-auto"
                   value={answers[currentPage * questionsPerPage + index] || ""}
                   onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-4">
            <button onClick={handleNextPage} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">Suivant</button>
            <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">Valider les réponses</button>
            <button onClick={handlePreviousPage} className="bg-gray-500 text-white py-3 px-6 rounded font-bold">Précédent</button>
          </div>

          {isValidated && !feedbackMessage?.includes("correctes") && (
            <div>
              <p className="text-red-600 font-bold text-xl">Certaines réponses sont incorrectes. Corrigez-les.</p>
              <button className="mt-6 bg-gray-500 text-white py-3 px-8 rounded font-bold" onClick={() => setIsValidated(false)}>
                Revenir pour corriger
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
