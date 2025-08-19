"use client";

import { useState } from "react";
import Link from "next/link";

export default function AlgebreBase() {
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
      <div className="w-1/4 bg-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center mt-20">
          Algèbre de base
        </h1>

        <p className="text-lg text-center mb-6">
          Apprends à <strong>isoler la variable x</strong> étape par étape.
        </p>

        <div className="text-left text-md space-y-2 mb-8">
          <p>1️⃣ Déplace les nombres de l’autre côté.</p>
          <p>2️⃣ Simplifie l’équation.</p>
          <p>3️⃣ Si x est multiplié, divise pour isoler.</p>
          <p>4️⃣ Si x est dans une puissance, utilise la racine.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-center">
                Isoler x dans une équation
              </h2>
              <p className="text-lg text-center">
                Pour résoudre une équation, on veut <strong>x tout seul</strong>
                .
                <br />
                On fait les mêmes opérations des deux côtés de l’équation pour
                garder l’égalité.
              </p>
              <ul className="list-disc pl-8 mt-4 text-md space-y-1">
                <li>On simplifie chaque côté.</li>
                <li>On déplace les termes pour isoler x.</li>
                <li>On divise ou on prend la racine si nécessaire.</li>
              </ul>
            </div>
          )}

          {showExample && (
            <div className="space-y-6 min-h-[400px] flex flex-col justify-between">
              {/* Exemple 1 */}
              {exampleIndex === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Exemple 1&nbsp;: Équation simple
                  </h2>
                  <p className="text-lg mb-2">Résolvons&nbsp;:  x + 5 = 12</p>
                  <ol className="list-decimal space-y-2 pl-6 text-md">
                    <li>On soustrait 5 des deux côtés&nbsp;: x = 12 - 5</li>
                    <li>On calcule&nbsp;: x = <strong>7</strong></li>
                  </ol>
                </div>
              )}

              {/* Exemple 2 */}
              {exampleIndex === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Exemple 2&nbsp;: x multiplié
                  </h2>
                  <p className="text-lg mb-2">Résolvons&nbsp;: 3x = 15</p>
                  <ol className="list-decimal space-y-2 pl-6 text-md">
                    <li>
                      Ici, x est multiplié par 3. On divise des deux côtés par 3.
                    </li>
                    <li>x = 15 ÷ 3</li>
                    <li>x = <strong>5</strong></li>
                  </ol>
                </div>
              )}

              {/* Exemple 3 */}
              {exampleIndex === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Exemple 3&nbsp;: parenthèses
                  </h2>
                  <p className="text-lg mb-2">Résolvons&nbsp;: 2(x + 4) = 18</p>
                  <ol className="list-decimal space-y-2 pl-6 text-md">
                    <li>
                      On divise d’abord par 2&nbsp;: (x + 4) = 18 ÷ 2 = 9
                    </li>
                    <li>On soustrait 4&nbsp;: x = 9 - 4</li>
                    <li>x = <strong>5</strong></li>
                  </ol>
                </div>
              )}

              {/* Exemple 4 */}
              {exampleIndex === 4 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Exemple 4&nbsp;: exposants
                  </h2>
                  <p className="text-lg mb-2">Résolvons&nbsp;: x² = 49</p>
                  <ol className="list-decimal space-y-2 pl-6 text-md">
                    <li>On prend la racine carrée des deux côtés.</li>
                    <li>x = √49</li>
                    <li>
                      x = <strong>7</strong> ou x = <strong>-7</strong>
                    </li>
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
