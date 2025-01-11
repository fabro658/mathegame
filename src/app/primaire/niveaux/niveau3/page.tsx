"use client";

import Link from "next/link";

export default function Page() {
  const operations = [
    { href: "/primaire/niveaux/niveau3/additionfraction", label: "Addition de fraction", bgColor: "bg-blue-500", hoverColor: "hover:bg-blue-700" },
    { href: "/primaire/niveaux/niveau3/soustractionfraction", label: "Soustraction de fraction", bgColor: "bg-purple-500", hoverColor: "hover:bg-purple-700" },
    { href: "/primaire/niveaux/niveau3/multiplicationfraction", label: "Multiplication de fraction", bgColor: "bg-green-500", hoverColor: "hover:bg-green-700" },
    { href: "/primaire/niveaux/niveau3/divisionfraction", label: "Division de fraction", bgColor: "bg-yellow-500", hoverColor: "hover:bg-yellow-700" },
    { href: "/primaire/niveaux/niveau3/fractionreduite", label: "Fraction réduite", bgColor: "bg-red-500", hoverColor: "hover:bg-red-700" },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 relative">
      <Link
        href="/primaire"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
        aria-label="Retour"
      >
        Retour
      </Link>

      <h1 className="text-4xl font-bold mb-12 text-center">Choisissez une opération</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
        {operations.map((operation, index) => (
          <a
            key={index}
            href={operation.href}
            className={`${operation.bgColor} ${operation.hoverColor} text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center min-w-[300px] h-[120px] md:h-[100px]`}
            aria-label={operation.label}
          >
            {operation.label}
          </a>
        ))}
      </div>
    </div>
  );
}


