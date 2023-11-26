import { describe, it } from 'vitest';
import { ButtonToBreak } from './ButtonToBreak';
import { render } from '../../../config/tests/setup_tests';

describe('Button tests', () => {
  it('Should render button', () => {
    render(<ButtonToBreak />);
  });
});
