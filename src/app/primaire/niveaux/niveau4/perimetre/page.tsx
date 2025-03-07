"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Addition() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const [questions, setQuestions] = useState<{ questionText: string; correctAnswer: string }[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]); // Pour garder une trace des questions incorrectes

  useEffect(() => {
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

    setQuestions(generateQuestions());
  }, []);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseInt(value);
    newAnswers[index] = isNaN(parsedValue) ? null : parsedValue;
    setAnswers(newAnswers);
    setFeedbackMessage(null); // Réinitialiser les messages de feedback
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null)) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    const pageCorrectAnswers = questions
      .slice(startIndex, endIndex)
      .map((q) => parseFloat(q.correctAnswer)); // Extraire les bonnes réponses

    const marginOfError = 0.01;
    let allCorrect = true;
    const incorrect: number[] = []; // Stocker les indices des réponses incorrectes

    pageAnswers.forEach((answer, index) => {
      const userAnswer = answer !== null ? parseFloat(answer.toString()) : NaN; // Convertir en nombre
      const correctAnswer = pageCorrectAnswers[index];

      if (isNaN(userAnswer) {
        incorrect.push(startIndex + index); // Ajouter l'indice de la réponse invalide
        allCorrect = false;
      } else if (Math.abs(userAnswer - correctAnswer) > marginOfError) {
        incorrect.push(startIndex + index); // Ajouter l'indice de la réponse incorrecte
        allCorrect = false;
      }
    });
  

    setIncorrectAnswers(incorrect); // Mettre à jour les réponses incorrectes

    if (allCorrect) {
      setFeedbackMessage("Toutes les réponses sont correctes !");
      if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
        setTimeout(() => {
          setCurrentPage(currentPage + 1);
          setFeedbackMessage(null); // Réinitialiser le message de feedback
        }, 1500);
      } else {
        setFeedbackMessage("Bravo ! Vous avez terminé toutes les questions.");
      }
    } else {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez les corriger.");
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
      setFeedbackMessage(null); // Réinitialiser le message de feedback
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setFeedbackMessage(null); // Réinitialiser le message de feedback
    }
  };

  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link href="/menu/apprendre" className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold">
        Apprendre
      </Link>
      <Link href="/primaire/niveaux/niveau4" 
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

      {feedbackMessage && (
        <p
          className={`text-xl mb-4 ${
            feedbackMessage.includes("remplir toutes les réponses") || feedbackMessage.includes("incorrectes")
              ? "text-red-500"
              : "text-green-500"
          } text-center`}
        >
          {feedbackMessage}
        </p>
      )}

      {/* Affichage des questions */}
      {!feedbackMessage?.includes("correctes") && (
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
            <button
              onClick={handlePreviousPage}
              className="bg-gray-500 text-white py-3 px-6 rounded font-bold"
              disabled={currentPage === 0}
            >
              Précédent
            </button>
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-3 px-6 rounded font-bold"
            >
              Valider les réponses
            </button>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white py-3 px-6 rounded font-bold"
              disabled={currentPage === Math.floor(totalQuestions / questionsPerPage) - 1}
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  );
}