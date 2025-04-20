import React, { useState } from 'react';

/**
 * Formulaire de connexion simple pour Kaya Nexus.
 * @param signIn (optionnel) fonction d'authentification à injecter pour les tests
 * @returns {JSX.Element}
 */
const LoginForm: React.FC<{ signIn?: (email: string, password: string) => Promise<void> }> = ({ signIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction d'authentification par défaut
  const defaultSignIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 500));
    if (email === 'admin@kaya.com' && password === 'admin') {
      setLoading(false);
      setError(null);
    } else {
      setLoading(false);
      setError('Identifiants invalides');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await (signIn || defaultSignIn)(email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">Mot de passe</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <div className="text-red-500">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Connexion...' : 'Connexion'}
      </button>
    </form>
  );
};

export default LoginForm;
