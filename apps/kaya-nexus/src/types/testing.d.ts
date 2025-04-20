/// <reference types="@testing-library/jest-dom" />

declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveClass(className: string): R;
    toBeDisabled(): R;
    toHaveBeenCalledTimes(times: number): R;
    toHaveBeenCalledWith(...args: any[]): R;
  }
}

declare module '@testing-library/jest-dom';
