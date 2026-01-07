"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ReinitialiserMdpPage() {
  const router = useRouter();

  const [ready, setReady] = useState(false);
  const [hasRecoverySession, setHasRecoverySession] = useState(false);

  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Vérifie qu'on a bien une session après le clic sur l'email (type=recovery)
  useEffect(() => {
    let mounted = true;

    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      setHasRecoverySession(!!data.session);
      setReady(true);
    };

    check();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasRecoverySession(!!session);
      setReady(true);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg(null);
    setErrorMsg(null);

    if (!hasRecoverySession) {
      setErrorMsg("Lien invalide ou expiré. Refais une demande de réinitialisation.");
      return;
    }

    if (!pwd1 || pwd1.length < 8) {
      setErrorMsg("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (pwd1 !== pwd2) {
      setErrorMsg("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    // IMPORTANT: pas d'options captchaToken ici (non supporté)
    const { error } = await supabase.auth.updateUser({
      password: pwd1,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setMsg("Mot de passe mis à jour. Tu peux te connecter.");

    // (Optionnel mais propre) on déconnecte la session recovery
    await supabase.auth.signOut();

    router.push("/connexion");
  };

  const isDisabled = loading || !ready || !hasRecoverySession;

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#d8d3a1] to-[#f2c14e] flex items-center justify-center px-6">
      <div className="auth-shell w-full max-w-5xl rounded-[40px] p-8 shadow-2xl">
        <div className="w-full max-w-md mx-auto">
          <div className="flex justify-between items-center mb-6 text-sm">
            <Link href="/connexion" className="hover:underline">
              Retour à la connexion
            </Link>
            <Link href="/" className="hover:underline">
              Accueil
            </Link>
          </div>

          <div className="bg-white/95 rounded-3xl p-7 shadow-lg border border-black/10">
            <h1 className="text-2xl font-bold mb-1">Réinitialiser le mot de passe</h1>
            <p className="text-sm text-neutral-600 mb-6">
              Choisis un nouveau mot de passe.
            </p>

            {!ready ? (
              <p className="text-sm text-neutral-600">Chargement…</p>
            ) : !hasRecoverySession ? (
              <div className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl p-3">
                Lien invalide ou expiré. Retourne à “mot de passe oublié” pour demander un nouveau lien.
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nouveau mot de passe</label>
                  <input
                    className="w-full mt-1 rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                    value={pwd1}
                    onChange={(e) => setPwd1(e.target.value)}
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Confirmer le nouveau mot de passe</label>
                  <input
                    className="w-full mt-1 rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                    value={pwd2}
                    onChange={(e) => setPwd2(e.target.value)}
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                  />
                </div>

                {errorMsg && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl p-3">
                    {errorMsg}
                  </div>
                )}

                {msg && (
                  <div className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl p-3">
                    {msg}
                  </div>
                )}

                <button
                  disabled={isDisabled}
                  className="w-full bg-black text-white rounded-xl py-2.5 font-medium hover:bg-neutral-800 transition disabled:opacity-60"
                >
                  {loading ? "Validation..." : "Mettre à jour le mot de passe"}
                </button>

                <p className="text-xs text-neutral-500 text-center pt-1">
                  Minimum 8 caractères.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
