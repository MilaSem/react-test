import { render } from '../../config/tests/setup_tests';
import { describe, it } from 'vitest';

import { App } from './App';

describe('App tests', () => {
  it('Should render without errors', () => {
    render(<App />);
  });
});
