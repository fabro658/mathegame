import { useState } from "react";

export default function Addition() {
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(null)); // État des réponses (10 questions)
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [errors, setErrors] = useState<number[]>([]); // Indices des réponses incorrectes
  const questions = Array.from({ length: 10 }, (_, i) => ({
    num1: i + 1,
    num2: i + 1,
    correctAnswer: (i + 1) * 2,
  }));

  // Fonction pour gérer les changements dans les champs de réponse
  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = parseInt(value) || null;
    setAnswers(newAnswers);
  };

  // Fonction pour valider les réponses
  const handleValidation = () => {
    const incorrectAnswers = questions
      .map((q, index) => (answers[index] === q.correctAnswer ? null : index))
      .filter((i) => i !== null); // Trouver les indices des réponses incorrectes

    setErrors(incorrectAnswers as number[]);
    setIsValidated(true);
    setHasPassed(incorrectAnswers.length === 0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Addition</h1>

      {!isValidated && (
        <>
          {questions.map((q, index) => (
            <div key={index} className="mb-2">
              <label>
                {q.num1} + {q.num2} ={" "}
                <input
                  type="number"
                  className="border p-1"
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              </label>
            </div>
          ))}
          <button
            onClick={handleValidation}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Valider les réponses
          </button>
        </>
      )}

      {isValidated && (
        <>
          {hasPassed ? (
            <div>
              <p className="text-green-600 font-bold">Bravo ! Toutes vos réponses sont correctes.</p>
              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => {
                  // Redirection ou affichage des questions suivantes
                  alert("Prochaine série de questions !");
                }}
              >
                Passer aux questions 10 à 20
              </button>
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-bold">Certaines réponses sont incorrectes. Corrigez-les :</p>
              <ul className="text-red-500">
                {errors.map((index) => (
                  <li key={index}>
                    Question {index + 1}: {questions[index].num1} + {questions[index].num2}
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 bg-gray-500 text-white py-2 px-4 rounded"
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