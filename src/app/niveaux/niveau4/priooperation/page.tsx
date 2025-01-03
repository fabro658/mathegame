import { useState, useEffect } from "react";
import Link from "next/link";

export default function PrioOperation() {
  const totalQuestions = 36;
  const questionsPerPage = 6; // 3 colonnes x 2 lignes
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    // Génération des questions avec priorité des opérations
    const generateQuestions = () => {
      const operations = ["+", "-", "*", "/"];
      const questionsArray: string[] = [];
      
      for (let i = 0; i < totalQuestions; i++) {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const num3 = Math.floor(Math.random() * 10) + 1;
        const num4 = Math.floor(Math.random() * 10) + 1;
        const op1 = operations[Math.floor(Math.random() * operations.length)];
        const op2 = operations[Math.floor(Math.random() * operations.length)];
        const op3 = operations[Math.floor(Math.random() * operations.length)];
        const op4 = operations[Math.floor(Math.random() * operations.length)];

        // Facile : une parenthèse et une seule opération
        if (i < totalQuestions / 4) {
          questionsArray.push(`(${num1} ${op1} ${num2})`);
        }
        // Moyenne : deux opérations avec une parenthèse
        else if (i < totalQuestions / 2) {
          questionsArray.push(`(${num1} ${op1} ${num2}) ${op2} ${num3}`);
        }
        // Difficile : deux parenthèses et trois opérations
        else if (i < (3 * totalQuestions) / 4) {
          questionsArray.push(`(${num1} ${op1} ${num2}) ${op2} (${num3} ${op3} ${num4})`);
        }
        // Très difficile : deux sets de parenthèses et quatre opérations
        else {
          questionsArray.push(`(${num1} ${op1} (${num2} ${op2} ${num3})) ${op3} (${num4} ${op4} ${num1})`);
        }
      }

      setQuestions(questionsArray);
    };

    generateQuestions();
  }, []);

  const correctAnswers = questions.map((question) => {
    try {
      // Évaluer la chaîne mathématique
      return parseFloat(eval(question).toFixed(2)); // Limiter les décimales à 2
    } catch {
      return null;
    }
  });

  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseFloat(value);
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
    let allCorrect = true;

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      const correctAnswer = correctAnswers[globalIndex];
      if (answer !== correctAnswer) {
        allCorrect = false;
        newAnswers[globalIndex] = null;
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);
    setHasPassed(allCorrect);
  };

  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
      setIsValidated(false);
      setHasPassed(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsValidated(false);
      setHasPassed(false);
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
        href="/niveaux/niveau2"
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
          <span className="text-xl font-bold text-blue-500">{completionPercentage}%</span>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">Priorités des Opérations</h1>

      {!isValidated && (
        <>
          <div className="grid grid-cols-3 gap-6">
            {questions
              .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
              .map((question, index) => (
                <div key={index} className="flex items-center gap-4">
                  <button
                    className="bg-blue-500 text-white font-bold py-4 px-6 rounded w-full"
                    disabled
                  >
                    {question}
                  </button>
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

          <div className="mt-6 flex gap-4">
            {currentPage > 0 && (
              <button
                className="bg-gray-500 text-white py-2 px-6 rounded font-bold"
                onClick={handlePreviousPage}
              >
                Précédent
              </button>
            )}
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
            >
              Valider les réponses
            </button>
            {currentPage < Math.floor(totalQuestions / questionsPerPage) - 1 && (
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
                onClick={handleNextPage}
              >
                Suivant
              </button>
            )}
          </div>
        </>
      )}

      {isValidated && (
        <>
          {hasPassed ? (
            <div>
              <p className="text-green-600 font-bold text-xl">Bravo ! Toutes vos réponses sont correctes.</p>
              {currentPage < Math.floor(totalQuestions / questionsPerPage) - 1 ? (
                <button
                  className="mt-6 bg-blue-500 text-white py-2 px-6 rounded font-bold"
                  onClick={handleNextPage}
                >
                  Passer à la série suivante
                </button>
              ) : (
                <button
                  className="mt-6 bg-blue-500 text-white py-2 px-6 rounded font-bold"
                  onClick={() => alert("Vous avez complété toutes les questions !")}
                >
                  Terminer
                </button>
              )}
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-bold text-xl">Certaines réponses sont incorrectes. Corrigez-les.</p>
              <button
                className="mt-6 bg-gray-500 text-white py-2 px-6 rounded font-bold"
                onClick={() => setIsValidated(false)}
              >
                Revenir pour corriger
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
