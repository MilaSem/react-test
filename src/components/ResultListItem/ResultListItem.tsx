import { useCallback, useEffect, useState } from 'react';
import '../App.css';
import { useSearchParams } from 'react-router-dom';

interface ResultListItemProps {
  api_link: string;
  title: string;
  alt_text: string;
  onClick: () => void;
  id: number;
}

const ResultListItem = (props: ResultListItemProps) => {
  const [, setSearchParams] = useSearchParams();
  const [imageArtUrl, setImageArtUrl] = useState('');

  const getArtImgId = useCallback(async (): Promise<string> => {
    return await fetch(`https://api.artic.edu/api/v1/artworks/${props.id}?fields=image_id`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.data.image_id;
      });
  }, [props.id]);

  useEffect(() => {
    async function getArtImageUrl() {
      const url = await getArtImgId();
      setImageArtUrl(`https://www.artic.edu/iiif/2/${url}/full/843,/0/default.jpg`);
    }
    getArtImageUrl();
  }, [getArtImgId]);

  const { title, alt_text } = props;

  return (
    <>
      <div
        className="result__item"
        onClick={() => {
          setSearchParams((last) => {
            last.set('details', String(props.id));
            return last;
          });
        }}
      >
        <p>
          <b>{title}</b>
        </p>
        <img src={imageArtUrl}></img>
        <p>{alt_text}</p>
      </div>
    </>
  );
};

export { ResultListItem };
