import '@testing-library/jest-dom/vitest';

import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

import { AllTheProviders } from './all_the_providers';

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
export * from 'vitest';
