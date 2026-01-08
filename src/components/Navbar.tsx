"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type UserMini = {
  id: string;
  email?: string;
};

export default function Navbar() {
  const [user, setUser] = useState<UserMini | null>(null);
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  // Auth
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

  function clearCloseTimer() {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function scheduleClose(delayMs = 320) {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
    }, delayMs);
  }

  // Fermer si clic en dehors
  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      const el = wrapperRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) {
        clearCloseTimer();
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  // Nettoyage timer
  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "fixed",
        top: 12,
        left: 12,
        zIndex: 9999,

        //  zone hover plus grande
        padding: 10,
      }}
      onMouseEnter={() => {
        clearCloseTimer();
        setOpen(true);
      }}
      onMouseLeave={() => {
        //  laisse le temps de bouger la souris vers le menu / cliquer
        scheduleClose(320);
      }}
    >
      {/* Hamburger */}
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => {
          clearCloseTimer();
          setOpen((v) => !v);
        }}
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(8px)",
          display: "grid",
          placeItems: "center",
          cursor: "pointer",
        }}
      >
        <span style={barStyle} />
        <span style={barStyle} />
        <span style={barStyle} />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            left: 10, // aligne avec le padding de wrapper
            top: 58,
            minWidth: 220,
            padding: 8,
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(15,15,15,0.92)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
          }}
          onMouseEnter={() => {
            // si tu entres dans le menu, on annule la fermeture
            clearCloseTimer();
            setOpen(true);
          }}
          onMouseLeave={() => {
            // et on ferme un peu après quand tu sors du menu
            scheduleClose(320);
          }}
        >
          <MenuLink href="/menu/apprendre" label="Apprendre" onClick={() => setOpen(false)} />
          <MenuLink href="/menu/options" label="Options" onClick={() => setOpen(false)} />

          <div
            style={{
              height: 1,
              background: "rgba(255,255,255,0.08)",
              margin: "6px 6px",
            }}
          />

          {user ? (
            <MenuLink href="/mon-compte" label="Mon compte" onClick={() => setOpen(false)} />
          ) : (
            <MenuLink href="/connexion" label="Connexion" onClick={() => setOpen(false)} />
          )}
        </div>
      )}
    </div>
  );
}

function MenuLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        display: "block",
        padding: "10px 10px",
        borderRadius: 10,
        color: "white",
        textDecoration: "none",
        fontWeight: 650,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background =
          "rgba(255,255,255,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
      }}
    >
      {label}
    </Link>
  );
}

const barStyle: React.CSSProperties = {
  width: 18,
  height: 2,
  background: "white",
  borderRadius: 999,
  display: "block",
};
