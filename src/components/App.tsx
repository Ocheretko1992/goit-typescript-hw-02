import { useEffect, useState } from "react";
import { getImages } from "./img-api";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageModal from "./ImageModal/ImageModal";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import Loader from "./Loader/Loader";
export interface Img {
  id:number;
  urls:{small:string}
  slug:string
}
interface FetchResult {
  results:Img[];
  total:number
}
export default function App() {
  const [images, setImages] = useState<Img[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalPage, setTotalPage] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");

  useEffect(() => {
    if (searchQuery.trim() === "") {
      return;
    }
    async function fetchImages() {
      try {
        setLoading(true);
        setError(false);
        const { results, total }:FetchResult = await getImages(searchQuery, page);

        setImages((prevState) => [...prevState, ...results]);
        setTotalPage(page < Math.ceil(total / 15));
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [searchQuery, page]);

  const handleSearch = async (searchImg:string) => {
    setSearchQuery(searchImg);
    setPage(1);
    setImages([]);
  };

  const hendleLoadMore = async () => {
    setPage(page + 1);
  };
  //* modal=====================================================================================
  const openModal = (imageUrl:string) => {
    setSelectedImageUrl(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImageUrl("");
    setModalIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      {error && <ErrorMessage />}

      {images.length > 0 && (
        <ImageGallery items={images} onImageClick={openModal} />
      )}
      {totalPage && <LoadMoreBtn onClick={hendleLoadMore} />}

      {loading && <Loader />}
      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        imageUrl={selectedImageUrl}
      />
    </div>
  );
}
