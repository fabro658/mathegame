export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-12">Bienvenue sur la page d&apos;Apprentissage !</h1>
      <div className="flex flex-col items-center gap-8">
        {/* Éléments en colonne */}
        <div className="bg-blue-500 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center min-w-[300px]">
          Addition
        </div>
        <div className="bg-blue-500 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center min-w-[300px]">
          Soustraction
        </div>
        <div className="bg-blue-500 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center min-w-[300px]">
          Multiplication
        </div>
        <div className="bg-blue-500 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center min-w-[300px]">
          Division
        </div>
        <div className="bg-blue-500 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center min-w-[300px]">
          Fraction
        </div>
        <div className="bg-blue-500 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center min-w-[300px]">
          Aire
        </div>
        <div className="bg-red-500 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center min-w-[300px]">
          Périmètre
        </div>
        <div className="bg-purple-500 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center min-w-[300px]">
          Fraction
        </div>
        <div className="bg-blue-500 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center min-w-[300px]">
          Algèbre
        </div>
        <div className="bg-blue-500 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center min-w-[300px]">
          Priorité d&apos;opértion
        </div>
      </div>
    </div>
  );
}