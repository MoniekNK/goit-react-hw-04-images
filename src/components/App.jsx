import React, { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import { Searchbar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '754704-15f293fdc79a851fbfbf7bf56';

const App = () => {
  const [images, setImages] = useState({ total: 0, hits: [] });
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchImages();
  }, [query, page]);

  const fetchImages = () => {
    if (!query) {
      return;
    }

    const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    setIsLoading(true);

    axios
      .get(url)
      .then(response => {
        if (response.data.hits.length === 0) {
          Notiflix.Notify.warning(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        if (page === 1) {
          Notiflix.Notify.success(
            `Hooray! We found ${response.data.totalHits} images.`
          );
        }

        if (response.data.totalHits <= page * 12) {
          Notiflix.Notify.warning(
            "We're sorry, but you've reached the end of search results."
          );
        }

        setImages(prevImages => ({
          total: response.data.totalHits,
          hits: [...prevImages.hits, ...response.data.hits],
        }));
      })
      .catch(error => {
        Notiflix.Notify.failure(
          'Ooops... Something went wrong! Please, try again.'
        );
      })
      .finally(() => setIsLoading(false));
  };

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages({ total: 0, hits: [] });
  };

  const handleLoadMore = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleClickImage = imageUrl => {
    setShowModal(true);
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  return (
    <>
      <Searchbar onSubmit={handleSearch} />

      <ImageGallery images={images.hits} onImageClick={handleClickImage} />
      {images.total > (page - 1) * 12 && !isLoading && (
        <Button onLoadMore={handleLoadMore} />
      )}
      {isLoading && <Loader />}
      {showModal && (
        <Modal imageUrl={selectedImage} onCloseModal={handleCloseModal} />
      )}
    </>
  );
};

export default App;
