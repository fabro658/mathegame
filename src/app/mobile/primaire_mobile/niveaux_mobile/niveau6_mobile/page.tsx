"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative overflow-hidden">
      {/* Bouton de retour en haut à droite */}
      <Link
        href="/mobile/primaire_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      {/* Titre */}
      <h1 className="text-4xl font-bold mb-12 text-center">Choisissez une opération</h1>

      {/* Boutons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 relative z-10">
        {/* Le bouton centré */}
        <a
          href="/mobile/primaire_mobile/niveaux_mobile/niveau6_mobile/priooperation_mobile"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px] max-w-[500px]"
        >
          Priorité d&#39;opération
        </a>
      </div>
    </div>
  );
}
