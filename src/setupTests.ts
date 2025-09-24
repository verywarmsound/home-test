import '@testing-library/jest-dom';

// Extend Jest matchers
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeChecked(): R;
      toBeVisible(): R;
    }
  }
}
