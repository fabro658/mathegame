import Link from "next/link";

export default function Home() {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/fond_mathegame.png')", // Assurez-vous que l'image est dans /public
        backgroundSize: "contain", // Garde les proportions de l'image
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: "#1E2A52", // Couleur de fond pour combler si besoin
      }}
    >
      {/* Ajout des boutons par-dessus */}
      <div className="absolute bottom-20 flex flex-col items-center gap-6">
        <Link href="/primaire">
          <button className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500">
            Primaire
          </button>
        </Link>
        <Link href="/secondaire">
          <button className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600">
            Secondaire
          </button>
        </Link>
        <Link href="/avancé">
          <button className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600">
            Avancé
          </button>
        </Link>
      </div>
    </div>
  );
}
