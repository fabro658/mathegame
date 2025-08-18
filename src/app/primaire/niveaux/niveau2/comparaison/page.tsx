'use client';

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

type Question = {
  type: "compare";
  numbers: [number, number];
  correctAnswer: string;
};

export default function ComparerEntiers() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<string[]>(Array(totalQuestions).fill(""));
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const generateQuestions = (): Question[] => {
    return Array.from({ length: totalQuestions }, () => {
      const number1 = Math.floor(Math.random() * 100) + 1;
      const number2 = Math.floor(Math.random() * 100) + 1;
      const correctAnswer = number1 > number2 ? ">" : number1 < number2 ? "<" : "=";
      return { type: "compare", numbers: [number1, number2], correctAnswer };
    });
  };

  useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
    setFeedbackMessage("");
  };

  const handleValidation = (): void => {
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
      if (questions[globalIndex] && answer !== questions[globalIndex].correctAnswer) {
        newAnswers[globalIndex] = "";
        hasErrors = true;
      }
    });

    setAnswers(newAnswers);

    if (hasErrors) {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez corriger les erreurs.");
    } else if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setFeedbackMessage("Toutes les réponses de cette page sont correctes. Vous pouvez continuer.");
      setCurrentPage(currentPage + 1);
    } else {
      setFeedbackMessage("Bravo ! Vous avez terminé toutes les questions.");
    }
  };

  const handleNextPage = (): void => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = (): void => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const answeredCount = answers.filter((answer) => answer !== "").length;
  const completionPercentage = Math.round((answeredCount / totalQuestions) * 100);

  // ⭐️ Générer les étoiles une seule fois
  const stars = useMemo(() => {
    return Array.from({ length: 120 }).map((_, i) => {
      const size = Math.random() < 0.5 ? 2 : 3;
      const color = Math.random() < 0.5 ? "white" : "yellow";
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      return { id: i, size, color, top, left };
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white relative overflow-hidden font-fredoka bg-gradient-to-t from-[#770c75] to-[#090536]">

      {/* 🌟 Fond étoilé - statique */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map(({ id, size, color, top, left }) => (
          <div
            key={id}
            className="absolute rounded-full"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              opacity: 0.8,
            }}
          />
        ))}
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="z-10 w-full max-w-4xl px-6 py-12">
        <Link
          href="/menu/apprendre"
          className="absolute bottom-4 left-4 z-20 bg-black text-white py-3 px-8 rounded font-bold"
        >
          Apprendre
        </Link>
        <Link
          href="/primaire/niveaux/niveau2"
          className="absolute top-4 right-4 z-20 bg-orange-500 text-white py-3 px-8 rounded font-bold"
        >
          Retour
        </Link>

        {/* Progression */}
        <div className="absolute top-4 left-4 w-32 h-32 z-20">
          <svg className="transform -rotate-90" width="100%" height="100%">
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="none"
              stroke="#e5e5e5"
              strokeWidth={strokeWidth}
            />
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

        <h1 className="text-4xl font-bold mb-6 text-center">Comparaison</h1>

        {feedbackMessage && (
          <p
            className={`text-xl mb-4 text-center ${
              feedbackMessage.includes("remplir") || feedbackMessage.includes("incorrectes")
                ? "text-red-400"
                : "text-green-400"
            }`}
          >
            {feedbackMessage}
          </p>
        )}

        {/* Questions */}
        <div className="grid grid-cols-2 gap-3">
          {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ numbers }, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">
                {numbers[0]} ? {numbers[1]}
              </div>
              <select
                value={answers[currentPage * questionsPerPage + index] || ""}
                onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
                className="py-2 px-4 rounded border-gray-300 text-black"
              >
                <option value="" disabled>Choisissez</option>
                <option value="<">&lt;</option>
                <option value=">">&gt;</option>
                <option value="=">=</option>
              </select>
            </div>
          ))}
        </div>

        {/* Boutons */}
        <div className="mt-6 flex gap-4 justify-center">
          <button onClick={handlePreviousPage} className="bg-gray-500 text-white py-3 px-6 rounded font-bold">Précédent</button>
          <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">Valider</button>
          <button onClick={handleNextPage} className="bg-gray-500 text-white py-3 px-6 rounded font-bold">Suivant</button>
        </div>
      </div>
    </div>
  );
}
