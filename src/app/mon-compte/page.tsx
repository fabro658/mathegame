"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type UserInfo = {
  id: string;
  email: string;
  firstName: string | null;
};

export default function MonComptePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const [user, setUser] = useState<UserInfo | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sécurité suppression
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const confirmOk = useMemo(() => confirmText.trim().toUpperCase() === "SUPPRIMER", [confirmText]);

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
    await supabase.auth.signOut();
    setBusy(false);
    router.push("/");
  };

  const openDelete = () => {
    setErrorMsg(null);
    setConfirmText("");
    setConfirmOpen(true);
  };

  const deleteAccount = async () => {
    if (!user) return;

    setBusy(true);
    setErrorMsg(null);

    try {
      // Récupère le token pour l'API
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        throw new Error("Session invalide. Reconnecte-toi et réessaie.");
      }

      const res = await fetch("/api/delete_account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Toujours lire en text puis parser si possible => plus robuste
      const raw = await res.text();
      let json: any = null;
      try {
        json = raw ? JSON.parse(raw) : null;
      } catch {
        // si serveur renvoie HTML, on affiche un message clair
        throw new Error("Réponse serveur invalide (non-JSON). Vérifie les logs Vercel.");
      }

      if (!res.ok) {
        throw new Error(json?.error || "Erreur serveur.");
      }

      if (!json?.success) {
        throw new Error(json?.error || "Suppression échouée.");
      }

      // Déconnexion + retour accueil
      await supabase.auth.signOut();
      router.push("/");
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Erreur inconnue.");
    } finally {
      setBusy(false);
      setConfirmOpen(false);
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
            onClick={openDelete}
            className="mt-4 w-full px-5 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
            disabled={busy}
          >
            Supprimer mon compte
          </button>
        </div>
      </div>

      {/* Modal de confirmation */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-black/10 p-6">
            <h3 className="text-lg font-semibold">Confirmation</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Tape <span className="font-semibold">SUPPRIMER</span> pour confirmer.
            </p>

            <input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="mt-4 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="SUPPRIMER"
              autoFocus
            />

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border hover:bg-neutral-50"
                disabled={busy}
              >
                Annuler
              </button>

              <button
                type="button"
                onClick={deleteAccount}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
                disabled={busy || !confirmOk}
              >
                {busy ? "Suppression..." : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
