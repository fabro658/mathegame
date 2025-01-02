export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-12 underline">
        Zone d&apos;apprentissage
      </h1>
      <div className="flex flex-col gap-4 text-lg w-full pl-0">
        {/* Menu complètement collé à gauche */}
        <a href="/menu/apprendre/opérations arithmétiques" className="hover:underline text-gray-700">
          opérations arithmétiques
        </a>
        <a href="/menu/apprendre/fraction" className="hover:underline text-gray-700">
          Fraction
        </a>
        <a href="/menu/apprendre/aire" className="hover:underline text-gray-700">
          Aire
        </a>
        <a href="/menu/apprendre/perimetre" className="hover:underline text-gray-700">
          Périmètre
        </a>
        <a href="/menu/apprendre/algebre" className="hover:underline text-gray-700">
          Algèbre
        </a>
        <a href="/menu/apprendre/priorite operation" className="hover:underline text-gray-700">
          Priorité d&apos;opération
        </a>
      </div>

      {/* Bouton de retour vers la page d'accueil */}
      <a
        href="/"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-xl shadow-lg mt-8"
      >
        Retour à l&apos;accueil
      </a>
    </div>
  );
}
