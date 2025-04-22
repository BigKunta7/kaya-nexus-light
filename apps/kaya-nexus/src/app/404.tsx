export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-6xl font-bold text-indigo-500 mb-4">404</h1>
      <p className="text-xl text-gray-300 mb-6">Oups, cette page n'existe pas ou n'est plus disponible.</p>
      <a href="/" className="px-6 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition">Retour à l'accueil</a>
    </div>
  );
}
