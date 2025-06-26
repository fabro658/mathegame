'use client';
import Link from "next/link";

export default function Niveau6() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black relative overflow-hidden font-fredoka">

      {/* Fond statique */}
<div className="circle">
  <div className="ocean">
<div id="shark">
  <div className="fin"></div>

</div>

    {/* Nuages séparés */}
       <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
          <div className="cloud absolute top-[30px] left-[40px] scale-[0.5]" />
          <div className="cloud absolute top-[50px] left-[50%] -translate-x-1/2 scale-[0.8]" />
          <div className="cloud absolute top-1/2 right-[30px] -translate-y-1/2 scale-[0.6]" />
        </div>

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
       className="sun-button absolute top-4 right-4 z-30">
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
          className="bg-purple-600 text-white font-bold text-3xl px-12 py-6 rounded-full text-center transition transform hover:scale-105"
        >
          Priorité d&apos;opération
        </a>
      </div>
    </div>
  );
}
