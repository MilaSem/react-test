import { ResultListItem } from '../ResultListItem/ResultListItem';
import { NothingFound } from '../NothingFound/NothingFound';
import { Artwork } from '@/api/artwork';

interface ResultListProps {
  artworks: Artwork[];
}

const ResultList: React.FC<ResultListProps> = ({ artworks }) => {
  if (artworks.length !== 0) {
    return (
      <>
        {artworks.map((artwork) => (
          <ResultListItem
            id={artwork.id}
            key={artwork.id}
            title={artwork.title}
            apiLink={artwork.api_link}
            onClick={() => {
              console.log(`click on card id: ${artwork.id}`);
            }}
            altText={''}
            imageId={artwork.image_id}
          />
        ))}
      </>
    );
  } else {
    return <NothingFound />;
  }
};

export { ResultList };
