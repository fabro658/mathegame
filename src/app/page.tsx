import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/fond_mathegame.png')", // Chemin de l'image uploadée
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Contenu de la page */}
      <header className="absolute top-4 left-4">
        <div className="menu flex flex-col gap-4">
          <span className="menu-title font-bold text-lg mb-4 text-white">Menu</span>
          <Link href="/menu/apprendre" className="flex items-center gap-2 text-white hover:underline">
            <Image src="/file.svg" alt="Apprendre Icon" width={20} height={20} />
            <span>Apprendre</span>
          </Link>
          <Link href="/menu/options" className="flex items-center gap-2 text-white hover:underline">
            <Image src="/globe.svg" alt="Option Icon" width={20} height={20} />
            <span>À propos</span>
          </Link>
        </div>
      </header>

      <main className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-10">MathGame</h1>

        {/* Boutons */}
        <div className="flex flex-col gap-4">
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
      </main>
    </div>
  );
}
