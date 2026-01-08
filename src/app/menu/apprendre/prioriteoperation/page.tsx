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
    <main className="flex min-h-screen bg-gray-100 text-black relative">
      {/* Bouton retour global en haut à droite */}
      <Link
        href="/menu/apprendre"
        className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded font-bold z-20"
      >
        Retour
      </Link>

      {/* Barre latérale */}
      <div className="w-1/4 bg-white p-6 shadow-lg pt-24">
        <h1 className="text-3xl font-bold mb-6 text-center mt-20">
          Priorité des opérations
        </h1>

        <p className="text-lg text-center mb-6">
          Apprends l&rsquo;ordre dans lequel on fait les opérations&nbsp;:
        </p>

        <div className="text-left text-md space-y-2 mb-8">
          <p>
            <strong>P</strong> : Parenthèses
          </p>
          <p>
            <strong>E</strong> : Exposants
          </p>
          <p>
            <strong>M</strong> : Multiplication
          </p>
          <p>
            <strong>D</strong> : Division
          </p>
          <p>
            <strong>A</strong> : Addition
          </p>
          <p>
            <strong>S</strong> : Soustraction
          </p>
        </div>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded font-bold hover:bg-green-700 transition-all"
          onClick={() => setShowExample(!showExample)}
        >
          {showExample ? "Cacher l’exemple" : "Montrer l'exemple"}
        </button>
      </div>

      {/* Colonne centrale */}
<div className="w-full sm:w-3/4 p-8 mt-20">
        <div className="bg-white p-6 rounded-lg shadow-lg min-h-[70vh]">
          {!showExample && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-center">Règle PEMDAS</h2>
              <p className="text-lg text-center">
                En mathématiques, on suit toujours un ordre pour résoudre les
                calculs.
                <br /> On utilise l&rsquo;acronyme <strong>PEMDAS</strong>, pour
                se rappeler de l&rsquo;ordre dans lequel résoudre les
                opérations&nbsp;:
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
    {/* Exemple 1 */}
    {exampleIndex === 1 && (
      <div>
        <h2 className="text-2xl font-bold mb-4">Exemple 1&nbsp;: sans exposants</h2>
        <p className="text-lg mb-2">
          Résolvons&nbsp;: <strong>2 + 3 × (4 + 1)</strong>
        </p>
        <ol className="list-decimal space-y-2 pl-6 text-md leading-relaxed">
          <li>On commence par les parenthèses&nbsp;: (4 + 1) = 5</li>
          <li>On vérifie s’il y a des exposants&nbsp;: il n’y en a pas ici, on passe à la prochaine étape.</li>
          <li>On regarde les multiplications et divisions&nbsp;: 3 × 5 = 15</li>
          <li>On termine avec les additions et soustractions&nbsp;: 2 + 15 = <strong>17</strong></li>
        </ol>
      </div>
    )}

    {/* Exemple 2 */}
    {exampleIndex === 2 && (
      <div>
        <h2 className="text-2xl font-bold mb-4">Exemple 2&nbsp;: avec exposants</h2>
        <p className="text-lg mb-2">
          Résolvons&nbsp;: <strong>(2 + 1)² + 4</strong>
        </p>
        <ol className="list-decimal space-y-2 pl-6 text-md leading-relaxed">
          <li>On commence par les parenthèses&nbsp;: (2 + 1) = 3</li>
          <li>On calcule les exposants&nbsp;: 3² = 9</li>
          <li>On vérifie s’il y a des multiplications ou divisions&nbsp;: il n’y en a pas ici.</li>
          <li>On termine avec l’addition&nbsp;: 9 + 4 = <strong>13</strong></li>
        </ol>
      </div>
    )}

    {/* Exemple 3 */}
    {exampleIndex === 3 && (
      <div>
        <h2 className="text-2xl font-bold mb-4">Exemple 3&nbsp;: division et addition</h2>
        <p className="text-lg mb-2">
          Résolvons&nbsp;: <strong>12 ÷ 3 + 5</strong>
        </p>
        <ol className="list-decimal space-y-2 pl-6 text-md leading-relaxed">
          <li>On vérifie s’il y a des parenthèses&nbsp;: aucune ici.</li>
          <li>On vérifie s’il y a des exposants&nbsp;: aucun exposant non plus.</li>
          <li>On fait la division&nbsp;: 12 ÷ 3 = 4</li>
          <li>On termine avec l’addition&nbsp;: 4 + 5 = <strong>9</strong></li>
        </ol>
      </div>
    )}

    {/* Exemple 4 */}
    {exampleIndex === 4 && (
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Exemple 4&nbsp;: parenthèses imbriquées et exposants
        </h2>
        <p className="text-lg mb-2">
          Résolvons&nbsp;: <strong>((1 + 2)² + 1) × 2</strong>
        </p>
        <ol className="list-decimal space-y-2 pl-6 text-md leading-relaxed">
          <li>On commence par les parenthèses internes&nbsp;: (1 + 2) = 3</li>
          <li>On calcule l’exposant&nbsp;: 3² = 9</li>
          <li>On effectue l’addition suivante&nbsp;: 9 + 1 = 10</li>
          <li>On termine avec la multiplication&nbsp;: 10 × 2 = <strong>20</strong></li>
        </ol>
      </div>
    )}

    {/* Exemple 5 */}
    {exampleIndex === 5 && (
      <div>
        <h2 className="text-2xl font-bold mb-4">Exemple 5&nbsp;: soustraction et multiplication</h2>
        <p className="text-lg mb-2">
          Résolvons&nbsp;: <strong>10 - 2 × 3</strong>
        </p>
        <ol className="list-decimal space-y-2 pl-6 text-md leading-relaxed">
          <li>On vérifie s’il y a des parenthèses&nbsp;: aucune ici.</li>
          <li>On vérifie s’il y a des exposants&nbsp;: aucun.</li>
          <li>On fait la multiplication&nbsp;: 2 × 3 = 6</li>
          <li>On fait ensuite la soustraction&nbsp;: 10 - 6 = <strong>4</strong></li>
        </ol>
      </div>
    )}

    {/* Exemple 6 */}
    {exampleIndex === 6 && (
      <div>
        <h2 className="text-2xl font-bold mb-4">Exemple 6&nbsp;: division et parenthèses</h2>
        <p className="text-lg mb-2">
          Résolvons&nbsp;: <strong>24 ÷ (2 × 3)</strong>
        </p>
        <ol className="list-decimal space-y-2 pl-6 text-md leading-relaxed">
          <li>On commence par les parenthèses&nbsp;: (2 × 3) = 6</li>
          <li>On vérifie les exposants&nbsp;: il n’y en a pas.</li>
          <li>On termine par la division&nbsp;: 24 ÷ 6 = <strong>4</strong></li>
        </ol>
      </div>
    )}

    {/* Exemple 7 */}
    {exampleIndex === 7 && (
      <div>
        <h2 className="text-2xl font-bold mb-4">Exemple 7&nbsp;: plusieurs opérations</h2>
        <p className="text-lg mb-2">
          Résolvons&nbsp;: <strong>5 + 2 × 4 - 3</strong>
        </p>
        <ol className="list-decimal space-y-2 pl-6 text-md leading-relaxed">
          <li>On vérifie les parenthèses&nbsp;: aucune ici.</li>
          <li>On vérifie les exposants&nbsp;: aucun.</li>
          <li>On effectue la multiplication&nbsp;: 2 × 4 = 8</li>
          <li>On fait ensuite les additions et soustractions de gauche à droite&nbsp;: 5 + 8 - 3 = <strong>10</strong></li>
        </ol>
      </div>
    )}

    {/* Exemple 8 */}
    {exampleIndex === 8 && (
      <div>
        <h2 className="text-2xl font-bold mb-4">Exemple 8&nbsp;: exposant et division</h2>
        <p className="text-lg mb-2">
          Résolvons&nbsp;: <strong>4² ÷ 2</strong>
        </p>
        <ol className="list-decimal space-y-2 pl-6 text-md leading-relaxed">
          <li>On vérifie les parenthèses&nbsp;: aucune ici.</li>
          <li>On calcule l’exposant&nbsp;: 4² = 16</li>
          <li>On vérifie s’il y a d’autres exposants&nbsp;: non.</li>
          <li>On termine avec la division&nbsp;: 16 ÷ 2 = <strong>8</strong></li>
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
