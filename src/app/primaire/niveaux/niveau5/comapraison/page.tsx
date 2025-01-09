"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Comparaison() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [questions, setQuestions] = useState<{ fraction1: string; fraction2: string; correctAnswer: string }[]>([]);
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const simplifyFraction = (numerator: number, denominator: number) => {
    const gcd = (a: number, b: number): number => {
      while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
      }
      return a;
    };

    const gcdValue = gcd(numerator, denominator);
    return [numerator / gcdValue, denominator / gcdValue];
  };

  const generateQuestions = () => {
    return Array.from({ length: totalQuestions }, (_, index) => {
      let fraction1, fraction2, correctAnswer;

      if (index < 10) {
        const number1 = Math.floor(Math.random() * 10) + 1;
        const number2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = number1 < number2 ? "<" : number1 > number2 ? ">" : "=";

        return {
          fraction1: `${number1}`,
          fraction2: `${number2}`,
          correctAnswer,
        };
      } else if (index < 20) {
        const sign1 = Math.random() < 0.5 ? -1 : 1;
        const sign2 = Math.random() < 0.5 ? -1 : 1;
        const number1 = sign1 * (Math.floor(Math.random() * 10) + 1);
        const number2 = sign2 * (Math.floor(Math.random() * 10) + 1);
        correctAnswer = number1 < number2 ? "<" : number1 > number2 ? ">" : "=";

        return {
          fraction1: `${number1}`,
          fraction2: `${number2}`,
          correctAnswer,
        };
      } else {
        const a1 = Math.floor(Math.random() * 9) + 1;
        const b1 = Math.floor(Math.random() * 9) + 1;
        const a2 = Math.floor(Math.random() * 9) + 1;
        const b2 = Math.floor(Math.random() * 9) + 1;

        const commonDenominator = b1 * b2;
        const numerator1 = a1 * b2;
        const numerator2 = a2 * b1;

        const simplifiedNum1 = simplifyFraction(numerator1, commonDenominator);
        const simplifiedNum2 = simplifyFraction(numerator2, commonDenominator);

        let result: string;
        if (simplifiedNum1[0] / simplifiedNum1[1] < simplifiedNum2[0] / simplifiedNum2[1]) {
          result = "<";
        } else if (simplifiedNum1[0] / simplifiedNum1[1] > simplifiedNum2[0] / simplifiedNum2[1]) {
          result = ">";
        } else {
          result = "=";
        }

        return {
          fraction1: `${a1}/${b1}`,
          fraction2: `${a2}/${b2}`,
          correctAnswer: result,
        };
      }
    });
  };

  useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null) || pageAnswers.some((answer) => answer === "")) {
      alert("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    const newAnswers = [...answers];
    let allCorrect = true;

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      if (answer !== questions[globalIndex]?.correctAnswer) {
        allCorrect = false;
        newAnswers[globalIndex] = null;
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);
    setHasPassed(allCorrect);
  };

  const handleNextPage = () => {
    if (currentPage < totalQuestions / questionsPerPage - 1) {
      setCurrentPage(currentPage + 1);
      setIsValidated(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsValidated(false);
    }
  };

  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link
        href="/menu/apprendre"
        className="absolute bottom-4 left-4 bg-black text-white py-2 px-6 rounded-lg font-bold shadow-lg hover:bg-gray-800 transition"
      >
        Apprendre
      </Link>
      <Link
        href="/primaire/niveaux/niveau3"
        className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded-lg font-bold shadow-lg hover:bg-orange-600 transition"
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

      <h1 className="text-4xl font-bold mb-8 text-center">Comparer les Fractions</h1>

      {!isValidated && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {questions
              .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
              .map(({ fraction1, fraction2 }, index) => (
                <div key={index} className="flex items-center gap-6">
                  <button className="bg-blue-500 text-white font-bold py-4 px-8 rounded-lg w-full shadow-md hover:bg-blue-600 transition" disabled>
                    {fraction1} et {fraction2}
                  </button>
                  <select
                    className="border border-gray-400 p-4 rounded-lg w-32 text-center text-black text-lg focus:ring focus:ring-blue-500"
                    value={answers[currentPage * questionsPerPage + index] || ""}
                    onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
                  >
                    <option value="">Choisir</option>
                    <option value="<">&lt;</option>
                    <option value=">">&gt;</option>
                    <option value="=">=</option>
                  </select>
                </div>
              ))}
          </div>
          <div className="flex gap-6 mt-8">
            <button
              onClick={handlePreviousPage}
              className="bg-gray-500 text-white py-3 px-8 rounded-lg font-bold shadow-md hover:bg-gray-600 transition"
              disabled={currentPage === 0}
            >
              Précédent
            </button>
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-3 px-8 rounded-lg font-bold shadow-md hover:bg-blue-600 transition"
            >
              Valider les réponses
            </button>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white py-3 px-8 rounded-lg font-bold shadow-md hover:bg-blue-600 transition"
              disabled={currentPage === totalQuestions / questionsPerPage - 1}
            >
              Suivant
            </button>
          </div>
        </>
      )}

      {isValidated && (
        <>
          {hasPassed ? (
            <div className="text-center">
              <p className="text-green-600 font-bold text-2xl">Bravo ! Toutes vos réponses sont correctes.</p>
              <button
                className="mt-8 bg-blue-500 text-white py-3 px-8 rounded-lg font-bold shadow-md hover:bg-blue-600 transition"
                onClick={() => alert("Vous avez complété toutes les questions !")}
              >
                Terminer
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-red-600 font-bold text-2xl">Certaines réponses sont incorrectes. Corrigez-les et réessayez.</p>
              <button
                onClick={() => setIsValidated(false)}
                className="mt-8 bg-blue-500 text-white py-3 px-8 rounded-lg font-bold shadow-md hover:bg-blue-600 transition"
              >
                Réessayer
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
