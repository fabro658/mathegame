"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Question {
  id: number;
  text: string;
  func: (x: number) => number;
  answerFunc: () => string;
}

const width = 300;
const height = 300;
const scale = 25; // 1 unité = 25 px
const originX = width / 2;
const originY = height / 2;

const generatePath = (f: (x: number) => number) => {
  let path = "";
  for (let px = 0; px <= width; px++) {
    const x = (px - originX) / scale;
    const y = f(x);
    const py = originY - y * scale;
    if (px === 0) path = `M ${px},${py}`;
    else path += ` L ${px},${py}`;
  }
  return path;
};

const renderCartesian = (f: (x: number) => number) => (
  <svg width={width} height={height} style={{ border: "1px solid #ddd", background: "white" }}>
    {/* Grille verticale */}
    {Array.from({ length: Math.floor(width / scale) }, (_, i) => i - 6).map((val, idx) => {
      const px = originX + val * scale;
      return <line key={idx} x1={px} y1={0} x2={px} y2={height} stroke="#ccc" strokeWidth={0.5} />;
    })}
    {/* Grille horizontale */}
    {Array.from({ length: Math.floor(height / scale) }, (_, i) => i - 6).map((val, idx) => {
      const py = originY - val * scale;
      return <line key={idx} x1={0} y1={py} x2={width} y2={py} stroke="#ccc" strokeWidth={0.5} />;
    })}
    {/* Axes */}
    <line x1={0} y1={originY} x2={width} y2={originY} stroke="black" strokeWidth={1} />
    <line x1={originX} y1={0} x2={originX} y2={height} stroke="black" strokeWidth={1} />
    {/* Graduations */}
    {Array.from({ length: 11 }, (_, i) => i - 5).map((val) => (
      <text key={`lx${val}`} x={originX + val * scale} y={originY + 12} fontSize="10" textAnchor="middle">
        {val}
      </text>
    ))}
    {Array.from({ length: 11 }, (_, i) => i - 5).map((val) => (
      <text key={`ly${val}`} x={originX + 12} y={originY - val * scale + 4} fontSize="10">
        {val}
      </text>
    ))}
    {/* Courbe */}
    <path d={generatePath(f)} stroke="blue" fill="none" strokeWidth={2} />
  </svg>
);

// Fonction pour générer aléatoirement les fonctions selon le type de question
const generateQuestionFunction = (id: number) => {
  switch (id) {
    // Droites
    case 1:
      const m1 = Math.floor(Math.random() * 5 + 1);
      const b1 = Math.floor(Math.random() * 11 - 5);
      return { func: (x: number) => m1 * x + b1, answerFunc: () => `${b1}` };
    case 2:
      const m2 = Math.floor(Math.random() * 7 - 3);
      const b2 = Math.floor(Math.random() * 11 - 5);
      return { func: (x: number) => m2 * x + b2, answerFunc: () => `${m2}` };
    case 3:
      const m3 = Math.random() * 2 - 1;
      const b3 = Math.floor(Math.random() * 11 - 5);
      return { func: (x: number) => m3 * x + b3, answerFunc: () => `${b3}` };

    // Paraboles
    case 4:
      const a4 = Math.floor(Math.random() * 3 + 1);
      const c4 = Math.floor(Math.random() * 11 - 5);
      return { func: (x: number) => a4 * x * x + c4, answerFunc: () => `${c4}` };
    case 5:
      const a5 = -Math.floor(Math.random() * 3 + 1);
      const b5 = Math.floor(Math.random() * 5 + 1);
      const c5 = Math.floor(Math.random() * 11 - 5);
      const xVertex5 = -b5 / (2 * a5);
      return { func: (x: number) => a5 * x * x + b5 * x + c5, answerFunc: () => `${xVertex5.toFixed(1)}` };
    case 6:
      const a6 = Math.floor(Math.random() * 3 + 1);
      const b6 = Math.floor(Math.random() * 7 - 3);
      const c6 = Math.floor(Math.random() * 11 - 5);
      const x6 = -b6 / (2 * a6);
      const y6 = a6 * x6 * x6 + b6 * x6 + c6;
      return { func: (x: number) => a6 * x * x + b6 * x + c6, answerFunc: () => `(${x6.toFixed(1)},${y6.toFixed(1)})` };

    // Constantes
    case 10:
      const c10 = Math.floor(Math.random() * 11 - 5);
      return { func: () => c10, answerFunc: () => `${c10}` };

    // Autres droites ou paraboles simples
    default:
      const m = Math.floor(Math.random() * 5 - 2);
      const b = Math.floor(Math.random() * 11 - 5);
      return { func: (x: number) => m * x + b, answerFunc: () => `${b}` };
  }
};

export default function TestFonctions() {
  const totalQuestions = 20;
  const questionsPerPage = 3;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (questions.length === 0) {
      const qs: Question[] = Array.from({ length: totalQuestions }, (_, i) => {
        const id = i + 1;
        const generated = generateQuestionFunction(id);
        let text = "";
        switch (id) {
          case 1: text = "Quelle est l’ordonnée à l’origine ?"; break;
          case 2: text = "Quelle est la pente de cette droite ?"; break;
          case 3: text = "Quelle est l’ordonnée à l’origine ?"; break;
          case 4: text = "Quelle est l’ordonnée à l’origine ?"; break;
          case 5: text = "Quelle est l’abscisse du sommet ?"; break;
          case 6: text = "Quel est le sommet (x, y) ?"; break;
          case 10: text = "Quelle est l’ordonnée à l’origine ?"; break;
          default: text = "Question sur la fonction"; break;
        }
        return { id, text, func: generated.func, answerFunc: generated.answerFunc };
      });
      setQuestions(qs);
      setAnswers(Array(totalQuestions).fill(""));
      setFeedback(Array(totalQuestions).fill(""));
    }
  }, [questions]);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const validateOne = (index: number) => {
    if (answers[index].trim() === questions[index].answerFunc()) {
      updateFeedback(index, "✅ Réponse correcte");
    } else {
      updateFeedback(index, "❌ Réponse erronée");
    }
  };

  const updateFeedback = (index: number, message: string) => {
    const newFeedback = [...feedback];
    newFeedback[index] = message;
    setFeedback(newFeedback);
  };

  const handlePrevious = () => { if (currentPage > 0) setCurrentPage(currentPage - 1); };
  const handleNext = () => { if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1); };

  const startIndex = currentPage * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  return (
    <div className="h-screen overflow-y-auto flex justify-center items-start bg-[#0b0c2a] text-white p-4 relative">
      <Link href="/menu/apprendre/fonctions" className="fixed bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold z-50">Apprendre</Link>
      <Link href="/secondaire/niveaux/niveau5" className="fixed top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-50">Retour</Link>

      <div className="max-w-4xl w-full bg-[#1e1f3d] p-6 rounded-lg shadow-lg pb-40 space-y-12">
        <h1 className="text-3xl font-bold text-center">Questions sur les fonctions</h1>

        {currentQuestions.map((q, i) => {
          const globalIndex = startIndex + i;
          return (
            <div key={q.id} className="bg-[#2a2c50] p-6 rounded-lg shadow-md border border-gray-600">
              <p className="text-lg font-bold mb-2">Question {globalIndex + 1} :</p>
              <div className="flex justify-center mb-4">{renderCartesian(q.func)}</div>
              <p className="mb-2">{q.text}</p>
              <div className="flex flex-col md:flex-row items-start gap-4">
                <input
                  type="text"
                  placeholder="Réponse"
                  className="flex-1 border border-gray-400 p-3 text-lg rounded w-full text-black"
                  value={answers[globalIndex]}
                  onChange={(e) => handleChange(globalIndex, e.target.value)}
                />
                <button onClick={() => validateOne(globalIndex)} className="text-blue-300 font-bold border border-blue-400 px-6 py-2 rounded hover:bg-blue-800">Valider</button>
                {feedback[globalIndex] && (
                  <span className={`text-lg font-semibold ${feedback[globalIndex].includes("correcte") ? "text-green-400" : "text-red-400"}`}>
                    {feedback[globalIndex]}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-4 right-4 bg-[#1e1f3d] border-t border-gray-700 shadow-md px-6 py-3 rounded-lg flex gap-6 z-50">
        <button onClick={handlePrevious} disabled={currentPage === 0} className={`px-6 py-2 rounded font-bold ${currentPage === 0 ? "bg-gray-600 text-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}>Page précédente</button>
        <button onClick={handleNext} disabled={currentPage === totalPages - 1} className={`px-6 py-2 rounded font-bold ${currentPage === totalPages - 1 ? "bg-gray-600 text-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}>Page suivante</button>
      </div>
    </div>
  );
}
