"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Division() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackClass, setFeedbackClass] = useState("");
  const [questions, setQuestions] = useState<[number, number][]>([]);

  // Générer les questions une seule fois lors du montage du composant
  useEffect(() => {
    const generatedQuestions: [number, number][] = Array.from({ length: totalQuestions }, (_, index) => {
      let numerator: number, denominator: number;

      // Les premières questions avec des multiples simples
      if (index < 10) {
        denominator = Math.floor(Math.random() * 10) + 1; // un dénominateur entre 1 et 10
        numerator = denominator * (Math.floor(Math.random() * 10) + 1); // le numérateur est un multiple du dénominateur
      } else if (index < 20) {
        numerator = Math.floor(Math.random() * 100) + 1;
        denominator = Math.floor(Math.random() * 10) + 1;
      } else if (index < 30) {
        numerator = Math.floor(Math.random() * 100) + 1;
        denominator = Math.floor(Math.random() * 20) + 1;
      } else {
        numerator = Math.floor(Math.random() * 100) + 1;
        denominator = Math.floor(Math.random() * 50) + 1;
      }

      return [numerator, denominator];
    });

    setQuestions(generatedQuestions);
  }, []);

  const correctAnswers = questions.map(([numerator, denominator]) => numerator / denominator);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseFloat(value);
    newAnswers[index] = isNaN(parsedValue) ? null : parsedValue;
    setAnswers(newAnswers);
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null)) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      setFeedbackClass("text-red-500");
      return;
    }

    const newAnswers = [...answers];
    let allCorrect = true;

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      if (answer !== correctAnswers[globalIndex]) {
        allCorrect = false;
        newAnswers[globalIndex] = null; // Annuler les mauvaises réponses
      }
    });

    setAnswers(newAnswers);

    if (allCorrect) {
      setFeedbackMessage("Bravo ! Toutes les réponses sont correctes.");
      setFeedbackClass("text-green-500");
      if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
        setCurrentPage(currentPage + 1);
      } else {
        setFeedbackMessage("Bravo ! Vous avez terminé toutes les questions.");
      }
    } else {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez corriger les erreurs.");
      setFeedbackClass("text-red-500");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100 text-black py-6 px-4">
    {/* Conteneur pour les boutons */}
    <div className="flex justify-between w-full mb-6">
      <Link href="/mobile/menu_mobile/apprendre_mobile/opérations arithmétiques_mobile" className="bg-black text-white py-3 px-8 rounded font-bold">
        Apprendre
      </Link>
      <Link href="/mobile/primaire_mobile/niveaux_mobile/niveau1_mobile" 
      className="bg-orange-500 text-white py-3 px-8 rounded font-bold">
        Retour
      </Link>
    </div>
  
    {/* Titre */}
    <h1 className="text-4xl font-bold mb-6">Division</h1>
  
    {/* Feedback */}
    {feedbackMessage && <p className={`text-xl mb-4 ${feedbackClass}`}>{feedbackMessage}</p>}
  
    {/* Questions et réponses */}
    <div className="flex flex-col items-center gap-4 w-full">
      {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(([numerator, denominator], index) => (
        <div key={`${currentPage}-${index}`} className="flex items-center justify-between gap-6 w-full max-w-md">
          <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-3xl flex-grow text-center">
            {numerator} ÷ {denominator}
          </div>
          <input
            type="text"
            inputMode="numeric"
            className="border border-gray-400 py-3 px-4 rounded-lg text-center text-black text-2xl w-32"
            value={answers[currentPage * questionsPerPage + index] ?? ""}
            onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
          />
        </div>
      ))}
    </div>
  
    {/* Validation */}
    <div className="mt-6 flex justify-center w-full">
      <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">
        Valider
      </button>
    </div>
  </div>
  
  );
}