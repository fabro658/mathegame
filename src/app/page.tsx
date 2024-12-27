import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Menu */}
      <header className="absolute top-8 left-8 group">
        <div className="menu">
          <span className="menu-title">Menu</span>
          <div className="menu-content hidden group-hover:flex flex-col gap-2 mt-2">
            <Link href="/option1">
              <a className="menu-item">Option 1</a>
            </Link>
            <Link href="/option2">
              <a className="menu-item">Option 2</a>
            </Link>
            <Link href="/option3">
              <a className="menu-item">Option 3</a>
            </Link>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex flex-1 flex-col justify-center items-center">
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

      {/* Boutons de niveaux */}
      <aside className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
        <Link href="/Niveau/niveau1.tsx">
          <a className="rounded-full border transition-colors flex items-center justify-center bg-foreground text-background hover:bg-hover-color h-10 px-4">
            Niveau 1
          </a>
        </Link>
        <Link href="/Niveau/niveau2.tsx">
          <a className="rounded-full border transition-colors flex items-center justify-center bg-foreground text-background hover:bg-hover-color h-10 px-4">
          Niveau 2
          </a>
        </Link>
        <Link href="/Niveau/niveau3.tsx">
          <a className="rounded-full border transition-colors flex items-center justify-center bg-foreground text-background hover:bg-hover-color h-10 px-4">
          Niveau 3
          </a>
        </Link>
        <Link href="/Niveau/niveau4.tsx">
          <a className="rounded-full border transition-colors flex items-center justify-center bg-foreground text-background hover:bg-hover-color h-10 px-4">
          Niveau 4
          </a>
        </Link>
        <Link href="/Niveau/niveau5.tsx">
          <a className="rounded-full border transition-colors flex items-center justify-center bg-foreground text-background hover:bg-hover-color h-10 px-4">
          Niveau 5
          </a>
        </Link>
      </aside>

      {/* Footer */}
      <footer className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline"
          href="https://vercel.com/templates"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
