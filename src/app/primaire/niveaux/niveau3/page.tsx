"use client";

import Link from "next/link";

// Fonction pour afficher les quartiers dans un demi-cercle
function DemiCercleAvecQuartiers() {
  return (
    <div className="relative">
      {/* Demi-cercle */}
      <div className="absolute top-4 left-4 w-32 h-16 bg-orange-500 rounded-t-full overflow-hidden relative">
        {/* Quartiers avec triangles */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="absolute w-0 h-0 border-l-[40px] border-r-[40px] border-b-[60px]"
            style={{
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${index * 90}deg)`,
              borderBottomColor: "orange", // Couleur du triangle
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderTopColor: "transparent",
            }}
          ></div>
        ))}

        {/* Lignes divisant le demi-cercle en quartiers */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="absolute w-px h-16 bg-orange-300"
            style={{
              top: "50%", // Alignement vertical au centre du demi-cercle
              left: "50%",
              transform: `translateX(-50%) rotate(${index * 90}deg)`, // Rotation pour chaque ligne (0°, 90°, 180°)
              zIndex: 1,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}


// Page principale
export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      {/* Affichage du demi-cercle avec quartiers */}
      <DemiCercleAvecQuartiers />

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
