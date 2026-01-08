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
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const generateEquation = (level: number) => {
    const operations = ["+", "-"];
    const op = operations[Math.floor(Math.random() * operations.length)];
    let left: number, right: number;

    if (op === "+") {
      left = Math.floor(Math.random() * (20 * level)) + 1;
      right = Math.floor(Math.random() * (20 * level)) + 1;
    } else {
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
        let rightEquation = leftEquation;

        if (!isEquivalent) {
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

  const handleAnswer = (indexOnPage: number, isTrue: boolean) => {
    const globalIndex = currentPage * questionsPerPage + indexOnPage;
    const next = [...selectedButtons];
    next[globalIndex] = isTrue ? "true" : "false";
    setSelectedButtons(next);
    setFeedbackMessage("");
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = selectedButtons.slice(startIndex, endIndex);

    if (pageAnswers.includes("")) {
      setFeedbackMessage("Veuillez répondre à toutes les questions avant de valider.");
      return;
    }

    let allCorrect = true;
    const next = [...selectedButtons];

    questions.slice(startIndex, endIndex).forEach((q, i) => {
      const leftResult = eval(q.equationLeft);
      const rightResult = eval(q.equationRight);
      const correct = leftResult === rightResult ? "true" : "false";

      if (pageAnswers[i] !== correct) {
        allCorrect = false;
        next[startIndex + i] = ""; // efface la réponse incorrecte
      }
    });

    setSelectedButtons(next);

    const lastPageIndex = Math.floor(totalQuestions / questionsPerPage) - 1;
    if (allCorrect) {
      if (currentPage < lastPageIndex) {
        setFeedbackMessage("Toutes les réponses de cette page sont correctes ! Vous pouvez continuer.");
        setCurrentPage(currentPage + 1);
      } else {
        setFeedbackMessage("Félicitations ! Vous avez terminé toutes les séries.");
      }
    } else {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez réessayer.");
    }
  };

  const startIndex = currentPage * questionsPerPage;
  const visible = questions.slice(startIndex, startIndex + questionsPerPage);

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 text-black p-4 relative">
      {/* Boutons fixes en haut (on garde la couleur de fond) */}
      <Link
        href="/menu/apprendre"
        className="fixed top-4 left-4 bg-black text-white py-3 px-8 rounded font-bold z-50"
      >
        Apprendre
      </Link>
      <Link
        href="/mobile/primaire_mobile/niveaux_mobile/niveau2_mobile"
        className="fixed top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-50"
      >
        Retour
      </Link>

      {/* Contenu scrollable */}
      <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg pb-24 mt-16">
        {/* Titre */}
        <h1 className="text-3xl font-bold mb-6 text-center">Les équations équivalentes</h1>

        {/* Feedback */}
        {feedbackMessage && (
          <p
            className={`text-xl mb-6 text-center ${
              feedbackMessage.includes("incorrectes") || feedbackMessage.includes("répondre à toutes")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {feedbackMessage}
          </p>
        )}

        {/* 6 questions de la page courante — vertical (énoncé au-dessus, réponses en dessous) */}
        <div className="flex flex-col gap-8 w-full max-w-lg mx-auto">
          {visible.map(({ equationLeft, equationRight }, idx) => {
            const globalIndex = startIndex + idx;
            const selected = selectedButtons[globalIndex];

            return (
              <div
                key={globalIndex}
                className="flex flex-col items-center gap-4 border-2 border-gray-300 p-4 rounded-lg"
              >
                {/* Enoncé */}
                <div className="font-bold text-2xl text-center">
                  {formatEquation(equationLeft)} = {formatEquation(equationRight)}
                </div>

                {/* Boutons réponse en dessous */}
                <div className="flex gap-4">
                  <button
                    onClick={() => handleAnswer(idx, true)}
                    className={`py-2 px-4 rounded font-bold transition
                      ${selected === "true" ? "bg-orange-500 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}
                    `}
                  >
                    Vrai
                  </button>
                  <button
                    onClick={() => handleAnswer(idx, false)}
                    className={`py-2 px-4 rounded font-bold transition
                      ${selected === "false" ? "bg-orange-500 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}
                    `}
                  >
                    Faux
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Valider */}
        <div className="mt-10 flex justify-center w-full">
          <button
            onClick={handleValidation}
            className="bg-blue-600 text-white py-3 px-6 rounded font-bold w-full max-w-xs hover:bg-blue-700"
          >
            Valider les réponses
          </button>
        </div>
      </div>
    </div>
  );
}
