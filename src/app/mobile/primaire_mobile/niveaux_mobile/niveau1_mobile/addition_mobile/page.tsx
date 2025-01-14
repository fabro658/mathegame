import { useState } from "react";
import Link from "next/link";

export default function Addition() {
  // Déclarations des constantes
  const totalQuestions = 36;
  const questionsPerPage = 6; // 6 questions par page
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Génération des questions
  const questions = Array.from({ length: totalQuestions }, (_, index) => {
    if (index < 10) return [index + 1, index + 1]; // Niveau 1 : Additions simples
    if (index < 20) return [10 + index - 9, 5 + index - 9]; // Niveau 2
    if (index < 30) return [10 + Math.floor(Math.random() * 41), Math.floor(Math.random() * 41)]; // Niveau 3
    if (index < 40) return [20 + Math.floor(Math.random() * 81), 20 + Math.floor(Math.random() * 81)]; // Niveau 4
    return [50 + Math.floor(Math.random() * 51), 50 + Math.floor(Math.random() * 51)]; // Niveau 5
  });

  // Gestion des réponses
  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseInt(value);
    newAnswers[index] = isNaN(parsedValue) ? null : parsedValue;
    setAnswers(newAnswers);
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null)) {
      alert("Veuillez remplir toutes les réponses sur cette page avant de valider.");
      return;
    }

    const newAnswers = [...answers];

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      const [a, b] = questions[globalIndex];
      if (answer !== a + b) {
        newAnswers[globalIndex] = null;
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);
  };

  // Navigation
  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
      setIsValidated(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Boutons de navigation */}
      <Link
        href="/menu/apprendre/opérations arithmétiques"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/primaire/niveaux/niveau1"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      {/* Titre */}
      <h1 className="text-4xl font-bold mb-6">Addition</h1>

      {/* Questions et réponses */}
      {!isValidated && (
        <>
          <div className="flex flex-col gap-6">
            {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(([a, b], index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-xl">{a} + {b}</div>
                <input
                  type="text"
                  inputMode="numeric"
                  className="border border-gray-400 p-4 rounded w-32 text-center text-black text-lg"
                  value={answers[currentPage * questionsPerPage + index] || ""}
                  onChange={(e) => handleChange(currentPage * questionsPerPage + index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-3 px-6 rounded font-bold"
            >
              Valider les réponses
            </button>
          </div>
        </>
      )}

      {/* Résultats après validation */}
      {isValidated && (
        <>
          <p className={`text-xl font-bold ${answers.every((answer, index) => answer === questions[index][0] + questions[index][1]) ? 'text-green-600' : 'text-red-600'}`}>
            {answers.every((answer, index) => answer === questions[index][0] + questions[index][1])
              ? 'Bravo ! Toutes vos réponses sont correctes.'
              : 'Certaines réponses sont incorrectes. Corrigez-les.'}
          </p>
          <div className="mt-6 flex justify-center">
            <button
              className="bg-blue-500 text-white py-3 px-6 rounded font-bold"
              onClick={handleNextPage}
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  );
}
