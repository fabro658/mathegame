"use client";

import React, { useState } from "react";
import Link from "next/link";

// Liste des formes géométriques avec leurs propriétés
const shapes = [
  { name: "Triangle", sides: 3 },
  { name: "Carré", sides: 4 },
  { name: "Pentagone", sides: 5 },
  { name: "Hexagone", sides: 6 },
  { name: "Heptagone", sides: 7 },
  { name: "Octogone", sides: 8 },
  { name: "Nonagone", sides: 9 },
  { name: "Décagone", sides: 10 },
];

const ShapesPracticePage = () => {
  const [answers, setAnswers] = useState<string[]>(new Array(shapes.length).fill(''));
  const [completed, setCompleted] = useState<boolean>(false);

  // Pourcentage de progression
  const calculateCompletionPercentage = () => {
    const correctAnswers = answers.filter((answer, idx) => answer === shapes[idx].name).length;
    return (correctAnswers / shapes.length) * 100;
  };

  const completionPercentage = calculateCompletionPercentage();

  const handleDrop = (index: number, droppedName: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = droppedName;
    setAnswers(updatedAnswers);
  };

  const handleValidation = () => {
    const allCorrect = answers.every((answer, idx) => answer === shapes[idx].name);
    setCompleted(allCorrect);
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
        href="/primaire/niveaux/niveau4"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      {/* Barre circulaire de progression */}
      <div className="absolute top-4 left-4 w-32 h-32">
        <svg className="transform -rotate-90" width="100%" height="100%">
          <circle
            cx="50%"
            cy="50%"
            r={50}
            fill="none"
            stroke="#e5e5e5"
            strokeWidth={10}
          />
          <circle
            cx="50%"
            cy="50%"
            r={50}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={10}
            strokeDasharray={2 * Math.PI * 50}
            strokeDashoffset={2 * Math.PI * 50 - (2 * Math.PI * 50 * completionPercentage) / 100}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-blue-500">{Math.round(completionPercentage)}%</span>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">Associer les Noms aux Formes</h1>

      {/* Zone pour les formes à associer */}
      <div className="flex gap-8">
        {/* Affichage des formes avec nombre de côtés */}
        <div className="flex flex-wrap gap-6">
          {shapes.map((shape, idx) => (
            <div
              key={idx}
              className="w-32 h-32 border-2 border-gray-500 flex items-center justify-center"
              onDrop={(e) => {
                e.preventDefault();
                handleDrop(idx, e.dataTransfer.getData("name"));
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              {shape.sides} côtés
            </div>
          ))}
        </div>

        {/* Liste des noms des formes à glisser */}
        <div className="flex flex-col gap-4">
          {shapes.map((shape, idx) => (
            <div
              key={idx}
              className="p-2 border border-blue-500 cursor-pointer"
              draggable
              onDragStart={(e) => e.dataTransfer.setData("name", shape.name)}
            >
              {shape.name}
            </div>
          ))}
        </div>
      </div>

      {/* Validation des réponses */}
      <div className="mt-6">
        <button
          onClick={handleValidation}
          className="bg-blue-500 text-white py-3 px-8 rounded font-bold"
        >
          Valider les réponses
        </button>
      </div>

      {/* Résultat de validation */}
      {completed && (
        <div className="mt-6 text-green-600 font-bold text-xl">
          Bravo ! Vous avez réussi à associer toutes les formes correctement.
        </div)}

      {!completed && completed !== null && (
        <div className="mt-6 text-red-600 font-bold text-xl">
          Certaines associations sont incorrectes. Essayez encore !
        </div>
      )}
    </div>
  );
};

export default ShapesPracticePage;
