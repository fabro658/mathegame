import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr] items-center justify-items-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="absolute top-4 left-4">
        <div className="menu flex flex-col gap-4">
          <span className="menu-title font-bold text-lg mb-4 text-white">Menu</span>
          <Link href="/Apprendre" className="flex items-center gap-2 text-white hover:underline">
            <Image src="/file.svg" alt="Apprendre Icon" width={20} height={20} />
            <span>Apprendre</span>
          </Link>
          <Link href="/option2" className="flex items-center gap-2 text-white hover:underline">
            <Image src="/window.svg" alt="Documentation Icon" width={20} height={20} />
            <span>Documentation</span>
          </Link>
          <Link href="/option3" className="flex items-center gap-2 text-white hover:underline">
            <Image src="/globe.svg" alt="Option Icon" width={20} height={20} />
            <span>Option</span>
          </Link>
        </div>
      </header>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-col items-center gap-4">
          <Image
            className="dark:invert"
            src="/logo.png"
            alt="Mon logo"
            width={300}
            height={60}
            priority
          />
          <span className="text-3xl font-bold text-white">MathGame</span>
        </div>
        <div className="flex flex-col gap-4 absolute right-8 top-1/2 transform -translate-y-1/2">
          <Link href="/niveaux/niveau1">
            <a className="flex items-center justify-center bg-gray-800 text-white gap-2 hover:bg-gray-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              Niveau 1
            </a>
          </Link>
          <Link href="/niveaux/niveau2">
            <a className="flex items-center justify-center bg-gray-800 text-white gap-2 hover:bg-gray-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              Niveau 2
            </a>
          </Link>
          <Link href="/niveaux/niveau3">
            <a className="flex items-center justify-center bg-gray-800 text-white gap-2 hover:bg-gray-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              Niveau 3
            </a>
          </Link>
          <Link href="/niveaux/niveau4">
            <a className="flex items-center justify-center bg-gray-800 text-white gap-2 hover:bg-gray-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              Niveau 4
            </a>
          </Link>
          <Link href="/niveaux/niveau5">
            <a className="flex items-center justify-center bg-gray-800 text-white gap-2 hover:bg-gray-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              Niveau 5
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
