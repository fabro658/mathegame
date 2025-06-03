import Link from "next/link";

export default function Niveau5() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white relative overflow-hidden bg-[#081c34] font-fredoka">

      {/* Flocons */}
      <div className="snowflakes">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 5}s`,
              width: `${4 + Math.random() * 4}px`,
              height: `${4 + Math.random() * 4}px`
            }}
          />
        ))}
      </div>

      {/* Scène */}
      <div className="scene">
        {/* Neige */}
        <div className="neige-wave">
          <div className="neige-top-layer"></div>
          <div className="neige-bottom-layer"></div>
        </div>

        {/* Cadeaux */}
        <div className="gifts">
          <div className="gift-pyramid">
            <div className="gift red base-left" />
            <div className="gift green base-right" />
            <div className="gift yellow top" />
          </div>
          <div className="gift blue side" />
        </div>

        {/* Bonhomme de neige */}
        <div className="snowman">
          <div className="corps"></div>
          <div className="tete"></div>
          <div className="yeuxG"></div>
          <div className="yeuxD"></div>
          <div className="nez"></div>
          <div className="hat-1"></div>
          <div className="hat-2"></div>
          <div className="hat-3"></div>
          <div className="snowman-mouth-1"></div>
          <div className="snowman-mouth-2"></div>
          <div className="snowman-mouth-3"></div>
          <div className="snowman-mouth-4"></div>
          <div className="snowman-mouth-5"></div>
          <div className="bouton-1"></div>
          <div className="bouton-2"></div>
          <div className="bouton-3"></div>
        </div>
      </div>

      {/* Bouton Retour */}
      <Link
        href="/primaire/"
        className="btn-candy-border absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Titre */}
      <div className="flex flex-col items-center text-center mb-12 z-10">
        <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-extrabold mb-2 drop-shadow-lg">
          Super Puissances des Nombres
        </h1>
      </div>

      {/* Boutons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 z-10">
        <a
          href="/primaire/niveaux/niveau5/exposant/n1"
          className="btn-candy-border bg-green-600 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl text-center flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Premier niveau
        </a>
        <a
          href="/primaire/niveaux/niveau5/exposant/n2"
          className="btn-candy-border bg-green-600 text-white font-bold py-6 px-12 rounded-xl text-3xl shadow-xl text-center flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Deuxième niveau
        </a>
      </div>
    </div>
  );
}
