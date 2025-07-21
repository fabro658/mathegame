"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CubeIllustration = ({ side }: { side: number }) => (
  <svg width="120" height="120">
    <rect x="20" y="20" width="60" height="60" fill="#cce5ff" stroke="black" />
    <text x="50" y="15" textAnchor="middle" fontSize="12">{side} cm</text>
    <text x="90" y="50" fontSize="12" transform="rotate(90 90,50)">{side} cm</text>
  </svg>
);

const PavéIllustration = ({ l, L, h }: { l: number; L: number; h: number }) => (
  <svg width="200" height="120">
    <rect x="40" y="40" width="100" height="60" fill="#ccf2d6" stroke="black" />
    <text x="90" y="30" textAnchor="middle" fontSize="12">{L} cm</text>
    <text x="30" y="70" textAnchor="middle" fontSize="12" transform="rotate(-90 30,70)">{l} cm</text>
    <text x="90" y="115" fontSize="12">h = {h} cm</text>
  </svg>
);

const CylindreIllustration = ({ r, h }: { r: number; h: number }) => (
  <svg width="120" height="150">
    <ellipse cx="60" cy="40" rx={r * 3} ry="10" fill="#ffe0b3" stroke="black" />
    <rect x={60 - r * 3} y="40" width={r * 6} height="80" fill="none" stroke="black" />
    <text x="60" y="25" textAnchor="middle" fontSize="12">r = {r} cm</text>
    <text x="60" y="135" textAnchor="middle" fontSize="12">h = {h} cm</text>
  </svg>
);

// (ajoute de la même façon les illustrations : PrismeTriangulaireIllustration, PyramideIllustration, ConeIllustration…)

export default function Volume() {
  const totalQuestions = 30;
  const questionsPerPage = 2;
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [questions, setQuestions] = useState<{ questionText: string; correctAnswer: string; svg: React.ReactNode }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const randomFloat = (min: number, max: number, decimals: number = 1) =>
    parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

  const generateQuestions = () =>
    Array.from({ length: totalQuestions }, () => {
      const shapeType = Math.floor(Math.random() * 3); // limité à 3 formes pour commencer (ajustable)
      let questionText = "";
      let correctAnswer = 0;
      let svg: React.ReactNode = null;

      if (shapeType === 0) {
        const side = randomFloat(2, 10);
        questionText = `Calcule le volume d'un cube dont le côté mesure ${side} cm.`;
        correctAnswer = side ** 3;
        svg = <CubeIllustration side={side} />;
      } else if (shapeType === 1) {
        const length = randomFloat(5, 15);
        const width = randomFloat(3, 10);
        const height = randomFloat(2, 10);
        questionText = `Un pavé droit mesure ${length} cm de long, ${width} cm de large et ${height} cm de haut.`;
        correctAnswer = length * width * height;
        svg = <PavéIllustration L={length} l={width} h={height} />;
      } else {
        const radius = randomFloat(2, 5);
        const height = randomFloat(5, 12);
        questionText = `Calcule le volume d'un cylindre de rayon ${radius} cm et de hauteur ${height} cm.`;
        correctAnswer = 3.14 * radius ** 2 * height;
        svg = <CylindreIllustration r={radius} h={height} />;
      }

      return {
        questionText,
        correctAnswer: correctAnswer.toFixed(2),
        svg,
      };
    });

  useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  const completionPercentage = Math.round(
    (answers.filter((a) => a !== null && a !== "").length / totalQuestions) * 100
  );

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim() !== "" ? value : null;
    setAnswers(newAnswers);
    setFeedbackMessage(null);
  };

  const handleValidation = () => {
    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;
    const pageAnswers = answers.slice(start, end);
    const corrects = questions.slice(start, end).map((q) => parseFloat(q.correctAnswer));
    const updated = [...answers];

    let allCorrect = true;
    pageAnswers.forEach((answer, i) => {
      if (parseFloat(answer || "0").toFixed(2) !== corrects[i].toFixed(2)) {
        updated[start + i] = null;
        allCorrect = false;
      }
    });

    setAnswers(updated);
    setFeedbackMessage(
      allCorrect
        ? currentPage < totalQuestions / questionsPerPage - 1
          ? "Toutes les réponses sont correctes !"
          : "Bravo ! Vous avez terminé toutes les questions."
        : "Certaines réponses sont incorrectes."
    );

    if (allCorrect && currentPage < totalQuestions / questionsPerPage - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      setFeedbackMessage(null);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalQuestions / questionsPerPage - 1) {
      setCurrentPage((prev) => prev + 1);
      setFeedbackMessage(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black relative px-4 py-8">
      <Link href="/menu/apprendre" className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold">
        Apprendre
      </Link>
      <Link href="/secondaire/niveaux/niveau4" className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold">
        Retour
      </Link>

      {/* Progression */}
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

      <h1 className="text-3xl font-bold mb-6">Volume – Formes 3D illustrées</h1>

      {feedbackMessage && (
        <p className={`text-xl mb-4 text-center ${feedbackMessage.includes("incorrectes") ? "text-red-500" : "text-green-600"}`}>
          {feedbackMessage}
        </p>
      )}

      {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map((q, i) => {
        const index = currentPage * questionsPerPage + i;
        return (
          <div key={index} className="mb-8 w-full max-w-lg bg-gray-100 p-4 rounded shadow">
            <div className="flex justify-center mb-4">{q.svg}</div>
            <p className="text-lg font-semibold mb-2">{q.questionText}</p>
            <input
              type="text"
              value={answers[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              className="border p-2 w-full rounded"
              placeholder="Réponse en cm³"
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
        <button onClick={handleNextPage} className="bg-blue-500 text-white py-3 px-6 rounded font-bold" disabled={currentPage >= Math.floor(totalQuestions / questionsPerPage) - 1}>
          Suivant
        </button>
      </div>
    </div>
  );
}
