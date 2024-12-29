"use client";

import { useState } from "react";

export default function Fractions() {
  const [num1, setNum1] = useState(""); // Numérateur de la première fraction
  const [denom1, setDenom1] = useState(""); // Dénominateur de la première fraction
  const [num2, setNum2] = useState(""); // Numérateur de la deuxième fraction
  const [denom2, setDenom2] = useState(""); // Dénominateur de la deuxième fraction
  const [operation, setOperation] = useState("+"); // Opération (addition ou soustraction)
  const [result, setResult] = useState<string>(""); // Résultat de l'opération
  const [error, setError] = useState<string>(""); // Message d'erreur

// Fonction pour calculer le plus grand commun diviseur (PGCD)
const gcd = (a: number, b: number): number => {
  while (b !== 0) {
    const temp = b; // Remplacer 'let' par 'const'
    b = a % b;
    a = temp;
  }
  return a;
};

  // Fonction pour simplifier la fraction
  const simplifyFraction = (numerator: number, denominator: number): string => {
    const divisor = gcd(numerator, denominator);
    return `${numerator / divisor}/${denominator / divisor}`;
  };

  // Fonction pour effectuer l'opération sur les fractions
  const handleOperation = () => {
    // Convertir les valeurs en nombres
    const n1 = parseFloat(num1);
    const d1 = parseFloat(denom1);
    const n2 = parseFloat(num2);
    const d2 = parseFloat(denom2);

    // Vérification des erreurs
    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2)) {
      setError("Les numérateurs et dénominateurs doivent être des nombres valides.");
      return;
    }

    if (d1 === 0 || d2 === 0) {
      setError("Les dénominateurs ne peuvent pas être zéro.");
      return;
    }

    setError(""); // Réinitialiser les erreurs

    let resultNumerator: number;
    let resultDenominator: number;

    // Effectuer l'opération d'addition ou de soustraction
    if (operation === "+") {
      resultNumerator = n1 * d2 + n2 * d1;
      resultDenominator = d1 * d2;
    } else if (operation === "-") {
      resultNumerator = n1 * d2 - n2 * d1;
      resultDenominator = d1 * d2;
    } else {
      setError("Opération non supportée");
      return;
    }

    // Simplifier la fraction
    const simplifiedResult = simplifyFraction(resultNumerator, resultDenominator);
    setResult(simplifiedResult);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <h1 className="text-3xl font-bold mb-6">Addition/Soustraction de Fractions</h1>

      {/* Formulaire de saisie des fractions */}
      <div className="mb-6">
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Numérateur 1"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            className="border border-gray-400 p-2 rounded w-24 text-center"
          />
          <input
            type="number"
            placeholder="Dénominateur 1"
            value={denom1}
            onChange={(e) => setDenom1(e.target.value)}
            className="border border-gray-400 p-2 rounded w-24 text-center"
          />
        </div>
        <div className="flex gap-4 mt-4">
          <input
            type="number"
            placeholder="Numérateur 2"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            className="border border-gray-400 p-2 rounded w-24 text-center"
          />
          <input
            type="number"
            placeholder="Dénominateur 2"
            value={denom2}
            onChange={(e) => setDenom2(e.target.value)}
            className="border border-gray-400 p-2 rounded w-24 text-center"
          />
        </div>
      </div>

      {/* Choix de l'opération */}
      <div className="mb-6">
        <label className="mr-2">Opération :</label>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="border border-gray-400 p-2 rounded"
        >
          <option value="+">Addition</option>
          <option value="-">Soustraction</option>
        </select>
      </div>

      {/* Affichage du résultat ou de l'erreur */}
      {error && <p className="text-red-600 font-bold">{error}</p>}
      {result && (
        <p className="text-green-600 font-bold text-xl mt-4">
          Résultat : {result}
        </p>
      )}

      {/* Bouton pour effectuer l'opération */}
      <button
        onClick={handleOperation}
        className="mt-6 bg-blue-500 text-white py-2 px-6 rounded font-bold"
      >
        Calculer
      </button>
    </div>
  );
}