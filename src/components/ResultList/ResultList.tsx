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
            id={artwork.id}
            key={artwork.id}
            title={artwork.title}
            api_link={artwork.api_link}
            alt_text={
              artwork.thumbnail && artwork.thumbnail.alt_text ? artwork.thumbnail.alt_text : '' //thumbnail may be missing
            }
            onClick={() => {
              console.log('click on card');
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
