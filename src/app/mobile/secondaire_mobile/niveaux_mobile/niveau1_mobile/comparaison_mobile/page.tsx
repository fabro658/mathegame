"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ComparerEntiers() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [questions, setQuestions] = useState<{ type: string; numbers: number[]; correctAnswer: string }[]>([]);
  const [isValidated, setIsValidated] = useState(false);

  // Générer les questions au chargement initial
  useEffect(() => {
    const generatedQuestions = Array.from({ length: totalQuestions }, () => {
      const number1 = Math.floor(Math.random() * 100) + 1;
      const number2 = Math.floor(Math.random() * 100) + 1;
      const correctAnswer = number1 > number2 ? ">" : number1 < number2 ? "<" : "=";
      return { type: "compare", numbers: [number1, number2], correctAnswer };
    });
    setQuestions(generatedQuestions);
  }, []);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    setFeedbackMessage(""); // Réinitialiser le message de feedback lors d'un changement
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    // Vérifier si toutes les réponses ont été remplies
    if (pageAnswers.includes(null)) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    let hasErrors = false;

    // Vérification des réponses pour la page actuelle
    const newAnswers = [...answers];
    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      const question = questions[globalIndex];

      if (answer !== question.correctAnswer) {
        newAnswers[globalIndex] = null; // Réinitialiser la réponse incorrecte
        hasErrors = true;
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);

    if (hasErrors) {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez corriger les erreurs.");
    } else {
      setFeedbackMessage("Bravo ! Toutes les réponses sont correctes.");

      // Réinitialiser les réponses pour la page actuelle
      for (let i = startIndex; i < endIndex; i++) {
        newAnswers[i] = null;
      }
      setAnswers(newAnswers);

      // Passer à la page suivante ou afficher un message de fin
      if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
        setCurrentPage(currentPage + 1);
        setIsValidated(false); // Réinitialiser l'état de validation pour la nouvelle page
      } else {
        setFeedbackMessage("Félicitations ! Vous avez terminé toutes les questions.");
      }
    }
  };

  const currentQuestions = questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage);

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
        href="/mobile/secondaire_mobile/niveaux_mobile/niveau1_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Titre avec espacement supplémentaire */}
      <h1 className="text-3xl font-bold mb-6 mt-16">Comparaison de Nombres Entiers</h1>

      {!isValidated && (
        <div className="flex flex-col items-center justify-center">
          {currentQuestions.map((question, index) => (
            <div key={index} className="bg-white p-6 rounded shadow-md text-center mb-6">
              <p className="text-xl font-bold mb-4">
                {`${question.numbers[0]} ? ${question.numbers[1]}`}
              </p>
              <select
                value={answers[currentPage * questionsPerPage + index] || ""}
                onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
                className="py-3 px-6 rounded border-gray-300 text-lg"
              >
                <option value="" disabled>Choisissez</option>
                <option value="<">&lt;</option>
                <option value=">">&gt;</option>
                <option value="=">=</option>
              </select>
              {answers[currentPage * questionsPerPage + index] === null && (
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
          {feedbackMessage.includes("correctes") ? (
            <p className="text-green-500 font-bold text-lg">{feedbackMessage}</p>
          ) : (
            <p className="text-red-500 font-bold text-lg">{feedbackMessage}</p>
          )}
        </div>
      )}
    </div>
  );
}