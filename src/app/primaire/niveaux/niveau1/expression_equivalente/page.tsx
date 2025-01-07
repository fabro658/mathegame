"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ExpressionsEquivalentes() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const [answers, setAnswers] = useState<(boolean | string | null)[]>(Array(totalQuestions).fill(null));
  const [questions, setQuestions] = useState<Array<{ expression: string; isCorrect?: boolean; correctAnswer?: string }>>([]);
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Génération des questions
  useEffect(() => {
    const generatedQuestions = Array.from({ length: totalQuestions }, (_, index) => {
      const baseValue = Math.floor(Math.random() * 81) + 20; // Nombre aléatoire entre 20 et 100

      if (index < 12) {
        const expressions = [
          [`${baseValue}`, `${Math.floor(baseValue / 2)} + ${Math.ceil(baseValue / 2)}`],
          [`${baseValue}`, `${baseValue - 10} + 10`],
          [`${baseValue}`, `${baseValue * 2} / 2`],
        ];
        const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
        const isCorrect = Number(randomExpression[0]) === Number(eval(randomExpression[1]));
        return {
          expression: `${randomExpression[0]} = ${randomExpression[1]}`,
          isCorrect,
        };
      } else if (index < 24) {
        const randomValue1 = Math.floor(Math.random() * 50) + 1;
        const randomValue2 = baseValue - randomValue1;
        const expressions = [
          [`${randomValue1} + ${randomValue2}`, `${baseValue}`],
          [`${baseValue}`, `${randomValue1} + ${randomValue2}`],
        ];
        const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
        const isCorrect = Number(randomExpression[0]) === Number(eval(randomExpression[1]));
        return {
          expression: `${randomExpression[0]} = ${randomExpression[1]}`,
          isCorrect,
        };
      } else {
        const randomValue1 = Math.floor(Math.random() * (baseValue - 10)) + 10;
        const missingValue = baseValue - randomValue1;
        return {
          expression: `${baseValue} = ${randomValue1} + _`,
          correctAnswer: missingValue.toString(),
        };
      }
    });
    setQuestions(generatedQuestions);
  }, []);

  const handleChange = (index: number, value: boolean | string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);
  
    if (pageAnswers.includes(null)) {
      alert("Veuillez remplir toutes les réponses sur cette page avant de valider.");
      return;
    }
  
    let allCorrect = true;
    const newAnswers = [...answers]; // Créer une copie des réponses existantes
  
    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      const question = questions[globalIndex];
  
      if (question.isCorrect !== undefined && answer !== question.isCorrect) {
        allCorrect = false;
      } else if (question.correctAnswer && answer !== question.correctAnswer) {
        allCorrect = false;
      }
  
      // Mettre à jour newAnswers avec la réponse correcte ou réinitialiser en cas d'erreur
      if (answer !== question.correctAnswer && question.correctAnswer) {
        newAnswers[globalIndex] = null;  // Réinitialiser la mauvaise réponse
      } else if (answer !== question.isCorrect && question.isCorrect !== undefined) {
        newAnswers[globalIndex] = null;  // Réinitialiser la mauvaise réponse
      }
    });
  
    // Mettre à jour les réponses dans l'état avec les nouvelles valeurs
    setAnswers(newAnswers);
  
    setIsValidated(true);
    setHasPassed(allCorrect);
  };
  

  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
      setIsValidated(false);
      setHasPassed(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsValidated(false);
      setHasPassed(false);
    }
  };

  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

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

      <h1 className="text-4xl font-bold mb-6">Reconnaître des expressions équivalentes</h1>

      {!isValidated && (
        <>
          <div className="grid grid-cols-3 gap-6">
            {questions
              .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
              .map((question, index) => (
                <div key={index} className="flex flex-col items-center gap-4">
                  <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">
                    {question.expression}
                  </div>
                  {question.correctAnswer === undefined ? (
                    <div className="flex gap-4">
                      <button
                        className={`py-2 px-4 rounded-lg font-bold ${
                          answers[currentPage * questionsPerPage + index] === true
                            ? "bg-green-500 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => handleChange(currentPage * questionsPerPage + index, true)}
                      >
                        Vrai
                      </button>
                      <button
                        className={`py-2 px-4 rounded-lg font-bold ${
                          answers[currentPage * questionsPerPage + index] === false
                            ? "bg-red-500 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => handleChange(currentPage * questionsPerPage + index, false)}
                      >
                        Faux
                      </button>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="py-2 px-4 border rounded-lg text-center"
                      placeholder="?"
                      value={answers[currentPage * questionsPerPage + index] || ""}
                      onChange={(e) =>
                        handleChange(currentPage * questionsPerPage + index, e.target.value)
                      }
                    />
                  )}
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
              <p className="text-green-600 font-bold text-2xl">Bravo ! Toutes vos réponses sont correctes.</p>
              <button
                className="mt-8 bg-blue-500 text-white py-3 px-8 rounded-lg font-bold"
                onClick={() => alert("Vous avez complété toutes les questions !")}
              >
                Terminer
              </button>
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-bold text-2xl">Certaines réponses sont incorrectes. Corrigez-les.</p>
              <button
                className="mt-8 bg-gray-500 text-white py-3 px-8 rounded-lg font-bold"
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
