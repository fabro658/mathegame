"use client";

import { useState } from "react";
import Link from "next/link";

interface PerimeterQuestion {
  id: number;
  context: string;
  width: number;
  height: number;
  unit: string;
  correctAnswer: number;
}

const generateQuestions = (): PerimeterQuestion[] => {
  return [
    {
      id: 1,
      context: "Voici un terrain de jeux rectangulaire pour enfants. Calcule son périmètre.",
      width: 20,
      height: 10,
      unit: "m",
      correctAnswer: 60,
    },
    {
      id: 2,
      context: "Une piscine rectangulaire doit être entourée d'une clôture. Quelle est la longueur totale nécessaire ?",
      width: 12,
      height: 8,
      unit: "m",
      correctAnswer: 40,
    },
    {
      id: 3,
      context: "Une maison carrée est décorée de guirlandes tout autour. Quelle est la longueur totale des guirlandes ?",
      width: 9,
      height: 9,
      unit: "m",
      correctAnswer: 36,
    },
    {
      id: 4,
      context: "Un petit jardin carré doit être bordé de pierres. Quelle est la longueur totale des bordures ?",
      width: 5,
      height: 5,
      unit: "m",
      correctAnswer: 20,
    },
    {
      id: 5,
      context: "Un terrain de basketball rectangulaire est peint. Quelle est la longueur du contour ?",
      width: 28,
      height: 15,
      unit: "m",
      correctAnswer: 86,
    },
    {
      id: 6,
      context: "Une piste d’athlétisme rectangulaire est mesurée pour une course. Quelle est sa circonférence ?",
      width: 50,
      height: 25,
      unit: "m",
      correctAnswer: 150,
    },
    {
      id: 7,
      context: "Une tente rectangulaire est installée. Quelle longueur de tissu faut-il pour en faire le tour ?",
      width: 6,
      height: 4,
      unit: "m",
      correctAnswer: 20,
    },
    {
      id: 8,
      context: "Une salle de classe rectangulaire doit être repeinte en bas de murs. Quelle est la longueur des murs ?",
      width: 10,
      height: 6,
      unit: "m",
      correctAnswer: 32,
    },
    {
      id: 9,
      context: "Une zone d'exposition rectangulaire est délimitée. Quelle est la longueur du ruban requis ?",
      width: 18,
      height: 9,
      unit: "m",
      correctAnswer: 54,
    },
    {
      id: 10,
      context: "Une mini-ferme rectangulaire est clôturée. Quelle est la longueur de clôture à installer ?",
      width: 25,
      height: 12,
      unit: "m",
      correctAnswer: 74,
    },
    {
      id: 11,
      context: "Un terrain de soccer mesure 100m de long et 60m de large. Calcule son périmètre.",
      width: 100,
      height: 60,
      unit: "m",
      correctAnswer: 320,
    },
    {
      id: 12,
      context: "Une aire de pique-nique est rectangulaire. Quelle est la longueur de son contour ?",
      width: 16,
      height: 10,
      unit: "m",
      correctAnswer: 52,
    },
    {
      id: 13,
      context: "Un enclos rectangulaire pour chèvres doit être clôturé. Quelle est la longueur totale ?",
      width: 30,
      height: 18,
      unit: "m",
      correctAnswer: 96,
    },
    {
      id: 14,
      context: "Une fontaine est placée au centre d’un carré pavé. Quelle est la longueur du contour pavé ?",
      width: 7,
      height: 7,
      unit: "m",
      correctAnswer: 28,
    },
    {
      id: 15,
      context: "Une cabane en bois a une base rectangulaire. Quelle est la longueur totale de sa base ?",
      width: 4,
      height: 3,
      unit: "m",
      correctAnswer: 14,
    },
    {
      id: 16,
      context: "Un potager rectangulaire est entouré d'une barrière. Quelle est la longueur totale de la barrière ?",
      width: 10,
      height: 5,
      unit: "m",
      correctAnswer: 30,
    },
    {
      id: 17,
      context: "Un tapis rectangulaire doit être bordé de franges. Quelle est la longueur de franges requise ?",
      width: 6,
      height: 2,
      unit: "m",
      correctAnswer: 16,
    },
    {
      id: 18,
      context: "Une scène rectangulaire est entourée de lumières. Quelle est la longueur totale de lumière ?",
      width: 14,
      height: 6,
      unit: "m",
      correctAnswer: 40,
    },
    {
      id: 19,
      context: "Un trampoline est posé dans un carré de sécurité. Calcule la longueur du carré.",
      width: 8,
      height: 8,
      unit: "m",
      correctAnswer: 32,
    },
    {
      id: 20,
      context: "Une zone d'atterrissage rectangulaire est mesurée pour les drones. Quelle est sa bordure ?",
      width: 22,
      height: 14,
      unit: "m",
      correctAnswer: 72,
    }
  ];
};

const TerrainIllustration = ({ width, height, unit }: { width: number; height: number; unit: string }) => (
  <svg width="300" height="200">
    <rect x="50" y="30" width="200" height="120" fill="#d1fae5" stroke="#059669" strokeWidth="4" />
    <text x="150" y="25" fontSize="14" textAnchor="middle" fill="#059669">
      {width} {unit}
    </text>
    <text
      x="45"
      y="90"
      fontSize="14"
      textAnchor="end"
      transform="rotate(-90 45,90)"
      fill="#059669"
    >
      {height} {unit}
    </text>
  </svg>
);

export default function PerimetrePractice() {
  const questions = generateQuestions();
  const totalQuestions = questions.length;

  const [answers, setAnswers] = useState<string[]>(Array(totalQuestions).fill(""));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isValidated, setIsValidated] = useState(false);

  const handleChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentPage] = value.trim();
    setAnswers(newAnswers);
    setFeedbackMessage("");
  };

  const handleValidation = () => {
    const currentAnswer = parseFloat(answers[currentPage].replace(',', '.'));
    const correctAnswer = questions[currentPage].correctAnswer;

    if (isNaN(currentAnswer)) {
      setFeedbackMessage("Veuillez entrer une valeur numérique valide.");
      return;
    }

    if (Math.abs(currentAnswer - correctAnswer) < 0.01) {
      if (currentPage < totalQuestions - 1) {
        setFeedbackMessage("Bonne réponse ! Passons à la suivante.");
        setTimeout(() => setCurrentPage(currentPage + 1), 1500);
      } else {
        setIsValidated(true);
        setFeedbackMessage("Bravo ! Vous avez terminé l'exercice.");
      }
    } else {
      setFeedbackMessage("Réponse incorrecte. Réessayez !");
    }
  };

  const currentQuestion = questions[currentPage];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-black p-4">
      <Link
        href="/menu/apprendre/perimetre"
        className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-3xl font-bold mb-4">Calcul de Périmètre</h1>
      <p className="text-lg mb-4 text-center max-w-xl">{currentQuestion.context}</p>
      <TerrainIllustration width={currentQuestion.width} height={currentQuestion.height} unit={currentQuestion.unit} />

      <div className="mt-6 flex flex-col items-center">
        <label className="text-lg mb-2">Quel est le périmètre ? (en {currentQuestion.unit})</label>
        <input
          type="text"
          value={answers[currentPage]}
          onChange={(e) => handleChange(e.target.value)}
          className="border border-gray-400 p-2 rounded w-32 text-center"
        />
      </div>

      {feedbackMessage && (
        <p
          className={`mt-4 text-xl font-bold ${feedbackMessage.includes("Bonne") || feedbackMessage.includes("Bravo") ? "text-green-600" : "text-red-500"}`}
        >
          {feedbackMessage}
        </p>
      )}

      {!isValidated && (
        <button
          onClick={handleValidation}
          className="mt-6 bg-blue-600 text-white py-2 px-6 rounded font-bold"
        >
          Valider
        </button>
      )}
    </div>
  );
}
