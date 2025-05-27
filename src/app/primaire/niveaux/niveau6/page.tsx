'use client';
import Link from "next/link";

export default function Niveau1() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-indigo-100 text-black relative overflow-hidden">

      {/* Bouton Retour */}
      <Link
        href="/primaire/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Titre thématique */}
      <div className="flex flex-col items-center text-center mb-12 z-10">
        <h1 className="text-indigo-800 text-5xl sm:text-6xl md:text-7xl font-extrabold mb-2 drop-shadow-lg">
          Ordre Magique des Opérations
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700 font-medium">
          Entre dans le temple des règles mathématiques sacrées
        </p>
      </div>

      {/* Bouton unique */}
      <div className="flex flex-col items-center justify-center gap-8 z-10">
        <a
          href="/primaire/niveaux/niveau6/priooperation"
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-6 px-12 rounded-2xl text-3xl shadow-xl flex items-center justify-center min-w-[300px] max-w-[500px] transition transform hover:scale-105"
        >
          Priorité d&apos;opération
        </a>
      </div>

      {/* Illustration du phare */}
      <div className="relative z-0 scale-75 sm:scale-90 mt-12">
        <div className="box">
          <div className="bg-circle"></div>
          <div className="base">
            <div className="base-shadow"></div>
          </div>

          <div className="tower-base">
            <div className="tower-base-shadow"></div>
          </div>

          <div className="entrance-container">
            <div className="entrance-roof"></div>
            <div className="entrance-front">
              <div className="entrance-door"></div>
            </div>
            <div className="entrance-side">
              <div className="entrance-window"></div>
            </div>
          </div>

          <div className="tower-container">
            <div className="tower">
              <div className="dark-side">
                <div className="window top"></div>
                <div className="window middle"></div>
                <div className="window bottom"></div>
              </div>
              <div className="light-side"></div>
            </div>

            <div className="tower-top">
              <div className="dark-side"></div>
              <div className="light-side"></div>
              <div className="shadow-from-platform"></div>
            </div>

            <div className="tower-platform">
              <div className="shadow"></div>
            </div>

            <div className="lantern-pane">
              <div className="dark-side"></div>
              <div className="light-side"></div>
              <div className="window">
                <div className="reflection thick"></div>
                <div className="reflection thin"></div>
                <div className="frame-left"></div>
                <div className="frame-right"></div>
              </div>
            </div>

            <div className="platform-fence">
              <div className="rope"></div>
              <div className="rope"></div>
              <div className="rope"></div>
              <div className="pole"></div>
              <div className="pole"></div>
              <div className="pole"></div>
              <div className="pole"></div>
            </div>

            <div className="cupola">
              <div className="light"></div>
              <div className="shadow"></div>
            </div>

            <div className="solarvalve">
              <div className="tube">
                <div className="shadow"></div>
                <div className="light"></div>
              </div>
              <div className="hat"></div>
              <div className="spike"></div>
            </div>

            <div className="shadow-from-entrance">
              <div className="window-bottom"></div>
            </div>
          </div>

          <div className="fence">
            {Array.from({ length: 20 }).map((_, i) => (
              <div className="pole" key={i}></div>
            ))}
          </div>

          <div className="vertical-pole top"></div>
          <div className="vertical-pole bottom"></div>
        </div>

        <div className="link text-center mt-4 text-sm text-gray-500">
          <span>Original design by </span>
          <a
            href="https://dribbble.com/shots/3982873-Peggy-s-Cove-Nova-Scotia-Canada"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Al Power
          </a>
        </div>
      </div>
    </div>
  );
}
