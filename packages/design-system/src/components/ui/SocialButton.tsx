import React from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Bouton social login Kaya Nexus (Google, Microsoft, Apple...)
 * @param {SocialButtonProps} props
 * @returns {JSX.Element}
 */
export interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  provider: 'google' | 'microsoft' | 'apple';
  children: ReactNode;
  /** Indique si une action est en cours (affiche un état busy) */
  loading?: boolean;
}

export const SocialButton = React.forwardRef<HTMLButtonElement, SocialButtonProps>(
  ({ icon, provider, children, loading = false, ...props }, ref) => {
    const ariaBusy = loading ? 'true' : undefined;
    return (
      <button
        ref={ref}
        type="button"
        className={`kaya-social-btn kaya-social-btn--${provider}`}
        aria-label={`Connexion avec ${provider}`}
        aria-busy={ariaBusy}
        {...props}
      >
        <span className="kaya-social-btn__icon">{icon}</span>
        <span className="kaya-social-btn__label">{children}</span>
      </button>
    );
  }
);
SocialButton.displayName = 'SocialButton';
