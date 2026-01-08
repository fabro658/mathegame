"use client";

import { usePathname } from "next/navigation";
import HeaderAuth from "@/components/HeaderAuth";
import Navbar from "@/components/Navbar";

export default function HeaderSwitcher() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Accueil: on garde les boutons Connexion/Inscription (ton header existant)
  if (isHome) return <HeaderAuth basePath="" />;

  // Autres pages: hamburger/menu
  return <Navbar />;
}
