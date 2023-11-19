import { render, screen, expect, fireEvent } from '../../../config/tests/setup_tests';
import { afterAll, afterEach, beforeAll, beforeEach, describe, it } from 'vitest';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { Details } from './Details';
import { artworkMocks } from '../../../config/tests/mocks';

const server = setupServer(
  http.get('https://api.artic.edu/api/v1/artworks/:imageId', () => {
    return HttpResponse.json({ data: artworkMocks[0] });
  }),
);

describe('Details tests', () => {
  beforeEach(() => {
    window.history.replaceState('', '', window.location.origin);
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  it('Should render loading indicator', async () => {
    window.history.replaceState('', '', `${window.location.href}?details=2`);
    render(<Details />);
    expect(screen.getByText('Loading details...')).toBeInTheDocument();
  });

  it('Should render close button', async () => {
    window.history.replaceState('', '', `${window.location.href}?details=2`);
    render(<Details />);
    await screen.findByText(new RegExp('Title.*'));
    expect(screen.getByText(new RegExp('Title.*'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(artworkMocks[0].title))).toBeInTheDocument();
  });

  it('Check close button', async () => {
    window.history.replaceState('', '', `${window.location.href}?details=2`);

    const { container } = render(<Details />);
    await screen.findByText(new RegExp('Title.*'));

    const closeButton = container.getElementsByClassName('details__button')[0];
    expect(screen.getByText(/Title/)).toBeInTheDocument();

    let hasDetailsKeys = Boolean(
      new URLSearchParams(`?${window.location.href.split('?')[1]} || ''`).get('details'),
    );
    expect(hasDetailsKeys).toEqual(true);
    fireEvent.click(closeButton);

    hasDetailsKeys = Boolean(
      new URLSearchParams(`?${window.location.href.split('?')[1]} || ''`).get('details'),
    );
    expect(hasDetailsKeys).toEqual(false);
  });
});
