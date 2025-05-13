"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Perimetre() {
  const totalQuestions = 30;
  const questionsPerPage = 3;
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [questions, setQuestions] = useState<{ questionText: string; correctAnswer: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const generateQuestionsSecondaire = () => {
    return Array.from({ length: totalQuestions }, () => {
      const shapeType = Math.floor(Math.random() * 5);
      let questionText = "";
      let correctAnswer = 0;
  
      const randomFloat = (min: number, max: number, decimals: number = 1) => {
        return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
      };
  
      if (shapeType === 0) {
        // Carré : périmètre = 4 × côté
        const side = randomFloat(5, 20);
        questionText = `Calcule le périmètre d'un carré dont le côté mesure ${side} cm.`;
        correctAnswer = 4 * side;
      } else if (shapeType === 1) {
        // Rectangle : périmètre = 2 × (L + l)
        const length = randomFloat(10, 30);
        const width = randomFloat(5, 15);
        questionText = `Un rectangle mesure ${length} cm de long et ${width} cm de large. Quel est son périmètre ?`;
        correctAnswer = 2 * (length + width);
      } else if (shapeType === 2) {
        // Triangle : périmètre = a + b + c
        const side1 = randomFloat(5, 25);
        const side2 = randomFloat(5, 25);
        const side3 = randomFloat(5, 25);
        questionText = `Un triangle a des côtés de ${side1} cm, ${side2} cm et ${side3} cm. Détermine son périmètre.`;
        correctAnswer = side1 + side2 + side3;
      } else if (shapeType === 3) {
        // Losange : périmètre = 4 × côté
        const side = randomFloat(6, 18);
        questionText = `Quel est le périmètre d'un losange dont chaque côté mesure ${side} cm ?`;
        correctAnswer = 4 * side;
      } else {
        // Trapèze : périmètre = somme des 4 côtés
        const side1 = randomFloat(5, 20);
        const side2 = randomFloat(5, 20);
        const side3 = randomFloat(5, 20);
        const side4 = randomFloat(5, 20);
        questionText = `Un trapèze a des côtés mesurant ${side1} cm, ${side2} cm, ${side3} cm et ${side4} cm. Calcule son périmètre.`;
        correctAnswer = side1 + side2 + side3 + side4;
      }
  
      return {
        questionText,
        correctAnswer: correctAnswer.toFixed(2),
      };
    });
  };  

  // Générer les questions dès le chargement
  useEffect(() => {
    setQuestions(generateQuestionsSecondaire());
  }, []);

  const completionPercentage = Math.round(
    (answers.filter((answer) => answer !== null && answer !== "").length / totalQuestions) * 100
  );

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim() !== "" ? value : null;
    setAnswers(newAnswers);
    setFeedbackMessage(null);
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.some((answer) => answer === null || answer === "")) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    const pageCorrectAnswers = questions.slice(startIndex, endIndex).map((q) => parseFloat(q.correctAnswer));
    const updatedAnswers = [...answers];

    let allCorrect = true;
    pageAnswers.forEach((answer, index) => {
      if (parseFloat(answer || "0") !== pageCorrectAnswers[index]) {
        updatedAnswers[startIndex + index] = null;
        allCorrect = false;
      }
    });

    setAnswers(updatedAnswers);

    if (allCorrect) {
      if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
        setFeedbackMessage("Toutes les réponses de cette page sont correctes !");
        setCurrentPage(currentPage + 1);
      } else {
        setFeedbackMessage("Bravo ! Vous avez terminé toutes les questions.");
      }
    } else {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez les corriger.");
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setFeedbackMessage(null);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
      setFeedbackMessage(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link href="/menu/apprendre" className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold">
        Apprendre
      </Link>
      <Link href="/primaire/niveaux/niveau4" className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold">
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
          className={`text-xl mb-4 text-center ${
            /incorrectes|remplir toutes les réponses/i.test(feedbackMessage) ? "text-red-500" : "text-green-500"
          }`}
        >
          {feedbackMessage}
        </p>
      )}

      {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map((q, index) => {
        const globalIndex = currentPage * questionsPerPage + index;
        return (
          <div key={globalIndex} className="mb-4 w-full max-w-md">
            <p className="text-lg font-medium">{q.questionText}</p>
            <input
              type="text"
              value={answers[globalIndex] || ""}
              onChange={(e) => handleChange(globalIndex, e.target.value)}
              className="border p-2 w-full mt-2"
            />
          </div>
        );
      })}

      <div className="mt-6 flex gap-4">
        <button onClick={handlePreviousPage} className="bg-gray-500 text-white py-3 px-6 rounded font-bold" disabled={currentPage === 0}>
          Précédent
        </button>
        <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">
          Valider
        </button>
        <button onClick={handleNextPage} className="bg-blue-500 text-white py-3 px-6 rounded font-bold" disabled={currentPage === Math.floor(totalQuestions / questionsPerPage) - 1}>
          Suivant
        </button>
      </div>
    </div>
  );
}
