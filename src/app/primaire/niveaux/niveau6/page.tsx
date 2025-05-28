'use client';
import Link from "next/link";

export default function Niveau6() {
  return (
<div
  className="min-h-screen flex flex-col justify-center items-center text-black relative overflow-hidden"
  style={{
    background: 'linear-gradient(to bottom, #7DDFFC 70%, #F0DE75 30%)',
  }}
>

      {/* Bouton Retour */}
      <Link
        href="/primaire/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Titre thématique */}
      <div className="flex flex-col items-center text-center mb-12 z-10">
        <h1 className="text-indigo-800 text-5xl sm:text-6xl md:text-7xl font-extrabold mb-2 drop-shadow-lg">
          Ordre Magique des Opérations
        </h1>
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
<div id="sun"></div>
<div id="container">
  <div id="frame">
    <div id="sky"></div>
    <div id="sand"></div>
    <div id="shadow"></div>
    <div id="side1"></div>
    <div id="side2"></div>
  </div>
</div>

</div>
    </div>
  );
}