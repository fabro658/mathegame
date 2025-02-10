"use client";

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
  const [progress, setProgress] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleDrop = (index: number, droppedName: string) => {
    const updatedAnswers = [...answers];
    const targetIndex = currentShapes + index;

    // Vérifie si la réponse est correcte dès le drop
    if (shapes[targetIndex].name === droppedName) {
      setProgress((prev) => prev + (100 / shapes.length)); // Augmenter la progression
    } else if (updatedAnswers[targetIndex] && shapes[targetIndex].name === updatedAnswers[targetIndex]) {
      // Si la réponse est changée d'une bonne réponse à une mauvaise, réduire la progression
      setProgress((prev) => prev - (100 / shapes.length));
    }

    updatedAnswers[targetIndex] = droppedName;
    setAnswers(updatedAnswers);
    setFeedbackMessage(""); // Réinitialiser le message de feedback
  };

  const handleValidation = () => {
    const startIdx = currentShapes;
    const endIdx = currentShapes + 3;
    const errors: number[] = [];

    // Vérification des réponses
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
      // Tout est correct, passer à la série suivante
      setErrorIndices([]);
      setFeedbackMessage("Toutes les réponses de cette page sont correctes. Vous pouvez continuer.");
      handleNext();
    } else {
      // Réinitialiser uniquement les erreurs
      setErrorIndices(errors);
      const updatedAnswers = [...answers];
      errors.forEach((idx) => {
        if (updatedAnswers[idx] === shapes[idx].name) {
          setProgress((prev) => prev - (100 / shapes.length)); // Réduire la progression pour les erreurs
        }
        updatedAnswers[idx] = null;
      });
      setAnswers(updatedAnswers);
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez corriger les erreurs.");
    }
  };

  const handleNext = () => {
    setCurrentShapes((prev) => (prev + 3) % shapes.length);
  };

  const handlePrevious = () => {
    setCurrentShapes((prev) => (prev - 3 + shapes.length) % shapes.length);
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

  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

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

      <div className="absolute top-4 left-4 w-32 h-32">
        <svg className="transform -rotate-90" width="100%" height="100%">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="#e5e5e5"
            strokeWidth={strokeWidth}
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * progress) / 100}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-blue-500">{Math.round(progress)}%</span>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">Associer les Noms aux Formes</h1>

      {feedbackMessage && (
        <p
          className={`text-xl mb-4 ${
            feedbackMessage.includes("remplir toutes les réponses") || feedbackMessage.includes("incorrectes")
              ? "text-red-500"
              : "text-green-500"
          } text-center`}
        >
          {feedbackMessage}
        </p>
      )}

      <div className="flex flex-col items-center gap-8">
        {/* Zone des formes */}
        <div className="flex gap-8 justify-center mb-12">
          {shapes.slice(currentShapes, currentShapes + 3).map((shape, idx) => (
            <div
              key={idx}
              className={`w-32 h-32 border-2 ${
                errorIndices.includes(currentShapes + idx)
                  ? "border-red-500"
                  : "border-gray-500"
              } flex flex-col items-center justify-center`}
              onDrop={(e) => {
                e.preventDefault();
                handleDrop(idx, e.dataTransfer.getData("name"));
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              {drawShape(shape.sides)}
              <div>{shape.sides === 0 ? "Cercle" : `${shape.sides} côtés`}</div>
              {answers[currentShapes + idx] && (
                <div className="mt-2 text-sm font-bold text-blue-500">{answers[currentShapes + idx]}</div>
              )}
            </div>
          ))}
        </div>

        {/* Zone des noms des formes */}
        <div className="grid grid-cols-5 gap-4 mb-12">
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

        {/* Zone des boutons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handlePrevious}
            className="bg-gray-400 text-white py-2 px-6 rounded font-bold"
          >
            Précédent
          </button>
          <button
            onClick={handleValidation}
            className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
          >
            Valider les réponses
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-400 text-white py-2 px-6 rounded font-bold"
            disabled={errorIndices.length > 0}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShapesPracticePage;
