/**
 * Formulaire de connexion utilisateur pour Kaya Nexus.
 * @module Components/UI/LoginForm
 * @param onLogin Fonction appelée lors de la soumission (email, password)
 * @param error Message d'erreur à afficher
 * @param loading Booléen d'état de chargement
 */

'use client';

import * as React from 'react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  error?: string;
  loading?: boolean;
}

export default function LoginForm({ onLogin, error, loading }: LoginFormProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin?.(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input
          data-testid="email-input"
          id="email"
          type="email"
          className="border rounded px-2 py-1 w-full"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium">Mot de passe</label>
        <input
          data-testid="password-input"
          id="password"
          type="password"
          className="border rounded px-2 py-1 w-full"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      {error && (
        <div data-testid="login-error" className="text-red-600 text-sm mb-2">
          {error}
        </div>
      )}
      <button
        data-testid="login-submit"
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        Connexion
      </button>
    </form>
  );
}
