import { render, screen, describe, expect, it, afterEach } from '../../../config/tests/setup_tests';
import { vi } from 'vitest';
import { artworkMocks } from '../../../config/tests/mocks';

import { ResultList } from './ResultList';

describe('ResultList tests', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Should render NothingFound component', () => {
    render(<ResultList artworks={[]} />);
    expect(screen.getByText(/Nothing found/)).toBeInTheDocument();
  });
  it('Should render the speciified number of cards', () => {
    const { container } = render(<ResultList artworks={artworkMocks} />);
    const collection = container.getElementsByClassName('result__item');
    expect(collection.length).toEqual(2);
  });
});
