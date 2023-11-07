import { useCallback, useEffect, useState } from 'react';
import '../App.css';

interface ResultListItemProps {
  api_link: string;
  title: string;
  alt_text: string;
  onClick: () => void;
  id: number;
}

const ResultListItem = (props: ResultListItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    async function getArtImageUrl() {
      const url = await getArtImgId();
      setImageArtUrl(`https://www.artic.edu/iiif/2/${url}/full/843,/0/default.jpg`);
    }
    setIsLoading(false);
    getArtImageUrl();
  }, [getArtImgId]);

  const { title, alt_text } = props;

  return (
    <>
      {isLoading ? <div>Loading...</div> : null}
      <div className="result__item" onClick={props.onClick}>
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
