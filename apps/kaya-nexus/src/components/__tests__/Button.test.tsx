import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@kaya/design-system';

describe('Button Component', () => {
  test('rend correctement le bouton avec le texte fourni', () => {
    render(<Button>Cliquez-moi</Button>);
    const buttonElement = screen.getByText('Cliquez-moi');
    expect(buttonElement).toBeInTheDocument();
  });

  test('appelle la fonction onClick lorsque cliqué', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Cliquez-moi</Button>);
    const buttonElement = screen.getByText('Cliquez-moi');
    
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applique correctement les classes CSS supplémentaires', () => {
    render(<Button className="custom-class">Cliquez-moi</Button>);
    const buttonElement = screen.getByText('Cliquez-moi');
    
    expect(buttonElement).toHaveClass('custom-class');
  });

  test('est désactivé lorsque la prop disabled est true', () => {
    render(<Button disabled>Cliquez-moi</Button>);
    const buttonElement = screen.getByText('Cliquez-moi');
    
    expect(buttonElement).toBeDisabled();
  });
});
