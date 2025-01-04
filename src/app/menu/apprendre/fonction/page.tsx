"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface FunctionConcept {
  name: string;
  description: string;
  formula: string;
  example: string;
  imageUrl: string;
}

export default function FonctionLearning() {
  const [selectedConcept, setSelectedConcept] = useState<FunctionConcept | null>(null);

  const functionConcepts: FunctionConcept[] = [
    {
      name: "Relation",
      description: "Une relation est une règle qui associe chaque élément d'un ensemble à un ou plusieurs éléments d'un autre ensemble.",
      formula: "Relation : A ↔ B",
      example: "Par exemple, la relation x ↔ y telle que y = 2x.",
      imageUrl: "/relation.png",
    },
    {
      name: "Fonction",
      description: "Une fonction est une relation particulière où chaque élément de l'ensemble de départ (variable indépendante) est associé à un seul élément de l'ensemble d'arrivée (variable dépendante).",
      formula: "Fonction : f(x) = y",
      example: "Si f(x) = 2x + 3, pour x = 5, f(5) = 13.",
      imageUrl: "/fonction.png",
    },
    {
      name: "Fonction linéaire",
      description: "Une fonction linéaire est une fonction de la forme f(x) = ax + b où a et b sont des constantes.",
      formula: "f(x) = ax + b",
      example: "Si f(x) = 2x + 3, alors pour x = 4, f(4) = 2(4) + 3 = 11.",
      imageUrl: "/fonction_lineaire.png",
    },
    {
      name: "Fonction quadratique",
      description: "Une fonction quadratique est une fonction polynomiale de degré 2, généralement de la forme f(x) = ax² + bx + c.",
      formula: "f(x) = ax² + bx + c",
      example: "Si f(x) = x² + 2x + 1, alors pour x = 3, f(3) = 3² + 2(3) + 1 = 16.",
      imageUrl: "/fonction_quadratique.JPG",
    },
    {
      name: "Fonction valeur absolue",
      description: "La fonction valeur absolue donne la distance entre un nombre et zéro, sans tenir compte du signe.",
      formula: "f(x) = |x|",
      example: "Si f(x) = |x|, alors f(-5) = 5.",
      imageUrl: "/fonction_valeurabs.JPG",
    },
    {
      name: "Fonction exponentielle",
      description: "La fonction exponentielle est une fonction de la forme f(x) = a^x, où a est une constante positive.",
      formula: "f(x) = a^x",
      example: "Si f(x) = 2^x, alors f(3) = 2³ = 8.",
      imageUrl: "/fonction_exponentielle.JPG",
    },
    {
      name: "Fonction en escalier",
      description: "La fonction exponentielle est une fonction de la forme f(x) = a^x, où a est une constante positive.",
      formula: "f(x) = a^x",
      example: "Si f(x) = 2^x, alors f(3) = 2³ = 8.",
      imageUrl: "/fonciton_escalier.JPG",
    },
    {
      name: "Fonction logarithmique",
      description: "La fonction exponentielle est une fonction de la forme f(x) = a^x, où a est une constante positive.",
      formula: "f(x) = a^x",
      example: "Si f(x) = 2^x, alors f(3) = 2³ = 8.",
      imageUrl: "/fonction_log.JPG",
    },
    {
      name: "Fonction trigonométrique",
      description: "La fonction exponentielle est une fonction de la forme f(x) = a^x, où a est une constante positive.",
      formula: "f(x) = a^x",
      example: "Si f(x) = 2^x, alors f(3) = 2³ = 8.",
      imageUrl: "/fonction_trigo.JPG",
    },
    {
      name: "Fonction rationnelle",
      description: "La fonction exponentielle est une fonction de la forme f(x) = a^x, où a est une constante positive.",
      formula: "f(x) = a^x",
      example: "Si f(x) = 2^x, alors f(3) = 2³ = 8.",
      imageUrl: "/fonction_rationnelle.JPG",
    },
    {
      name: "Fonction racine carrée",
      description: "La fonction exponentielle est une fonction de la forme f(x) = a^x, où a est une constante positive.",
      formula: "f(x) = a^x",
      example: "Si f(x) = 2^x, alors f(3) = 2³ = 8.",
      imageUrl: "/fonction_racinecarree.JPG",
    },
  ];

  const handleSelectConcept = (concept: FunctionConcept): void => {
    setSelectedConcept(concept);
  };

  return (
    <main className="flex min-h-screen bg-gray-100 text-black">
      {/* Barre latérale */}
      <div className="w-1/4 bg-white p-6 shadow-lg">
        <Link
          href="/menu/apprendre"
          className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
        >
          Retour
        </Link>

        <h1 className="text-3xl font-bold mb-6">Les Fonctions</h1>

        <p className="text-lg mb-6">
          Sélectionne un concept pour apprendre à mieux comprendre les fonctions en mathématiques :
        </p>

        <div className="flex flex-col gap-4">
          {functionConcepts.map((concept, index) => (
            <button
              key={index}
              className="bg-blue-500 text-white py-2 px-6 rounded font-bold"
              onClick={() => handleSelectConcept(concept)}
            >
              {concept.name}
            </button>
          ))}
        </div>
      </div>

      {/* Section centrale agrandie */}
      <div className="w-3/4 p-10 flex flex-col items-center">
        {selectedConcept && (
          <div className="bg-white p-8 rounded-lg shadow-lg mt-10 w-full max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">{selectedConcept.name}</h2>
            <p className="text-lg mb-6">{selectedConcept.description}</p>
            <p className="text-2xl font-bold mb-4">Formule :</p>
            <p className="text-lg mb-6">{selectedConcept.formula}</p>
            <p className="text-2xl font-bold mb-4">Exemple :</p>
            <p className="text-lg mb-6">{selectedConcept.example}</p>

            {/* Image beaucoup plus grande */}
            <div className="mt-8 flex justify-center">
              <Image
                src={selectedConcept.imageUrl}
                alt={selectedConcept.name}
                width={500} // Taille encore augmentée
                height={500}
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
