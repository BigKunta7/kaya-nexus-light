import React from 'react';
import type { SelectHTMLAttributes, ReactNode } from 'react';

/**
 * Select universel Kaya Nexus (accessible, themable)
 * @param {SelectProps} props
 * @returns {JSX.Element}
 */
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: ReactNode;
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, children, ...props }, ref) => {
    const ariaInvalid = !!error ? 'true' : undefined;
    return (
      <div className="kaya-select__wrapper">
        {label && <label className="kaya-select__label">{label}</label>}
        <select ref={ref} className="kaya-select" aria-invalid={ariaInvalid} {...props}>
          {children}
        </select>
        {error && <span className="kaya-select__error">{error}</span>}
      </div>
    );
  }
);
Select.displayName = 'Select';
