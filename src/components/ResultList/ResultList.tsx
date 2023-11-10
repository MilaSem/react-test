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
            onClick={() => {
              console.log(`click on card id: ${artwork.id}`);
            }}
            alt_text={''}
          />
        ))}
      </>
    );
  } else {
    return <NothingFound />;
  }
};

export { ResultList };
