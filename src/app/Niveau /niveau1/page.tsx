export default function NiveauLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <header className="p-4 bg-blue-600 text-white text-center">
        <h1 className="text-2xl font-bold">Bienvenue dans le niveau</h1>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="p-4 bg-gray-800 text-white text-center">
        © MathGame - Tous droits réservés
      </footer>
    </div>
  );
}
