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
  const [answers, setAnswers] = useState<(string | null)[]>(new Array(shapes.length).fill(null));
  const [completed, setCompleted] = useState<boolean | null>(null);

  const handleDrop = (index: number, droppedName: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = droppedName;
    setAnswers(updatedAnswers);
  };

  const handleValidation = () => {
    console.log("Current answers:", answers); // Vérifier les réponses associées
    const allCorrect = shapes.every((shape, idx) => answers[idx] === shape.name);

    if (allCorrect) {
      setCompleted(true);
      console.log("Validation réussie : Toutes les réponses sont correctes.");
    } else {
      setCompleted(false);
      console.log("Validation échouée : Certaines réponses sont incorrectes.");
    }
  };

  // Fonction pour dessiner une forme géométrique avec un nombre spécifique de côtés
  const drawShape = (sides: number) => {
    const points = [];
    const centerX = 50;
    const centerY = 50;
    const radius = 40;

    if (sides === 0) {
      // Dessiner un cercle
      return (
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="lightblue" stroke="black" strokeWidth="2" />
        </svg>
      );
    } else {
      // Dessiner les autres formes géométriques
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

      <h1 className="text-3xl font-bold mb-6">Associer les Noms aux Formes</h1>

      <div className="flex flex-col items-center gap-8">
        {/* Zone des formes */}
        <div className="flex gap-8 justify-center">
          {shapes.map((shape, idx) => (
            <div
              key={idx}
              className="w-32 h-32 border-2 border-gray-500 flex flex-col items-center justify-center"
              onDrop={(e) => {
                e.preventDefault();
                handleDrop(idx, e.dataTransfer.getData("name"));
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              {drawShape(shape.sides)}
              <div>{shape.sides === 0 ? "Cercle" : `${shape.sides} côtés`}</div>
              {answers[idx] && (
                <div className="mt-2 text-sm font-bold text-blue-500">{answers[idx]}</div>
              )}
            </div>
          ))}
        </div>

        {/* Zone des noms des formes */}
        <div className="grid grid-cols-5 gap-4 mt-8">
          {shapes.map((shape, idx) => (
            <div
              key={idx}
              className="p-2 border border-blue-500 cursor-pointer text-center bg-white"
              draggable
              onDragStart={(e) => e.dataTransfer.setData("name", shape.name)}
            >
              {shape.name}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleValidation}
          className="bg-blue-500 text-white py-3 px-8 rounded font-bold"
        >
          Valider les réponses
        </button>
      </div>

      {completed !== null && (
        <div className="mt-6 text-xl font-bold">
          {completed ? (
            <div className="text-green-600">Bravo ! Vous avez réussi à associer toutes les formes correctement.</div>
          ) : (
            <div className="text-red-600">Certaines associations sont incorrectes. Essayez encore !</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShapesPracticePage;
