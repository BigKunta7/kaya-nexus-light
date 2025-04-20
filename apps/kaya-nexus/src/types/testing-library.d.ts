import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string): R;
      toHaveAttribute(attr: string, value?: string): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBeRequired(): R;
      toBeVisible(): R;
      toBeChecked(): R;
      toHaveClass(className: string): R;
      toHaveStyle(css: string): R;
      toHaveFocus(): R;
      toHaveValue(value: string | string[] | number): R;
      toBeEmpty(): R;
      toContainElement(element: HTMLElement | null): R;
      toContainHTML(htmlText: string): R;
    }
  }
}

import '@testing-library/jest-dom';
