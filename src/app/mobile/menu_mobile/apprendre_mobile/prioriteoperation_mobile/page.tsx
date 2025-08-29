"use client";

import { useState } from "react";
import Link from "next/link";

export default function PrioriteOperation() {
  const [showExample, setShowExample] = useState(false);
  const [exampleIndex, setExampleIndex] = useState(1); // 1 à 4
  const totalExamples = 4;

  const nextExample = () => {
    setExampleIndex((prev) => (prev === totalExamples ? 1 : prev + 1));
  };

  return (
    // Page mobile : scroll isolé
    <div className="fixed inset-0 overflow-y-auto bg-gray-100 text-black">
      <main className="min-h-screen flex flex-col items-center p-4 pt-24 pb-28 relative">
        {/* Bouton retour (fixe) */}
        <Link
          href="/menu/apprendre"
          className="fixed top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded font-bold z-50"
        >
          Retour
        </Link>

        {/* Titre + toggle */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold">Priorité des opérations</h1>
          <p className="text-lg mt-2">
            Apprends l’ordre dans lequel on fait les opérations (PEMDAS).
          </p>
        </div>

        <div className="mb-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700 transition"
            onClick={() => setShowExample((v) => !v)}
          >
            {showExample ? "Cacher l’exemple" : "Montrer un exemple"}
          </button>
        </div>

        {/* Bloc central GRAND + scroll interne */}
        <div className="w-full max-w-3xl">
          <div className="bg-white p-6 rounded-lg shadow-lg min-h-[60vh] max-h-[82vh] overflow-y-auto">
            {!showExample && (
              <section>
                <h2 className="text-2xl font-bold mb-4 text-center">Règle PEMDAS</h2>
                <p className="text-lg text-center">
                  En mathématiques, on suit toujours un ordre pour résoudre les calculs.
                  <br />
                  On utilise l’acronyme <strong>PEMDAS</strong> pour se souvenir de l’ordre&nbsp;:
                </p>

                <ul className="list-disc pl-8 mt-4 text-md space-y-1">
                  <li><strong>P</strong> : Parenthèses</li>
                  <li><strong>E</strong> : Exposants</li>
                  <li><strong>M</strong> : Multiplication</li>
                  <li><strong>D</strong> : Division</li>
                  <li><strong>A</strong> : Addition</li>
                  <li><strong>S</strong> : Soustraction</li>
                </ul>

                <div className="mt-6 text-center">
                  <p className="text-md text-gray-600">
                    Astuce&nbsp;: quand Multiplication et Division sont présentes ensemble,
                    on lit de gauche à droite. Idem pour Addition et Soustraction.
                  </p>
                </div>
              </section>
            )}

            {showExample && (
              <section className="space-y-6 min-h-[400px] flex flex-col justify-between">
                {exampleIndex === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Exemple 1 : sans exposants</h2>
                    <p className="text-lg mb-2">
                      Résolvons : <strong>2 + 3 × (4 + 1)</strong>
                    </p>
                    <ol className="list-decimal space-y-2 pl-6 text-md">
                      <li>Parenthèses : (4 + 1) = 5</li>
                      <li>Multiplication : 3 × 5 = 15</li>
                      <li>Addition : 2 + 15 = <strong>17</strong></li>
                    </ol>
                  </div>
                )}

                {exampleIndex === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Exemple 2 : avec exposants</h2>
                    <p className="text-lg mb-2">
                      Résolvons : <strong>(2 + 1)² + 4</strong>
                    </p>
                    <ol className="list-decimal space-y-2 pl-6 text-md">
                      <li>Parenthèses : (2 + 1) = 3</li>
                      <li>Exposant : 3² = 9</li>
                      <li>Addition : 9 + 4 = <strong>13</strong></li>
                    </ol>
                  </div>
                )}

                {exampleIndex === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Exemple 3 : division et addition</h2>
                    <p className="text-lg mb-2">
                      Résolvons : <strong>12 ÷ 3 + 5</strong>
                    </p>
                    <ol className="list-decimal space-y-2 pl-6 text-md">
                      <li>Division : 12 ÷ 3 = 4</li>
                      <li>Addition : 4 + 5 = <strong>9</strong></li>
                    </ol>
                  </div>
                )}

                {exampleIndex === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">
                      Exemple 4 : parenthèses imbriquées et exposants
                    </h2>
                    <p className="text-lg mb-2">
                      Résolvons : <strong>((1 + 2)² + 1) × 2</strong>
                    </p>
                    <ol className="list-decimal space-y-2 pl-6 text-md">
                      <li>Parenthèses internes : (1 + 2) = 3</li>
                      <li>Exposant : 3² = 9</li>
                      <li>Addition : 9 + 1 = 10</li>
                      <li>Multiplication : 10 × 2 = <strong>20</strong></li>
                    </ol>
                  </div>
                )}

                <div className="text-center">
                  <button
                    onClick={nextExample}
                    className="mt-2 bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
                  >
                    Voir l’exemple suivant
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
