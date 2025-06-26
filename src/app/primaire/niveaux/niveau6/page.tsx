'use client';
import Link from "next/link";

export default function Niveau6() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black relative overflow-hidden font-fredoka">

      {/* Fond statique */}
<div className="circle">
  <div className="ocean">

    {/* Nuages séparés */}
    <div className="cloud small cloud-1"></div>
    <div className="cloud small cloud-2"></div>

    {/* Soleil */}
    <div className="sun"></div>

    {/* Bateau */}
    <div className="boat sail-left"></div>
    <div className="boat sail-right"></div>
    <div className="boat bottom"></div>

    {/* Mer */}
    <div className="water"></div>
  </div>
</div>


      {/* Bouton Retour */}
      <Link
        href="/primaire/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Titre */}
  <div className="flex flex-col items-center text-center mb-12 z-10">
        <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-extrabold mb-2 drop-shadow-lg">
          Puissances des Nombres
        </h1>
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
