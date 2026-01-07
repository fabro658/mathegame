"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export default function MotDePasseOubliePage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg(null);
    setErrorMsg(null);

    const emailClean = email.trim().toLowerCase();

    if (!emailClean) {
      setErrorMsg("Entre ton email.");
      return;
    }

    if (!captchaToken) {
      setErrorMsg("Confirme le captcha avant d’envoyer le lien.");
      return;
    }

    setLoading(true);

    // IMPORTANT: le lien de reset doit revenir sur ton site
    // (et idéalement vers une page dédiée plus tard, ex: /reset-mot-de-passe)
    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/connexion`
        : undefined;

    const { error } = await supabase.auth.resetPasswordForEmail(emailClean, {
      redirectTo,
      captchaToken,
    });

    setLoading(false);
    setCaptchaToken(null);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setMsg("Si cet email existe, un lien de réinitialisation vient d’être envoyé.");
  };

  const isDisabled = loading || !captchaToken;

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#d8d3a1] to-[#f2c14e] flex items-center justify-center px-6">
      <div className="auth-shell w-full max-w-5xl rounded-[40px] p-8 shadow-2xl">
        <div className="w-full max-w-md mx-auto">
          <div className="flex justify-between items-center mb-6 text-sm">
            <button
              type="button"
              onClick={() => router.push("/connexion")}
              className="hover:underline"
            >
              Retour à la connexion
            </button>

            <Link href="/inscription" className="hover:underline">
              Créer un compte
            </Link>
          </div>

          <div className="bg-white/95 rounded-3xl p-7 shadow-lg border border-black/10">
            <h1 className="text-2xl font-bold mb-1">Mot de passe oublié</h1>
            <p className="text-sm text-neutral-600 mb-6">
              Entre ton email pour recevoir un lien de réinitialisation.
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
                {loading ? "Envoi..." : "Envoyer le lien"}
              </button>

              <p className="text-xs text-neutral-500 text-center pt-1">
                Tu vas recevoir un email si l’adresse est valide.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}