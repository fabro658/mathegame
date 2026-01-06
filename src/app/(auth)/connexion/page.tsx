"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ConnexionPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white rounded-2xl p-6 shadow">
        <h1 className="text-xl font-semibold mb-4">Connexion</h1>

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
          className="w-full border rounded-xl px-3 py-2 mt-1 mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />

        {errorMsg && <div className="mb-3 text-sm text-red-600">{errorMsg}</div>}

        <button
          disabled={loading}
          className="w-full bg-black text-white rounded-xl py-2 font-medium hover:bg-neutral-800 transition disabled:opacity-60"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        <div className="mt-4 text-sm flex justify-between">
          <Link className="underline" href="/inscription">Créer un compte</Link>
          <Link className="underline" href="/mot-de-passe-oublie">Mot de passe oublié</Link>
        </div>
      </form>
    </div>
  );
}
