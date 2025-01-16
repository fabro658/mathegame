import { useState, useEffect } from "react";
import Link from "next/link";

type Question = {
  type: "compare";
  numbers: [number, number];
  correctAnswer: string;
};

export default function ComparerEntiers() {
  const totalQuestions = 36;
  const questionsPerPage = 6;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const generateQuestions = (): Question[] => {
    return Array.from({ length: totalQuestions }, () => {
      const number1 = Math.floor(Math.random() * 100) + 1;
      const number2 = Math.floor(Math.random() * 100) + 1;
      const correctAnswer = number1 > number2 ? ">" : number1 < number2 ? "<" : "=";
      return { type: "compare", numbers: [number1, number2], correctAnswer };
    });
  };

  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  const handleAnswer = (globalIndex: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[globalIndex] = value;
    setAnswers(updatedAnswers);
  };

  const handleValidation = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null)) {
      alert("Veuillez répondre à toutes les questions avant de valider.");
      return;
    }

    const newAnswers = [...answers];
    let allCorrect = true;

    pageAnswers.forEach((answer, index) => {
      const globalIndex = startIndex + index;
      if (questions[globalIndex] && answer !== questions[globalIndex].correctAnswer) {
        allCorrect = false;
        newAnswers[globalIndex] = null;
      }
    });

    setAnswers(newAnswers);
    setIsValidated(true);
    setHasPassed(allCorrect);
  };

  const currentQuestions = questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link
        href="/menu/apprendre"
        className="absolute top-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/primaire/niveaux/niveau2"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-3xl font-bold mb-6">Comparaison</h1>

      {!isValidated && (
        <>
          <div className="flex flex-col items-center justify-center gap-6 mb-6">
            {currentQuestions.map((question, localIndex) => {
              const globalIndex = currentPage * questionsPerPage + localIndex;
              return (
                <div key={globalIndex} className="bg-white p-4 rounded shadow-md text-center">
                  <p className="text-lg font-bold mb-4">
                    {`${question.numbers[0]} ? ${question.numbers[1]}`}
                  </p>
                  <select
                    value={answers[globalIndex] || ""}
                    onChange={(e) => handleAnswer(globalIndex, e.target.value)}
                    className="py-2 px-4 rounded border-gray-300"
                  >
                    <option value="" disabled>
                      Choisissez
                    </option>
                    <option value="<">&lt;</option>
                    <option value=">">&gt;</option>
                    <option value="=">=</option>
                  </select>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleValidation}
              className="bg-blue-500 text-white py-2 px-6 rounded"
            >
              Valider
            </button>
          </div>
        </>
      )}

      {isValidated && (
        <div className="flex justify-center items-center mt-4">
          {hasPassed ? (
            <p className="text-green-500 font-bold text-lg">
              Toutes les réponses sont correctes !
            </p>
          ) : (
            <p className="text-red-500 font-bold text-lg">
              Certaines réponses sont incorrectes.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
