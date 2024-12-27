import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] grid grid-cols-3 gap-4">
      <header className="col-span-1 flex flex-col items-start relative">
        <div className="menu group">
          <span className="menu-title cursor-pointer text-xl font-bold">Menu</span>
          <div className="menu-content hidden group-hover:flex flex-col bg-gray-800 p-4 rounded shadow-lg absolute top-8 left-0 z-10">
            <Link href="/option1">
              <a className="menu-item hover:text-gray-300">Option 1</a>
            </Link>
            <Link href="/option2">
              <a className="menu-item hover:text-gray-300">Option 2</a>
            </Link>
            <Link href="/option3">
              <a className="menu-item hover:text-gray-300">Option 3</a>
            </Link>
          </div>
        </div>
      </header>
      <main className="col-span-1 flex flex-col items-center justify-center">
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
      </main>
      <aside className="col-span-1 flex flex-col items-end gap-4">
        <Link href="/Niveau/niveau1">
          <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gray-700 text-white gap-2 hover:bg-gray-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
            Niveau 1
          </a>
        </Link>
        <Link href="/Niveau/page2">
          <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gray-700 text-white gap-2 hover:bg-gray-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
            2
          </a>
        </Link>
        <Link href="/Niveau/page3">
          <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gray-700 text-white gap-2 hover:bg-gray-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
            3
          </a>
        </Link>
        <Link href="/Niveau/page4">
          <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gray-700 text-white gap-2 hover:bg-gray-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
            4
          </a>
        </Link>
        <Link href="/Niveau/page5">
          <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gray-700 text-white gap-2 hover:bg-gray-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
            5
          </a>
        </Link>
      </aside>
      <footer className="col-span-3 flex gap-6 flex-wrap items-center justify-center mt-8">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-white"
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
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-white"
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
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-white"
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
