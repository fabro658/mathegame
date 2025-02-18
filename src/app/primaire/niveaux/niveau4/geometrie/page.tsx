'use client';

import React, { useState } from "react";
import Link from "next/link";

const shapes = [
  { name: "Triangle", sides: 3 },
  { name: "Carré", sides: 4 },
  { name: "Cercle", sides: 0 },
  { name: "Rectangle", sides: 4 },
  { name: "Pentagone", sides: 5 },
  { name: "Hexagone", sides: 6 },
  { name: "Heptagone", sides: 7 },
  { name: "Octogone", sides: 8 },
  { name: "Nonagone", sides: 9 },
  { name: "Trapèze", sides: 4 },
];

const ShapesPracticePage = () => {
  const [answers, setAnswers] = useState<(string | null)[]>(new Array(shapes.length).fill(null));
  const [currentShapes, setCurrentShapes] = useState(0);
  const [errorIndices, setErrorIndices] = useState<number[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleValidation = () => {
    const startIdx = currentShapes;
    const endIdx = currentShapes + 3;
    const errors: number[] = [];

    for (let i = startIdx; i < endIdx; i++) {
      if (answers[i] !== shapes[i].name) {
        errors.push(i);
      }
    }

    if (answers.slice(startIdx, endIdx).includes(null)) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    if (errors.length === 0) {
      setErrorIndices([]);
      setFeedbackMessage("Toutes les réponses de cette page sont correctes. Vous pouvez continuer.");
      handleNext();
    } else {
      setErrorIndices(errors);
      const updatedAnswers = [...answers];
      errors.forEach((idx) => {
        updatedAnswers[idx] = null;
      });
      setAnswers(updatedAnswers);
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez corriger les erreurs.");
    }
  };

  const handleNext = () => {
    if (currentShapes + 3 >= shapes.length) {
      setIsCompleted(true);
    } else {
      setCurrentShapes((prev) => (prev + 3) % shapes.length);
    }
  };

  const handlePrevious = () => {
    setCurrentShapes((prev) => (prev - 3 + shapes.length) % shapes.length);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link href="/menu/apprendre" className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold">
        Apprendre
      </Link>
      <Link href="/primaire/niveaux/niveau4" className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold">
        Retour
      </Link>

      <h1 className="text-3xl font-bold mb-6">Associer les Noms aux Formes</h1>

      {feedbackMessage && (
        <p className={`text-xl mb-4 ${feedbackMessage.includes("incorrectes") ? "text-red-500" : "text-green-500"} text-center`}>
          {feedbackMessage}
        </p>
      )}

      {isCompleted ? (
        <div className="text-center">
          <p className="text-2xl font-bold text-green-500 mb-4">Félicitations ! Vous avez complété le niveau.</p>
          <Link href="/primaire/niveaux/niveau4" className="bg-blue-500 text-white py-3 px-8 rounded font-bold">
            Retourner à la page précédente
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8">
          <div className="flex gap-8 justify-center mb-12">
            {shapes.slice(currentShapes, currentShapes + 3).map((shape, idx) => (
              <div key={idx} className={`w-32 h-32 border-2 ${errorIndices.includes(currentShapes + idx) ? "border-red-500" : "border-gray-500"} flex flex-col items-center justify-center`}>
                <div>{shape.name}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-4 mb-12">
            {shapes.map((shape, idx) => (
              <div key={idx} className="p-2 border border-blue-500 cursor-pointer text-center bg-white">
                {shape.name}
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            <button onClick={handlePrevious} className="bg-gray-400 text-white py-2 px-6 rounded font-bold">
              Précédent
            </button>
            <button onClick={handleValidation} className="bg-blue-500 text-white py-2 px-6 rounded font-bold">
              Valider les réponses
            </button>
            <button onClick={handleNext} className="bg-gray-400 text-white py-2 px-6 rounded font-bold" disabled={errorIndices.length > 0}>
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShapesPracticePage;
