import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './components/Button/Button';

/**
 * Le composant Button est le composant de base pour toutes les actions utilisateur.
 */
const meta = {
  title: 'Design System/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Version primaire du bouton, utilisée pour les actions principales
 */
export const Primary: Story = {
  args: {
    children: 'Bouton principal',
    variant: 'primary',
    size: 'md',
  },
};

/**
 * Version secondaire du bouton, utilisée pour les actions moins importantes
 */
export const Secondary: Story = {
  args: {
    children: 'Bouton secondaire',
    variant: 'secondary',
    size: 'md',
  },
};
