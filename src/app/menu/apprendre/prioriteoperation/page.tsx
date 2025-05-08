"use client";

import { useState } from "react";
import Link from "next/link";

export default function PrioriteOperation() {
  const [showExample, setShowExample] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      {/* Colonne de gauche */}
      <div className="w-full sm:w-1/4 bg-white p-6 shadow-lg relative">
        <Link
          href="/menu/apprendre"
          className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
        >
          Retour
        </Link>

        <h1 className="text-3xl font-bold mb-6 text-center">Priorité des opérations</h1>

        <p className="text-lg text-center mb-6">
          Apprends l&rsquo;ordre dans lequel on fait les opérations&nbsp;:
        </p>

        <div className="text-left text-md space-y-2">
          <p><strong>P</strong> : Parenthèses</p>
          <p><strong>E</strong> : Exposants</p>
          <p><strong>M</strong> : Multiplication</p>
          <p><strong>D</strong> : Division</p>
          <p><strong>A</strong> : Addition</p>
          <p><strong>S</strong> : Soustraction</p>
        </div>

        <button
          className="mt-8 bg-green-500 text-white px-4 py-2 rounded font-bold hover:bg-green-700 transition-all"
          onClick={() => setShowExample(!showExample)}
        >
          {showExample ? "Cacher l&rsquo;exemple" : "Montrer un exemple"}
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
            <div>
              <h2 className="text-2xl font-bold mb-4">Exemple pas à pas&nbsp;:</h2>
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
        </div>
      </div>
    </div>
  );
}
