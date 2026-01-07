"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthButtons() {
  const pathname = usePathname();

  // Si on est dans /mobile/..., on adapte les liens
  const basePath = useMemo(() => {
    return pathname?.startsWith("/mobile") ? "/mobile" : "";
  }, [pathname]);

  const [ready, setReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setIsLoggedIn(!!data.session);
      setReady(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  if (!ready) return null;

  const hrefConnexion = `${basePath}/connexion`;
  const hrefInscription = `${basePath}/inscription`;
  const hrefCompte = `${basePath}/compte`;

  return (
    <div className="fixed top-3 right-3 z-50 flex gap-2 scale-90 sm:scale-100">
      {isLoggedIn ? (
        <>
          <Link
            href={hrefCompte}
            className="px-5 py-2 rounded-full bg-white text-black border border-black font-medium hover:bg-neutral-100 transition"
          >
            Mon compte
          </Link>

          <button
            type="button"
            onClick={logout}
            className="px-5 py-2 rounded-full bg-black text-white font-medium hover:bg-neutral-800 transition"
          >
            Déconnexion
          </button>
        </>
      ) : (
        <>
          <Link
            href={hrefConnexion}
            className="px-5 py-2 rounded-full bg-black text-white font-medium hover:bg-neutral-800 transition"
          >
            Connexion
          </Link>

          <Link
            href={hrefInscription}
            className="px-5 py-2 rounded-full bg-white text-black border border-black font-medium hover:bg-neutral-100 transition"
          >
            Créer un compte
          </Link>
        </>
      )}
    </div>
  );
}
