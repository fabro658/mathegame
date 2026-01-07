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
    <div className="min-h-screen w-full bg-gradient-to-r from-[#d8d3a1] to-[#f2c14e] flex items-center justify-center px-6">
  <div className="auth-shell w-full max-w-5xl rounded-[40px] p-8 shadow-2xl">
        <div className="w-full max-w-md mx-auto">

          <div className="flex justify-between items-center mb-6 text-sm">
            <button onClick={() => router.push("/")} className="hover:underline">
              ← Retour à l’accueil
            </button>
          </div>

          <div className="bg-white/95 rounded-3xl p-7 shadow-lg border border-black/10">

            <h1 className="text-2xl font-bold mb-1">Connexion</h1>
            <p className="text-sm text-neutral-600 mb-6">
              Reprends là où tu t’étais rendu.
            </p>

            <form onSubmit={onSubmit} className="space-y-4">

              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  className="w-full mt-1 rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Mot de passe</label>
                <div className="mt-1 flex gap-2">
                  <input
                    className="flex-1 rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPwd ? "text" : "password"}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(v => !v)}
                    className="px-4 rounded-xl border text-sm hover:bg-neutral-50"
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
                className="w-full bg-black text-white rounded-xl py-2.5 font-medium hover:bg-neutral-800 transition"
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>

              <div className="flex justify-between text-sm pt-2">
                <Link href="/mot-de-passe-oublie" className="underline">
                  Mot de passe oublié
                </Link>
                <Link href="/inscription" className="underline">
                  Créer un compte
                </Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
