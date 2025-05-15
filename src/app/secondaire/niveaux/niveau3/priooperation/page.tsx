"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PrioOperation() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const [questions, setQuestions] = useState<{ questionText: string; correctAnswer: string }[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, (_, index) => {
        let questionText = "", correctAnswer = "";

        // Priorité d'opération - Niveau 1 (index < 10)
        if (index < 10) {
          const questionType = index % 5;
          switch (questionType) {
            case 0:
              questionText = "Que vaut 2 + 3 × 4 ?";
              correctAnswer = (2 + 3 * 4).toString(); // 14
              break;
            case 1:
              questionText = "Que vaut (2 + 3) × 4 ?";
              correctAnswer = ((2 + 3) * 4).toString(); // 20
              break;
            case 2:
              questionText = "Que vaut 2 × 3 + 4 ?";
              correctAnswer = (2 * 3 + 4).toString(); // 10
              break;
            case 3:
              questionText = "Que vaut 6 - 2 × 3 ?";
              correctAnswer = (6 - 2 * 3).toString(); // 0
              break;
            case 4:
              questionText = "Que vaut (6 - 2) × 3 ?";
              correctAnswer = ((6 - 2) * 3).toString(); // 12
              break;
          }
        } else {
          // Questions plus avancées
          if (index < 20) {
            // Sans exposants
            const a = Math.floor(Math.random() * 10) + 1;
            const b = Math.floor(Math.random() * 10) + 1;
            questionText = `Que vaut ${a} + ${b} × 2 ?`;
            correctAnswer = (a + b * 2).toString();
          } else {
            // Avec exposants
            const base = Math.floor(Math.random() * 6) + 2;
            const exponent = Math.floor(Math.random() * 3) + 1;
            questionText = `Que vaut ${base}ⁿ avec n = ${exponent} ?`;
            correctAnswer = Math.pow(base, exponent).toString();

            if (Math.random() > 0.5) {
              const baseAlt = base + Math.floor(Math.random() * 4) + 1;
              questionText = `Que vaut (${base} + ${baseAlt - base})ⁿ avec n = ${exponent} ?`;
              correctAnswer = Math.pow(baseAlt, exponent).toString();
            }
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
    setFeedbackMessage(null);
  };

  // Validation des réponses
  const handleValidation = (): void => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);
    const pageCorrectAnswers = questions.slice(startIndex, endIndex).map((q) => q.correctAnswer);

    const allAnswersFilled = pageAnswers.every((answer) => answer && answer.trim() !== "");

    if (!allAnswersFilled) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    let allCorrect = true;
    const updatedAnswers = [...answers];
    const newIncorrectAnswers: number[] = [];

    pageAnswers.forEach((answer, index) => {
      if (answer !== pageCorrectAnswers[index]) {
        updatedAnswers[startIndex + index] = null;
        allCorrect = false;
        newIncorrectAnswers.push(startIndex + index);
      }
    });

    setAnswers(updatedAnswers);
    setIncorrectAnswers(newIncorrectAnswers);

    if (allCorrect) {
      const nextPage = currentPage + 1;
      if (nextPage < totalQuestions / questionsPerPage) {
        setCurrentPage(nextPage);
        setFeedbackMessage("Toutes les réponses sont correctes !");
      } else {
        setAnswers(Array(totalQuestions).fill(null));
        setIncorrectAnswers([]);
        setFeedbackMessage(" Félicitations ! Vous avez complété toutes les questions !");
      }
    } else {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez réessayer.");
    }
  };

  const handleNextPage = (): void => {
    if (currentPage < totalQuestions / questionsPerPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = (): void => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link href="/menu/apprendre" className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold">
        Apprendre
      </Link>
      <Link href="/secondaire/niveaux/niveau3" className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold">
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

      <h1 className="text-3xl font-bold mb-6">Priorités des Opérations</h1>

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

      <div className="grid grid-cols-3 gap-6">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map((question, index) => {
          const questionIndex = currentPage * questionsPerPage + index;
          return (
            <div key={questionIndex} className="flex items-center gap-4">
              <button className="bg-blue-500 text-white font-bold py-4 px-6 rounded w-full" disabled>{question.questionText}</button>
              <input
                type="text"
                className={`border p-4 rounded w-32 text-center text-lg ${incorrectAnswers.includes(questionIndex) ? "border-red-500" : ""}`}
                value={answers[questionIndex] || ""}
                onChange={(e) => handleChange(questionIndex, e.target.value)}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex gap-4">
        <button onClick={handlePreviousPage} className="bg-gray-500 text-white py-3 px-6 rounded font-bold">Précédent</button>
        <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">Valider les réponses</button>
        <button onClick={handleNextPage} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">Suivant</button>
      </div>
    </div>
  );
}
