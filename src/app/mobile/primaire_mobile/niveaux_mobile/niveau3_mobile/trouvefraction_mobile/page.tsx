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

  const [denominators, setDenominators] = useState<number[]>([]);
  const [answers, setAnswers] = useState<string[]>(Array(totalQuestions).fill(""));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);

  useEffect(() => {
    const values = [2, 3, 4, 5];
    const generated = Array.from({ length: totalQuestions }, () =>
      values[Math.floor(Math.random() * values.length)]
    );
    setDenominators(generated);
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

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 text-black px-4 pt-20 pb-10 w-full overflow-y-auto">
      {/* Navigation en haut */}
      <div className="fixed top-4 w-full px-4 flex justify-between z-10">
        <Link
          href="/menu/apprendre"
          className="bg-black text-white py-3 px-8 rounded font-bold"
        >
          Menu
        </Link>
        <Link
          href="/mobile/primaire_mobile/niveaux_mobile/niveau3_mobile"
          className="bg-orange-500 text-white py-3 px-8 rounded font-bold"
        >
          Retour
        </Link>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Complète la fraction</h1>

      {feedbackMessage && (
        <p className={`text-center text-lg sm:text-xl mb-4 ${feedbackMessage.includes("incorrect") ? "text-red-500" : "text-green-600"}`}>
          {feedbackMessage}
        </p>
      )}

      {/* Questions */}
      <div className="flex flex-col items-center min-h-screen bg-gray-100 text-black py-6 px-4">
        {denominators
          .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
          .map((den, index) => {
            const questionIndex = currentPage * questionsPerPage + index;
            return (
              <div key={questionIndex} className="flex flex-col items-center gap-2 w-full">
                <svg width="140" height="140" viewBox="0 0 160 160" className="w-full max-w-[140px] h-auto">
                  <FractionCircle numerator={1} denominator={den} fillColor="#9f0" position={{ x: 80, y: 80 }} />
                </svg>
                <input
                  type="text"
                  className={`border border-gray-400 p-2 rounded w-full max-w-[120px] text-center text-base sm:text-lg ${
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

      {/* Bouton Valider */}
      <div className="mt-10 w-full flex justify-center px-4 pb-10">
        <button
          onClick={handleValidation}
          className="bg-blue-600 text-white py-4 px-10 rounded font-bold w-full max-w-sm text-xl"
        >
          Valider les réponses
        </button>
      </div>
    </div>
  );
}
