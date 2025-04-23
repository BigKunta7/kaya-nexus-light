"use client";

import React, { useState, FormEvent } from "react";
import { Button } from "../../../../../../packages/design-system/src/components/ui/Button";
import { Input } from "../../../../../../packages/design-system/src/components/ui/Input";
import { Checkbox } from "../../../../../../packages/design-system/src/components/ui/Checkbox";
import { SocialButton } from "../../../../../../packages/design-system/src/components/ui/SocialButton";
import { FaGoogle, FaMicrosoft, FaApple } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember })
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Erreur inconnue");
        setLoading(false);
        return;
      }
      setError("");
      document.body.setAttribute("data-testid-user-menu", email);
      // Gestion du remember me déjà gérée côté API (cookie)
    } catch (err) {
      setError("Erreur réseau, réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Lien de réinitialisation envoyé (simulation)");
  };

  const handleSocialLogin = (provider: 'google' | 'microsoft' | 'apple') => {
    window.location.href = `/api/v1/auth/oauth/${provider}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4">Connexion</h1>
      <form
        className="w-full max-w-xs bg-white dark:bg-gray-800 p-6 rounded shadow"
        onSubmit={handleSubmit}
        aria-label="Formulaire de connexion"
      >
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          data-testid="email-input"
        />
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          label="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          data-testid="password-input"
        />
        <div className="flex items-center justify-between mb-2">
          <Checkbox
            id="remember"
            label="Se souvenir de moi"
            checked={remember}
            onChange={e => setRemember(e.target.checked)}
            data-testid="remember-checkbox"
          />
          <button
            type="button"
            className="text-primary-600 hover:underline text-sm"
            onClick={handleForgotPassword}
            data-testid="forgot-password-link"
          >
            Mot de passe oublié ?
          </button>
        </div>
        {error && (
          <div
            className="mb-2 text-red-600 text-sm"
            role="alert"
            data-testid="login-error"
          >
            {error}
          </div>
        )}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          data-testid="login-button"
          loading={loading}
          disabled={loading}
        >
          Se connecter
        </Button>
      </form>
      <div className="w-full max-w-xs mt-4 flex flex-col gap-2">
        <SocialButton
          provider="google"
          icon={<FaGoogle />}
          onClick={() => handleSocialLogin('google')}
          data-testid="login-google"
          loading={loading}
          disabled={loading}
        >
          Continuer avec Google
        </SocialButton>
        <SocialButton
          provider="microsoft"
          icon={<FaMicrosoft />}
          onClick={() => handleSocialLogin('microsoft')}
          data-testid="login-microsoft"
          loading={loading}
          disabled={loading}
        >
          Continuer avec Microsoft
        </SocialButton>
        <SocialButton
          provider="apple"
          icon={<FaApple />}
          onClick={() => handleSocialLogin('apple')}
          data-testid="login-apple"
          loading={loading}
          disabled={loading}
        >
          Continuer avec Apple
        </SocialButton>
      </div>
    </div>
  );
}
