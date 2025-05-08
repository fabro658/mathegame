'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const allShapes = [
  { name: 'Triangle', sides: 3 },
  { name: 'Carré', sides: 4 },
  { name: 'Cercle', sides: 0 },
  { name: 'Rectangle', sides: 4 },
  { name: 'Pentagone', sides: 5 },
  { name: 'Hexagone', sides: 6 },
  { name: 'Heptagone', sides: 7 },
  { name: 'Octogone', sides: 8 },
  { name: 'Nonagone', sides: 9 },
  { name: 'Trapèze', sides: 4 },
];

const totalQuestions = 30;
const questionsPerPage = 3;

const ShapesPracticePage = () => {
  const [shapes, setShapes] = useState<{ name: string; sides: number }[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [errorIndices, setErrorIndices] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    const generateRandomShapes = () => {
      const result: { name: string; sides: number }[] = [];
      for (let i = 0; i < totalQuestions / questionsPerPage; i++) {
        const shuffled = [...allShapes].sort(() => Math.random() - 0.5);
        result.push(...shuffled.slice(0, questionsPerPage));
      }
      return result;
    };

    setShapes(generateRandomShapes());
  }, []);

  const handleDrop = (index: number, droppedName: string) => {
    const globalIndex = currentPage * questionsPerPage + index;
    const updatedAnswers = [...answers];

    // Mise à jour progression
    if (shapes[globalIndex].name === droppedName) {
      if (updatedAnswers[globalIndex] !== shapes[globalIndex].name) {
        setProgress((prev) => prev + 100 / totalQuestions);
      }
    } else if (updatedAnswers[globalIndex] === shapes[globalIndex].name) {
      setProgress((prev) => prev - 100 / totalQuestions);
    }

    updatedAnswers[globalIndex] = droppedName;
    setAnswers(updatedAnswers);
    setFeedbackMessage(null);
  };

  const handleValidation = () => {
    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;

    const currentAnswers = answers.slice(start, end);
    const errors: number[] = [];

    if (currentAnswers.includes(null)) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    for (let i = start; i < end; i++) {
      if (answers[i] !== shapes[i].name) {
        errors.push(i);
      }
    }

    if (errors.length === 0) {
      setErrorIndices([]);
      setFeedbackMessage("Toutes les réponses de cette page sont correctes !");
    } else {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez corriger les erreurs.");
      const updatedAnswers = [...answers];
      errors.forEach((i) => {
        if (updatedAnswers[i] === shapes[i].name) {
          setProgress((prev) => prev - 100 / totalQuestions);
        }
        updatedAnswers[i] = null;
      });
      setAnswers(updatedAnswers);
      setErrorIndices(errors);
    }
  };

  const handleNext = () => {
    if ((currentPage + 1) * questionsPerPage < totalQuestions) {
      setCurrentPage(currentPage + 1);
      setErrorIndices([]);
      setFeedbackMessage(null);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setErrorIndices([]);
      setFeedbackMessage(null);
    }
  };

  const drawShape = (sides: number, name: string) => {
    const points = [];
    const centerX = 50;
    const centerY = 50;
    const radius = 40;

    if (sides === 0) {
      return <circle cx="50" cy="50" r="40" fill="lightblue" stroke="black" strokeWidth="2" />;
    }

    if (name === "Rectangle") {
      return <rect x="20" y="30" width="60" height="40" fill="lightblue" stroke="black" strokeWidth="2" />;
    }

    if (name === "Carré") {
      return <rect x="30" y="30" width="40" height="40" fill="lightblue" stroke="black" strokeWidth="2" />;
    }

    if (name === "Trapèze") {
      return <polygon points="20,80 80,80 60,20 40,20" fill="lightblue" stroke="black" strokeWidth="2" />;
    }

    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }

    return <polygon points={points.join(" ")} fill="lightblue" stroke="black" strokeWidth="2" />;
  };

  const currentShapes = shapes.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage);
  const radiusCircle = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radiusCircle;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link href="/menu/apprendre" className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold">Apprendre</Link>
      <Link href="/primaire/niveaux/niveau4" className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold">Retour</Link>

      {/* Progress Circle */}
      <div className="absolute top-4 left-4 w-32 h-32">
        <svg className="transform -rotate-90" width="100%" height="100%">
          <circle cx="50%" cy="50%" r={radiusCircle} fill="none" stroke="#e5e5e5" strokeWidth={strokeWidth} />
          <circle
            cx="50%"
            cy="50%"
            r={radiusCircle}
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
        <p className={`text-xl mb-4 text-center ${
          /remplir toutes les réponses|incorrectes/i.test(feedbackMessage)
            ? 'text-red-500'
            : 'text-green-500'
        }`}>
          {feedbackMessage}
        </p>
      )}

      {/* Formes à associer */}
      <div className="flex gap-8 justify-center mb-12">
        {currentShapes.map((shape, idx) => {
          const globalIndex = currentPage * questionsPerPage + idx;
          return (
            <div
              key={idx}
              className={`w-32 h-32 border-2 ${
                errorIndices.includes(globalIndex) ? 'border-red-500' : 'border-gray-500'
              } flex flex-col items-center justify-center`}
              onDrop={(e) => {
                e.preventDefault();
                handleDrop(idx, e.dataTransfer.getData("name"));
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <svg width="100" height="100" viewBox="0 0 100 100">
                {drawShape(shape.sides, shape.name)}
              </svg>
              <div>{shape.sides === 0 ? "Cercle" : `${shape.sides} côtés`}</div>
              {answers[globalIndex] && (
                <div className="mt-2 text-sm font-bold text-blue-500">{answers[globalIndex]}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Noms des formes à glisser */}
      <div className="grid grid-cols-5 gap-4 mb-12">
        {allShapes.map((shape, idx) => (
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

      {/* Boutons de navigation */}
      <div className="flex gap-4 mt-8">
        <button onClick={handlePrevious} className="bg-gray-400 text-white py-2 px-6 rounded font-bold" disabled={currentPage === 0}>
          Précédent
        </button>
        <button onClick={handleValidation} className="bg-blue-500 text-white py-2 px-6 rounded font-bold">
          Valider les réponses
        </button>
        <button onClick={handleNext} className="bg-gray-400 text-white py-2 px-6 rounded font-bold" disabled={currentPage === Math.floor(totalQuestions / questionsPerPage) - 1}>
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ShapesPracticePage;
