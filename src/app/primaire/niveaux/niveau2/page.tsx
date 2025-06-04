import Link from "next/link";

export default function Niveau2() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white relative overflow-hidden font-fredoka bg-gradient-to-t from-[#770c75] to-[#090536]">
      {/* Bouton Retour */}
      <Link
        href="/primaire/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-30"
      >
        Retour
      </Link>

      {/* Lune */}
      <div className="moon">
        <div className="crat crat1"></div>
        <div className="crat crat2"></div>
        <div className="crat crat3"></div>
        <div className="crat crat4"></div>
        <div className="crat crat5"></div>
        <div className="crat crat6"></div>
      </div>
            {/* Planète et astronaute */}
      <div className="container">
        <div className="planet">
          <div className="shadow"></div>
        </div>

        <div className="astronaut">
          <div className="tank center"></div>
          <div className="suit center"></div>
          <div className="helmet center"></div>
          <div className="buttons center"></div>
          <div className="hand-l"></div>
          <div className="hand-r"></div>
          <div className="leg-l"></div>
          <div className="leg-r"></div>
          <div className="pipe"></div>
        </div>
      </div>

      {/* Titre thématique */}
      <div className="flex flex-col items-center text-center mb-12 z-10">
        <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-extrabold mb-3 drop-shadow">
          Mission Comparaison
        </h1>
        <p className="text-xl sm:text-2xl text-white font-medium">
          Explore les nombres dans l’univers mathématique 🚀
        </p>
      </div>

      {/* Boutons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 z-10 mt-4 px-4">
        <a
          href="/primaire/niveaux/niveau1/addition"
          className="bg-purple-600 text-white font-bold text-3xl px-12 py-6 rounded-full text-center transition transform hover:scale-105"
        >
          Comparaison
        </a>
        <a
          href="/primaire/niveaux/niveau2/comparaison_decimaux"
          className="bg-green-600 text-white font-bold text-3xl px-12 py-6 rounded-full text-center transition transform hover:scale-105"
        >
          Décimaux
        </a>
        <a
          href="/primaire/niveaux/niveau2/comparer_fraction"
          className="bg-yellow-400 text-white font-bold text-3xl px-12 py-6 rounded-full text-center transition transform hover:scale-105"
        >
          Fractions
        </a>
        <a
          href="/primaire/niveaux/niveau2/expression_equivalente"
          className="bg-red-500 text-white font-bold text-3xl px-12 py-6 rounded-full text-center transition transform hover:scale-105"
        >
          Expressions équivalentes
        </a>
      </div>
    </div>
  );
}