import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      <h1 className="text-4xl font-bold mb-12">Priorité d&#39;opération</h1>

      {/* Bouton retour dans le coin supérieur droit */}
      <Link
        href="/primaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>

      {/* Conteneur du bouton avec flexibilité pour mobile et grands écrans */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:w-full sm:justify-center">
        <Link
          href="/primaire/niveaux/niveau6/priooperation"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center w-[320px] h-[120px]"
        >
          Priorité d&#39;opération
        </Link>
      </div>
    </div>
  );
}
