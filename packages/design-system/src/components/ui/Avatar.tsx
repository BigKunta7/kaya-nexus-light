import React from 'react';

/**
 * Avatar universel Kaya Nexus (image, fallback, a11y)
 * @param {AvatarProps} props
 * @returns {JSX.Element}
 */
export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  fallback?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt = 'Avatar', size = 'md', fallback = '?', className = '' }) => (
  <span className={`kaya-avatar kaya-avatar--${size} ${className}`} aria-label={alt} role="img">
    {src ? <img src={src} alt={alt} className="kaya-avatar__img" /> : <span className="kaya-avatar__fallback">{fallback}</span>}
  </span>
);
