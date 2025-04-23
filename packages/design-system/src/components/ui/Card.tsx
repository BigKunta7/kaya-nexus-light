import React from 'react';
import type { ReactNode } from 'react';

/**
 * Card universelle Kaya Nexus (conteneur stylé, a11y, themable)
 * @param {CardProps} props
 * @returns {JSX.Element}
 */
export interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  footer?: ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, footer }) => (
  <div className={`kaya-card ${className}`} tabIndex={0} aria-label={title || 'Carte'}>
    {title && <div className="kaya-card__header">{title}</div>}
    <div className="kaya-card__body">{children}</div>
    {footer && <div className="kaya-card__footer">{footer}</div>}
  </div>
);
