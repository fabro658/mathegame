import Link from 'next/link'; 

export default function Page() {
  const buttonClass = "bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px]";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-12">Niveau 2 - Choisissez une opération</h1>
      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-8">
          <Link
            href="/niveaux/niveau2/multiplication"
            className={`${buttonClass} bg-green-500`}
            aria-label="Page de multiplication"
          >
            Multiplication
          </Link>
          <Link
            href="/niveaux/niveau2/division"
            className={`${buttonClass} bg-purple-500`}
            aria-label="Page de division"
          >
            Division
          </Link>
        </div>
        <div className="flex gap-8">
          <Link
            href="/niveaux/niveau2/multiplicationfraction"
            className={`${buttonClass} bg-orange-500`}
            aria-label="Page de multiplication de fraction"
          >
            Multiplication de fraction
          </Link>
          <Link
            href="/niveaux/niveau2/divisionfraction"
            className={`${buttonClass} bg-red-500`}
            aria-label="Page de division de fraction"
          >
            Division de fraction
          </Link>
        </div>
      </div>
    </div>
  );
}
