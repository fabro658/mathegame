// src/app/Niveau 1/niveau1.tsx
import Link from "next/link";

export default function Niveau1() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">Niveau 1</h1>
      <div className="grid grid-cols-2 gap-8">
        <Link href="/addition">
          <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background text-4xl hover:bg-[#383838] dark:hover:bg-[#ccc] h-24 w-24">
            +
          </a>
        </Link>
        <Link href="/subtraction">
          <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background text-4xl hover:bg-[#383838] dark:hover:bg-[#ccc] h-24 w-24">
            -
          </a>
        </Link>
        <Link href="/multiplication">
          <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background text-4xl hover:bg-[#383838] dark:hover:bg-[#ccc] h-24 w-24">
            ×
          </a>
        </Link>
        <Link href="/division">
          <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background text-4xl hover:bg-[#383838] dark:hover:bg-[#ccc] h-24 w-24">
            ÷
          </a>
        </Link>
      </div>
    </div>
  );
}