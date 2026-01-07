"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function InscriptionPage() {
  const router = useRouter();

  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setErrorMsg(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: prenom.trim() || null,
        },
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setMsg("Compte créé ✅ Vérifie ton email pour confirmer ton compte.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-sky-50 to-indigo-50">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => router.push("/")}
            className="text-sm text-neutral-700 hover:underline"
          >
            ← Retour à l’accueil
          </button>

          <Link href="/connexion" className="text-sm text-neutral-700 hover:underline">
            Connexion
          </Link>
        </div>

        <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-md border border-black/5">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-neutral-900">Créer un compte</h1>
            <p className="text-sm text-neutral-600 mt-1">
              Pour sauvegarder tes progrès et accéder à ton espace.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="text-sm font-medium text-neutral-800">Prénom (optionnel)</label>
              <input
                className="w-full mt-1 border border-neutral-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                autoComplete="given-name"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-800">Email</label>
              <input
                className="w-full mt-1 border border-neutral-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-800">Mot de passe</label>
              <div className="mt-1 flex items-stretch gap-2">
                <input
                  className="flex-1 border border-neutral-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
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
                  className="px-3 rounded-xl border border-neutral-200 text-sm hover:bg-neutral-50"
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
              className="w-full mt-1 bg-black text-white rounded-xl py-2.5 font-medium hover:bg-neutral-800 transition disabled:opacity-60"
            >
              {loading ? "Création..." : "Créer le compte"}
            </button>

            <p className="text-xs text-neutral-500 text-center">
              En créant un compte, tu acceptes les conditions d’utilisation.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
