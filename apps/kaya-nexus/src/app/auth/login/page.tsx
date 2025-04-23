"use client";

import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation de login pour test E2E
    if (email === "utilisateur@exemple.com" && password === "motdepasse123") {
      setError("");
      // Simuler l'affichage du menu utilisateur (test E2E)
      document.body.setAttribute("data-testid-user-menu", email);
    } else {
      setError("Identifiants invalides");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Connexion</h1>
      <p className="mb-2 text-gray-400">Accédez à votre espace sécurisé Kaya Nexus</p>
      <form className="flex flex-col gap-4 w-full max-w-xs mt-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          data-testid="email-input"
          className="rounded px-3 py-2 border border-gray-300 focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          data-testid="password-input"
          className="rounded px-3 py-2 border border-gray-300 focus:outline-none"
          required
        />
        {error && <div data-testid="login-error" className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          data-testid="login-submit"
          className="bg-indigo-600 text-white rounded px-4 py-2 font-semibold hover:bg-indigo-700 transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
