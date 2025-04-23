import React from 'react';
import type { ReactNode } from 'react';

/**
 * Alert universelle Kaya Nexus (a11y, statuts, dismiss)
 * @param {AlertProps} props
 * @returns {JSX.Element}
 */
export interface AlertProps {
  children: ReactNode;
  status?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ children, status = 'info', onClose, className = '' }) => (
  <div className={`kaya-alert kaya-alert--${status} ${className}`} role="alert">
    <span className="kaya-alert__icon" aria-hidden="true" />
    <span className="kaya-alert__content">{children}</span>
    {onClose && (
      <button className="kaya-alert__close" aria-label="Fermer l'alerte" onClick={onClose}>
        ×
      </button>
    )}
  </div>
);
