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
      <div className="w-1/4 bg-white p-6 shadow-lg pt-24">
        <h1 className="text-3xl font-bold mb-6 text-center mt-20">
          Algèbre de base
        </h1>

        <p className="text-lg text-center mb-6">
          Apprends à <strong>isoler la variable x</strong> étape par étape.
        </p>

        <div className="text-left text-md space-y-2 mb-8">
          <p>1. Déplace les nombres de l’autre côté.</p>
          <p>2. Simplifie l’équation.</p>
          <p>3. Si x est multiplié, divise pour isoler.</p>
          <p>4. Si x est dans une puissance, utilise la racine.</p>
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
        `{/* Exemple 1 */}
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
                    <li>
                      On soustrait 5 des deux côtés :{" "}
                        <span>
                         x + 5{" "}
                         <span style={{ color: "blue" }}>- 5</span> = 12{" "}
                         <span style={{ color: "blue" }}>- 5</span>
                         </span>
                         </li>
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
      <li>
        <div className="flex items-center space-x-4">
          {/* 3x côté gauche */}
          <div className="flex flex-col items-center">
            <span>3x</span>
            <span className="text-blue-600 border-t border-blue-600 w-full text-center">
              3
            </span>
          </div>
          <span>=</span>
          {/* 15 côté droit */}
          <div className="flex flex-col items-center">
            <span>15</span>
            <span className="text-blue-600 border-t border-blue-600 w-full text-center">
              3
            </span>
          </div>
        </div>
      </li>
      <li>
        x = <strong>5</strong>
      </li>
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
    <ol className="list-decimal space-y-4 pl-6 text-md">
      {/* Étape 1 */}
      <li>
        On divise d’abord par 2 :
        <div className="mt-2">
          <span className="inline-block text-black relative px-1">
            <span className="border-b-2 border-black px-1">
              2(x + 4)
            </span>
            <span className="text-blue-600 absolute -bottom-5 left-1/2 -translate-x-1/2 text-sm">
              2
            </span>
          </span>
          &nbsp;=&nbsp;
          <span className="inline-block text-black relative px-1">
            <span className="border-b-2 border-black px-1">
              18
            </span>
            <span className="text-blue-600 absolute -bottom-5 left-1/2 -translate-x-1/2 text-sm">
              2
            </span>
          </span>
        </div>
        <div className="mt-2">⇨ (x + 4) = 9</div>
      </li>

      {/* Étape 2 */}
      <li>
        On soustrait 4 :
        <div className="mt-2">
          <span className="text-black">x + 4</span>
          <span className="text-blue-600"> - 4</span>
          &nbsp;=&nbsp;
          <span className="text-black">9</span>
          <span className="text-blue-600"> - 4</span>
        </div>
        <div className="mt-2">⇨ x = 5</div>
      </li>

      {/* Étape 3 */}
      <li>
        Résultat : <strong>x = 5</strong>
      </li>
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
                    <li>√x² = √49</li>
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
