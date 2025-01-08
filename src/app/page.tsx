import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="relative grid items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]"
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

      <main className="relative">
        {/* Titre */}
        <div className="text-center mb-8">
          <h1 className="text-white text-5xl sm:text-6xl font-bold">Mathegame</h1>
        </div>

        {/* Boutons Primaire et Secondaire */}
        <div className="flex justify-center items-center gap-8">
          {/* Bouton Primaire */}
          <Link href="/primaire">
            <div
              className="absolute"
              style={{
                top: "70%", // Position plus basse
                left: "25%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="rounded-full bg-yellow-500 text-black text-sm sm:text-base h-12 sm:h-14 w-32 sm:w-36 flex items-center justify-center font-bold hover:bg-yellow-400">
                Primaire
              </div>
            </div>
          </Link>

          {/* Bouton Secondaire */}
          <Link href="/secondaire">
            <div
              className="absolute"
              style={{
                top: "70%", // Position plus basse
                left: "75%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="rounded-full bg-orange-500 text-black text-sm sm:text-base h-12 sm:h-14 w-32 sm:w-36 flex items-center justify-center font-bold hover:bg-orange-400">
                Secondaire
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
