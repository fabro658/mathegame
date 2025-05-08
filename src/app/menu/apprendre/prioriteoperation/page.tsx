"use client";

import { useState } from "react";
import Link from "next/link";

export default function PrioriteOperation() {
  const [showExample, setShowExample] = useState(false);

  return (
    <div className="flex flex-col items-center min-h-screen bg-yellow-50 text-black px-4 py-8">
      <Link
        href="/menu/apprendre"
        className="self-end bg-orange-500 text-white py-2 px-6 rounded font-bold mb-6"
      >
        Retour
      </Link>

      <h1 className="text-4xl font-extrabold text-blue-800 mb-6 text-center">Priorité des opérations</h1>
      
      <p className="text-lg max-w-2xl text-center mb-8">
        En mathématiques, il faut suivre un ordre précis pour résoudre les calculs. Cet ordre s’appelle la règle <strong>PEMDAS</strong> :
      </p>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl mb-8">
        <h2 className="text-2xl font-bold text-center mb-4">Pyramide des priorités</h2>
        <ul className="text-lg space-y-2">
          <li> <strong>P</strong> : Parenthèses</li>
          <li> <strong>E</strong> : Exposants (carré, cube...)</li>
          <li> <strong>M</strong> : Multiplication</li>
          <li> <strong>D</strong> : Division</li>
          <li> <strong>A</strong> : Addition</li>
          <li> <strong>S</strong> : Soustraction</li>
        </ul>
      </div>

      <button
        className="bg-green-500 text-white px-6 py-3 rounded font-bold hover:bg-green-700 transition-all mb-6"
        onClick={() => setShowExample(!showExample)}
      >
        {showExample ? "Cacher l'exemple" : "Voir un exemple"}
      </button>

      {showExample && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-4">Exemple étape par étape :</h2>
          <p className="text-lg mb-2">
            Résolvons : <strong>2 + 3 × (4 + 1)</strong>
          </p>
          <ol className="list-decimal space-y-2 pl-5 text-md">
            <li> On commence par les parenthèses : (4 + 1) = 5</li>
            <li> On fait la multiplication : 3 × 5 = 15</li>
            <li> On termine avec l’addition : 2 + 15 = <strong>17</strong></li>
          </ol>
        </div>
      )}
    </div>
  );
}
