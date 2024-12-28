export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-8">Niveau 1 - Choisissez une opération</h1>
      <div className="grid grid-cols-2 gap-4">
        <a href="/Niveau/niveau1/addition" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
          Addition
        </a>
        <a href="/Niveau/niveau1/soustraction" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center">
          Soustraction
        </a>
        <a href="/Niveau/niveau1/multiplication" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center">
          Multiplication
        </a>
        <a href="/Niveau/niveau1/division" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-center">
          Division
        </a>
      </div>
    </div>
  );
}
