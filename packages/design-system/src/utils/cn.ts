/**
 * Utilitaire pour combiner des classes CSS conditionnellement.
 * Basé sur la bibliothèque clsx/tailwind-merge pour une gestion optimale des classes Tailwind.
 * @module DesignSystem/Utils
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine et fusionne des classes CSS de manière optimisée pour Tailwind.
 * Permet d'utiliser des expressions conditionnelles et de résoudre les conflits de classes.
 * 
 * @param inputs - Classes CSS à combiner (chaînes, objets conditionnels, tableaux)
 * @returns Chaîne de classes CSS optimisée
 * 
 * @example
 * // Classes simples
 * cn('text-red-500', 'bg-blue-500')
 * // Classes conditionnelles
 * cn('text-red-500', isActive && 'bg-blue-500')
 * // Objets conditionnels
 * cn('text-red-500', { 'bg-blue-500': isActive, 'opacity-50': isDisabled })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
