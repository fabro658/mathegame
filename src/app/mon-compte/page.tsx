"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type UserView = {
  email: string;
  firstName: string | null;
};

export default function MonComptePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [userView, setUserView] = useState<UserView | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setErrorMsg(null);

      const { data, error } = await supabase.auth.getUser();

      if (!mounted) return;

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      if (!data.user) {
        router.replace("/connexion");
        return;
      }

      setUserView({
        email: data.user.email ?? "",
        firstName: (data.user.user_metadata?.first_name as string | undefined) ?? null,
      });

      setLoading(false);
    };

    load();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.replace("/connexion");
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  const title = useMemo(() => {
    if (!userView) return "Mon compte";
    return userView.firstName ? `Salut, ${userView.firstName} ` : "Mon compte";
  }, [userView]);

  const onSignOut = async () => {
    setSigningOut(true);
    setErrorMsg(null);

    const { error } = await supabase.auth.signOut();

    setSigningOut(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    router.replace("/");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#d8d3a1] to-[#f2c14e] flex items-center justify-center px-6 py-10">
      <div className="auth-shell w-full max-w-5xl rounded-[40px] p-8 shadow-2xl">
        <div className="w-full max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-6 text-sm">
            <button type="button" onClick={() => router.push("/")} className="hover:underline">
              Retour à l’accueil
            </button>
            <Link href="/" className="hover:underline">
              Accueil
            </Link>
          </div>

          <div className="bg-white/95 rounded-3xl p-7 shadow-lg border border-black/10">
            {loading ? (
              <div className="text-neutral-700">Chargement…</div>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-1">{title}</h1>
                <p className="text-sm text-neutral-600 mb-6">
                  Gère ton profil et ta session.
                </p>

                {errorMsg && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl p-3 mb-4">
                    {errorMsg}
                  </div>
                )}

                <div className="space-y-3">
                  <div className="rounded-2xl border border-black/10 bg-white p-4">
                    <div className="text-xs text-neutral-500">Email</div>
                    <div className="font-medium text-neutral-900">{userView?.email}</div>
                  </div>

                  <div className="rounded-2xl border border-black/10 bg-white p-4">
                    <div className="text-xs text-neutral-500">Prénom</div>
                    <div className="font-medium text-neutral-900">
                      {userView?.firstName ?? "—"}
                    </div>
                  </div>

                  <button
                    onClick={onSignOut}
                    disabled={signingOut}
                    className="w-full bg-black text-white rounded-xl py-2.5 font-medium hover:bg-neutral-800 transition disabled:opacity-60"
                  >
                    {signingOut ? "Déconnexion…" : "Se déconnecter"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
