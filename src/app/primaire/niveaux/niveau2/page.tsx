import { useEffect } from "react";
import Link from "next/link";

export default function Niveau1() {
  useEffect(() => {
    const wrapper = document.querySelector(".stars-wrapper");
    if (!wrapper) return;

    const starSvg = `
    <svg x="0px" y="0px" width="565.4px" height="51.4px" viewBox="0 0 565.4 51.4" >
      <style type="text/css">
      .st0{fill:#91a7b4;}
      .st1{fill:#b69269;}
      .st2{fill:#FFFFFF;}
      </style>
      <path class="st0" d="M559.7,28.5h-11.5v5.7h-5.7v0.1v17.1h-5.7V34.3v-0.1h-5.7v-5.7h-11.4v-5.7h11.4v-5.7h5.7V0h5.7v17.1h5.7v5.7
      h11.5V28.5z"/>
      <path class="st0" d="M445.5,28.7h-5.7v5.7h-5.7v-5.7h-5.7V23h5.7v-5.7h5.7V23h5.7V28.7z"/>
      <path class="st0" d="M496.9,28.6h-5.7V40h-5.7V28.6h-5.7v-5.7h5.7V11.5h5.7v11.4h5.7V28.6z"/>
      <path class="st1" d="M405.5,28.6H394v5.7h-5.7v0.1v17.1h-5.7V34.4v-0.1h-5.7v-5.7h-11.4v-5.7h11.4v-5.7h5.7V0.1h5.7v17.1h5.7v5.7
      h11.5V28.6z"/>
      <path class="st2" d="M148.5,28.5H137v5.7h-5.7v0.1v17.1h-5.7V34.3v-0.1h-5.7v-5.7h-11.4v-5.7h11.4v-5.7h5.7V0h5.7v17.1h5.7v5.7h11.5
      V28.5z"/>
    </svg>
    `;

    const animationPatterns = [["0","1"],["1","1"],["2","2"],["3","5"],["8","9"],["3","6"],["9","10"],["10","10"],["3","7"],["6","7"]];
    const frameSize = 15;

    function animateStar(target, start, end, speed) {
      let i = parseInt(start);
      const max = parseInt(end);
      setInterval(() => {
        target.style.margin = `0px ${-(i * frameSize)}px`;
        i = (i >= max) ? parseInt(start) : i + 1;
      }, speed);
    }

    new Array(70).fill(null).forEach(() => {
      const animationPattern = animationPatterns[Math.floor(Math.random() * animationPatterns.length)];
      const speed = Math.random() < 0.1 ? 140 : 300;

      const starDiv = document.createElement("div");
      starDiv.classList.add("star");
      starDiv.style.position = "absolute";
      starDiv.style.top = `${Math.random() * 100}%`;
      starDiv.style.left = `${Math.random() * 100}%`;
      starDiv.style.width = "15px";
      starDiv.style.height = "15px";
      starDiv.style.zIndex = "-1";
      starDiv.style.overflow = "hidden";

      const starInner = document.createElement("div");
      starInner.classList.add("star_inner");
      starInner.innerHTML = starSvg;
      starInner.style.width = `${frameSize * 11}px`;

      starDiv.appendChild(starInner);
      wrapper.appendChild(starDiv);

      animateStar(starInner, animationPattern[0], animationPattern[1], speed);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-black relative overflow-hidden font-[Nunito] stars-wrapper">
      {/* Bouton Retour */}
      <Link
        href="/primaire/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Titre thématique */}
      <div className="flex flex-col items-center text-center mb-12 z-10">
        <h1 className="text-black text-5xl sm:text-6xl md:text-7xl font-extrabold mb-3 drop-shadow">
          🌠 Mission Comparaison
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700 font-medium">
          Explore les nombres dans l’univers mathématique 🚀
        </p>
      </div>

      {/* Boutons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 z-10 max-w-4xl mb-12">
        <a
          href="/primaire/niveaux/niveau2/comparaison"
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-6 px-12 rounded-2xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Comparaison 🔭 
        </a>
        <a
          href="/primaire/niveaux/niveau2/comparaison_decimaux"
          className="bg-green-600 hover:bg-green-800 text-white font-bold py-6 px-12 rounded-2xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Décimaux 🦠 
        </a>
        <a
          href="/primaire/niveaux/niveau2/comparer_fraction"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-6 px-12 rounded-2xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Fractions 🚁 
        </a>
        <a
          href="/primaire/niveaux/niveau2/expression_equivalente"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-2xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] transition transform hover:scale-105"
        >
          Expressions équivalentes 🧪 
        </a>
      </div>
    </div>
  );
}