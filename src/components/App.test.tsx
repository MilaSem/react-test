import { render } from '../../config/tests/setup_tests';
import { afterEach, describe, it, vi } from 'vitest';

import { App } from './App';
import '../api/api';

describe('App tests', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Should render without errors', () => {
    render(<App />);
  });
});
