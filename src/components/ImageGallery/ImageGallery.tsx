import Img from "../../types";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
interface FetchResult {
  results:Img[];
  total:number
}
interface ImageGalleryProp {
  items: Img[];
  onImageClick: (imageUrl: string) => void;
}
  const  ImageGallery : React.FC<ImageGalleryProp> = ({ items, onImageClick }) => {
  return (
    <ul className={css.imgList}>
      {items.map(({ id, urls, slug }) => (
        <li key={id}>
          <ImageCard urls={urls} imgSlug={slug} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}
export default ImageGallery;

