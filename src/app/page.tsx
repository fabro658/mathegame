import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="grid grid-rows-[20px_1fr] items-center justify-items-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      style={{
        backgroundImage: "url('/fond_mathegame.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <header className="absolute top-4 left-4">
        <nav className="menu flex flex-col gap-4">
          <span className="menu-title font-bold text-lg mb-4 text-white">Menu</span>
          <Link href="/menu/apprendre" className="flex items-center gap-2 text-white hover:underline">
            <Image src="/file.svg" alt="Apprendre Icon" width={20} height={20} />
            <span>Apprendre</span>
          </Link>
          <Link href="/menu/options" className="flex items-center gap-2 text-white hover:underline">
            <Image src="/globe.svg" alt="Option Icon" width={20} height={20} />
            <span>À propos</span>
          </Link>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center mt-16 gap-8">
        {/* Liens vers les niveaux */}
        <div className="flex flex-row gap-8">
          <Link href="/primaire">
            <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg hover:scale-105 transition-all">
              Primaire
            </div>
          </Link>

          <Link href="/secondaire">
            <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg hover:scale-105 transition-all">
              Secondaire
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
