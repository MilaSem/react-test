import { render, screen, describe, expect, it } from '../../../config/tests/setup_tests';

import { artworkMocks } from '../../../config/tests/mocks';

import { ResultList } from './ResultList';

import { AppContext } from '../App';

describe('ResultList tests', () => {
  it('Should render NothingFound component', () => {
    render(
      <AppContext.Provider value={{ artworks: [] }}>
        <ResultList />
      </AppContext.Provider>,
    );
    expect(screen.getByText(/Nothing found/)).toBeInTheDocument();
  });
  it('Should render the speciified number of cards', () => {
    const { container } = render(
      <AppContext.Provider value={{ artworks: artworkMocks }}>
        <ResultList />
      </AppContext.Provider>,
    );
    const collection = container.getElementsByClassName('result__item');
    expect(collection.length).toEqual(2);
  });
});
