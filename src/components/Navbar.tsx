"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type UserMini = {
  id: string;
  email?: string;
};

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [user, setUser] = useState<UserMini | null>(null);

  // (Optionnel) Si tu veux afficher "Mon compte" vs "Connexion"
  useEffect(() => {
    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      const u = data.user;
      setUser(u ? { id: u.id, email: u.email ?? undefined } : null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u ? { id: u.id, email: u.email ?? undefined } : null);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Routes (ajuste selon tes pages)
  const apprendreHref = "/apprendre";
  const compteHref = "/mon-compte";
  const connexionHref = "/connexion";
  const inscriptionHref = "/inscription";

  return (
  <div style={{ position: "fixed", top: 16, left: 16, zIndex: 60 }}>
    <div className="ks-menu-group" style={{ position: "relative" }}>
      <button
        type="button"
        aria-label="Menu"
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(8px)",
          display: "grid",
          placeItems: "center",
          cursor: "default",
        }}
      >
        <span style={barStyle} />
        <span style={barStyle} />
        <span style={barStyle} />
      </button>

      <div
        className="ks-dropdown"
        style={{
          position: "absolute",
          left: 0,
          top: 48,
          minWidth: 210,
          padding: 8,
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(15,15,15,0.92)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
          display: "none",
        }}
      >
        <MenuLink href="/apprendre" label="Apprendre" />
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "6px 6px" }} />
        {user ? <MenuLink href="/mon-compte" label="Mon compte" /> : <MenuLink href="/connexion" label="Connexion" />}
      </div>
    </div>

    <style jsx>{`
      .ks-menu-group:hover .ks-dropdown {
        display: block;
      }
    `}</style>
  </div>
);
}

function MenuLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        padding: "10px 10px",
        borderRadius: 10,
        color: "white",
        textDecoration: "none",
        fontWeight: 650,
        background: "transparent",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
      }}
    >
      {label}
    </Link>
  );
}

function btnStyle(variant: "solid" | "ghost"): React.CSSProperties {
  if (variant === "solid") {
    return {
      padding: "10px 14px",
      borderRadius: 12,
      color: "black",
      background: "white",
      textDecoration: "none",
      fontWeight: 800,
      border: "1px solid rgba(255,255,255,0.25)",
    };
  }
  return {
    padding: "10px 14px",
    borderRadius: 12,
    color: "white",
    background: "rgba(255,255,255,0.08)",
    textDecoration: "none",
    fontWeight: 800,
    border: "1px solid rgba(255,255,255,0.15)",
  };
}

const barStyle: React.CSSProperties = {
  width: 18,
  height: 2,
  background: "white",
  borderRadius: 999,
  display: "block",
};
