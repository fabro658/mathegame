"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function HeaderSwitcher() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Accueil: on n'affiche PAS le navbar (donc l'accueil ne change pas)
  if (isHome) return null;

  // Autres pages: hamburger/menu
  return <Navbar />;
}
