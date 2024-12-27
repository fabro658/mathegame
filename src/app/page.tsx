import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        <div className="flex flex-col items-center gap-4">
          <Image
            className="dark:invert"
            src="/logo.png"
            alt="Mon logo"
            width={180}
            height={38}
            priority
          />
          <span className="text-xl font-bold">MathGame</span>
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 items-center">
          <Link href="/Niveau/niveau1">
            <a className="rounded-full border border-solid border-transparent bg-foreground text-background flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 text-sm sm:text-base transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]">
              1
            </a>
          </Link>
          <Link href="/Niveau/niveau2">
            <a className="rounded-full border border-solid border-transparent bg-foreground text-background flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 text-sm sm:text-base transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]">
              2
            </a>
          </Link>
          <Link href="/Niveau/niveau3">
            <a className="rounded-full border border-solid border-transparent bg-foreground text-background flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 text-sm sm:text-base transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]">
              3
            </a>
          </Link>
          <Link href="/Niveau/niveau4">
            <a className="rounded-full border border-solid border-transparent bg-foreground text-background flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 text-sm sm:text-base transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]">
              4
            </a>
          </Link>
          <Link href="/Niveau/niveau5">
            <a className="rounded-full border border-solid border-transparent bg-foreground text-background flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 text-sm sm:text-base transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]">
              5
            </a>
          </Link>
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