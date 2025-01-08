"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function EquationsEquivalentes() {
  const totalQuestions = 30; // Nombre total de questions
  const questionsPerPage = 3; // Nombre de questions par vague

  const [questions, setQuestions] = useState<
    { equationLeft: string; equationRight: string }[]
  >([]);
  const [selectedButtons, setSelectedButtons] = useState<string[]>( // Pour suivre quel bouton est sélectionné
    Array(totalQuestions).fill("") // Initialisation vide
  );

  useEffect(() => {
    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, () => {
        const leftValue = Math.floor(Math.random() * 20) + 1;
        const rightValue = Math.random() > 0.5 ? leftValue : Math.floor(Math.random() * 20) + 1;

        return {
          equationLeft: leftValue.toString(),
          equationRight: rightValue.toString(),
        };
      });
    };

    // Génération initiale des questions
    setQuestions(generateQuestions());
  }, []);

  // Gestion des réponses
  const handleAnswer = (index: number, isTrue: boolean): void => {
    const newSelectedButtons = [...selectedButtons];

    // Met à jour le bouton sélectionné pour cette question
    newSelectedButtons[index] = isTrue ? "true" : "false";

    setSelectedButtons(newSelectedButtons);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link
        href="/menu/apprendre"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/primaire/niveaux/niveau1"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-3xl font-bold mb-6">
        Questions sur les équations équivalentes
      </h1>

      <div className="flex flex-col gap-6">
        {questions
          .slice(
            0, // Commence à la première question
            questionsPerPage // Affiche seulement un nombre limité de questions
          )
          .map(({ equationLeft, equationRight }, index) => (
            <div key={index} className="flex flex-col items-start gap-2">
              <div className="font-bold text-black">
                {equationLeft} = {equationRight}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    handleAnswer(index, true)
                  }
                  className={`py-2 px-4 rounded font-bold ${
                    selectedButtons[index] === "true"
                      ? "bg-orange-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  Vrai
                </button>
                <button
                  onClick={() =>
                    handleAnswer(index, false)
                  }
                  className={`py-2 px-4 rounded font-bold ${
                    selectedButtons[index] === "false"
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
    </div>
  );
}
