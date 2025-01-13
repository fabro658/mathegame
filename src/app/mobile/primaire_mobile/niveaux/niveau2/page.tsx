"use client";

import Link from "next/link";

// Fonction pour afficher les quartiers dans un demi-cercle
function DemiCercleAvecQuartiers() {
  return (
    <div className="relative">
      {/* Demi-cercle */}
      <div className="absolute top-4 left-4 w-1/5 h-16 bg-orange-500 rounded-t-full overflow-hidden relative">
        {/* Trois triangles dans le demi-cercle */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="absolute w-0 h-0"
            style={{
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${index * 120}deg)`,
              borderLeft: "40px solid transparent", // Transparent à gauche
              borderRight: "40px solid transparent", // Transparent à droite
              borderBottom: "60px solid rgba(255, 165, 0, 0.5)", // Triangle orange pâle
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

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
            boxShadow: "0 0 6px rgba(239, 165, 55, 0.8)", // Brillance
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
      {/* Affichage du demi-cercle avec quartiers */}
      <DemiCercleAvecQuartiers />

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
      <h1 className="text-3xl font-bold mb-8 text-center mt-16 sm:mt-12">
        Choisissez une opération
      </h1>

      {/* Boutons de niveau en colonne */}
      <div className="flex flex-col gap-4 w-full max-w-md px-4">
        <Link
          href="/primaire/niveaux/niveau3/additionfraction"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg text-lg shadow-md text-center"
        >
          Addition de fraction
        </Link>
        <Link
          href="/primaire/niveaux/niveau3/soustractionfraction"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg text-lg shadow-md text-center"
        >
          Soustraction de fraction
        </Link>
        <Link
          href="/primaire/niveaux/niveau3/multiplicationfraction"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg text-lg shadow-md text-center"
        >
          Multiplication de fraction
        </Link>
        <Link
          href="/primaire/niveaux/niveau3/divisionfraction"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-4 px-6 rounded-lg text-lg shadow-md text-center"
        >
          Division de fraction
        </Link>
      </div>
    </div>
  );
}
