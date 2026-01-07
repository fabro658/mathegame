"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ConnexionPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    router.push("/");
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

          <Link href="/inscription" className="text-sm text-neutral-700 hover:underline">
            Créer un compte
          </Link>
        </div>

        <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-md border border-black/5">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-neutral-900">Connexion</h1>
            <p className="text-sm text-neutral-600 mt-1">
              Reprends là où tu t’étais rendu.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
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
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="px-3 rounded-xl border border-neutral-200 text-sm hover:bg-neutral-50"
                >
                  {showPwd ? "Masquer" : "Afficher"}
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl p-3">
                {errorMsg}
              </div>
            )}

            <button
              disabled={loading}
              className="w-full bg-black text-white rounded-xl py-2.5 font-medium hover:bg-neutral-800 transition disabled:opacity-60"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>

            <div className="flex justify-between text-sm">
              <Link className="underline text-neutral-700" href="/mot-de-passe-oublie">
                Mot de passe oublié
              </Link>
              <Link className="underline text-neutral-700" href="/inscription">
                Créer un compte
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
