"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface FractionCircleProps {
  numerator: number;
  denominator: number;
  fillColor: string;
  position: { x: number; y: number };
}

const FractionCircle = ({ numerator, denominator, fillColor, position }: FractionCircleProps) => {
  const radius = 70;
  const slices = [];

  for (let i = 0; i < denominator; i++) {
    const startAngle = (2 * Math.PI * i) / denominator;
    const endAngle = (2 * Math.PI * (i + 1)) / denominator;
    const x1 = radius * Math.cos(startAngle);
    const y1 = radius * Math.sin(startAngle);
    const x2 = radius * Math.cos(endAngle);
    const y2 = radius * Math.sin(endAngle);
    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    const d = `
      M0,0
      L${x1},${y1}
      A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2}
      Z
    `;

    slices.push(
      <path
        key={i}
        d={d}
        fill={i < numerator ? fillColor : "#eee"}
        stroke="black"
        strokeWidth="1"
      />
    );
  }

  return (
    <g transform={`translate(${position.x},${position.y})`}>
      {slices}
      <circle r={radius} fill="none" stroke="black" strokeWidth="2" />
    </g>
  );
};

export default function FractionIdentification() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const [denominators, setDenominators] = useState<number[]>([]);
  const [answers, setAnswers] = useState<string[]>(Array(totalQuestions).fill(""));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);

  useEffect(() => {
    const generateDenominators = () => {
      const values = [2, 3, 4, 5];
      const generated = Array.from({ length: totalQuestions }, () => values[Math.floor(Math.random() * values.length)]);
      setDenominators(generated);
    };
    generateDenominators();
  }, []);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    setFeedbackMessage(null);
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);
    const incorrect: number[] = [];
    let hasError = false;

    for (let i = 0; i < questionsPerPage; i++) {
      const globalIndex = startIndex + i;
      const expected = `1/${denominators[globalIndex]}`;
      if (pageAnswers[i].trim() !== expected) {
        incorrect.push(globalIndex);
        hasError = true;
      }
    }

    const newAnswers = [...answers];
    incorrect.forEach(i => newAnswers[i] = "");
    setAnswers(newAnswers);
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

  const completedAnswers = answers.filter((a) => a !== "").length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  return (
  <div className="flex flex-col items-center justify-center min-h-screen text-black relative overflow-hidden font-fredoka bg-gradient-to-b from-[#f8e9b8] to-[#eddca3]">
          {/* Bande de sable */}
      <div className="sable"></div>

      {/* Plantes sur la bande de sable */}
      <div className="plant">
          <div className="leaves plant-2"></div>
        </div>
        <div className="plant">
          <div className="leaves plant-3"></div>
        </div>

       <Link href="/menu/apprendre/fraction"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link href="/primaire/niveaux/niveau3"
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

      <h1 className="text-4xl font-bold mb-6">Complète la fraction</h1>

      {feedbackMessage && (
        <p className={`text-xl mb-4 ${feedbackMessage.includes("incorrect") ? "text-red-500" : "text-green-500"} text-center`}>
          {feedbackMessage}
        </p>
      )}

<div className="grid grid-cols-3 gap-10 items-center">
  {denominators
    .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
    .map((den, index) => {
      const questionIndex = currentPage * questionsPerPage + index;
      return (
        <div key={questionIndex} className="flex flex-col items-center gap-4">
          <svg width="180" height="180">
            <FractionCircle numerator={1} denominator={den} fillColor="#9f0" position={{ x: 90, y: 90 }} />
          </svg>
          <input
            type="text"
            className={`border border-gray-400 p-2 rounded w-24 text-center text-lg ${
              incorrectAnswers.includes(questionIndex) ? "border-red-500" : ""
            }`}
            value={answers[questionIndex] || ""}
            onChange={(e) => handleChange(questionIndex, e.target.value)}
            placeholder="1/n"
          />
        </div>
      );
    })}
</div>


      <div className="mt-6 flex gap-4">
        <button onClick={handleNextPage} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">Suivant</button>
        <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">Valider</button>
        <button onClick={handlePreviousPage} className="bg-gray-500 text-white py-3 px-6 rounded font-bold">Précédent</button>
      </div>
    </div>
  );
}
