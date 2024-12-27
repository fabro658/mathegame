// pages/Niveau/niveau2/niveau2.tsx
import Link from "next/link";

export default function Niveau2() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Bienvenue au Niveau 2</h1>
      <p>Voici le contenu spécifique pour le niveau 2 de votre jeu.</p>
      <Link href="/">
        <a className="mt-8 px-4 py-2 bg-blue-500 text-white rounded">Retour à l&#39accueil</a>
      </Link>
    </div>
  );
}