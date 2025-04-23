import React from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Bouton universel Kaya Nexus (accessible, themable, responsive)
 * @param {ButtonProps} props
 * @returns {JSX.Element}
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      ...rest
    },
    ref
  ) => {
    const ariaBusy = loading ? 'true' : undefined;
    return (
      <button
        ref={ref}
        type={rest.type || 'button'}
        disabled={loading || rest.disabled}
        className={`kaya-btn kaya-btn--${variant} kaya-btn--${size} ${fullWidth ? 'kaya-btn--full' : ''}`}
        aria-busy={ariaBusy}
        {...rest}
      >
        {loading ? <span className="kaya-btn__spinner" aria-label="Chargement…" /> : children}
      </button>
    );
  }
);
Button.displayName = 'Button';
