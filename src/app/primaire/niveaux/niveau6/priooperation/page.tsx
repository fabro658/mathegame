'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Q = { questionText: string; correctAnswer: string };

export default function PrioOperation() {
  const totalQuestions = 36;
  const questionsPerPage = 6;

  // 6 pages de questions + 1 page coffre
  const totalQuestionPages = totalQuestions / questionsPerPage; // 6
  const totalPages = totalQuestionPages + 1; // 7 (dernière = coffre)
  const chestPageIndex = totalPages - 1; // 6

  // Progress circle
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  // Mot-code (6 lettres) révélé 1 lettre / page réussie
  // Tu peux changer pour PIRATE, TRESOR, etc (6 lettres)
  const CODE_WORD = "TRESOR";

  const [questions, setQuestions] = useState<Q[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(totalQuestions).fill(null));
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Pages complétées + indices (lettres)
  const [pagesCompleted, setPagesCompleted] = useState<boolean[]>(
    Array(totalQuestionPages).fill(false)
  );
  const [clues, setClues] = useState<(string | null)[]>(
    Array(totalQuestionPages).fill(null)
  );

  // Coffre
  const [chestInput, setChestInput] = useState<string[]>(
    Array(CODE_WORD.length).fill("")
  );
  const [chestOpened, setChestOpened] = useState(false);

  useEffect(() => {
    const generateQuestions = () => {
      return Array.from({ length: totalQuestions }, (_, index) => {
        let questionText = "", correctAnswer = "";

        if (index < 10) {
          const questionType = Math.floor(Math.random() * 5);
          switch (questionType) {
            case 0: questionText = "2 + 3 × 4 ?"; correctAnswer = "14"; break;
            case 1: questionText = "(2 + 3) × 4 ?"; correctAnswer = "20"; break;
            case 2: questionText = "2 × 3 + 4 ?"; correctAnswer = "10"; break;
            case 3: questionText = "6 - 2 × 3 ?"; correctAnswer = "0"; break;
            case 4: questionText = "(6 - 2) × 3 ?"; correctAnswer = "12"; break;
          }
        } else if (index < 20) {
          const a = Math.floor(Math.random() * 10) + 1;
          const b = Math.floor(Math.random() * 10) + 1;
          questionText = `${a} + ${b} × 2 ?`;
          correctAnswer = (a + b * 2).toString();
        } else {
          const base = Math.floor(Math.random() * 6) + 2;
          const exponent = Math.floor(Math.random() * 3) + 1;
          questionText = `${base}ⁿ avec n = ${exponent} ?`;
          correctAnswer = Math.pow(base, exponent).toString();

          if (Math.random() > 0.5) {
            const baseAlt = base + Math.floor(Math.random() * 4) + 1;
            questionText = `(${base} + ${baseAlt - base})ⁿ avec n = ${exponent} ?`;
            correctAnswer = Math.pow(baseAlt, exponent).toString();
          }
        }

        return { questionText, correctAnswer };
      });
    };

    setQuestions(generateQuestions());
  }, []);

  // Progression = nombre d'îles complétées / 6
  const islandsDone = pagesCompleted.filter(Boolean).length;
  const completionPercentage = Math.round((islandsDone / totalQuestionPages) * 100);

  const handleChange = (index: number, value: string): void => {
    const newAnswers = [...answers];
    newAnswers[index] = value.trim();
    setAnswers(newAnswers);
    setFeedbackMessage(null);
  };

  const giveClueForPage = (pageIndex: number) => {
    // 1 lettre par page réussie
    const letter = CODE_WORD[pageIndex] ?? "?";
    setClues((prev) => {
      const next = [...prev];
      next[pageIndex] = letter;
      return next;
    });
  };

  const handleValidation = (): void => {
    // Si on est sur la page coffre, on valide le coffre
    if (currentPage === chestPageIndex) {
      const entered = chestInput.join("").toUpperCase();
      const target = CODE_WORD.toUpperCase();

      if (entered.length !== target.length || chestInput.some((c) => c.trim() === "")) {
        setFeedbackMessage("Remplis toutes les cases du code avant d’ouvrir le coffre.");
        return;
      }

      if (entered === target) {
        setChestOpened(true);
        setFeedbackMessage("🎉 Bravo ! Le coffre s’ouvre… Trésor trouvé !");
      } else {
        setChestOpened(false);
        setFeedbackMessage("Code incorrect… Le coffre reste fermé. Réessaie !");
      }
      return;
    }

    // Sinon, validation normale des 6 questions de la page
    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;

    const pageAnswers = answers.slice(start, end);
    const correctAnswers = questions.slice(start, end).map((q) => q.correctAnswer);

    if (pageAnswers.some((ans) => !ans || ans.trim() === "")) {
      setFeedbackMessage("Veuillez remplir toutes les réponses avant de valider.");
      return;
    }

    const updatedAnswers = [...answers];
    const incorrect: number[] = [];

    pageAnswers.forEach((answer, i) => {
      const globalIndex = start + i;
      if (answer !== correctAnswers[i]) {
        updatedAnswers[globalIndex] = null;
        incorrect.push(globalIndex);
      }
    });

    setAnswers(updatedAnswers);
    setIncorrectAnswers(incorrect);

    if (incorrect.length === 0) {
      // Page réussie => île complétée + indice
      setPagesCompleted((prev) => {
        const next = [...prev];
        next[currentPage] = true;
        return next;
      });
      giveClueForPage(currentPage);

      const nextPage = currentPage + 1;

      // Si c'était la dernière page de questions, on va vers le coffre
      if (nextPage < totalPages) {
        setCurrentPage(nextPage);
      }

      if (nextPage === chestPageIndex) {
        setFeedbackMessage("🏴‍☠️ Parfait ! Tu as gagné l’indice… Direction le coffre !");
      } else {
        setFeedbackMessage("Toutes les réponses sont correctes ! Indice gagné ✅");
      }
    } else {
      setFeedbackMessage("Certaines réponses sont incorrectes. Veuillez réessayer.");
    }
  };

  const canGoNext = useMemo(() => {
    // Dans l’esprit chasse au trésor : on bloque l’île suivante tant que la page n’est pas parfaite
    if (currentPage >= totalQuestionPages) return true; // coffre
    return pagesCompleted[currentPage];
  }, [currentPage, pagesCompleted, totalQuestionPages]);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      // Option: autoriser quand même "Suivant" (mets true si tu veux libre navigation)
      // Ici: mode jeu = il faut réussir l'île actuelle
      if (currentPage < totalQuestionPages && !pagesCompleted[currentPage]) {
        setFeedbackMessage("🏝️ Termine cette île (tout correct) pour avancer !");
        return;
      }
      setCurrentPage(currentPage + 1);
      setFeedbackMessage(null);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setFeedbackMessage(null);
    }
  };

  const renderClueBar = () => {
    return (
      <div className="w-full max-w-5xl mb-6 bg-white/80 backdrop-blur rounded-xl p-4 shadow flex flex-col gap-2">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="font-bold text-lg text-black">
            🗺️ Indices de la carte (1 par île réussie)
          </div>
          <div className="text-sm font-semibold text-gray-700">
            Îles : {islandsDone}/{totalQuestionPages}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: totalQuestionPages }).map((_, i) => {
            const value = clues[i];
            const done = pagesCompleted[i];

            return (
              <div
                key={i}
                className={`w-12 h-12 rounded-lg flex items-center justify-center font-extrabold text-xl
                  ${done ? "bg-yellow-200 border-2 border-yellow-500 text-black" : "bg-gray-200 border-2 border-gray-300 text-gray-500"}
                `}
                title={done ? `Indice trouvé: ${value}` : "Indice non trouvé"}
              >
                {done ? value : "?"}
              </div>
            );
          })}
        </div>

        <div className="text-sm text-gray-700">
          Quand tu as tous les indices, va à la dernière page et ouvre le coffre !
        </div>
      </div>
    );
  };

  const renderChestPage = () => {
    const allCluesFound = pagesCompleted.every(Boolean);

    return (
      <div className="w-full max-w-5xl">
        <div className="bg-white/85 backdrop-blur rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-extrabold text-black mb-2">
            🧰 Le Coffre du Capitaine
          </h2>
          <p className="text-gray-700 mb-6">
            Entre le code avec les lettres trouvées sur les îles.
          </p>

          {!allCluesFound && (
            <div className="mb-6 p-4 rounded-lg bg-orange-100 border border-orange-300 text-orange-800 font-semibold">
              ⚠️ Il te manque des indices. Retourne compléter toutes les îles !
            </div>
          )}

          <div className="flex items-center justify-center mb-6">
            <div
              className={`w-full max-w-md rounded-2xl p-6 border-4 ${
                chestOpened ? "border-yellow-500 bg-yellow-50" : "border-gray-400 bg-gray-50"
              }`}
            >
              <div className="text-center font-extrabold text-lg mb-4 text-black">
                {chestOpened ? "COFFRE OUVERT ✅" : "COFFRE VERROUILLÉ 🔒"}
              </div>

              <div className="flex justify-center gap-2 flex-wrap">
                {Array.from({ length: CODE_WORD.length }).map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center text-2xl font-extrabold border rounded-lg"
                    value={chestInput[i]}
                    onChange={(e) => {
                      const v = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
                      setChestInput((prev) => {
                        const next = [...prev];
                        next[i] = v;
                        return next;
                      });
                      setFeedbackMessage(null);
                      setChestOpened(false);
                    }}
                    disabled={!allCluesFound}
                  />
                ))}
              </div>

              <div className="mt-4 text-center text-sm text-gray-600">
                Astuce : les cases en haut de la page montrent les lettres gagnées.
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handlePreviousPage}
              className="bg-gray-500 text-white py-3 px-6 rounded font-bold"
            >
              Précédent
            </button>
            <button
              onClick={handleValidation}
              className={`py-3 px-6 rounded font-bold text-white ${
                allCluesFound ? "bg-yellow-600 hover:bg-yellow-700" : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!allCluesFound}
            >
              Ouvrir le coffre
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen font-fredoka overflow-hidden bg-blue-100">

      <div className="circle">
        <div className="ocean">
          {/* Nuages séparés */}
          <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
            <div className="cloud absolute top-[30px] left-[40px] scale-[0.5]" />
            <div className="cloud absolute top-[50px] left-[50%] -translate-x-1/2 scale-[0.8]" />
          </div>

          <div className="body">
            <div className="wing">
              <div className="tail"></div>
            </div>
            <div className="box">
              <div className="head"></div>
              <div className="neck"></div>
              <div className="bec"></div>
            </div>
          </div>
        </div>
        {/* Mer */}
        <div className="water"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-32">
        {/* Liens */}
        <Link
          href="/menu/apprendre"
          className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold z-20"
        >
          Apprendre
        </Link>
        <Link
          href="/primaire/niveaux/niveau6"
          className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-20"
        >
          Retour
        </Link>

        {/* Progression (sans %) */}
        <div className="absolute top-4 left-4 w-32 h-32 z-20">
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
            <span className="text-sm font-extrabold text-blue-700">
              Îles {islandsDone}/{totalQuestionPages}
            </span>
          </div>
        </div>

        {/* Titre */}
        <h1 className="text-3xl font-bold mb-4 text-black">Priorités des Opérations</h1>

        {/* Indices (en haut) */}
        {renderClueBar()}

        {/* Feedback */}
        {feedbackMessage && (
          <p
            className={`text-xl mb-4 text-center ${
              feedbackMessage.includes("incorrectes") ||
              feedbackMessage.includes("remplir") ||
              feedbackMessage.includes("bloqué") ||
              feedbackMessage.includes("manque")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {feedbackMessage}
          </p>
        )}

        {/* Contenu: questions OU coffre */}
        {currentPage === chestPageIndex ? (
          renderChestPage()
        ) : (
          <>
            {/* Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-5xl">
              {questions
                .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
                .map((question, i) => {
                  const index = currentPage * questionsPerPage + i;
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <button className="bg-blue-500 text-white font-bold py-4 px-6 rounded w-full" disabled>
                        {question.questionText}
                      </button>
                      <input
                        type="text"
                        className={`border p-4 rounded w-32 text-center text-lg ${
                          incorrectAnswers.includes(index) ? "border-red-500" : ""
                        }`}
                        value={answers[index] || ""}
                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                    </div>
                  );
                })}
            </div>

            {/* Navigation */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={handlePreviousPage}
                className="bg-gray-500 text-white py-3 px-6 rounded font-bold"
              >
                Précédent
              </button>

              <button
                onClick={handleValidation}
                className="bg-blue-500 text-white py-3 px-6 rounded font-bold"
              >
                Valider
              </button>

              <button
                onClick={handleNextPage}
                className={`py-3 px-6 rounded font-bold text-white ${
                  canGoNext ? "bg-blue-500" : "bg-blue-300"
                }`}
              >
                Suivant
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
