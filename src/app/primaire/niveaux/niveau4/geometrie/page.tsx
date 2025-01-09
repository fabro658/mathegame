import { useState } from "react";
import Link from "next/link";

const shapes = [
  { id: 1, name: "Triangle", sides: 3 },
  { id: 2, name: "Carré", sides: 4 },
  { id: 3, name: "Pentagone", sides: 5 },
  { id: 4, name: "Hexagone", sides: 6 },
  { id: 5, name: "Heptagone", sides: 7 },
  { id: 6, name: "Octogone", sides: 8 },
  { id: 7, name: "Ennéagone", sides: 9 },
  { id: 8, name: "Décagone", sides: 10 },
];

export default function GeometryRecognition() {
  const totalQuestions = 30; // Nombre total de questions
  const questionsPerPage = 3; // Questions affichées par vague
  const [answers, setAnswers] = useState<(string | null)[]>(new Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);

  // Gestion du drag and drop
  const handleDragStart = (event: React.DragEvent, name: string) => {
    event.dataTransfer.setData("text", name);
  };

  const handleDrop = (event: React.DragEvent, index: number) => {
    event.preventDefault();
    const draggedItem = event.dataTransfer.getData("text");
    const newAnswers = [...answers];
    newAnswers[index] = draggedItem;
    setAnswers(newAnswers);
  };

  const handleValidation = () => {
    const correctAnswers = [
      "Triangle", "Carré", "Pentagone", "Hexagone", "Heptagone", "Octogone", "Ennéagone", "Décagone",
    ];
    const correctCount = answers.filter((answer, index) => answer === correctAnswers[index]).length;
    setHasPassed(correctCount === totalQuestions);
    setIsValidated(true);
  };

  // Calcul du pourcentage de réussite
  const completionPercentage = (answers.filter((answer, index) => answer === shapes[index]?.name).length / totalQuestions) * 100;

  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;

  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
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
            strokeDashoffset={circumference - (circumference * completionPercentage) / 100}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-blue-500">{Math.round(completionPercentage)}%</span>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">Pratique de la Géométrie</h1>

      {!isValidated && (
        <>
          <div className="flex flex-col gap-6">
            {shapes.slice(startIndex, endIndex).map(({ name }, idx) => (
              <div key={idx} className="flex flex-col items-start gap-2">
                <div className="font-bold text-black">
                  Quelle forme a {shapes[startIndex + idx]?.sides} côtés ?
                </div>
                <div
                  className="border border-gray-400 p-6 rounded w-96 text-center text-black text-lg mx-auto"
                  onDrop={(e) => handleDrop(e, startIndex + idx)}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {answers[startIndex + idx] || "Déposez ici"}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={handlePreviousPage}
              className="bg-gray-500 text-white py-3 px-8 rounded font-bold"
              disabled={currentPage === 0}
            >
              Précédent
            </button>
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-3 px-8 rounded font-bold"
            >
              Valider les réponses
            </button>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white py-3 px-8 rounded font-bold"
              disabled={currentPage === Math.floor(totalQuestions / questionsPerPage) - 1}
            >
              Suivant
            </button>
          </div>
        </>
      )}

      {isValidated && (
        <>
          {hasPassed ? (
            <div>
              <p className="text-green-600 font-bold text-xl">Bravo ! Toutes vos réponses sont correctes.</p>
              <button
                className="mt-6 bg-blue-500 text-white py-3 px-8 rounded font-bold"
                onClick={handleNextPage}
              >
                Suivant
              </button>
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-bold text-xl">Certaines réponses sont incorrectes. Corrigez-les.</p>
              <button
                className="mt-6 bg-gray-500 text-white py-3 px-8 rounded font-bold"
                onClick={() => setIsValidated(false)}
              >
                Revenir pour corriger
              </button>
            </div>
          )}
        </>
      )}

      <div className="mt-6">
        <div className="flex gap-6">
          {shapes.map(({ name }) => (
            <div
              key={name}
              draggable
              onDragStart={(e) => handleDragStart(e, name)}
              className="bg-gray-300 p-4 rounded cursor-pointer"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
