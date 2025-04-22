import React from "react";
import "./Avatar.css";

interface AvatarProps {
  src: string;
  alt?: string;
  size?: number;
  className?: string;
}

/**
 * Composant Avatar universel pour l’affichage d’un utilisateur ou d’une entité.
 * @param {string} src - URL de l’image
 * @param {string} [alt] - Texte alternatif (par défaut "Avatar")
 * @param {number} [size] - Taille de l’avatar en pixels (par défaut 40)
 * @param {string} [className] - Classes CSS additionnelles
 * @returns {JSX.Element}
 */
export default function Avatar({ src, alt = "Avatar", size = 40, className = "" }: AvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`avatar-img rounded-full object-cover border-2 border-indigo-600 ${className}`}
      // Suppression du style inline, la taille est gérée via la classe CSS avatar-img
    />
  );
}
