"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      {/* Bouton de retour en haut à droite */}
      <Link
        href="/mobile/priamire_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>
      <h1 className="text-4xl font-bold mb-12 text-center">Choisissez une opération</h1>

      <div className="flex flex-col items-center justify-center gap-8">
        {/* Le bouton centré */}
        <a
          href="/primaire/niveaux/niveau6/priooperation"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px] max-w-[500px]"
        >
          Priorité d&#39;opération
        </a>
      </div>
    </div>
  );
}
