import Link from "next/link";

export default function Niveau2() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white relative overflow-hidden font-[Nunito] bg-gradient-to-t from-[#770c75] to-[#090536]">
      {/* Bouton Retour */}
      <Link
        href="/primaire/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
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

      {/* Titre thématique */}
      <div className="flex flex-col items-center text-center mb-12 z-10 mt-24">
        <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-extrabold mb-3 drop-shadow">
          Mission Comparaison
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 font-medium">
          Explore les nombres dans l’univers mathématique 🚀
        </p>
      </div>

      {/* Boutons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 z-10 max-w-4xl mb-12">
        <a
          href="/primaire/niveaux/niveau2/comparaison"
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-6 px-12 rounded-2xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Comparaison
        </a>
        <a
          href="/primaire/niveaux/niveau2/comparaison_decimaux"
          className="bg-green-600 hover:bg-green-800 text-white font-bold py-6 px-12 rounded-2xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Décimaux
        </a>
        <a
          href="/primaire/niveaux/niveau2/comparer_fraction"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-6 px-12 rounded-2xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Fractions
        </a>
        <a
          href="/primaire/niveaux/niveau2/expression_equivalente"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-2xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Expressions équivalentes
        </a>
      </div>
    </div>
  );
}
