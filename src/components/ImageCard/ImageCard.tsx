import { FC } from 'react';
import css from './ImageCard.module.css';

interface ImageCardProps {
  urls: {small:string};
  imgSlug: string;
  onClick: (imageUrl: string) => void;
}
const ImageCard: FC<ImageCardProps> = ({ urls:{small}, imgSlug, onClick }) => {
  const handleClick = () => {
    onClick(small);
  };
  
  return (
    <div className={css.imageCard} onClick={handleClick}>
      <img className={css.card} src={small} alt={imgSlug} />
    </div>
  );
};

export default ImageCard;

