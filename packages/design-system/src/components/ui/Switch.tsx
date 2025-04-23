import React from 'react';
import type { InputHTMLAttributes } from 'react';

/**
 * Switch (toggle) universel Kaya Nexus (accessible, themable)
 * @param {SwitchProps} props
 * @returns {JSX.Element}
 */
export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, ...props }, ref) => (
    <label className="kaya-switch__wrapper">
      <input ref={ref} type="checkbox" role="switch" className="kaya-switch" {...props} />
      <span className="kaya-switch__slider" />
      {label && <span className="kaya-switch__label">{label}</span>}
    </label>
  )
);
Switch.displayName = 'Switch';
