"use client"; 

import { useState, useEffect } from "react";
import Link from "next/link";

type Question = {
  type: "compare";
  fractions: [string, string];
  correctAnswer: string;
};

export default function ComparerFractions() {
  const totalQuestions = 30;
  const questionsPerPage = 6; // Display 6 questions per page

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);

  // Génération des questions
  const generateQuestions = (): Question[] => {
    return Array.from({ length: totalQuestions }, () => {
      const numerator1 = Math.floor(Math.random() * 9) + 1;
      const denominator1 = Math.floor(Math.random() * 8) + 2;
      const numerator2 = Math.floor(Math.random() * 9) + 1;
      const denominator2 = Math.floor(Math.random() * 8) + 2;

      const fraction1 = `${numerator1}/${denominator1}`;
      const fraction2 = `${numerator2}/${denominator2}`;
      const value1 = numerator1 / denominator1;
      const value2 = numerator2 / denominator2;

      const correctAnswer = value1 > value2 ? ">" : value1 < value2 ? "<" : "=";

      return { type: "compare", fractions: [fraction1, fraction2], correctAnswer };
    });
  };

  useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  const handleAnswer = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleValidation = () => {
    const pageAnswers = answers.slice(0, questionsPerPage);

    if (pageAnswers.includes(null)) {
      alert("Veuillez répondre à toutes les questions avant de valider.");
      return;
    }

    const isCorrect = pageAnswers.every((answer, index) => {
      return questions[index] && answer === questions[index].correctAnswer;
    });

    setIsValidated(true);
    setHasPassed(isCorrect);
  };

  const currentQuestions = questions.slice(0, questionsPerPage);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Boutons de navigation avec z-index pour être toujours au-dessus */}
      <Link
        href="/menu/apprendre"
        className="absolute top-4 left-4 bg-black text-white py-3 px-8 rounded font-bold z-10"
      >
        Apprendre
      </Link>
      <Link
        href="/mobile/primaire_mobile/niveaux_mobile/niveau2_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Titre avec espacement supplémentaire */}
      <h1 className="text-3xl font-bold mb-6 mt-16">Comparaison de Fractions</h1>

      {!isValidated && (
        <div className="flex flex-col items-center justify-center">
          {currentQuestions.map((question, index) => (
            <div key={index} className="bg-white p-6 rounded shadow-md text-center mb-6">
              <p className="text-xl font-bold mb-4">
                {`${question.fractions[0]} ? ${question.fractions[1]}`}
              </p>
              <select
                value={answers[index] || ""}
                onChange={(e) => handleAnswer(index, e.target.value)}
                className="py-3 px-6 rounded border-gray-300 text-lg"
              >
                <option value="" disabled>Choisissez</option>
                <option value="<">&lt;</option>
                <option value=">">&gt;</option>
                <option value="=">=</option>
              </select>
              {answers[index] === null && (
                <p className="text-red-500 text-sm mt-2">Réponse manquante</p>
              )}
            </div>
          ))}
          <div className="flex flex-col items-center mt-4">
            <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">
              Valider
            </button>
          </div>
        </div>
      )}

      {isValidated && (
        <div className="text-center mt-4">
          {hasPassed ? (
            <p className="text-green-500 font-bold text-lg">Toutes les réponses sont correctes !</p>
          ) : (
            <p className="text-red-500 font-bold text-lg">Certaines réponses sont incorrectes.</p>
          )}
        </div>
      )}
    </div>
  );
}
