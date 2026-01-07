"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export default function InscriptionPage() {
  const router = useRouter();

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMsg(null);
    setErrorMsg(null);

    if (!captchaToken) {
      setErrorMsg("Confirme le captcha avant de créer ton compte.");
      return;
    }

    setLoading(true);

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/mobile/connexion`
        : undefined;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo,
        data: { first_name: prenom.trim() || null },
        captchaToken,
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setMsg("Compte créé. Vérifie ton email pour confirmer ton compte.");
    setCaptchaToken(null);
  };

  const isDisabled = loading || !captchaToken;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-neutral-100">
      <div className="auth-shell w-full max-w-5xl rounded-[32px] p-6 sm:p-10 shadow-xl">
        <div className="w-full max-w-md mx-auto">
          <div className="flex justify-between items-center mb-6 text-sm">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="hover:underline"
            >
              Retour à l’accueil
            </button>
            <Link href="/mobile/connexion" className="hover:underline">
              Connexion
            </Link>
          </div>

          <div className="bg-white/95 rounded-3xl p-7 shadow-lg border border-black/10">
            <h1 className="text-2xl font-bold mb-1">Créer un compte</h1>
            <p className="text-sm text-neutral-600 mb-6">
              Pour sauvegarder tes progrès et accéder à ton espace.
            </p>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Prénom (optionnel)</label>
                <input
                  className="w-full mt-1 rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  autoComplete="given-name"
                />
              </div>

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

              <div>
                <label className="text-sm font-medium">Mot de passe</label>
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
                <p className="text-xs text-neutral-500 mt-1">
                  Minimum 8 caractères.
                </p>
              </div>

              <div className="pt-2">
                <HCaptcha
                  sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                  onVerify={(token) => setCaptchaToken(token)}
                  onExpire={() => setCaptchaToken(null)}
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
                disabled={isDisabled}
                className="w-full bg-black text-white rounded-xl py-2.5 font-medium hover:bg-neutral-800 transition disabled:opacity-60"
              >
                {loading ? "Création..." : "Créer le compte"}
              </button>

              <p className="text-xs text-neutral-500 text-center pt-1">
                En créant un compte, tu acceptes les conditions d’utilisation.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
