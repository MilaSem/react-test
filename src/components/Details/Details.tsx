import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getDetailsFromId } from '../../api/api';
import { Artwork } from '../../api/artwork';

interface DetailsState {
  isLoading: boolean;
}

const Details = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const details = Number.parseInt(searchParams.get('details') as string);
  const [artwork, setArtwork] = useState<Artwork | null>(null);

  const [state, setState] = useState<DetailsState>({
    isLoading: false,
  });

  const setIsLoading = (isLoading: boolean) => {
    setState({
      isLoading,
    });
  };

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      const response = await getDetailsFromId(details);
      console.log('loading');
      setArtwork(response);
      setIsLoading(false);
    }
    if (details) {
      init();
    }
  }, [details]);

  return (
    <>
      {state.isLoading ? (
        <div className="details__wrap">
          <p>Loading details...</p>
        </div>
      ) : (
        artwork && (
          <div className="details__wrap">
            <p>
              <b>{artwork?.title}</b>
            </p>
            <p>
              {artwork.artist_title} {artwork.date_end}
            </p>
            <p>{artwork.medium_display}</p>
            <p className="details__description">
              {artwork.thumbnail && artwork.thumbnail.alt_text ? artwork.thumbnail.alt_text : ''}
            </p>
            <button
              className="details__button"
              onClick={() => {
                setSearchParams((last) => {
                  last.delete('details');
                  return last;
                });
              }}
            >
              x
            </button>
          </div>
        )
      )}
    </>
  );
};

export { Details };
