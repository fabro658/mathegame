"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Division() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [questions, setQuestions] = useState<
    { equationLeft: string; equationRight: string }[]
  >([]);
  const [selectedButtons, setSelectedButtons] = useState<string[]>(
    Array(totalQuestions).fill("") // État pour suivre les réponses sélectionnées
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackClass, setFeedbackClass] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);

  // Générer une équation avec un niveau donné
  const generateEquation = (level: number): { equation: string; result: number } => {
    const operations = ["+", "-"];
    if (level >= 2) operations.push("*");
    if (level >= 3) operations.push("/");

    const op = operations[Math.floor(Math.random() * operations.length)];
    let left = 0, right = 0;

    if (op === "+") {
      left = Math.floor(Math.random() * 20) + 1;
      right = Math.floor(Math.random() * 20) + 1;
    } else if (op === "-") {
      left = Math.floor(Math.random() * 20) + 10;
      right = Math.floor(Math.random() * 10) + 1;
    } else if (op === "*") {
      left = Math.floor(Math.random() * 10) + 1;
      right = Math.floor(Math.random() * 10) + 1;
    } else if (op === "/") {
      right = Math.floor(Math.random() * 9) + 1;
      left = right * (Math.floor(Math.random() * 10) + 1);
    }

    const result = eval(`${left} ${op} ${right}`); // Évaluer le résultat de l'équation
    return { equation: `${left} ${op} ${right}`, result };
  };

  // Formater une équation pour remplacer * par x
  const formatEquation = (equation: string): string => {
    return equation.replace(/\*/g, "x");
  };

  useEffect(() => {
    const generateQuestions = (): { equationLeft: string; equationRight: string }[] => {
      return Array.from({ length: totalQuestions }, (_, index) => {
        const level = Math.ceil(((index + 1) / totalQuestions) * 3); // Diviser les questions en 3 niveaux
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

  // Gestion de la sélection des réponses
  const handleAnswer = (index: number, isTrue: boolean): void => {
    const newSelectedButtons = [...selectedButtons];
    newSelectedButtons[currentPage * questionsPerPage + index] = isTrue ? "true" : "false";
    setSelectedButtons(newSelectedButtons);
  };

  // Valider les réponses
  const handleValidation = (): void => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = selectedButtons.slice(startIndex, endIndex);

    if (pageAnswers.includes("")) {
      setFeedbackMessage("Veuillez répondre à toutes les questions avant de valider.");
      setFeedbackClass("text-red-500");
      return;
    }

    const allCorrect = questions.slice(startIndex, endIndex).every((question, i) => {
      const leftResult = eval(question.equationLeft);
      const rightResult = eval(question.equationRight);
      const correctAnswer = leftResult === rightResult ? "true" : "false";
      return selectedButtons[startIndex + i] === correctAnswer;
    });

    if (allCorrect) {
      setFeedbackMessage("Toutes les réponses de cette page sont correctes !");
      setFeedbackClass("text-green-500");
      if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
        setCurrentPage(currentPage + 1);
        setFeedbackMessage(""); // Réinitialiser le feedback
      } else {
        setFeedbackMessage("Félicitations ! Vous avez terminé toutes les séries.");
        setFeedbackClass("text-green-500");
      }
    } else {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez réessayer.");
      setFeedbackClass("text-red-500");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Liens de navigation */}
      <div className="absolute top-4 left-4">
        <Link href="/menu/apprendre" className="bg-black text-white py-3 px-8 rounded font-bold">
          Apprendre
        </Link>
      </div>
      <div className="absolute top-4 right-4">
        <Link href="/primaire/niveaux/niveau2" className="bg-orange-500 text-white py-3 px-8 rounded font-bold">
          Retour
        </Link>
      </div>

      {/* Titre */}
      <h1 className="text-3xl font-bold mb-6 z-10 mt-16">
        Questions sur les équations équivalentes
      </h1>

      {/* Feedback */}
      {feedbackMessage && <p className={`text-xl mb-4 ${feedbackClass}`}>{feedbackMessage}</p>}

      {!isValidated && (
        <div className="flex flex-col items-center gap-6">
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
          {hasPassed ? (
            <p className="text-green-600 font-bold text-xl">
              Bravo ! Toutes vos réponses sont correctes.
            </p>
          ) : (
            <p className="text-red-600 font-bold text-xl">
              Certaines réponses sont incorrectes. Corrigez-les.
            </p>
          )}
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
