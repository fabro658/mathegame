export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-start bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-12">
        Zone d&apos;Apprentissage !
      </h1>
      <div className="flex flex-col gap-4 text-lg w-full pl-0">
        {/* Menu complètement collé à gauche */}
        <a href="#" className="hover:underline text-gray-700">
          Addition
        </a>
        <a href="#" className="hover:underline text-gray-700">
          Soustraction
        </a>
        <a href="#" className="hover:underline text-gray-700">
          Multiplication
        </a>
        <a href="#" className="hover:underline text-gray-700">
          Division
        </a>
        <a href="#" className="hover:underline text-gray-700">
          Fraction
        </a>
        <a href="#" className="hover:underline text-gray-700">
          Aire
        </a>
        <a href="#" className="hover:underline text-gray-700">
          Périmètre
        </a>
        <a href="#" className="hover:underline text-gray-700">
          Algèbre
        </a>
        <a href="#" className="hover:underline text-gray-700">
          Priorité d&apos;opération
        </a>
      </div>
    </div>
  );
}
