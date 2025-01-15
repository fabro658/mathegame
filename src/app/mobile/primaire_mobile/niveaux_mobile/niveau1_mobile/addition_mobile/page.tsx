"use client";

import { useState } from "react";
import Link from "next/link";

export default function Addition() {
  // Déclarations des constantes
  const totalQuestions = 6; // Toutes les questions sur une seule page
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);

  // Génération des questions
  const questions = Array.from({ length: totalQuestions }, (_, index) => {
    return [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];
  });

  // Gestion des réponses
  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = value === "" ? null : parseInt(value, 10); // Convertir les champs vides en null, sinon en nombre
    newAnswers[index] = parsedValue; // On accepte null si la conversion échoue
    setAnswers(newAnswers);
  };

  const handleValidation = () => {
    if (answers.includes(null)) {
      alert("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    const newAnswers = [...answers];
    let allCorrect = true;

    answers.forEach((answer, index) => {
      const [a, b] = questions[index];
      if (answer !== a + b) {
        newAnswers[index] = null; // Effacer uniquement les réponses incorrectes
        allCorrect = false;
      }
    });

    setAnswers(newAnswers);
    if (allCorrect) {
      setIsValidated(true);
    } else {
      alert("Certaines réponses sont incorrectes. Corrigez-les.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Boutons de navigation */}
      <Link
        href="/mobile/menu_mobile/apprendre_mobile/opérations arithmétiques_mobile"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/mobile/primaire_mobile/niveaux_mobile/niveau1_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      {/* Titre */}
      <h1 className="text-4xl font-bold mb-6">Addition</h1>

      {/* Questions et réponses */}
      {!isValidated && (
        <>
          <div className="flex flex-col gap-6">
            {questions.map(([a, b], index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">{a} + {b}</div>
                <input
                  type="text"
                  inputMode="numeric"
                  className="border border-gray-400 p-4 rounded w-32 text-center text-black text-lg"
                  value={answers[index] ?? ""} // Utilisation de ?? pour afficher "" si null
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-3 px-6 rounded font-bold"
            >
              Valider les réponses
            </button>
          </div>
        </>
      )}

      {/* Résultats après validation */}
      {isValidated && (
        <>
          <p className="text-xl font-bold text-green-600">
            Bravo ! Toutes vos réponses sont correctes.
          </p>
        </>
      )}
    </div>
  );
}
