import { useGetArtworkDetailQuery } from '../../redux/services/artworks/artworkApi';
// import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

const Details = () => {
  const router = useRouter();
  const details = Number.parseInt(router.query.details as string);
  // const details = Number.parseInt(searchParams.get('details') as string);
  const { data } = useGetArtworkDetailQuery(details);
  const artwork = data?.data;

  return (
    <>
      {false ? (
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
                router.push('/');
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
