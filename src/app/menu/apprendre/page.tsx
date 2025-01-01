export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-start bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-12">
        Zone d&apos;Apprentissage !
      </h1>
      <div className="flex flex-col gap-4 text-lg w-full pl-0">
        {/* Menu complètement collé à gauche */}
        <a href="/menu/apprendre/addition" 
        className="hover:underline text-gray-700">
          Addition
        </a>
        <a href="/menu/apprendre/soustraction" 
        className="hover:underline text-gray-700">
          Soustraction
        </a>
        <a href="/menu/apprendre/multiplication" 
        className="hover:underline text-gray-700">
          Multiplication
        </a>
        <a href="/menu/apprendre/division" 
        className="hover:underline text-gray-700">
          Division
        </a>
        <a href="/menu/apprendre/fraction"
        className="hover:underline text-gray-700">
          Fraction
        </a>
        <a href="/menu/apprendre/aire" 
        className="hover:underline text-gray-700">
          Aire
        </a>
        <a href="/menu/apprendre/perimetre"
        className="hover:underline text-gray-700">
          Périmètre
        </a>
        <a href="/menu/apprendre/algebre" 
        className="hover:underline text-gray-700">
          Algèbre
        </a>
        <a href="/menu/apprendre/priorite operation" 
        className="hover:underline text-gray-700">
          Priorité d&apos;opération
        </a>
      </div>
    </div>
  );
}
