import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      style={{
        backgroundImage: "url('/mathgame.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
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

      {/* Section Titre */}
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">Mathgame</h1>
        <div className="w-32 sm:w-48 md:w-64 lg:w-96 h-1 bg-black mb-4"></div>
        <h2 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">Mathématique</h2>
      </div>

      {/* Boutons Primaire, Secondaire et À venir */}
      <div className="absolute bottom-16 flex flex-col sm:flex-row sm:gap-8 w-full px-4">
        {/* Bouton Primaire */}
        <Link href="/primaire">
          <div
            className="bg-yellow-500 text-black text-sm sm:text-base md:text-lg lg:text-xl h-16 sm:h-24 md:h-32 lg:h-40 w-full sm:w-32 md:w-40 lg:w-64 flex items-center justify-center font-bold hover:bg-yellow-400 rounded-t-full"
          >
            Primaire
          </div>
        </Link>

        {/* Bouton À venir */}
        <Link href="/avenir">
          <div
            className="bg-orange-500 text-black text-sm sm:text-base md:text-lg lg:text-xl h-16 sm:h-24 md:h-32 lg:h-40 w-full sm:w-32 md:w-40 lg:w-64 flex items-center justify-center font-bold hover:bg-orange-400 rounded-t-full"
          >
            À venir
          </div>
        </Link>

        {/* Bouton Secondaire */}
        <Link href="/secondaire">
          <div
            className="bg-green-500 text-black text-sm sm:text-base md:text-lg lg:text-xl h-16 sm:h-24 md:h-32 lg:h-40 w-full sm:w-32 md:w-40 lg:w-64 flex items-center justify-center font-bold hover:bg-green-400 rounded-t-full"
          >
            Secondaire
          </div>
        </Link>
      </div>
    </div>
  );
}
