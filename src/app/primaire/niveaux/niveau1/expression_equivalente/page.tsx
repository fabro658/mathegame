"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function EquationsEquivalentes() {
  const totalQuestions = 30; // Nombre total de questions
  const questionsPerPage = 3; // Nombre de questions par vague
  const levels = 3; // Nombre de niveaux

  const [questions, setQuestions] = useState<
    { equationLeft: string; equationRight: string }[]
  >([]);
  const [selectedButtons, setSelectedButtons] = useState<string[]>(
    Array(totalQuestions).fill("") // État pour suivre les boutons cliqués
  );
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Calcul du pourcentage de progression
  const completionPercentage = Math.floor(
    (selectedButtons.filter((button) => button !== "").length / totalQuestions) * 100
  );

  const generateEquation = (level: number) => {
    const operations = ["+", "-"]; // Opérations pour le niveau simple
    if (level >= 2) operations.push("*"); // Ajouter la multiplication au niveau intermédiaire
    if (level >= 3) operations.push("/"); // Ajouter la division au niveau avancé

    const op = operations[Math.floor(Math.random() * operations.length)];
    let left, right;

    if (op === "+") {
      left = Math.floor(Math.random() * 20) + 1;
      right = Math.floor(Math.random() * 20) + 1;
    } else if (op === "-") {
      left = Math.floor(Math.random() * 20) + 10; // Assure un résultat positif
      right = Math.floor(Math.random() * 10) + 1;
    } else if (op === "*") {
      left = Math.floor(Math.random() * 10) + 1;
      right = Math.floor(Math.random() * 10) + 1;
    } else if (op === "/") {
      right = Math.floor(Math.random() * 9) + 1; // Diviseur non nul
      left = right * (Math.floor(Math.random() * 10) + 1); // Assure un résultat entier
    }

    const result = eval(`${left} ${op} ${right}`);
    return { equation: `${left} ${op} ${right}`, result };
  };

  const formatEquation = (equation: string) => {
    // Remplace le symbole `*` par `x` pour l'affichage
    return equation.replace(/\*/g, "x");
  };

  useEffect(() => {
    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, (_, index) => {
        const level = Math.ceil(((index + 1) / totalQuestions) * levels); // Détermine le niveau
        const leftEquation = generateEquation(level);

        const isEquivalent = Math.random() > 0.5; // Définit si les deux côtés sont équivalents
        let rightEquation;

        if (isEquivalent) {
          // Si équivalent, les deux côtés doivent être identiques
          rightEquation = leftEquation;
        } else {
          // Sinon, génère jusqu'à ce que le côté droit soit différent
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

    // Génération initiale des questions
    setQuestions(generateQuestions());
  }, []);

  const handleAnswer = (index: number, isTrue: boolean): void => {
    const newSelectedButtons = [...selectedButtons];

    // Met à jour le bouton sélectionné pour cette question
    newSelectedButtons[index] = isTrue ? "true" : "false";

    setSelectedButtons(newSelectedButtons);
  };

  const handleValidation = (): void => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = selectedButtons.slice(startIndex, endIndex);

    // Vérifier si toutes les réponses sont remplies
    const allAnswered = pageAnswers.every((answer) => answer !== "");

    if (!allAnswered) {
      alert("Veuillez répondre à toutes les questions avant de valider.");
      return;
    }

    // Validation des réponses
    const allCorrect = questions
      .slice(startIndex, endIndex)
      .every((question, i) => {
        const leftResult = eval(question.equationLeft);
        const rightResult = eval(question.equationRight);
        const correctAnswer = leftResult === rightResult ? "true" : "false";
        return pageAnswers[i] === correctAnswer;
      });

    setIsValidated(true);
    setHasPassed(allCorrect);
  };

  const handleNextPage = (): void => {
    if (currentPage < totalQuestions / questionsPerPage - 1) {
      setCurrentPage(currentPage + 1);
      setIsValidated(false);
    }
  };

  const handlePreviousPage = (): void => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsValidated(false);
    }
  };

  // Propriétés pour le cercle de progression
  const radius = 50; // Rayon du cercle
  const strokeWidth = 10; // Largeur du cercle
  const circumference = 2 * Math.PI * radius;

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

      {/* Barre circulaire */}
      <div className="absolute top-4 left-4 w-32 h-32">
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

      <h1 className="text-3xl font-bold mb-6">
        Questions sur les équations équivalentes
      </h1>

      {!isValidated && (
        <>
          <div className="flex flex-col gap-6">
            {questions
              .slice(
                currentPage * questionsPerPage,
                (currentPage + 1) * questionsPerPage
              )
              .map(({ equationLeft, equationRight }, index) => (
                <div key={index} className="flex flex-col items-start gap-2">
                  <div className="font-bold text-black">
                    {formatEquation(equationLeft)} = {formatEquation(equationRight)}
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() =>
                        handleAnswer(currentPage * questionsPerPage + index, true)
                      }
                      className={`py-2 px-4 rounded font-bold ${
                        selectedButtons[currentPage * questionsPerPage + index] ===
                        "true"
                          ? "bg-orange-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      Vrai
                    </button>
                    <button
                      onClick={() =>
                        handleAnswer(currentPage * questionsPerPage + index, false)
                      }
                      className={`py-2 px-4 rounded font-bold ${
                        selectedButtons[currentPage * questionsPerPage + index] ===
                        "false"
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

          <div className="mt-6 flex gap-4">
            <button
              onClick={handlePreviousPage}
              className="bg-gray-500 text-white py-3 px-8 rounded font-bold"
              disabled={currentPage === 0}
            >
              Précédent
            </button>
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-3 px-8 rounded font-bold"
            >
              Valider les réponses
            </button>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white py-3 px-8 rounded font-bold"
              disabled={currentPage === Math.floor(totalQuestions / questionsPerPage) - 1}
            >
              Suivant
            </button>
          </div>
        </>
      )}

      {isValidated && (
        <>
          {hasPassed ? (
            <div>
              <p className="text-green-600 font-bold text-xl">
                Bravo ! Toutes vos réponses sont correctes.
              </p>
              <button
                className="mt-6 bg-blue-500 text-white py-3 px-8 rounded font-bold"
                onClick={handleNextPage}
              >
                Suivant
              </button>
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-bold text-xl">
                Certaines réponses sont incorrectes. Corrigez-les.
              </p>
              <button
                className="mt-6 bg-gray-500 text-white py-3 px-8 rounded font-bold"
                onClick={() => setIsValidated(false)}
              >
                Revenir pour corriger
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
