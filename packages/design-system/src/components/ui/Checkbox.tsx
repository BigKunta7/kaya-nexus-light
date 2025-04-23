import React from 'react';
import type { InputHTMLAttributes } from 'react';

/**
 * Checkbox universelle Kaya Nexus (accessible, themable)
 * @param {CheckboxProps} props
 * @returns {JSX.Element}
 */
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...props }, ref) => (
    <label className="kaya-checkbox__wrapper">
      <input ref={ref} type="checkbox" className="kaya-checkbox" {...props} />
      {label && <span className="kaya-checkbox__label">{label}</span>}
    </label>
  )
);
Checkbox.displayName = 'Checkbox';
