/**
 * Composant Button du Design System Kaya Nexus.
 * Bouton configurable avec différentes variantes, tailles et états.
 * @module DesignSystem/Components/Button
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Définition des variantes de bouton avec class-variance-authority
const buttonVariants = cva(
  // Classes de base communes à tous les boutons
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      // Variantes de style
      variant: {
        primary: "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-primary-500",
        secondary: "bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 focus-visible:ring-secondary-500",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-500",
        ghost: "bg-transparent hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-500",
        link: "bg-transparent underline-offset-4 hover:underline text-primary-500 hover:text-primary-600 active:text-primary-700 focus-visible:ring-primary-500",
        danger: "bg-error-500 text-white hover:bg-error-600 active:bg-error-700 focus-visible:ring-error-500",
        success: "bg-success-500 text-white hover:bg-success-600 active:bg-success-700 focus-visible:ring-success-500",
      },
      // Variantes de taille
      size: {
        xs: "text-xs px-2.5 py-1.5 rounded",
        sm: "text-sm px-3 py-2 rounded-md",
        md: "text-sm px-4 py-2 rounded-md",
        lg: "text-base px-5 py-2.5 rounded-lg",
        xl: "text-lg px-6 py-3 rounded-lg",
      },
      // Variante avec/sans icône
      withIcon: {
        true: "gap-2",
        false: "",
      },
      // Variante pleine largeur
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    // Valeurs par défaut
    defaultVariants: {
      variant: "primary",
      size: "md",
      withIcon: false,
      fullWidth: false,
    },
  }
);

// Interface des props du bouton
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Contenu du bouton
   */
  children: React.ReactNode;
  /**
   * Icône à afficher avant le texte
   */
  leftIcon?: React.ReactNode;
  /**
   * Icône à afficher après le texte
   */
  rightIcon?: React.ReactNode;
  /**
   * État de chargement du bouton
   */
  isLoading?: boolean;
  /**
   * Texte à afficher pendant le chargement
   */
  loadingText?: string;
  /**
   * Composant de spinner pour l'état de chargement
   */
  spinner?: React.ReactNode;
}

/**
 * Composant Button
 * 
 * Bouton configurable avec différentes variantes, tailles et états.
 * Supporte les icônes, l'état de chargement et diverses personnalisations.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    withIcon = false,
    fullWidth,
    children,
    leftIcon,
    rightIcon,
    isLoading = false,
    loadingText,
    spinner,
    ...props
  }, ref) => {
    // Détermine si le bouton a des icônes
    const hasIcon = Boolean(leftIcon || rightIcon);
    
    // Spinner par défaut pour l'état de chargement
    const defaultSpinner = (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );

    return (
      <button
        className={cn(buttonVariants({
          variant,
          size,
          withIcon: hasIcon || isLoading,
          fullWidth,
          className,
        }))}
        disabled={isLoading || props.disabled}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <>
            {spinner || defaultSpinner}
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
