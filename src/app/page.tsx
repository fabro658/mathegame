import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      style={{
        backgroundImage: "url('/mathegame.png')",
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
      <div className="flex flex-col items-center text-center mb-[3cm]">
        {/* Titre 1 */}
        <h1 className="text-white text-6xl sm:text-7xl font-bold" style={{ marginBottom: '0.5cm', marginTop: '0.5cm' }}>
          Mathegame
        </h1>
        {/* Titre 2 */}
        <h2 className="text-white text-4xl sm:text-5xl font-semibold">Mathématique</h2>
      </div>

      {/* Boutons Primaire et Secondaire */}
      <div className="absolute bottom-[36px] w-full flex justify-between">
        {/* Bouton Primaire */}
        <Link href="/primaire">
          <div
            className="absolute rounded-full bg-yellow-500 text-black text-sm sm:text-base h-12 sm:h-14 w-32 sm:w-36 flex items-center justify-center font-bold hover:bg-yellow-400"
            style={{ left: '20%' }}
          >
            Primaire
          </div>
        </Link>

        {/* Bouton Secondaire */}
        <Link href="/secondaire">
          <div
            className="absolute rounded-full bg-orange-500 text-black text-sm sm:text-base h-12 sm:h-14 w-32 sm:w-36 flex items-center justify-center font-bold hover:bg-orange-400"
            style={{ left: '70%' }}
          >
            Secondaire
          </div>
        </Link>
      </div>
    </div>
  );
}
