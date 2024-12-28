import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="absolute top-4 left-4">
        <div className="menu">
          <span className="menu-title">Menu</span>
          <div className="menu-content">
            <Link href="/Apprendre">Apprendre</Link>
            <Link href="/option2">Documentation</Link>
            <Link href="/option3">Option</Link>
          </div>
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
          <span className="text-3xl font-bold">MathGame</span>
        </div>
        <div className="flex flex-col gap-4 absolute right-8 top-1/2 transform -translate-y-1/2">
          <Link href="/niveaux/niveau1">
            <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              Niveau 1
            </a>
          </Link>
          <Link href="/niveaux/niveau2">
            <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              Niveau 2
            </a>
          </Link>
          <Link href="/niveaux/niveau3">
            <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              Niveau 3
            </a>
          </Link>
          <Link href="/niveaux/niveau4">
            <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              Niveau 4
            </a>
          </Link>
          <Link href="/niveaux/niveau5">
            <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              Niveau 5
            </a>
          </Link>
        </div>
      </main>
      {/* Footer vide pour éviter les liens */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}