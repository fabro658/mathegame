'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthButtons() {
  const [ready, setReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session);
      setReady(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  if (!ready) return null;

  return (
    <div className="fixed top-3 right-3 z-50 flex gap-2 scale-90 sm:scale-100">
      {isLoggedIn ? (
        <>
          <Link href="/compte">
            <div className="px-5 py-2 rounded-full bg-white text-black border border-black font-medium hover:bg-neutral-100 transition">
              Mon compte
            </div>
          </Link>
          <button
            onClick={logout}
            className="px-5 py-2 rounded-full bg-black text-white font-medium hover:bg-neutral-800 transition"
          >
            Déconnexion
          </button>
        </>
      ) : (
        <>
          <Link href="/connexion">
            <div className="px-5 py-2 rounded-full bg-black text-white font-medium hover:bg-neutral-800 transition">
              Connexion
            </div>
          </Link>
          <Link href="/inscription">
            <div className="px-5 py-2 rounded-full bg-white text-black border border-black font-medium hover:bg-neutral-100 transition">
              Créer un compte
            </div>
          </Link>
        </>
      )}
    </div>
  );
}
