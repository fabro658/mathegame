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

  const drawShape = (sides: number, shapeName: string) => {
    const points = [];
    const centerX = 50;
    const centerY = 50;
    const radius = 40;

    if (sides === 0) {
      return (
        <svg width="80" height="80" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="lightblue" stroke="black" strokeWidth="2" />
        </svg>
      );
    } else if (shapeName === "Rectangle") {
      return (
        <svg width="80" height="80" viewBox="0 0 100 100">
          <rect x="20" y="30" width="60" height="40" fill="lightblue" stroke="black" strokeWidth="2" />
        </svg>
      );
    } else if (shapeName === "Carré") {
      return (
        <svg width="80" height="80" viewBox="0 0 100 100">
          <rect x="30" y="30" width="40" height="40" fill="lightblue" stroke="black" strokeWidth="2" />
        </svg>
      );
    } else {
      for (let i = 0; i < sides; i++) {
        const angle = (i * 2 * Math.PI) / sides;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        points.push(`${x},${y}`);
      }
      return (
        <svg width="80" height="80" viewBox="0 0 100 100">
          <polygon points={points.join(" ")} fill="lightblue" stroke="black" strokeWidth="2" />
        </svg>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <h1 className="text-3xl font-bold mb-6">Associer les Noms aux Formes</h1>
      {isCompleted ? (
        <p className="text-2xl font-bold text-green-500">Félicitations ! Vous avez complété le niveau.</p>
      ) : (
        <div className="flex flex-wrap gap-8 justify-center mb-12">
          {shapes.slice(currentShapes, currentShapes + 3).map((shape, idx) => (
            <div
              key={idx}
              className="w-40 h-40 flex flex-col items-center justify-center border-2 border-gray-500 bg-white"
            >
              {drawShape(shape.sides, shape.name)}
              <div className="mt-2 font-bold">{answers[currentShapes + idx] || "?"}</div>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-4 mt-8">
        <button onClick={handlePrevious} className="bg-gray-400 text-white py-2 px-6 rounded font-bold">
          Précédent
        </button>
        <button onClick={handleValidation} className="bg-blue-500 text-white py-2 px-6 rounded font-bold">
          Valider
        </button>
        <button onClick={handleNext} className="bg-gray-400 text-white py-2 px-6 rounded font-bold">
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ShapesPracticePage;
