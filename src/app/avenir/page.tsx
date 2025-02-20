import Link from "next/link";

export default function Primaire() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black relative">
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

      <div className="block">
        {/* Première Animation */}
        <div className="first-motion">
          <div className="circle"></div>
          <div className="ball"></div>
        </div>

        {/* Deuxième Animation */}
        <div className="flex items-center justify-center second-motion overflow-hidden">
          <div className="base"></div>
          <div className="ball"></div>
          <div className="first-circle base-cir"></div>
          <div className="second-circle base-cir"></div>
          <div className="third-circle base-cir"></div>
          <div className="fourth-circle base-cir"></div>
        </div>

        {/* Troisième Animation */}
        <div className="h-full w-full flex items-center justify-center third-motion overflow-hidden">
          <div className="cube shrink">
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face left"></div>
            <div className="face right"></div>
            <div className="face top"></div>
          </div>
          <div className="ball"></div>
        </div>

        {/* Quatrième Animation */}
        <div className="h-full w-full flex items-center justify-center fourth-motion overflow-hidden">
          <div className="ball-container relative">
            <div className="first-line ray"></div>
            <div className="second-line ray"></div>
            <div className="third-line ray"></div>
            <div className="fourth-line ray"></div>
            <div className="fifth-line ray"></div>
            <div className="ball"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
