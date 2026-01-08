"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type UserInfo = {
  id: string;
  email: string;
  firstName: string | null;
};

type DeleteAccountResponse = {
  success?: boolean;
  error?: string;
};

// Type guard
function isDeleteAccountResponse(v: unknown): v is DeleteAccountResponse {
  return typeof v === "object" && v !== null;
}

// Safe getters (sans any)
function getErrorMessage(v: unknown): string | undefined {
  if (!isDeleteAccountResponse(v)) return undefined;
  const maybe = (v as Record<string, unknown>)["error"];
  return typeof maybe === "string" ? maybe : undefined;
}

function getSuccess(v: unknown): boolean | undefined {
  if (!isDeleteAccountResponse(v)) return undefined;
  const maybe = (v as Record<string, unknown>)["success"];
  return typeof maybe === "boolean" ? maybe : undefined;
}

export default function MonComptePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const [user, setUser] = useState<UserInfo | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // --------- Modifier mot de passe ----------
  const [pwdBusy, setPwdBusy] = useState(false);
  const [pwdMsg, setPwdMsg] = useState<string | null>(null);
  const [pwdErr, setPwdErr] = useState<string | null>(null);

  const [oldPwd, setOldPwd] = useState("");
  const [newPwd1, setNewPwd1] = useState("");
  const [newPwd2, setNewPwd2] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew1, setShowNew1] = useState(false);
  const [showNew2, setShowNew2] = useState(false);

  const rules = useMemo(() => {
    const min8 = newPwd1.length >= 8;
    const hasUpper = /[A-Z]/.test(newPwd1);
    const hasNumber = /[0-9]/.test(newPwd1);
    return { min8, hasUpper, hasNumber };
  }, [newPwd1]);

  const allRulesOk = rules.min8 && rules.hasUpper && rules.hasNumber;
  const sameNewPwds = newPwd1.length > 0 && newPwd1 === newPwd2;

  const canSubmitPwd =
    !pwdBusy &&
    !busy &&
    !!user?.email &&
    oldPwd.length > 0 &&
    allRulesOk &&
    sameNewPwds;

  const ruleClass = (ok: boolean) =>
    ok ? "text-green-700" : "text-neutral-800";

  // --------- Sécurité suppression ----------
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const confirmOk = useMemo(
    () => confirmText.trim().toUpperCase() === "SUPPRIMER",
    [confirmText]
  );

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
        firstName:
          (u.user_metadata?.first_name as string | undefined) ?? null,
      });

      setLoading(false);
    };

    load();
  }, [router]);

  // Optionnel mais propre: empêcher le scroll du body quand le modal est ouvert
  useEffect(() => {
    if (!confirmOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [confirmOpen]);

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
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        throw new Error("Session invalide. Reconnecte-toi et réessaie.");
      }

      const res = await fetch("/api/delete_account", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const raw = await res.text();

      let parsed: unknown = null;
      try {
        parsed = raw ? (JSON.parse(raw) as unknown) : null;
      } catch {
        throw new Error(
          "Réponse serveur invalide (non-JSON). Vérifie les logs Vercel."
        );
      }

      if (!res.ok) {
        throw new Error(getErrorMessage(parsed) || "Erreur serveur.");
      }

      if (getSuccess(parsed) !== true) {
        throw new Error(getErrorMessage(parsed) || "Suppression échouée.");
      }

      await supabase.auth.signOut();
      router.push("/");
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Erreur inconnue.");
    } finally {
      setBusy(false);
      setConfirmOpen(false);
    }
  };

  // ---- Changer mot de passe ----
  const changePassword = async () => {
    if (!user?.email) return;

    setPwdBusy(true);
    setPwdMsg(null);
    setPwdErr(null);

    try {
      const { error: reauthError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: oldPwd,
      });

      if (reauthError) {
        throw new Error("Ancien mot de passe incorrect.");
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPwd1,
      });

      if (updateError) {
        throw new Error(updateError.message);
      }

      setPwdMsg("Mot de passe mis à jour.");
      setOldPwd("");
      setNewPwd1("");
      setNewPwd2("");

      await supabase.auth.getSession();
    } catch (e) {
      setPwdErr(e instanceof Error ? e.message : "Erreur inconnue.");
    } finally {
      setPwdBusy(false);
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen w-full bg-[#cfe3ff] px-6 py-10 overflow-y-auto">
      <div className="w-full max-w-xl mx-auto bg-white rounded-3xl border border-black/10 shadow-lg p-8">
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

        {/* --------- Modifier mot de passe --------- */}
        <div className="mt-8 border-t pt-6">
          <h2 className="font-semibold">Modifier le mot de passe</h2>
          <p className="text-sm text-neutral-600 mt-1">
            Entre ton ancien mot de passe, puis choisis un nouveau.
          </p>

          <div className="mt-4 space-y-4">
            {/* Ancien */}
            <div>
              <label className="text-sm font-medium">Ancien mot de passe</label>
              <div className="mt-1 flex gap-2">
                <input
                  className="flex-1 rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                  value={oldPwd}
                  onChange={(e) => setOldPwd(e.target.value)}
                  type={showOld ? "text" : "password"}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowOld((v) => !v)}
                  className="px-4 rounded-xl border text-sm hover:bg-neutral-50"
                >
                  {showOld ? "Masquer" : "Afficher"}
                </button>
              </div>
            </div>

            {/* Nouveau */}
            <div>
              <label className="text-sm font-medium">Nouveau mot de passe</label>
              <div className="mt-1 flex gap-2">
                <input
                  className="flex-1 rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                  value={newPwd1}
                  onChange={(e) => setNewPwd1(e.target.value)}
                  type={showNew1 ? "text" : "password"}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowNew1((v) => !v)}
                  className="px-4 rounded-xl border text-sm hover:bg-neutral-50"
                >
                  {showNew1 ? "Masquer" : "Afficher"}
                </button>
              </div>

              <div className="mt-2 space-y-1 text-xs">
                <div className={ruleClass(rules.min8)}>
                  • 8 caractères minimum
                </div>
                <div className={ruleClass(rules.hasUpper)}>• 1 majuscule</div>
                <div className={ruleClass(rules.hasNumber)}>• 1 chiffre</div>
              </div>
            </div>

            {/* Confirmer */}
            <div>
              <label className="text-sm font-medium">
                Confirmer le nouveau mot de passe
              </label>
              <div className="mt-1 flex gap-2">
                <input
                  className="flex-1 rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                  value={newPwd2}
                  onChange={(e) => setNewPwd2(e.target.value)}
                  type={showNew2 ? "text" : "password"}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowNew2((v) => !v)}
                  className="px-4 rounded-xl border text-sm hover:bg-neutral-50"
                >
                  {showNew2 ? "Masquer" : "Afficher"}
                </button>
              </div>

              {newPwd2.length > 0 && (
                <div
                  className={`mt-2 text-xs ${
                    sameNewPwds ? "text-green-700" : "text-red-600"
                  }`}
                >
                  {sameNewPwds
                    ? "• Les mots de passe correspondent"
                    : "• Les mots de passe ne correspondent pas"}
                </div>
              )}
            </div>

            {pwdErr && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl p-4">
                {pwdErr}
              </div>
            )}

            {pwdMsg && (
              <div className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-2xl p-4">
                {pwdMsg}
              </div>
            )}

            <button
              type="button"
              onClick={changePassword}
              disabled={!canSubmitPwd}
              className="w-full px-5 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 disabled:opacity-60"
            >
              {pwdBusy ? "Mise à jour..." : "Mettre à jour le mot de passe"}
            </button>
          </div>
        </div>

        {/* Boutons bas */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50"
            disabled={busy || pwdBusy}
          >
            Retour à l’accueil
          </button>

          <button
            type="button"
            onClick={logout}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 disabled:opacity-60"
            disabled={busy || pwdBusy}
          >
            Déconnexion
          </button>
        </div>

        {/* Zone dangereuse */}
        <div className="mt-8 border-t pt-6">
          <h2 className="font-semibold text-red-600">Zone dangereuse</h2>
          <p className="text-sm text-neutral-600 mt-1">
            Supprimer ton compte efface ton accès. Action irréversible.
          </p>

          <button
            type="button"
            onClick={openDelete}
            className="mt-4 w-full px-5 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
            disabled={busy || pwdBusy}
          >
            Supprimer mon compte
          </button>
        </div>
      </div>

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
