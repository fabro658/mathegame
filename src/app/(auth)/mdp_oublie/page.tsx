"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function MotDePasseOubliePage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg(null);
    setErrorMsg(null);
    setLoading(true);

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/reinitialiser-mot-de-passe`
        : undefined;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setMsg("Email envoyé. Vérifie ta boîte de réception.");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-neutral-100">
      <div className="w-full max-w-md bg-white/95 rounded-3xl p-7 shadow-lg border border-black/10">
        <div className="flex justify-between items-center mb-6 text-sm">
          <button onClick={() => router.push("/")} className="hover:underline">
            ← Retour à l’accueil
          </button>
          <Link href="/connexion" className="hover:underline">
            Connexion
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-1">Mot de passe oublié</h1>
        <p className="text-sm text-neutral-600 mb-6">
          Entre ton email et on t’enverra un lien de réinitialisation.
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
              autoComplete="email"
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
            disabled={loading}
            className="w-full bg-black text-white rounded-xl py-2.5 font-medium hover:bg-neutral-800 transition disabled:opacity-60"
          >
            {loading ? "Envoi..." : "Envoyer le lien"}
          </button>
        </form>
      </div>
    </div>
  );
}
