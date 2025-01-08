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

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start mt-10">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <Image
            className="dark:invert"
            src="/logo.png"
            alt="Mon logo"
            width={500}
            height={100}
            priority
          />
          <span className="text-5xl sm:text-6xl font-bold text-white mt-2">MathGame</span>
        </div>

        {/* Liens vers les niveaux */}
        <div className="flex flex-col gap-4 absolute right-8 top-1/2 transform -translate-y-1/2">
          <Link href="/primaire">
            <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              Primaire
            </div>
          </Link>

          <Link href="/secondaire">
            <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              Secondaire
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
