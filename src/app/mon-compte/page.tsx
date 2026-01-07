"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type UserInfo = {
  id: string;
  email: string;
  firstName: string | null;
};

export default function ComptePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/connexion");
        return;
      }

      const u = data.user;
      setUser({
        id: u.id,
        email: u.email ?? "",
        firstName: (u.user_metadata?.first_name as string | undefined) ?? null,
      });

      setLoading(false);
    };

    load();
  }, [router]);

  const logout = async () => {
    setBusy(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    await supabase.auth.signOut();
    setBusy(false);

    router.push("/");
  };

  const deleteAccount = async () => {
    if (!user) return;

    const ok = confirm(
      "Supprimer ton compte définitivement ?\n\nCette action est irréversible."
    );
    if (!ok) return;

    setBusy(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      const json = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok || json.error) {
        throw new Error(json.error || "Erreur lors de la suppression du compte.");
      }

      await supabase.auth.signOut();
      router.push("/");
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Erreur inconnue.");
    } finally {
      setBusy(false);
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-neutral-100">
      <div className="w-full max-w-xl bg-white rounded-3xl border border-black/10 shadow-lg p-8">
        <h1 className="text-2xl font-bold">Mon compte</h1>
        <p className="text-sm text-neutral-600 mt-1">
          Gère ton profil et tes paramètres.
        </p>

        <div className="mt-6 space-y-3">
          <div className="rounded-2xl border border-neutral-200 p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500">
              Email
            </div>
            <div className="font-medium text-neutral-900">{user?.email}</div>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500">
              Prénom
            </div>
            <div className="font-medium text-neutral-900">
              {user?.firstName ?? "—"}
            </div>
          </div>

          {errorMsg && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl p-4">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-2xl p-4">
              {successMsg}
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.push("/")}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50"
            disabled={busy}
          >
            Retour à l’accueil
          </button>

          <button
            onClick={logout}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 disabled:opacity-60"
            disabled={busy}
          >
            Déconnexion
          </button>
        </div>

        <div className="mt-8 border-t pt-6">
          <h2 className="font-semibold text-red-600">Zone dangereuse</h2>
          <p className="text-sm text-neutral-600 mt-1">
            Supprimer ton compte efface ton accès. Action irréversible.
          </p>

          <button
            onClick={deleteAccount}
            className="mt-4 w-full px-5 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
            disabled={busy}
          >
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>
  );
}
