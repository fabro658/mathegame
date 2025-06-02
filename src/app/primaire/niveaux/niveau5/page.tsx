import Link from "next/link";

export default function Niveau5() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white relative overflow-hidden bg-[#081c34] font-fredoka">
      
      {/* Décor : cheminée + neige */}
      <div className="scene">
        <div className="chimney">
          <div className="chimney-top">
            <div className="snow-cap"></div>
          </div>
<div className="chimney-base">
  {Array.from({ length: 18 }).map((_, i) => (
    <div key={i}></div>
  ))}
</div>
        </div>
        <div className="neige-wave">
          <div className="neige-top-layer"></div>
          <div className="neige-bottom-layer"></div>
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
          Super Puissances des Nombres
        </h1>
        <p className="text-xl sm:text-2xl text-white font-medium">
          Découvre les pouvoirs magiques des exposants
        </p>
      </div>

      {/* Boutons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 z-10">
        <a
          href="/primaire/niveaux/niveau5/exposant/n1"
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl text-center flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Premier niveau
        </a>
        <a
          href="/primaire/niveaux/niveau5/exposant/n2"
          className="bg-green-600 hover:bg-green-800 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl text-center flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Deuxième niveau
        </a>
      </div>
    </div>
  );
}
