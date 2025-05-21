"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

export default function FractionReduction() {
  const totalQuestions = 36;
  const questionsPerPage = 6;

  const [questions, setQuestions] = useState<
    { original: string; correctAnswer: string }[]
  >([]);
  const [answers, setAnswers] = useState<string[]>(Array(totalQuestions).fill(""));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isValidated, setIsValidated] = useState(false);

  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const completedAnswers = answers.filter((a) => a.trim() !== "").length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  const simplifyFraction = (numerator: number, denominator: number): string => {
    if (denominator === 0) return `${numerator}/0`;
    if (numerator === 0) return "0";

    const div = gcd(numerator, denominator);
    const num = numerator / div;
    const den = denominator / div;

    return den === 1 ? `${num}` : `${num}/${den}`;
  };

  useEffect(() => {
    const generateQuestions = () =>
      Array.from({ length: totalQuestions }, () => {
        const num = Math.floor(Math.random() * 8) + 2;
        const den = Math.floor(Math.random() * 8) + 2;
        const mult = Math.floor(Math.random() * 4) + 2;

        const originalNum = num * mult;
        const originalDen = den * mult;

        return {
          original: `${originalNum}/${originalDen}`,
          correctAnswer: simplifyFraction(originalNum, originalDen),
        };
      });

    setQuestions(generateQuestions());
  }, []);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
    setFeedbackMessage("");
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes("")) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    let hasErrors = false;
    const newAnswers = [...answers];

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      const { correctAnswer } = questions[globalIndex];

      if (normalizeAnswer(answer) !== normalizeAnswer(correctAnswer)) {
        newAnswers[globalIndex] = "";
        hasErrors = true;
      }
    });

    setAnswers(newAnswers);

    if (hasErrors) {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez corriger les erreurs.");
    } else {
      if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
        setFeedbackMessage("Toutes les réponses de cette page sont correctes. Vous pouvez continuer.");
        setCurrentPage(currentPage + 1);
      } else {
        setIsValidated(true);
        setFeedbackMessage("Bravo ! Vous avez terminé toutes les questions.");
      }
    }
  };

  const normalizeAnswer = (answer: string): string => {
    answer = answer.replace(/\s+/g, "").toLowerCase();
    if (/^\d+$/.test(answer)) {
      return `${answer}/1`;
    }
    return answer;
  };

  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link
        href="/menu/apprendre/fraction"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/secondaire/niveaux/niveau2"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
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

      <h1 className="text-3xl font-bold mb-6">Fractions réduites</h1>

      {feedbackMessage && (
        <p
          className={`text-xl mb-4 ${
            feedbackMessage.includes("remplir") || feedbackMessage.includes("incorrectes")
              ? "text-red-500"
              : "text-green-500"
          } text-center`}
        >
          {feedbackMessage}
        </p>
      )}

      {!isValidated && (
        <>
          <div className="grid grid-cols-2 gap-8">
            {questions
              .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
              .map(({ original }, index) => (
                <div key={index} className="flex flex-col items-start gap-2">
                  <div className="font-bold text-black text-xl">
                    {original}
                  </div>
                  <input
                    type="text"
                    value={answers[currentPage * questionsPerPage + index] || ""}
                    onChange={(e) =>
                      handleChange(currentPage * questionsPerPage + index, e.target.value)
                    }
                    className="border border-gray-300 p-2 rounded w-32"
                  />
                </div>
              ))}
          </div>

          <div className="mt-6 flex gap-4">
        <button onClick={handleNextPage} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">Suivant</button>
        <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">Valider les réponses</button>
        <button onClick={handlePreviousPage} className="bg-gray-500 text-white py-3 px-6 rounded font-bold">Précédent</button>
      </div>
        </>
      )}
    </div>
  );
}
