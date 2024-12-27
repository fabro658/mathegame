import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="absolute top-4 left-4">
        <div className="menu">
          <span className="menu-title">Menu</span>
          <div className="menu-content">
            <Link href="/Apprendre">
              Apprendre 
            </Link>
            <Link href="/option2">
              Documentation 
            </Link>
            <Link href="/option3">
              Option 
            </Link>
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
          {/* Niveau 1 (Redirige vers le même lien que Learn) */}
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-solid border-transparent transition-colors bg-foreground text-background text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            <Image src="/file.svg" alt="File icon" width={16} height={16} />
            Niveau 1
          </a>

          {/* Niveau 2 (Redirige vers le même lien que Learn) */}
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-solid border-transparent transition-colors bg-foreground text-background text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            <Image src="/window.svg" alt="Window icon" width={16} height={16} />
            Niveau 2
          </a>

          {/* Niveau 3 (Redirige vers le même lien que Learn) */}
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-solid border-transparent transition-colors bg-foreground text-background text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            <Image src="/globe.svg" alt="Globe icon" width={16} height={16} />
            Niveau 3
          </a>

          {/* Niveau 4 (Redirige vers le même lien que Learn) */}
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-solid border-transparent transition-colors bg-foreground text-background text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            <Image src="/file.svg" alt="File icon" width={16} height={16} />
            Niveau 4
          </a>

          {/* Niveau 5 (Redirige vers le même lien que Learn) */}
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-solid border-transparent transition-colors bg-foreground text-background text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            <Image src="/window.svg" alt="Window icon" width={16} height={16} />
            Niveau 5
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
