"use client";

import { useState } from "react";
import Link from "next/link";

export default function PrioriteOperation() {
  const [showExample, setShowExample] = useState(false);
  const [exampleIndex, setExampleIndex] = useState(1); // de 1 à 4

  const totalExamples = 4;

  const nextExample = () => {
    setExampleIndex((prev) => (prev === totalExamples ? 1 : prev + 1));
  };

  return (
    <main className="flex min-h-screen bg-gray-100 text-black">
      {/* Barre latérale */}
      <div className="w-1/4 bg-white p-6 shadow-lg relative">
        <Link href="/menu/apprendre" className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold">Retour</Link>


        <h1 className="text-3xl font-bold mb-6 text-center mt-20">Priorité des opérations</h1>

        <p className="text-lg text-center mb-6">
          Apprends l&rsquo;ordre dans lequel on fait les opérations&nbsp;:
        </p>

        <div className="text-left text-md space-y-2 mb-8">
          <p><strong>P</strong> : Parenthèses</p>
          <p><strong>E</strong> : Exposants</p>
          <p><strong>M</strong> : Multiplication</p>
          <p><strong>D</strong> : Division</p>
          <p><strong>A</strong> : Addition</p>
          <p><strong>S</strong> : Soustraction</p>
        </div>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded font-bold hover:bg-green-700 transition-all"
          onClick={() => setShowExample(!showExample)}
        >
          {showExample ? "Cacher l’exemple" : "Montrer l'exemple"}
        </button>
      </div>

      {/* Colonne centrale */}
      <div className="w-full sm:w-3/4 p-8">
        <div className="bg-white p-6 rounded-lg shadow-lg min-h-[70vh]">
          {!showExample && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-center">Règle PEMDAS</h2>
              <p className="text-lg text-center">
                En mathématiques, on suit toujours un ordre pour résoudre les calculs.
                <br /> On utilise l&rsquo;acronyme <strong>PEMDAS</strong>, pour se rappeler de l&rsquo;ordre dans lequel résoudre les opérations&nbsp;:
              </p>
              <ul className="list-disc pl-8 mt-4 text-md space-y-1">
                <li>Parenthèses</li>
                <li>Exposants</li>
                <li>Multiplication</li>
                <li>Division</li>
                <li>Addition</li>
                <li>Soustraction</li>
              </ul>
            </div>
          )}

          {showExample && (
            <div className="space-y-6 min-h-[400px] flex flex-col justify-between">
            {exampleIndex === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Exemple 1&nbsp;: sans exposants</h2>
                  <p className="text-lg mb-2">
                    Résolvons&nbsp;: <strong>2 + 3 × (4 + 1)</strong>
                  </p>
                  <ol className="list-decimal space-y-2 pl-6 text-md">
                    <li>On commence par les parenthèses&nbsp;: (4 + 1) = 5</li>
                    <li>On fait la multiplication&nbsp;: 3 × 5 = 15</li>
                    <li>On termine avec l&rsquo;addition&nbsp;: 2 + 15 = <strong>17</strong></li>
                  </ol>
                </div>
              )}

              {exampleIndex === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Exemple 2&nbsp;: avec exposants</h2>
                  <p className="text-lg mb-2">
                    Résolvons&nbsp;: <strong>(2 + 1)² + 4</strong>
                  </p>
                  <ol className="list-decimal space-y-2 pl-6 text-md">
                    <li>On commence par les parenthèses&nbsp;: (2 + 1) = 3</li>
                    <li>Puis les exposants&nbsp;: 3² = 9</li>
                    <li>On termine avec l&rsquo;addition&nbsp;: 9 + 4 = <strong>13</strong></li>
                  </ol>
                </div>
              )}

              {exampleIndex === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Exemple 3&nbsp;: division et addition</h2>
                  <p className="text-lg mb-2">
                    Résolvons&nbsp;: <strong>12 ÷ 3 + 5</strong>
                  </p>
                  <ol className="list-decimal space-y-2 pl-6 text-md">
                    <li>On commence par la division&nbsp;: 12 ÷ 3 = 4</li>
                    <li>Puis l&rsquo;addition&nbsp;: 4 + 5 = <strong>9</strong></li>
                  </ol>
                </div>
              )}

              {exampleIndex === 4 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Exemple 4&nbsp;: parenthèses imbriquées et exposants</h2>
                  <p className="text-lg mb-2">
                    Résolvons&nbsp;: <strong>((1 + 2)² + 1) × 2</strong>
                  </p>
                  <ol className="list-decimal space-y-2 pl-6 text-md">
                    <li>On commence par les parenthèses internes&nbsp;: (1 + 2) = 3</li>
                    <li>Puis l&rsquo;exposant&nbsp;: 3² = 9</li>
                    <li>On ajoute 1&nbsp;: 9 + 1 = 10</li>
                    <li>On multiplie par 2&nbsp;: 10 × 2 = <strong>20</strong></li>
                  </ol>
                </div>
              )}

              {/* Bouton suivant */}
              <div className="text-center">
                <button
                  onClick={nextExample}
                  className="mt-4 bg-blue-500 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
                >
                  Voir l’exemple suivant
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
