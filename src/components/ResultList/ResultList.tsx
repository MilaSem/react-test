import '../App.css';
import { type Artwork } from '../../api/artwork';
import { ResultListItem } from '../ResultListItem/ResultListItem';
import { NothingFound } from '../NothingFound/NothingFound';
interface ResultListProps {
  artworks: Artwork[];
}

const ResultList = (props: ResultListProps) => {
  if (props.artworks.length !== 0) {
    return (
      <>
        {props.artworks.map((artwork) => (
          <ResultListItem
            key={artwork.id}
            title={artwork.title}
            alt_text={
              artwork.thumbnail && artwork.thumbnail.alt_text ? artwork.thumbnail.alt_text : '' //thumbnail may be missing
            }
          />
        ))}
      </>
    );
  } else {
    return <NothingFound />;
  }
};

export { ResultList };
