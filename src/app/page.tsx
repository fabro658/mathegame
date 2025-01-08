import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: "url('/fond_mathegame.png')", // Votre image ici
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Menu en haut à gauche */}
      <header className="absolute top-4 left-4">
        <div className="menu flex flex-col gap-4">
          <span className="menu-title font-bold text-lg mb-4 text-white">Menu</span>
          <Link href="/menu/apprendre" className="flex items-center gap-2 text-white hover:underline">
            <Image src="/file.svg" alt="Apprendre Icon" width={20} height={20} />
            <span>Apprendre</span>
          </Link>
          <Link href="/menu/options" className="flex items-center gap-2 text-white hover:underline">
            <Image src="/globe.svg" alt="À propos Icon" width={20} height={20} />
            <span>À propos</span>
          </Link>
        </div>
      </header>

      {/* Boutons positionnés sur les demi-cercles */}
      <div className="relative w-full h-full">
        {/* Bouton Primaire */}
        <Link href="/primaire">
          <button
            className="absolute bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-500"
            style={{
              bottom: '15%', // Ajustez la position verticale
              left: '20%', // Ajustez la position horizontale
              transform: 'translate(-50%, 50%)', // Centre le bouton sur le demi-cercle
            }}
          >
            Primaire
          </button>
        </Link>

        {/* Bouton Secondaire */}
        <Link href="/secondaire">
          <button
            className="absolute bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600"
            style={{
              bottom: '15%', // Ajustez la position verticale
              right: '20%', // Ajustez la position horizontale
              transform: 'translate(50%, 50%)', // Centre le bouton sur le demi-cercle
            }}
          >
            Secondaire
          </button>
        </Link>
      </div>

      {/* Bouton Avancé en bas au centre */}
      <div className="absolute bottom-10 w-full flex justify-center">
        <Link href="/avancé">
          <button className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600">
            Avancé
          </button>
        </Link>
      </div>
    </div>
  );
}
