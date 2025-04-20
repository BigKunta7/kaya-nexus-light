import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

export const Primary: StoryObj<typeof Button> = {
  args: {
    children: 'Bouton principal',
  },
};
