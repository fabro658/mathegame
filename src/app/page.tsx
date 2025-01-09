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
      <div className="flex flex-col items-center text-center mb-[3cm]">
        {/* Titre 1 */}
        <h1 className="text-white text-6xl sm:text-7xl font-bold" style={{ marginBottom: '0.5cm', marginTop: '0cm' }}>
          Mathgame
        </h1>
        {/* Ligne noire sous le titre */}
        <div className=" w-64 et sm:w-96 h-1 bg-black mt-2 mb-4"></div>
        {/* Titre 2 */}
        <h2 className="text-white text-4xl sm:text-5xl font-semibold">Mathématique</h2>
      </div>

      {/* Boutons Primaire, Secondaire et À venir */}
      <div className="absolute bottom-[150px] w-full flex justify-between">
        {/* Bouton Primaire */}
        <Link href="/primaire">
          <div
            className="absolute bg-yellow-500 text-black text-lg sm:text-xl h-32 sm:h-40 w-64 sm:w-80 flex items-center justify-center font-bold hover:bg-yellow-400"
            style={{
              borderTopLeftRadius: '100% 50%',
              borderTopRightRadius: '100% 50%',
              left: '30%',
              transform: 'translateX(-50%)',
            }}
          >
            Primaire
          </div>
        </Link>

        {/* Bouton Secondaire */}
        <Link href="/avenir">
          <div
            className="absolute bg-orange-500 text-black text-lg sm:text-xl h-32 sm:h-40 w-64 sm:w-80 flex items-center justify-center font-bold hover:bg-orange-400"
            style={{
              borderTopLeftRadius: '100% 50%',
              borderTopRightRadius: '100% 50%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            À venir
          </div>
        </Link>

        {/* Bouton À venir */}
        <Link href="/secondaire">
          <div
            className="absolute bg-green-500 text-black text-lg sm:text-xl h-32 sm:h-40 w-64 sm:w-80 flex items-center justify-center font-bold hover:bg-green-400"
            style={{
              borderTopLeftRadius: '100% 50%',
              borderTopRightRadius: '100% 50%',
              left: '70%',
              transform: 'translateX(-50%)',
            }}
          >
            Secondaire
          </div>
        </Link>
      </div>
    </div>
  );
}