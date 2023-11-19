import { useContext } from 'react';
import '../App.css';
import { ResultListItem } from '../ResultListItem/ResultListItem';
import { NothingFound } from '../NothingFound/NothingFound';
import { AppContext } from '../App';

const ResultList = () => {
  const { artworks } = useContext(AppContext);

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
