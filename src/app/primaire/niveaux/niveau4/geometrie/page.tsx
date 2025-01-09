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
  { name: "Trapèze", sides: 4 },
  { name: "Cercle", sides: 0 },
];

const ShapesPracticePage = () => {
  const [answers, setAnswers] = useState<(string | null)[]>(new Array(shapes.length).fill(null));
  const [completed, setCompleted] = useState<boolean | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const shapesPerPage = 3;
  const totalPages = Math.ceil(shapes.length / shapesPerPage);

  const handleDrop = (index: number, droppedName: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = droppedName;
    setAnswers(updatedAnswers);
  };

  const handleValidation = () => {
    const startIndex = currentPage * shapesPerPage;
    const endIndex = startIndex + shapesPerPage;
    const currentShapes = shapes.slice(startIndex, endIndex);

    const allCorrect = currentShapes.every(
      (shape, idx) => answers[startIndex + idx] === shape.name
    );

    setCompleted(allCorrect);
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
    } else if (sides === 4 && shapes.some((shape) => shape.name === "Trapèze")) {
      return (
        <svg width="100" height="100" viewBox="0 0 100 100">
          <polygon points="30,90 70,90 90,50 10,50" fill="lightblue" stroke="black" strokeWidth="2" />
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

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const startIndex = currentPage * shapesPerPage;
  const endIndex = startIndex + shapesPerPage;
  const currentShapes = shapes.slice(startIndex, endIndex);

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
        <div className="flex gap-8">
          {currentShapes.map((shape, idx) => (
            <div
              key={startIndex + idx}
              className="w-48 h-48 border-2 border-gray-500 flex flex-col items-center justify-center"
              onDrop={(e) => {
                e.preventDefault();
                handleDrop(startIndex + idx, e.dataTransfer.getData("name"));
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              {drawShape(shape.sides)}
              <div>{shape.sides === 0 ? "Cercle" : `${shape.sides} côtés`}</div>
              {answers[startIndex + idx] && (
                <div className="mt-2 text-sm font-bold text-blue-500">{answers[startIndex + idx]}</div>
              )}

              {/* Options de noms à glisser */}
              <div className="flex flex-wrap justify-center mt-4 gap-2">
                {[shape.name, "Option 1", "Option 2", "Option 3"].map((option, i) => (
                  <div
                    key={i}
                    className="p-2 border border-blue-500 cursor-pointer text-center"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("name", option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Boutons de navigation */}
        <div className="flex justify-between w-full max-w-xl mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className="bg-gray-500 text-white py-2 px-6 rounded font-bold disabled:opacity-50"
          >
            Précédent
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className="bg-gray-500 text-white py-2 px-6 rounded font-bold disabled:opacity-50"
          >
            Suivant
          </button>
        </div>

        <button
          onClick={handleValidation}
          className="bg-blue-500 text-white py-3 px-8 rounded font-bold mt-6"
        >
          Valider les réponses
        </button>

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
    </div>
  );
};

export default ShapesPracticePage;
