import Link from "next/link";

export default function Primaire() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black-100 text-black relative">
      {/* Bouton Retour */}
      <Link
        href="/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Section Titre */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          À Venir
        </h1>
      </div>

      {/* Animation */}
      <div className="frame">
        <div className="center">
          <div className="circle">
            <div className="sky"></div>
            <div className="sun"></div>
            <div className="side-left"></div>
            <div className="side-right"></div>
            <div className="shadow"></div>
            <div className="ground"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
