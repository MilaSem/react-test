import '../App.css';
import { type Artwork } from '../../api/artwork';
import { ResultListItem } from '../ResultListItem/ResultListItem';
import { NothingFound } from '../NothingFound/NothingFound';
import { getDetails } from '../../api/api';
interface ResultListProps {
  artworks: Artwork[];
}

const fetchDetails = async (url: string) => {
  const details = await getDetails(url + `?fields=id,title,artist_display,medium_display`);
  console.log(details);
};

const ResultList = (props: ResultListProps) => {
  if (props.artworks.length !== 0) {
    return (
      <>
        {props.artworks.map((artwork) => (
          <ResultListItem
            id={artwork.id}
            key={artwork.id}
            title={artwork.title}
            alt_text={
              artwork.thumbnail && artwork.thumbnail.alt_text ? artwork.thumbnail.alt_text : '' //thumbnail may be missing
            }
            onClick={() => {
              console.log(artwork.api_link);
              fetchDetails(artwork.api_link);
            }}
          />
        ))}
      </>
    );
  } else {
    return <NothingFound />;
  }
};

export { ResultList };
