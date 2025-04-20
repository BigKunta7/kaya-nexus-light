/**
 * Composant Card du Design System Kaya Nexus.
 * Carte configurable avec différentes variantes et états.
 * @module DesignSystem/Components/Card
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Définition des variantes de carte avec class-variance-authority
const cardVariants = cva(
  // Classes de base communes à toutes les cartes
  "rounded-lg border bg-white shadow-sm overflow-hidden",
  {
    variants: {
      // Variantes de style
      variant: {
        default: "border-gray-200",
        outline: "border-gray-300",
        filled: "border-transparent bg-gray-50",
        elevated: "border-transparent shadow-md",
        ghost: "border-transparent shadow-none bg-transparent",
      },
      // Variantes de padding
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
      // Variante interactive (avec effets de survol)
      interactive: {
        true: "transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50",
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
      variant: "default",
      padding: "md",
      interactive: false,
      fullWidth: true,
    },
  }
);

// Interface des props de la carte
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Contenu de la carte
   */
  children: React.ReactNode;
  /**
   * Référence au composant
   */
  asChild?: boolean;
}

/**
 * Composant Card
 * 
 * Carte configurable pour afficher du contenu structuré.
 * Supporte différentes variantes, tailles et états.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, interactive, fullWidth, children, ...props }, ref) => {
    return (
      <div
        className={cn(cardVariants({
          variant,
          padding,
          interactive,
          fullWidth,
          className,
        }))}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

/**
 * Composant CardHeader
 * 
 * En-tête de carte avec espacement standardisé.
 */
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));

CardHeader.displayName = "CardHeader";

/**
 * Composant CardTitle
 * 
 * Titre de carte avec style standardisé.
 */
export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));

CardTitle.displayName = "CardTitle";

/**
 * Composant CardDescription
 * 
 * Description de carte avec style standardisé.
 */
export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-500", className)}
    {...props}
  />
));

CardDescription.displayName = "CardDescription";

/**
 * Composant CardContent
 * 
 * Contenu principal de la carte avec espacement standardisé.
 */
export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));

CardContent.displayName = "CardContent";

/**
 * Composant CardFooter
 * 
 * Pied de carte avec espacement standardisé.
 */
export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));

CardFooter.displayName = "CardFooter";

export default Card;
