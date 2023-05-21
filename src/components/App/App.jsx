import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Loader from '../Loader';
import Modal from '../Modal/Modal';
import Notiflix from 'notiflix';
import { Placeholder } from './Placeholder.styled';
Notiflix.Notify.init({
  position: 'right-bottom',
});

const PER_PAGE = 12;
const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalHits, setTotalHits] = useState(0);

  const handleModalClose = useCallback(e => {
    if (e.key === 'Escape' || e.target === e.currentTarget) {
      setSelectedImageId(null);
    }
  }, []);

  const getPictures = useCallback(async () => {
    const params = {
      key: '34244000-42c3edd46967142fbd554b6c5',
      q: query,
      orientation: 'horizontal',
      page: page,
      per_page: PER_PAGE,
    };

    setIsLoading(true);

    const response = await axios.get(`https://pixabay.com/api/`, {
      params,
    });

    if (response.data.totalHits === 0) {
      Notiflix.Notify.info('Sorry, there are no images to show.');
    }

    setImages(prevState => [...prevState, ...response.data.hits]);
    setIsLoading(false);
    setTotalPages(response.data.totalHits / PER_PAGE);
    setTotalHits(response.data.totalHits);
  }, [page, query]);

  useEffect(() => {
    if (!query) return;
    getPictures();
  }, [getPictures, query]);

  const handleSubmit = useCallback(
    newQuery => {
      if (newQuery !== query) {
        setImages([]);
        setPage(1);
        setQuery(newQuery);
      }
    },
    [query]
  );

  const onLoadMore = useCallback(() => {
    setPage(prevState => prevState + 1);
  }, []);

  const selectPicture = useCallback(id => {
    setSelectedImageId(id);
  }, []);

  const { largeImageURL, tags } = selectedImageId
    ? images.find(({ id }) => id === selectedImageId)
    : {};

  return (
    <div>
      <Searchbar onSearch={handleSubmit} />
      {isLoading && <Loader />}
      {totalHits === 0 && query !== '' && !isLoading && (
        <Placeholder>
          <span>Oops... We can't find what you want 😔</span>
        </Placeholder>
      )}
      {totalHits !== 0 && (
        <ImageGallery images={images} onImgClick={selectPicture} />
      )}
      {totalPages > page && !isLoading && <Button onLoadMore={onLoadMore} />}
      {selectedImageId && (
        <Modal
          src={largeImageURL}
          alt={tags}
          handleModalClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default App;
