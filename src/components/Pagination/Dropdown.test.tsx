import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { Dropdown } from './Dropdown';

describe('tests', () => {
  it('Should render without errors', () => {
    render(<Dropdown onChange={vi.fn()} />);
  });
});
