export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-12">Niveau 1 - Choisissez une opération</h1>
      <div className="grid grid-cols-2 gap-8">
        <a
          href="/niveaux/niveau1/addition"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
        >
          Addition
        </a>
        <a
          href="/niveaux/niveau1/soustraction"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
        >
          Soustraction
        </a>
        <a
          href="/niveaux/niveau1/multiplication"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
        >
          Multiplication
        </a>
        <a
          href="/niveaux/niveau1/division"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
        >
          Division
        </a>
      </div>
    </div>
  );
}
