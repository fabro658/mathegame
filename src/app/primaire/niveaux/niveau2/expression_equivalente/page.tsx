'use client';

import { useState, useEffect } from "react";

export default function EquationsEquivalentes() {
  const totalQuestions = 30;
  const questionsPerPage = 6;
  const levels = 3;

  const [questions, setQuestions] = useState<{ equationLeft: string; equationRight: string }[]>([]);
  const [selectedButtons, setSelectedButtons] = useState<string[]>(Array(totalQuestions).fill(""));
  const [currentPage, setCurrentPage] = useState(0);

  const generateEquation = (level: number) => {
    const operations = ["+", "-"];
    if (level >= 2) operations.push("*");
    if (level >= 3) operations.push("/");

    const op = operations[Math.floor(Math.random() * operations.length)];
    let left, right;

    if (op === "+") {
      left = Math.floor(Math.random() * 20) + 1;
      right = Math.floor(Math.random() * 20) + 1;
    } else if (op === "-") {
      left = Math.floor(Math.random() * 20) + 10;
      right = Math.floor(Math.random() * 10) + 1;
    } else if (op === "*") {
      left = Math.floor(Math.random() * 10) + 1;
      right = Math.floor(Math.random() * 10) + 1;
    } else {
      right = Math.floor(Math.random() * 9) + 1;
      left = right * (Math.floor(Math.random() * 10) + 1);
    }

    return { equation: `${left} ${op} ${right}`, result: eval(`${left} ${op} ${right}`) };
  };

  useEffect(() => {
    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, (_, index) => {
        const level = Math.ceil(((index + 1) / totalQuestions) * levels);
        const leftEquation = generateEquation(level);

        const isEquivalent = Math.random() > 0.5;
        let rightEquation;

        if (isEquivalent) {
          rightEquation = leftEquation;
        } else {
          do {
            rightEquation = generateEquation(level);
          } while (rightEquation.result === leftEquation.result);
        }

        return {
          equationLeft: leftEquation.equation,
          equationRight: rightEquation.equation,
        };
      });
    };

    setQuestions(generateQuestions());
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <h1 className="text-4xl font-bold mb-6">Équations équivalentes</h1>
      <div className="grid grid-cols-2 gap-6 mb-6">
        {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ equationLeft, equationRight }, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-md text-center">
            <p className="text-lg font-bold mb-4">
              {equationLeft} = {equationRight}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setSelectedButtons((prev) => prev.map((val, i) => (i === currentPage * questionsPerPage + index ? "true" : val)))}
                className={`w-32 py-2 px-4 rounded font-bold ${
                  selectedButtons[currentPage * questionsPerPage + index] === "true"
                    ? "bg-orange-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                Vrai
              </button>
              <button
                onClick={() => setSelectedButtons((prev) => prev.map((val, i) => (i === currentPage * questionsPerPage + index ? "false" : val)))}
                className={`w-32 py-2 px-4 rounded font-bold ${
                  selectedButtons[currentPage * questionsPerPage + index] === "false"
                    ? "bg-orange-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                Faux
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
          className="w-32 bg-gray-500 text-white py-3 px-8 rounded font-bold hover:bg-gray-600"
        >
          Précédent
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.floor(totalQuestions / questionsPerPage) - 1))}
          className="w-32 bg-blue-500 text-white py-3 px-8 rounded font-bold hover:bg-blue-600"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}