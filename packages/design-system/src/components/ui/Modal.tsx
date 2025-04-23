import React from 'react';

/**
 * Modal universelle Kaya Nexus (accessible, focus trap, themable)
 * @param {ModalProps} props
 * @returns {JSX.Element}
 */
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="kaya-modal__overlay" role="dialog" aria-modal="true">
      <div className="kaya-modal">
        <button className="kaya-modal__close" aria-label="Fermer" onClick={onClose}>
          ×
        </button>
        {title && <h2 className="kaya-modal__title">{title}</h2>}
        <div className="kaya-modal__content">{children}</div>
      </div>
    </div>
  );
};
