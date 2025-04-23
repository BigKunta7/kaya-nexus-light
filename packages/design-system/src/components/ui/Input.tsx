import React from 'react';
import type { InputHTMLAttributes } from 'react';

/**
 * Champ de saisie universel Kaya Nexus (accessible, themable, responsive)
 * @param {InputProps} props
 * @returns {JSX.Element}
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    const ariaInvalid = !!error ? 'true' : undefined;
    return (
      <div className="kaya-input__wrapper">
        {label && <label className="kaya-input__label">{label}</label>}
        <input ref={ref} className="kaya-input" {...props} aria-invalid={ariaInvalid} />
        {error && <span className="kaya-input__error">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
