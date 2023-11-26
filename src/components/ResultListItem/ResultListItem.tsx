import { generateArtworkImageURL } from '../../api/api';
import { useRouter } from 'next/router';

interface ResultListItemProps {
  apiLink: string;
  title: string;
  altText: string;
  onClick: () => void;
  id: number;
  imageId: string;
}

const ResultListItem = (props: ResultListItemProps) => {
  const router = useRouter();
  const { title, altText, imageId } = props;
  const imageArtUrl = generateArtworkImageURL(imageId);

  return (
    <>
      <div
        className="result__item"
        onClick={() => {
          router.push(`/details/${props.id}`);
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
