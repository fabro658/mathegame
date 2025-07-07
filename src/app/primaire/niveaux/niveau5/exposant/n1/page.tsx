"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Niveau1() {
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
    const superscriptMap = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];

    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, () => {
        const base = Math.floor(Math.random() * 11);      // 0 à 10 inclus
        const exponent = Math.floor(Math.random() * 4);   // 0 à 3 inclus        
        const exponentStr = exponent.toString().split("").map(d => superscriptMap[parseInt(d)]).join("");
        const questionText = `Que vaut ${base}${exponentStr} ?`;
        const correctAnswer = Math.pow(base, exponent).toString();
        return { questionText, correctAnswer };
      });
    };

    setQuestions(generateQuestions());
  }, []);

  const handleChange = (index: number, value: string): void => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
    setFeedbackMessage(null);
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null)) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    let hasError = false;
    const updatedAnswers = [...answers];
    const incorrect: number[] = [];

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      if (answer !== questions[globalIndex].correctAnswer) {
        updatedAnswers[globalIndex] = null;
        incorrect.push(globalIndex);
        hasError = true;
      }
    });

    setAnswers(updatedAnswers);
    setIncorrectAnswers(incorrect);

    if (hasError) {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez les corriger.");
    } else if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setFeedbackMessage("Toutes les réponses de cette page sont correctes!");
      setCurrentPage(currentPage + 1);
    } else {
      setFeedbackMessage("Bravo ! Vous avez terminé toutes les questions.");
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
      setFeedbackMessage(null);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setFeedbackMessage(null);
    }
  };

  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white relative overflow-hidden bg-[#081c34] font-fredoka">
      <Link href="/menu/apprendre" className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold">
        Apprendre
      </Link>
      <Link href="/primaire/niveaux/niveau5" className="absolute top-4 right-4 bg-red-500 text-white py-3 px-8 rounded font-bold">
        Retour
      </Link>

      <div className="absolute top-4 left-4 w-32 h-32 sm:block hidden">
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

      <h1 className="text-3xl font-bold mb-6">Niveau 1</h1>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ questionText }, idx) => {
          const questionIndex = currentPage * questionsPerPage + idx;
          return (
            <div key={questionIndex} className="flex items-center gap-4">
              <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">
                {questionText}
              </div>
              <input
                type="text"
                inputMode="numeric"
                className={`border border-gray-400 p-4 rounded w-32 text-center text-black text-lg ${
                  incorrectAnswers.includes(questionIndex) ? "border-red-500" : ""
                }`}
                value={answers[questionIndex] || ""}
                onChange={(e) => handleChange(questionIndex, e.target.value)}
              />
            </div>
          );
        })}
      </div>

      {/* Flocons */}
      <div className="snowflakes">
        {Array.from({ length: 40 }).map((_, i) => {
          const snowflakeStyle = {
            left: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 5}s`,
            animationDelay: `${Math.random() * 5}s`,
            width: `${4 + Math.random() * 4}px`,
            height: `${4 + Math.random() * 4}px`,
          } as React.CSSProperties;

          return (
            <div
              key={i}
              className="snowflake"
              style={snowflakeStyle}
            />
          );
        })}
      </div>

      {/* Scène */}
      <div className="scene">
        {/* Neige */}
        <div className="neige-wave">
          <div className="neige-top-layer"></div>
          <div className="neige-bottom-layer"></div>
        </div>
      </div>

      {/* Boutons navigation */}
      <div className="mt-6 flex gap-4">
        <button onClick={handlePreviousPage} className="bg-green-500 text-white py-3 px-6 rounded font-bold">Précédent</button>
        <button onClick={handleValidation} className="bg-green-500 text-white py-3 px-6 rounded font-bold">Valider les réponses</button>
        <button onClick={handleNextPage} className="bg-green-500 text-white py-3 px-6 rounded font-bold">Suivant</button>
      </div>
    </div>
  );
}
