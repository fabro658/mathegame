"use client";

import React, { useState } from "react";
import Link from "next/link";

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
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const handleDrop = (index: number, droppedName: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = droppedName;
    setAnswers(updatedAnswers);
  };

  const handleValidation = () => {
    const allCorrect = shapes.every((shape, idx) => answers[idx] === shape.name);
    if (allCorrect) {
      alert("Bravo ! Vous avez tout réussi !");
    } else {
      alert("Certaines réponses sont incorrectes. Essayez encore !");
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

  const shapesToDisplay = shapes.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
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

      <div className="flex flex-col gap-6 items-center">
        {shapesToDisplay.map((shape, idx) => (
          <div
            key={idx}
            className="w-32 h-32 border-2 border-gray-500 flex flex-col items-center justify-center"
            onDrop={(e) => {
              e.preventDefault();
              handleDrop(currentPage * itemsPerPage + idx, e.dataTransfer.getData("name"));
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            {drawShape(shape.sides)}
            <div className="mt-2">{shape.sides === 0 ? "Cercle" : `${shape.sides} côtés`}</div>
            {answers[currentPage * itemsPerPage + idx] && (
              <div className="mt-2 text-sm font-bold text-blue-500">
                {answers[currentPage * itemsPerPage + idx]}
              </div>
            )}
          </div>
        ))}

        <div className="grid grid-cols-3 gap-4 mt-4">
          {shapesToDisplay.map((shape, idx) => (
            <div
              key={idx}
              className="p-2 border border-blue-500 cursor-pointer text-center"
              draggable
              onDragStart={(e) => e.dataTransfer.setData("name", shape.name)}
            >
              {shape.name}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          className="bg-gray-500 text-white py-2 px-4 rounded"
        >
          Précédent
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(shapes.length / itemsPerPage) - 1))
          }
          className="bg-gray-500 text-white py-2 px-4 rounded"
        >
          Suivant
        </button>
        <button
          onClick={handleValidation}
          className="bg-blue-500 text-white py-3 px-8 rounded font-bold"
        >
          Valider les réponses
        </button>
      </div>
    </div>
  );
};

export default ShapesPracticePage;
