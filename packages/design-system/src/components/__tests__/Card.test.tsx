import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
  it('affiche le titre et le contenu', () => {
    render(
      <Card title="Mon titre">
        <p>Mon contenu</p>
      </Card>
    );
    expect(screen.getByText('Mon titre')).toBeInTheDocument();
    expect(screen.getByText('Mon contenu')).toBeInTheDocument();
  });

  it('affiche uniquement le contenu sans titre', () => {
    render(
      <Card>
        <span>Sans titre</span>
      </Card>
    );
    expect(screen.queryByRole('heading')).toBeNull();
    expect(screen.getByText('Sans titre')).toBeInTheDocument();
  });
});
