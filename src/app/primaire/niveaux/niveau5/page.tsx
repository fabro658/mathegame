import Link from "next/link";

export default function Niveau1() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-200 text-black relative overflow-hidden font-fredoka">
      {/* Décor */}
      <div className="left-mountain"></div>
      <div className="back-mountain"></div>
      <div className="sun"></div>
      <div className="penguin">
        <div className="penguin-head">
          <div className="face left"></div>
          <div className="face right"></div>
          <div className="chin"></div>
          <div className="eye left">
            <div className="eye-lid"></div>
          </div>
          <div className="eye right">
            <div className="eye-lid"></div>
          </div>
          <div className="blush left"></div>
          <div className="blush right"></div>
          <div className="beak top"></div>
          <div className="beak bottom"></div>
        </div>
        <div className="penguin-body"></div>
      </div>
      <div className="ground"></div>

      {/* Bouton Retour */}
      <Link
        href="/primaire/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Titre */}
      <div className="flex flex-col items-center text-center mb-12 z-10">
        <h1 className="text-blue-800 text-5xl sm:text-6xl md:text-7xl font-extrabold mb-2 drop-shadow-lg">
          ⚡ Super Puissances des Nombres
        </h1>
        <p className="text-xl sm:text-2xl text-gray-800 font-medium">
          Découvre les pouvoirs magiques des exposants 💥
        </p>
      </div>

      {/* Boutons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 z-10">
        <a
          href="/primaire/niveaux/niveau5/exposant/n1"
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl text-center flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Premier niveau 🥇 
        </a>
        <a
          href="/primaire/niveaux/niveau5/exposant/n2"
          className="bg-green-600 hover:bg-green-800 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl text-center flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Deuxième niveau 🥈 
        </a>
      </div>
    </div>
  );
}
