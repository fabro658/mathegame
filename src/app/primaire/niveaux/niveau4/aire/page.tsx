"use client";

import { useState, useEffect } from "react";

type ShapeType = "carré" | "rectangle" | "triangle" | "trapèze" | "cercle";

interface Question {
  id: number;
  shape: ShapeType;
  context: string;
  dimensions: { [key: string]: number };
  correctAnswer: number;
  svg: React.ReactNode;
}

const getRandom = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateQuestion = (id: number): Question => {
  const shapes: ShapeType[] = ["carré", "rectangle", "triangle", "trapèze", "cercle"];
  const shape = shapes[getRandom(0, shapes.length - 1)];

  const studentNames = ["Léo", "Inès", "Nora", "Tarek", "Yanis", "Emma"];
  const name = studentNames[getRandom(0, studentNames.length - 1)];

  let context = "";
  let dimensions = {};
  let correctAnswer = 0;
  let svg: React.ReactNode = null;

  switch (shape) {
    case "carré": {
      const side = getRandom(3, 12);
      context = `${name} doit peindre une dalle carrée de ${side} cm de côté. Quelle est son aire ?`;
      dimensions = { side };
      correctAnswer = side * side;
      svg = (
        <svg width="120" height="120">
          <rect width="100" height="100" fill="#60a5fa" stroke="black" strokeWidth="2" />
          <text x="50" y="115" fontSize="12" textAnchor="middle">côté = {side} cm</text>
        </svg>
      );
      break;
    }
    case "rectangle": {
      const base = getRandom(4, 20);
      const height = getRandom(3, 15);
      context = `${name} découpe un rectangle de ${base} cm sur ${height} cm. Quelle est son aire ?`;
      dimensions = { base, height };
      correctAnswer = base * height;
      svg = (
        <svg width="150" height="100">
          <rect x="10" y="10" width="120" height="60" fill="#f87171" stroke="black" strokeWidth="2" />
          <text x="70" y="85" fontSize="12" textAnchor="middle">base = {base} cm</text>
          <text x="0" y="50" fontSize="12" transform="rotate(-90,0,50)">hauteur = {height} cm</text>
        </svg>
      );
      break;
    }
    case "triangle": {
      const base = getRandom(6, 14);
      const height = getRandom(4, 10);
      context = `${name} fabrique un panneau triangulaire avec une base de ${base} cm et une hauteur de ${height} cm. Quelle est son aire ?`;
      dimensions = { base, height };
      correctAnswer = (base * height) / 2;
      svg = (
        <svg width="150" height="120">
          <polygon points="20,100 130,100 75,20" fill="#34d399" stroke="black" strokeWidth="2" />
          <text x="75" y="115" fontSize="12" textAnchor="middle">base = {base} cm</text>
          <text x="60" y="60" fontSize="12" fill="red">hauteur = {height} cm</text>
        </svg>
      );
      break;
    }
    case "trapèze": {
      const base1 = getRandom(5, 12);
      const base2 = getRandom(8, 16);
      const height = getRandom(4, 10);
      context = `${name} doit recouvrir un sol en forme de trapèze avec des bases de ${base1} cm et ${base2} cm, et une hauteur de ${height} cm. Quelle est son aire ?`;
      dimensions = { base1, base2, height };
      correctAnswer = ((base1 + base2) * height) / 2;
      svg = (
        <svg width="200" height="120">
          <polygon points="60,30 140,30 160,100 40,100" fill="#fbbf24" stroke="black" strokeWidth="2" />
          <text x="100" y="115" fontSize="12" textAnchor="middle">hauteur = {height} cm</text>
          <text x="100" y="20" fontSize="12" textAnchor="middle">base1 = {base1} cm</text>
          <text x="100" y="105" fontSize="12" textAnchor="middle">base2 = {base2} cm</text>
        </svg>
      );
      break;
    }
    case "cercle": {
      const radius = getRandom(2, 10);
      context = `${name} trace un cercle de rayon ${radius} cm pour faire une décoration. Quelle est son aire ? (π ≈ 3.14)`;
      dimensions = { radius };
      correctAnswer = Math.round(3.14 * radius * radius * 100) / 100;
      svg = (
        <svg width="150" height="150">
          <circle cx="75" cy="75" r="60" fill="#a78bfa" stroke="black" strokeWidth="2" />
          <text x="75" y="75" fontSize="12" textAnchor="middle" fill="white">rayon = {radius} cm</text>
        </svg>
      );
      break;
    }
  }

  return { id, shape, context, dimensions, correctAnswer, svg };
};

export default function PracticeAreaQuestions() {
  const totalQuestions = 20;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>(Array(totalQuestions).fill(""));
  const [feedback, setFeedback] = useState<string[]>(Array(totalQuestions).fill(""));

  useEffect(() => {
    setQuestions(Array.from({ length: totalQuestions }, (_, i) => generateQuestion(i)));
  }, []);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const validateAnswers = () => {
    const newFeedback = questions.map((q, i) => {
      const given = parseFloat(answers[i]);
      if (isNaN(given)) return "Veuillez entrer un nombre";
      const correct = Math.round(q.correctAnswer * 100) / 100;
      return Math.abs(given - correct) < 0.01 ? " Correct !" : ` Faux, réponse : ${correct}`;
    });
    setFeedback(newFeedback);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Pratique : Calcul des aires</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {questions.map((q, i) => (
          <div key={q.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
            <p className="font-semibold text-lg mb-4">{i + 1}. {q.context}</p>
            <div className="flex justify-center mb-4">{q.svg}</div>
            <input
              type="number"
              placeholder="Votre réponse en cm²"
              className="w-full border border-gray-400 p-2 rounded mb-2"
              value={answers[i]}
              onChange={(e) => handleChange(i, e.target.value)}
            />
            {feedback[i] && (
              <p className={`mt-1 text-sm font-bold ${feedback[i].includes("Correct") ? "text-green-600" : "text-red-600"}`}>
                {feedback[i]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={validateAnswers}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
        >
          Valider mes réponses
        </button>
      </div>
    </div>
  );
}
