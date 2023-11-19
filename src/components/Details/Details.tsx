import { useSearchParams } from 'react-router-dom';
import { useGetArtworkDetailQuery } from '../../redux/services/artworks/artworkApi';

const Details = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const details = Number.parseInt(searchParams.get('details') as string);
  const { data, isFetching } = useGetArtworkDetailQuery(details);
  const artwork = data?.data;

  return (
    <>
      {isFetching ? (
        <div className="details__wrap">
          <p>Loading details...</p>
        </div>
      ) : (
        artwork && (
          <div className="details__wrap">
            <p>
              <b>Title: {artwork?.title}</b>
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
