import React from 'react';
import Image from "next/image";
import LoginForm from '../components/ui/LoginForm';

interface User {
  email: string;
}

export default function Home() {
  const [showLogin, setShowLogin] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError('');
    // Simuler une authentification (à remplacer par l'appel réel)
    if (email === 'utilisateur@exemple.com' && password === 'motdepasse123') {
      setUser({ email });
      setShowLogin(false);
    } else {
      setError('Identifiants invalides');
    }
    setLoading(false);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1>Bienvenue sur Kaya Nexus !</h1>
        <ul>
          <li>Projets</li>
          <li>CRM</li>
          <li>Finance</li>
          <li>Analytique</li>
          <li>IA</li>
        </ul>
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Commencez par éditer{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Enregistrez et voyez vos modifications instantanément.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Déployer maintenant
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lire la documentation
          </a>
        </div>
        {/* Ajout du bouton de connexion et du menu utilisateur */}
        {!user ? (
          <button data-testid="login-button" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setShowLogin(true)}>
            Connexion
          </button>
        ) : (
          <div data-testid="user-menu" className="mt-6 px-4 py-2 bg-green-100 text-green-900 rounded">
            {user.email}
          </div>
        )}
        {showLogin && !user && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm relative">
              <button className="absolute top-2 right-2 text-gray-500" onClick={() => setShowLogin(false)}>&times;</button>
              <LoginForm onLogin={handleLogin} error={error} loading={loading} />
            </div>
          </div>
        )}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Apprendre
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Exemples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Aller sur nextjs.org →
        </a>
      </footer>
    </div>
  );
}
