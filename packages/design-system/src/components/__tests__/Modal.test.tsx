import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

describe('Modal', () => {
  it('ne s’affiche pas quand isOpen est false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <p>Contenu</p>
      </Modal>
    );
    expect(screen.queryByText('Contenu')).toBeNull();
  });

  it('affiche le titre et le contenu quand isOpen est true', () => {
    render(
      <Modal isOpen title="Titre modal" onClose={() => {}}>
        <span>Mon contenu</span>
      </Modal>
    );
    expect(screen.getByText('Titre modal')).toBeInTheDocument();
    expect(screen.getByText('Mon contenu')).toBeInTheDocument();
  });

  it('appelle onClose au clic sur la croix', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen onClose={onClose}>
        <p>Test</p>
      </Modal>
    );
    const closeBtn = screen.getByLabelText('Fermer la modal');
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });
});
