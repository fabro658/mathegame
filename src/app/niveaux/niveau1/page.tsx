export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-12">Niveau 1 - Choisissez une opération</h1>
      <div className="flex flex-col items-center gap-8">
        {/* Conteneur pour les deux premiers boutons */}
        <div className="flex gap-8">
          <a
            href="/niveaux/niveau1/addition"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
          >
            Addition
          </a>
          <a
            href="/niveaux/niveau1/soustraction"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
          >
            Soustraction
          </a>
        </div>
        {/* Bouton centré en dessous */}
        <a
          href="/niveaux/niveau1/fraction"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]"
        >
          Fraction
        </a>
      </div>
    </div>
  );
}