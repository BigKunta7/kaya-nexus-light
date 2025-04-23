import React from 'react';
import type { ReactNode } from 'react';

/**
 * Badge universel Kaya Nexus (statut, label, themable)
 * @param {BadgeProps} props
 * @returns {JSX.Element}
 */
export interface BadgeProps {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, color = 'primary', className = '' }) => (
  <span className={`kaya-badge kaya-badge--${color} ${className}`}>{children}</span>
);
