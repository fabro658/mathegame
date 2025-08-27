"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen overflow-y-auto flex flex-col items-center bg-gray-100 text-gray-900 relative p-4">
      {/* Bouton de retour fixe en haut à droite */}
      <Link
        href="/mobile/primaire_mobile"
        className="fixed top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-50"
      >
        Retour
      </Link>

      {/* Titre */}
      <h1 className="text-4xl font-bold mt-20 mb-12 text-center">
        Choisissez une opération
      </h1>

      {/* Boutons */}
      <div className="grid grid-cols-1 gap-8 relative z-10 mb-16">
        <a
          href="/mobile/primaire_mobile/niveaux_mobile/niveau6_mobile/priooperation_mobile"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Priorité d&apos;opération
        </a>
      </div>
    </div>
  );
}
