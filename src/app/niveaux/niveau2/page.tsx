export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-12">Niveau 2 - Choisissez une opération</h1>
      <div className="flex flex-col items-center gap-8">
        <a
          href="/niveaux/niveau2/multiplication"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
        >
          Multiplication
        </a>
        <a
          href="/niveaux/niveau2/division"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
        >
          Division
        </a>
        <a
          href="/niveaux/niveau2/fraction"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
        >
          Fraction
        </a>
      </div>
    </div>
  );
}