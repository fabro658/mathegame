"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AuthButtons from "@/components/AuthButtons";

export default function Home() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);

    return () => {
      window.removeEventListener("resize", checkDeviceType);
    };
  }, []);

  useEffect(() => {
    if (isMobile) router.push("/mobile");
  }, [isMobile, router]);

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen p-8 sm:p-20"
      style={{
        backgroundImage: "url('/mathgame.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Auth global */}
      <AuthButtons />

      {/* Menu gauche */}
      <header className="absolute top-4 left-4">
        <div className="flex flex-col gap-4 text-white">
          <span className="font-bold text-lg mb-4">Menu</span>

          <Link href="/menu/apprendre" className="flex items-center gap-2 hover:underline">
            <Image src="/file.svg" alt="Apprendre" width={20} height={20} />
            <span>Apprendre</span>
          </Link>

          <Link href="/menu/options" className="flex items-center gap-2 hover:underline">
            <Image src="/globe.svg" alt="À propos" width={20} height={20} />
            <span>À propos</span>
          </Link>
        </div>
      </header>

      {/* Titre */}
      <div className="flex flex-col items-center text-center mb-16 text-white">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">ExploreMath</h1>
        <div className="w-32 sm:w-48 md:w-64 lg:w-96 h-1 bg-black mb-4"></div>
        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">Mathématique</h2>
      </div>

      {/* Choix de niveau */}
      <div className="absolute bottom-16 flex flex-col sm:flex-row sm:justify-center sm:items-center sm:gap-8 w-full px-4">
        <Link href="/primaire">
          <div className="bg-yellow-500 text-black text-sm sm:text-base md:text-lg lg:text-xl h-16 sm:h-24 md:h-32 lg:h-40 w-full sm:w-32 md:w-40 lg:w-64 flex items-center justify-center font-bold hover:bg-yellow-400 rounded-t-full">
            Primaire
          </div>
        </Link>

        <Link href="/avenir">
          <div className="bg-orange-500 text-black text-sm sm:text-base md:text-lg lg:text-xl h-16 sm:h-24 md:h-32 lg:h-40 w-full sm:w-32 md:w-40 lg:w-64 flex items-center justify-center font-bold hover:bg-orange-400 rounded-t-full">
            À venir
          </div>
        </Link>

        <Link href="/secondaire">
          <div className="bg-green-500 text-black text-sm sm:text-base md:text-lg lg:text-xl h-16 sm:h-24 md:h-32 lg:h-40 w-full sm:w-32 md:w-40 lg:w-64 flex items-center justify-center font-bold hover:bg-green-400 rounded-t-full">
            Secondaire
          </div>
        </Link>
      </div>
    </div>
  );
}
