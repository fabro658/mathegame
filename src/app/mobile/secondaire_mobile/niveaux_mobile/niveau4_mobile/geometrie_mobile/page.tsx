"use client";

import React, { useState } from "react";
import Link from "next/link";

const shapes = [
  { name: "Triangle", sides: 3 },
  { name: "Carré", sides: 4 },
  { name: "Cercle", sides: 0 },
  { name: "Pentagone", sides: 5 },
  { name: "Hexagone", sides: 6 },
  { name: "Heptagone", sides: 7 },
  { name: "Octogone", sides: 8 },
  { name: "Nonagone", sides: 9 },
  { name: "Trapèze", sides: 4 },
];

const ShapesPracticePage = () => {
  const [answers, setAnswers] = useState<(string | null)[]>(new Array(shapes.length).fill(null));
  const [errorIndices, setErrorIndices] = useState<number[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value.trim();
    setAnswers(updatedAnswers);
    setFeedbackMessage(""); // Réinitialiser le message de feedback lors d'un changement
  };

  const handleValidation = () => {
    const errors: number[] = [];

    for (let i = 0; i < shapes.length; i++) {
      if (answers[i]?.toLowerCase() !== shapes[i].name.toLowerCase()) {
        errors.push(i);
      }
    }

    if (errors.length === 0) {
      setErrorIndices([]);
      setFeedbackMessage("Toutes les réponses sont correctes !");
    } else {
      setErrorIndices(errors);
      setFeedbackMessage("Certaines réponses sont incorrectes ou manquantes. Veuillez réessayer.");
      const updatedAnswers = [...answers];
      errors.forEach((idx) => {
        updatedAnswers[idx] = null;
      });
      setAnswers(updatedAnswers);
    }
  };

  const drawShape = (sides: number) => {
    const points = [];
    const centerX = 50;
    const centerY = 50;
    const radius = 40;

    if (sides === 0) {
      return (
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="lightblue" stroke="black" strokeWidth="2" />
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
        <svg width="100" height="100" viewBox="0 0 100 100">
          <polygon points={points.join(" ")} fill="lightblue" stroke="black" strokeWidth="2" />
        </svg>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <div className="absolute top-4 left-4">
        <Link href="/mobile/menu_mobile/apprendre_mobile" className="bg-black text-white py-3 px-8 rounded font-bold">
          Apprendre
        </Link>
      </div>
      <div className="absolute top-4 right-4">
        <Link href="/mobile/primaire_mobile/niveaux_mobile/niveau4_mobile" className="bg-orange-500 text-white py-3 px-8 rounded font-bold">
          Retour
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6 mt-16">Associer les Noms aux Formes</h1>

      {feedbackMessage && (
        <div className={`text-lg font-bold ${feedbackMessage.includes("incorrectes") ? "text-red-500" : "text-green-500"}`}>
          {feedbackMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {shapes.map((shape, idx) => (
          <div
            key={idx}
            className={`w-32 h-32 border-2 ${errorIndices.includes(idx) ? "border-red-500" : "border-gray-500"} flex flex-col items-center justify-center`}
          >
            {drawShape(shape.sides)}
            <div>{shape.sides === 0 ? "Cercle" : `${shape.sides} côtés`}</div>
            <input
              type="text"
              className="mt-2 text-sm font-bold text-blue-500 text-center"
              value={answers[idx] || ""}
              onChange={(e) => handleChange(idx, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleValidation}
          className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
        >
          Valider les réponses
        </button>
      </div>
    </div>
  );
};

export default ShapesPracticePage;