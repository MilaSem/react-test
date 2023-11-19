import '../App.css';
import { useSearchParams } from 'react-router-dom';
import { generateArtworkImageURL } from '../../api/api';

interface ResultListItemProps {
  apiLink: string;
  title: string;
  altText: string;
  onClick: () => void;
  id: number;
  imageId: string;
}

const ResultListItem = (props: ResultListItemProps) => {
  const [, setSearchParams] = useSearchParams();
  const { title, altText, imageId } = props;
  const imageArtUrl = generateArtworkImageURL(imageId);

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
        <p>{altText}</p>
      </div>
    </>
  );
};

export { ResultListItem };
