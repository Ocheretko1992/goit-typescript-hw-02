import { FC } from 'react';
import css from './ImageCard.module.css';

 interface ImageCardProps {
  urls: { small: string };
  imgSlug: string;
  onClick: (imageUrl: string) => void;
}
const ImageCard: FC<ImageCardProps> = ({ urls, imgSlug, onClick }) => {
  const handleClick = () => {
    onClick( urls.small);
  };
  
  return (
    <div className={css.imageCard} onClick={handleClick}>
      <img className={css.card} src={urls.small} alt={imgSlug} />
    </div>
  );
};

export default ImageCard;

