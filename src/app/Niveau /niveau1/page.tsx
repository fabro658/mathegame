import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-8">Niveau 1 - Choisissez une opération</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link href="/Niveau/niveau1/addition">
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
            Addition
          </a>
        </Link>
        <Link href="/Niveau/niveau1/soustraction">
          <a className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center">
            Soustraction
          </a>
        </Link>
        <Link href="/Niveau/niveau1/multiplication">
          <a className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center">
            Multiplication
          </a>
        </Link>
        <Link href="/Niveau/niveau1/division">
          <a className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-center">
            Division
          </a>
        </Link>
      </div>
    </div>
  );
}
