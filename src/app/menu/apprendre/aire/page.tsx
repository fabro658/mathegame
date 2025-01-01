"use client";

import { useState } from "react";
import Link from "next/link";

export default function Aire() {
  // États pour chaque forme géométrique
  const [side, setSide] = useState<number | string>("");
  const [length, setLength] = useState<number | string>("");
  const [width, setWidth] = useState<number | string>("");
  const [radius, setRadius] = useState<number | string>("");
  const [base, setBase] = useState<number | string>("");
  const [height, setHeight] = useState<number | string>("");
  const [result, setResult] = useState<string>("");

  // Fonction pour calculer l'aire du carré
  const calculateSquareArea = () => {
    if (typeof side === "number" && side > 0) {
      const area = Math.pow(side, 2);
      setResult(`L'aire du carré est ${area} cm².`);
    } else {
      setResult("Veuillez entrer une valeur valide pour le côté.");
    }
  };

  // Fonction pour calculer l'aire du rectangle
  const calculateRectangleArea = () => {
    if (typeof length === "number" && typeof width === "number" && length > 0 && width > 0) {
      const area = length * width;
      setResult(`L'aire du rectangle est ${area} cm².`);
    } else {
      setResult("Veuillez entrer des valeurs valides pour la longueur et la largeur.");
    }
  };

  // Fonction pour calculer l'aire du cercle
  const calculateCircleArea = () => {
    if (typeof radius === "number" && radius > 0) {
      const area = Math.PI * Math.pow(radius, 2);
      setResult(`L'aire du cercle est ${area.toFixed(2)} cm².`);
    } else {
      setResult("Veuillez entrer une valeur valide pour le rayon.");
    }
  };

  // Fonction pour calculer l'aire du triangle
  const calculateTriangleArea = () => {
    if (typeof base === "number" && typeof height === "number" && base > 0 && height > 0) {
      const area = 0.5 * base * height;
      setResult(`L'aire du triangle est ${area} cm².`);
    } else {
      setResult("Veuillez entrer des valeurs valides pour la base et la hauteur.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black relative">
      <Link
        href="/menu/apprendre"
        className="absolute bottom-4 left-4 bg-black text-white py-3 px-8 rounded font-bold"
      >
        Apprendre
      </Link>
      <Link
        href="/niveaux/niveau2"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      <h1 className="text-3xl font-bold mb-6">Calcul de l'aire des formes géométriques</h1>

      <div className="w-full max-w-lg p-4 bg-white rounded shadow-lg">
        {/* Calcul de l'aire du carré */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Aire d'un carré</h2>
          <input
            type="number"
            value={side}
            onChange={(e) => setSide(Number(e.target.value))}
            className="border p-2 mt-2 w-full"
            placeholder="Longueur du côté (en cm)"
          />
          <button
            onClick={calculateSquareArea}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
          >
            Calculer l'aire
          </button>
        </div>

        {/* Calcul de l'aire du rectangle */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Aire d'un rectangle</h2>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="border p-2 mt-2 w-full"
            placeholder="Longueur (en cm)"
          />
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="border p-2 mt-2 w-full"
            placeholder="Largeur (en cm)"
          />
          <button
            onClick={calculateRectangleArea}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
          >
            Calculer l'aire
          </button>
        </div>

        {/* Calcul de l'aire du cercle */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Aire d'un cercle</h2>
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="border p-2 mt-2 w-full"
            placeholder="Rayon (en cm)"
          />
          <button
            onClick={calculateCircleArea}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
          >
            Calculer l'aire
          </button>
        </div>

        {/* Calcul de l'aire du triangle */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Aire d'un triangle</h2>
          <input
            type="number"
            value={base}
            onChange={(e) => setBase(Number(e.target.value))}
            className="border p-2 mt-2 w-full"
            placeholder="Base (en cm)"
          />
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="border p-2 mt-2 w-full"
            placeholder="Hauteur (en cm)"
          />
          <button
            onClick={calculateTriangleArea}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
          >
            Calculer l'aire
          </button>
        </div>

        {/* Affichage du résultat */}
        <div className="mt-6">
          <p className="text-xl font-bold">{result}</p>
        </div>
      </div>
    </div>
  );
}
