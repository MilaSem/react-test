import { render } from '../../config/tests/setup_tests';
import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import { useSearchParams } from 'next/navigation';
import { App } from './App';

describe('App tests', () => {
  beforeEach(() => {
    vi.mock('next/navigation', () => ({
      useSearchParams: vi.fn(),
    }));
    useSearchParams.mockReturnValue({
      get: vi.fn(),
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Should render without errors', () => {
    render(<App />);
  });
});
