"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ReinitialiserMotDePassePage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // Si l'utilisateur arrive sans session (lien invalide/expiré), on peut afficher un message
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        setErrorMsg("Lien invalide ou expiré. Redemande un nouveau lien.");
      }
    });
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg(null);
    setErrorMsg(null);
    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setMsg("Mot de passe mis à jour. Tu peux te reconnecter.");
    setTimeout(() => router.push("/connexion"), 800);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-neutral-100">
      <div className="w-full max-w-md bg-white/95 rounded-3xl p-7 shadow-lg border border-black/10">
        <h1 className="text-2xl font-bold mb-1">Nouveau mot de passe</h1>
        <p className="text-sm text-neutral-600 mb-6">
          Choisis un nouveau mot de passe.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nouveau mot de passe</label>
            <div className="mt-1 flex gap-2">
              <input
                className="flex-1 rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPwd ? "text" : "password"}
                required
                minLength={8}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="px-4 rounded-xl border text-sm hover:bg-neutral-50"
              >
                {showPwd ? "Masquer" : "Afficher"}
              </button>
            </div>
            <p className="text-xs text-neutral-500 mt-1">Minimum 8 caractères.</p>
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
            disabled={loading}
            className="w-full bg-black text-white rounded-xl py-2.5 font-medium hover:bg-neutral-800 transition disabled:opacity-60"
          >
            {loading ? "Mise à jour..." : "Mettre à jour"}
          </button>
        </form>
      </div>
    </div>
  );
}
