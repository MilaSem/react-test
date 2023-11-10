import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getDetailsFromId } from '../../api/api';
import { Artwork } from '../../api/artwork';

const Card = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const details = Number.parseInt(searchParams.get('details') as string);
  const [artwork, setArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    async function init() {
      const response = await getDetailsFromId(details);
      setArtwork(response);
    }
    if (details) {
      init();
    }
  }, [details]);

  return (
    <>
      {artwork && (
        <div className="card__wrap">
          <p>
            <b>{artwork?.title}</b>
          </p>
          <p>
            {artwork.artist_title} {artwork.date_end}
          </p>
          <p>{artwork.medium_display}</p>
          <p className="card__description">
            {artwork.thumbnail && artwork.thumbnail.alt_text ? artwork.thumbnail.alt_text : ''}
          </p>
          <button
            className="card__button"
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
      )}
    </>
  );
};

export { Card };
