"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export default function ConnexionPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Optionnel: précharge la page "mot de passe oublié" pour éviter un flash/latence
  useEffect(() => {
    router.prefetch("/mot-de-passe-oublie");
  }, [router]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const emailClean = email.trim().toLowerCase();

    if (!captchaToken) {
      setErrorMsg("Confirme le captcha avant de te connecter.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: emailClean,
      password,
      options: { captchaToken },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      // on invalide le token (souvent à usage unique)
      setCaptchaToken(null);
      return;
    }

    // reset token pour éviter réutilisation
    setCaptchaToken(null);

    //  Redirection vers le tableau de bord
    router.push("/mon-compte");
  };

  const isDisabled = loading || !captchaToken;

  return (
    <div className="min-h-screen w-full bg-[#cfe3ff] flex items-center justify-center px-6">
      <div className="auth-shell w-full max-w-5xl rounded-[40px] p-8 shadow-2xl">
        <div className="w-full max-w-md mx-auto">
          <div className="flex justify-between items-center mb-6 text-sm">
            <Link href="/" className="hover:underline">
              Retour à l’accueil
            </Link>
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
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="px-4 rounded-xl border text-sm hover:bg-neutral-50"
                  >
                    {showPwd ? "Masquer" : "Afficher"}
                  </button>
                </div>
              </div>

              {/* hCaptcha */}
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

              <button
                disabled={isDisabled}
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
    </div>
  );
}
