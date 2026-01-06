"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function InscriptionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setMsg("Compte créé ! Vérifie ton email pour confirmer ton compte.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white rounded-2xl p-6 shadow">
        <h1 className="text-xl font-semibold mb-4">Créer un compte</h1>

        <label className="text-sm font-medium">Email</label>
        <input
          className="w-full border rounded-xl px-3 py-2 mt-1 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />

        <label className="text-sm font-medium">Mot de passe</label>
        <input
          className="w-full border rounded-xl px-3 py-2 mt-1 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          minLength={8}
        />

        {errorMsg && <div className="mb-3 text-sm text-red-600">{errorMsg}</div>}
        {msg && <div className="mb-3 text-sm text-green-700">{msg}</div>}

        <button
          disabled={loading}
          className="w-full bg-black text-white rounded-xl py-2 font-medium hover:bg-neutral-800 transition disabled:opacity-60"
        >
          {loading ? "Création..." : "Créer le compte"}
        </button>

        <div className="mt-4 text-sm">
          Déjà un compte ? <Link className="underline" href="/connexion">Connexion</Link>
        </div>
      </form>
    </div>
  );
}
