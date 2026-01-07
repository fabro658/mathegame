"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

type Props = {
  /** Si tu veux réutiliser pour mobile plus tard: "/mobile" */
  basePath?: "" | "/mobile";
};

export default function HeaderAuth({ basePath = "" }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const connexionHref = `${basePath}/connexion`;
  const inscriptionHref = `${basePath}/inscription`;
  const monCompteHref = `${basePath}/mon-compte`;

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      setUser(data.user ?? null);
      setLoading(false);
    };

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const onSignOut = async () => {
    await supabase.auth.signOut();

    // si tu es sur /mon-compte et tu te déconnectes, on te ramène home
    if (pathname?.startsWith(monCompteHref)) {
      router.replace(basePath === "/mobile" ? "/mobile" : "/");
    } else {
      router.refresh();
    }
  };

  if (loading) {
    return (
      <div className="fixed top-4 right-4 z-50 flex gap-3">
        <div className="px-5 py-2 rounded-full bg-black/80 text-white text-sm">
          Chargement…
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-3">
      {!user ? (
        <>
          <Link
            href={connexionHref}
            className="px-5 py-2 rounded-full bg-black text-white font-medium hover:bg-neutral-800 transition"
          >
            Connexion
          </Link>

          <Link
            href={inscriptionHref}
            className="px-5 py-2 rounded-full bg-white text-black border border-black font-medium hover:bg-neutral-100 transition"
          >
            Créer un compte
          </Link>
        </>
      ) : (
        <>
          <Link
            href={monCompteHref}
            className="px-5 py-2 rounded-full bg-white text-black border border-black font-medium hover:bg-neutral-100 transition"
          >
            Mon compte
          </Link>

          <button
            type="button"
            onClick={onSignOut}
            className="px-5 py-2 rounded-full bg-black text-white font-medium hover:bg-neutral-800 transition"
          >
            Déconnexion
          </button>
        </>
      )}
    </div>
  );
}
