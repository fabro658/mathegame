import { useState } from "react";

export default function Addition() {
  const totalQuestions = 50;
  const questionsPerPage = 10; // Nombre de questions par page
  const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null)); // État des réponses
  const [currentPage, setCurrentPage] = useState(0); // Page actuelle
  const [isValidated, setIsValidated] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);

  // Génération des questions et des réponses correctes
  const questions = Array.from({ length: totalQuestions }, (_, index) => {
    if (index < 10) return [index + 1, index + 1]; // Niveau 1 : Additions simples
    if (index < 20) return [10 + index - 9, 5 + index - 9]; // Niveau 2 : Nombres supérieurs à 10
    if (index < 30) return [10 + Math.floor(Math.random() * 41), Math.floor(Math.random() * 41)]; // Niveau 3
    if (index < 40) return [20 + Math.floor(Math.random() * 81), 20 + Math.floor(Math.random() * 81)]; // Niveau 4
    return [50 + Math.floor(Math.random() * 51), 50 + Math.floor(Math.random() * 51)]; // Niveau 5
  });

  const correctAnswers = questions.map(([a, b]) => a + b); // Réponses correctes

  // Calculer le pourcentage de réponses complétées
  const completedAnswers = answers.filter((answer) => answer !== null).length;
  const completionPercentage = Math.round((completedAnswers / totalQuestions) * 100);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    const parsedValue = parseInt(value);
    newAnswers[index] = isNaN(parsedValue) ? null : parsedValue;
    setAnswers(newAnswers);
  };

  const handleValidation = () => {
    // Vérifier que toutes les réponses de la page actuelle sont remplies
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageAnswers = answers.slice(startIndex, endIndex);

    if (pageAnswers.includes(null)) {
      alert("Veuillez remplir toutes les réponses sur cette page avant de valider.");
      return;
    }

    const allCorrect = pageAnswers.every((answer, index) => answer === correctAnswers[startIndex + index]);
    setIsValidated(true);
    setHasPassed(allCorrect);
  };

  const handleNextPage = () => {
    if (currentPage < Math.floor(totalQuestions / questionsPerPage)) {
      setCurrentPage(currentPage + 1);
      setIsValidated(false); // Réinitialiser la validation pour la page suivante
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsValidated(false); // Réinitialiser la validation pour revenir à la page précédente
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      {/* Suivi de la progression */}
      <div className="absolute top-4 left-4 bg-blue-500 text-white py-1 px-3 rounded font-bold">
        Progression : {completionPercentage}%
      </div>

      <h1 className="text-3xl font-bold mb-6">Addition</h1>

      {/* Afficher les questions de la page actuelle */}
      {!isValidated && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(([a, b], index) => (
              <div key={index} className="flex items-center gap-2">
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                  disabled
                >
                  {a} + {b}
                </button>
                <input
                  type="number"
                  className="border border-gray-400 p-2 rounded w-full text-center text-black"
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
            {currentPage < Math.floor(totalQuestions / questionsPerPage) && (
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

      {/* Résultat après validation */}
      {isValidated && (
        <>
          {hasPassed ? (
            <div>
              <p className="text-green-600 font-bold text-xl">Bravo ! Toutes vos réponses sont correctes.</p>
              <button
                className="mt-6 bg-blue-500 text-white py-2 px-6 rounded font-bold"
                onClick={() => alert("Vous avez complété toutes les questions !")}
              >
                Terminer
              </button>
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
