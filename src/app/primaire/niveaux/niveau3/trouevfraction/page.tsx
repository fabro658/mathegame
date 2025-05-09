'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FractionCircle,
  FractionIllustration_1_2,
  FractionIllustration_1_3,
  FractionIllustration_1_4,
  FractionIllustration_1_5,
  FractionIllustration_1_6,
  FractionIllustration_1_7,
  FractionIllustration_1_8,
  FractionIllustration_1_9,
  FractionIllustration_1_10,
  FractionIllustration_2_3,
  FractionIllustration_3_4,
  FractionIllustration_4_5,
  FractionIllustration_5_6,
  FractionIllustration_7_8,
  FractionIllustration_9_10,
} from './FractionCircle';


const radius = 50;
const strokeWidth = 10;
const circumference = 2 * Math.PI * radius;

const fractionComponents = [
  { component: <FractionIllustration_1_2 />, answer: '1/2' },
  { component: <FractionIllustration_1_3 />, answer: '1/3' },
  { component: <FractionIllustration_1_4 />, answer: '1/4' },
  { component: <FractionIllustration_1_5 />, answer: '1/5' },
  { component: <FractionIllustration_1_6 />, answer: '1/6' },
  { component: <FractionIllustration_1_7 />, answer: '1/7' },
  { component: <FractionIllustration_1_8 />, answer: '1/8' },
  { component: <FractionIllustration_1_9 />, answer: '1/9' },
  { component: <FractionIllustration_1_10 />, answer: '1/10' },
  { component: <FractionIllustration_2_3 />, answer: '2/3' },
  { component: <FractionIllustration_3_4 />, answer: '3/4' },
  { component: <FractionIllustration_4_5 />, answer: '4/5' },
  { component: <FractionIllustration_5_6 />, answer: '5/6' },
  { component: <FractionIllustration_7_8 />, answer: '7/8' },
  { component: <FractionIllustration_9_10 />, answer: '9/10' },
];

export default function FractionRecognitionQuiz() {
  const totalQuestions = fractionComponents.length;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<string[]>(Array(totalQuestions).fill(''));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const completedAnswers = answers.filter((a) => a !== '').length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  const normalizeAnswer = (answer: string): string => {
    return answer.replace(/\s+/g, '').toLowerCase();
  };

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
    setFeedbackMessage('');
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes('')) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    let hasErrors = false;
    const newAnswers = [...answers];

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      const { answer: correctAnswer } = fractionComponents[globalIndex];

      if (normalizeAnswer(answer) !== normalizeAnswer(correctAnswer)) {
        newAnswers[globalIndex] = '';
        hasErrors = true;
      }
    });

    setAnswers(newAnswers);

    if (hasErrors) {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez corriger les erreurs.");
    } else if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setFeedbackMessage("Toutes les réponses sont correctes. Continue !");
      setCurrentPage(currentPage + 1);
    } else {
      setFeedbackMessage("Bravo ! Vous avez terminé toutes les questions.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link
        href="/menu/apprendre/fraction"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >Apprendre</Link>

      <Link
        href="/primaire/niveaux/niveau3"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >Retour</Link>

      <div className="absolute top-4 left-4 w-32 h-32">
        <svg className="transform -rotate-90" width="100%" height="100%">
          <circle cx="50%" cy="50%" r={radius} fill="none" stroke="#e5e5e5" strokeWidth={strokeWidth} />
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
          <span className="text-xl font-bold text-blue-500">{completionPercentage}%</span>
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-6">Quelle est cette fraction ?</h1>

      {feedbackMessage && (
        <p className={`text-xl mb-4 ${feedbackMessage.includes('incorrectes') ? 'text-red-500' : 'text-green-500'} text-center`}>
          {feedbackMessage}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {fractionComponents.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ component }, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            {component}
            <input
              type="text"
              className="border border-gray-400 p-4 rounded w-32 text-center text-black text-lg"
              value={answers[currentPage * questionsPerPage + index]}
              onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <button onClick={handleValidation} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">Valider</button>
        {currentPage > 0 && (
          <button onClick={() => setCurrentPage(currentPage - 1)} className="bg-gray-500 text-white py-3 px-6 rounded font-bold">Précédent</button>
        )}
        {currentPage < Math.floor(totalQuestions / questionsPerPage) - 1 && (
          <button onClick={() => setCurrentPage(currentPage + 1)} className="bg-blue-500 text-white py-3 px-6 rounded font-bold">Suivant</button>
        )}
      </div>
    </div>
  );
}
