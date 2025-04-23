import React from 'react';
import type { TextareaHTMLAttributes } from 'react';

/**
 * Textarea universelle Kaya Nexus (accessible, themable)
 * @param {TextareaProps} props
 * @returns {JSX.Element}
 */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, ...props }, ref) => {
    const ariaInvalid = !!error ? 'true' : undefined;
    return (
      <div className="kaya-textarea__wrapper">
        {label && <label className="kaya-textarea__label">{label}</label>}
        <textarea ref={ref} className="kaya-textarea" aria-invalid={ariaInvalid} {...props} />
        {error && <span className="kaya-textarea__error">{error}</span>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
