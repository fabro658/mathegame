"use client";
import Link from "next/link";

export default function Page() {
  return (
    // Zone de scroll indépendante du body/layout
    <div className="fixed inset-0 overflow-y-auto bg-blue-100 text-gray-900 p-4">
      {/* Bouton de retour en haut à droite */}
      <Link
        href="/mobile/primaire_mobile"
        className="fixed top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-50"
      >
        Retour
      </Link>

      {/* Contenu */}
      <div className="min-h-full flex flex-col items-center">
        <h1 className="text-4xl font-bold mt-20 mb-12 text-center">
          Les exposants
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 w-full justify-items-center mb-12">
          <Link
            href="/mobile/primaire_mobile/niveaux_mobile/niveau6_mobile/priooperation_mobile"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center w-[300px] leading-snug"
          >
            Priorité d&apos;opération
          </Link>
        </div>
      </div>
    </div>
  );
}
