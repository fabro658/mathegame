import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      {/* Bouton de retour en haut à droite */}
      <Link
        href="/mobile/primaire_mobile"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      {/* Titre */}
      <h1 className="text-4xl font-bold mb-12 text-center">Choisissez une opération</h1>

      {/* Boutons en une seule colonne */}
      <div className="flex flex-col gap-8 items-center w-full max-w-md">
        <a
          href="/mobile/primaire_mobile/niveaux_mobile/niveau5_mobile/exposant_mobile/n1_mobile"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center w-4/5"
        >
          Premier niveau
        </a>
        <a
          href="/mobile/primaire_mobile/niveaux_mobile/niveau5_mobile/exposant_mobile/n2_mobile"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center w-4/5"
        >
          Deuxième niveau
        </a>
      </div>
    </div>
  );
}
