import '@testing-library/jest-dom';

declare module '@testing-library/jest-dom' {
  export interface Matchers<R = void, T = {}> {
    toBeInTheDocument(): R;
    toHaveClass(className: string): R;
    toBeDisabled(): R;
    toHaveBeenCalledTimes(times: number): R;
    toHaveBeenCalledWith(...args: any[]): R;
  }
}
