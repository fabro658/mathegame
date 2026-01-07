"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ReinitialiserMdpPage() {
  const router = useRouter();

  const [ready, setReady] = useState(false);
  const [sessionOk, setSessionOk] = useState(false);

  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Quand l'utilisateur arrive depuis le lien email, Supabase crée une session "recovery"
  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      setReady(true);
      if (error) {
        setSessionOk(false);
        return;
      }
      setSessionOk(!!data.session);
    });
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg(null);
    setErrorMsg(null);

    if (!sessionOk) {
      setErrorMsg("Lien invalide ou expiré. Refais “Mot de passe oublié”.");
      return;
    }

    if (pwd1.length < 8) {
      setErrorMsg("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (pwd1 !== pwd2) {
      setErrorMsg("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password: pwd1 });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setMsg("Mot de passe mis à jour. Tu peux maintenant te connecter.");
    setPwd1("");
    setPwd2("");

    // Optionnel: redirige vers connexion après 1.2s
    setTimeout(() => {
      router.push("/connexion");
    }, 1200);
  };

  if (!ready) return null;

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#d8d3a1] to-[#f2c14e] flex items-center justify-center px-6">
      <div className="auth-shell w-full max-w-5xl rounded-[40px] p-8 shadow-2xl">
        <div className="w-full max-w-md mx-auto">
          <div className="flex justify-between items-center mb-6 text-sm">
            <Link href="/" className="hover:underline">
              Retour à l’accueil
            </Link>
            <Link href="/connexion" className="hover:underline">
              Connexion
            </Link>
          </div>

          <div className="bg-white/95 rounded-3xl p-7 shadow-lg border border-black/10">
            <h1 className="text-2xl font-bold mb-1">Réinitialiser le mot de passe</h1>
            <p className="text-sm text-neutral-600 mb-6">
              Choisis un nouveau mot de passe.
            </p>

            {!sessionOk && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl p-3 mb-4">
                Lien invalide ou expiré. Retourne à{" "}
                <Link href="/mdp_oublie" className="underline">
                  Mot de passe oublié
                </Link>{" "}
                pour recevoir un nouveau lien.
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nouveau mot de passe</label>
                <div className="mt-1 flex gap-2">
                  <input
                    className="flex-1 rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                    value={pwd1}
                    onChange={(e) => setPwd1(e.target.value)}
                    type={showPwd ? "text" : "password"}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    disabled={!sessionOk || loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="px-4 rounded-xl border text-sm hover:bg-neutral-50"
                    disabled={!sessionOk || loading}
                  >
                    {showPwd ? "Masquer" : "Afficher"}
                  </button>
                </div>
                <p className="text-xs text-neutral-500 mt-1">Minimum 8 caractères.</p>
              </div>

              <div>
                <label className="text-sm font-medium">Confirmer le mot de passe</label>
                <input
                  className="w-full mt-1 rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                  value={pwd2}
                  onChange={(e) => setPwd2(e.target.value)}
                  type={showPwd ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  disabled={!sessionOk || loading}
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
                disabled={!sessionOk || loading}
                className="w-full bg-black text-white rounded-xl py-2.5 font-medium hover:bg-neutral-800 transition disabled:opacity-60"
              >
                {loading ? "Mise à jour..." : "Mettre à jour"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
