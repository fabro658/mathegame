"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function EquationsEquivalentes() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const levels = 3;

  const [questions, setQuestions] = useState<
    { equationLeft: string; equationRight: string }[]
  >([]);
  const [selectedButtons, setSelectedButtons] = useState<string[]>(
    Array(totalQuestions).fill("")
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [isValidated, setIsValidated] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const generateEquation = (level: number) => {
    const operations = ["+", "-"];
    const op = operations[Math.floor(Math.random() * operations.length)];
    let left, right;

    if (op === "+") {
      left = Math.floor(Math.random() * (20 * level)) + 1;
      right = Math.floor(Math.random() * (20 * level)) + 1;
    } else if (op === "-") {
      left = Math.floor(Math.random() * (20 * level)) + 10;
      right = Math.floor(Math.random() * (10 * level)) + 1;
    }

    const result = eval(`${left} ${op} ${right}`);
    return { equation: `${left} ${op} ${right}`, result };
  };

  const formatEquation = (equation: string) => equation.replace(/\*/g, "x");

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

  const handleAnswer = (index: number, isTrue: boolean): void => {
    const newSelectedButtons = [...selectedButtons];
    newSelectedButtons[currentPage * questionsPerPage + index] = isTrue ? "true" : "false";
    setSelectedButtons(newSelectedButtons);
  };

  const handleValidation = (): void => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = selectedButtons.slice(startIndex, endIndex);

    if (pageAnswers.includes("")) {
      setFeedbackMessage("Veuillez répondre à toutes les questions avant de valider.");
      return;
    }

    const allCorrect = questions.slice(startIndex, endIndex).every((question, i) => {
      const leftResult = eval(question.equationLeft);
      const rightResult = eval(question.equationRight);
      const correctAnswer = leftResult === rightResult ? "true" : "false";
      return selectedButtons[startIndex + i] === correctAnswer;
    });

    if (allCorrect) {
      if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
        setCurrentPage(currentPage + 1);
        setFeedbackMessage("Toutes les réponses de cette page sont correctes !");
      } else {
        setFeedbackMessage("Félicitations ! Vous avez terminé toutes les séries.");
      }
    } else {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez réessayer.");
    }

    setIsValidated(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link
        href="/menu/apprendre"
        className="absolute top-4 left-4 bg-black text-white py-3 px-8 rounded font-bold z-10"
      >
        Apprendre
      </Link>
      <Link
        href="/primaire/niveaux/niveau2"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      <h1 className="text-3xl font-bold mb-6 z-20 mt-24">
        Questions sur les équations équivalentes
      </h1>

      {feedbackMessage && (
        <p
          className={`text-xl mb-4 ${
            feedbackMessage.includes("incorrectes")
              ? "text-red-500"
              : "text-green-500"
          } text-center`}
        >
          {feedbackMessage}
        </p>
      )}

      {!isValidated && (
        <div className="flex flex-col items-center gap-6 mt-12">
          {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ equationLeft, equationRight }, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="font-bold text-black text-center">
                {formatEquation(equationLeft)} = {formatEquation(equationRight)}
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleAnswer(index, true)}
                  className={`py-2 px-4 rounded font-bold ${
                    selectedButtons[currentPage * questionsPerPage + index] === "true"
                      ? "bg-orange-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  Vrai
                </button>
                <button
                  onClick={() => handleAnswer(index, false)}
                  className={`py-2 px-4 rounded font-bold ${
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
          <div className="mt-6">
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-3 px-8 rounded font-bold hover:bg-blue-600"
            >
              Valider les réponses
            </button>
          </div>
        </div>
      )}

      {isValidated && (
        <div className="mt-6 flex flex-col items-center">
          <button
            className="mt-6 bg-blue-500 text-white py-3 px-8 rounded font-bold"
            onClick={() => setIsValidated(false)}
          >
            Revenir pour corriger
          </button>
        </div>
      )}
    </div>
  );
}
