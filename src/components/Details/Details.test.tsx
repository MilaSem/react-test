import { render, screen, expect, waitFor, fireEvent } from '../../../config/tests/setup_tests';
import { afterEach, describe, it, vi } from 'vitest';

import { Details } from './Details';
import { getDetailsFromId } from '../../api/api';
import { Artwork } from '../../api/artwork';

const mockArtwork: Artwork = {
  _score: 9977.586,
  thumbnail: {
    width: null,
    lqip: 'data:image/gif;base64,R0lGODlhBgAFAPQAAHhwV3N+bnh/aXR8dJtsG6VsAJx4IIp8PIx0QYZ2SoZ/bIx+b3CGboiAQoKAVoWAVpiLYZqNYIiAcoeIc5SNdJeJfJiKfXyCgneAkXmLp3eFqomMgIWJmZOerAAAAAAAACH5BAAAAAAALAAAAAAGAAUAAAUYoMYEXJdhgwBF1wM4RIE01HYYiVJZk7SEADs=',
    height: null,
  },
  api_model: 'artworks',
  is_boosted: true,
  api_link: 'https://api.artic.edu/api/v1/artworks/28560',
  id: 28560,
  title: 'The Bedroom1',
  timestamp: '2023-11-10T23:32:55-06:00',
};

vi.mock('../../api/api', () => {
  const mockedGetDetailsFromId = vi.fn(() => Promise.resolve(mockArtwork));

  return { getDetailsFromId: mockedGetDetailsFromId };
});

describe('Details tests', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Should render loading indicator', async () => {
    window.history.replaceState('', '', `${window.location.href}?details=2`);
    render(<Details />);
    expect(screen.getByText('Loading details...')).toBeInTheDocument();
    await waitFor(() => expect(getDetailsFromId).toHaveBeenCalled());
  });
  it('Should render close button', async () => {
    window.history.replaceState('', '', `${window.location.href}?details=2`);
    render(<Details />);
    await waitFor(() => expect(getDetailsFromId).toHaveBeenCalledTimes(1));
    expect(screen.getByText(new RegExp(mockArtwork.title))).toBeInTheDocument();
  });
  it('Check close button', async () => {
    window.history.replaceState('', '', `${window.location.href}?details=2`);
    const { container } = render(<Details />);
    await waitFor(() => expect(getDetailsFromId).toHaveBeenCalled());
    const closeButton = container.getElementsByClassName('details__button')[0];
    expect(screen.getByText(/Title/)).toBeInTheDocument();
    fireEvent.click(closeButton);
    screen.debug();
  });
});
