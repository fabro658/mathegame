import Image from "next/image";
import Link from "next/link";

export default function MobileHome() {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen p-4 font-[family-name:var(--font-geist-sans)]"
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
          <span className="menu-title font-bold text-md mb-2 text-white">Menu</span>
          <Link href="/mobile/menu_mobile/apprendre_mobile" className="flex items-center gap-2 text-white hover:underline">
            <Image src="/file.svg" alt="Apprendre Icon" width={16} height={16} />
            <span className="text-sm">Apprendre</span>
          </Link>
          <Link href="/mobile/menu_mobile/options_mobile" className="flex items-center gap-2 text-white hover:underline">
            <Image src="/globe.svg" alt="Option Icon" width={16} height={16} />
            <span className="text-sm">À propos</span>
          </Link>
        </div>
      </header>

      {/* Section Titre */}
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-white text-2xl font-bold mb-2">ExploreMath</h1>
        <div className="w-24 h-1 bg-black mb-2"></div>
        <h2 className="text-white text-lg font-semibold">Mathématique</h2>
      </div>

      {/* Boutons Primaire, Secondaire et À venir */}
      <div className="absolute bottom-32 flex flex-row justify-center items-center gap-4 w-full px-4">
        {/* Bouton Primaire */}
        <Link href="/mobile/primaire_mobile">
          <div
            className="bg-yellow-500 text-black text-base h-20 w-28 flex items-center justify-center font-bold hover:bg-yellow-400 rounded-lg"
          >
            Primaire
          </div>
        </Link>

        {/* Bouton Secondaire */}
        <Link href="/mobile/secondaire_mobile">
          <div
            className="bg-green-500 text-black text-base h-20 w-28 flex items-center justify-center font-bold hover:bg-green-400 rounded-lg"
          >
            Secondaire
          </div>
        </Link>
      </div>
    </div>
  );
}