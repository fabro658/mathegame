"use client";

import Link from "next/link";
// Fonction pour afficher des étoiles aléatoires
function Etoiles() {
  const nombreEtoiles = 30; // Nombre d'étoiles
  const etoiles = Array.from({ length: nombreEtoiles });

  return (
    <>
      {etoiles.map((_, index) => (
        <div
          key={index}
          className="absolute bg-white rounded-full"
          style={{
            width: `${Math.random() * 4 + 2}px`, // Taille entre 2px et 6px
            height: `${Math.random() * 4 + 2}px`,
            top: `${Math.random() * 100}%`, // Position verticale aléatoire
            left: `${Math.random() * 100}%`, // Position horizontale aléatoire
            opacity: `${Math.random() * 0.8 + 0.2}`, // Opacité entre 0.2 et 1
            boxShadow: "0 0 6px rgba(255, 234, 0, 0.8)", // Brillance
          }}
        ></div>
      ))}
    </>
  );
}

// Page principale
export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative overflow-hidden">

      {/* Affichage des étoiles */}
      <Etoiles />

      {/* Bouton de retour */}
      <Link
        href="/primaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-2 px-6 rounded font-bold shadow"
      >
        Retour
      </Link>

      {/* Titre */}
      <h1 className="text-3xl font-bold mb-12 text-center mt-16 sm:mt-12">
        Choisissez une opération
      </h1>

      {/* Boutons */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl px-4 sm:px-8">
        <a
          href="/primaire/niveaux/niveau3/additionfraction"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
        >
          Addition de fraction
        </a>
        <a
          href="/primaire/niveaux/niveau3/soustractionfraction"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
        >
          Soustraction de fraction
        </a>
        <a
          href="/primaire/niveaux/niveau3/multiplicationfraction"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
        >
          Multiplication de fraction
        </a>
        <a
          href="/primaire/niveaux/niveau3/divisionfraction"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-md text-center flex items-center justify-center"
        >
          Division de fraction
        </a>
      </div>
    </div>
  );
}
