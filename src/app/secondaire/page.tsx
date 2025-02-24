import Link from "next/link";
import { useEffect } from "react";

export default function Secondaire() {
  useEffect(() => {
    const snowContainer = document.querySelector(".snowfall");

    if (snowContainer) {
      for (let i = 0; i < 100; i++) {
        const snowflake = document.createElement("li");
        snowflake.style.left = `${Math.random() * 100}%`;
        const size = Math.random() * 10 + 5;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.animationDuration = `${Math.random() * 10 + 5}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        snowContainer.appendChild(snowflake);
      }
    }
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #142852, #0e022e)",
      }}
    >
      {/* Bouton Retour */}
      <Link
        href="/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Section Titre */}
      <div className="flex flex-col items-center text-center mb-8 z-10">
        <h1 className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          Secondaire
        </h1>
        <div className="w-48 md:w-64 lg:w-96 h-1 bg-white mb-4"></div>
        <h2 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">
          Choisis un sujet!
        </h2>
      </div>

      {/* Liens vers les niveaux */}
      <div className="flex flex-col gap-4 w-full px-4 sm:items-center sm:gap-4 sm:w-full sm:text-center sm:mt-8 md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 md:flex-col md:items-end md:w-auto z-0">
        {[
          { href: "/secondaire/niveaux/niveau1", label: "Arithmétique", bg: "bg-yellow-500" },
          { href: "/secondaire/niveaux/niveau2", label: "Fractions", bg: "bg-orange-500" },
          { href: "/secondaire/niveaux/niveau3", label: "Probabilités", bg: "bg-red-500" },
          { href: "/secondaire/niveaux/niveau4", label: "Géométrie", bg: "bg-blue-800" },
          { href: "/secondaire/niveaux/niveau5", label: "Algèbre", bg: "bg-yellow-500" },
        ].map(({ href, label, bg }) => (
          <Link key={href} href={href}>
            <div
              className={`${bg} rounded-tl-full rounded-bl-full transition-colors flex items-center justify-center text-white gap-2 hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-64 px-4 sm:px-5 md:w-72`}
            >
              {label}
            </div>
          </Link>
        ))}
      </div>

      {/* Animation de neige */}
      <ul className="snowfall absolute inset-0 pointer-events-none"></ul>

      <style jsx>{`
        .snowfall li {
          position: absolute;
          top: 0;
          border-radius: 50%;
          background-color: white;
          opacity: 0.8;
          animation: snow-fall linear infinite;
        }

        @keyframes snow-fall {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
}
