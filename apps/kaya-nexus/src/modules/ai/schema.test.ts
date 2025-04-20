import { isAiPromptInput } from './schema';
import { describe, it, expect } from '@jest/globals';

describe('isAiPromptInput', () => {
  it('valide un prompt conforme', () => {
    expect(isAiPromptInput({ prompt: 'Quelle est la météo ?', model: 'gpt-4', temperature: 0.5 })).toBe(true);
  });
  it('rejette un prompt trop court', () => {
    expect(isAiPromptInput({ prompt: 'Hi', model: 'gpt-4', temperature: 0.5 })).toBe(false);
  });
  it('rejette un prompt avec température hors bornes', () => {
    expect(isAiPromptInput({ prompt: 'Test prompt', model: 'gpt-4', temperature: 2 })).toBe(false);
  });
  it('rejette un type inattendu', () => {
    expect(isAiPromptInput(null)).toBe(false);
    expect(isAiPromptInput(undefined)).toBe(false);
    expect(isAiPromptInput(123)).toBe(false);
  });
});
