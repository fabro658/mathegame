'use client';
import Link from "next/link";

export default function Niveau6() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black relative overflow-hidden font-fredoka">

      {/* Fond statique */}
<div className="pirate-waves"></div>
        <div>
      </div>

      {/* Bouton Retour */}
      <Link
        href="/primaire/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Titre thématique */}
      <div className="flex flex-col items-center text-center mb-12 z-10">

        <p className="text-xl sm:text-2xl text-gray-700 font-medium">
          Entre dans le temple des règles mathématiques sacrées
        </p>
      </div>

      {/* Bouton unique */}
      <div className="flex flex-col items-center justify-center gap-8 z-10">
        <a
          href="/primaire/niveaux/niveau6/priooperation"
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-6 px-12 rounded-2xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] max-w-[500px] transition transform hover:scale-105"
        >
          Priorité d&apos;opération
        </a>
      </div>
    </div>
  );
}
