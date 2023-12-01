import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onImageClick }) => {
  const lastNewImageRef = useRef();

  const scrollToLastNewImage = useCallback(() => {
    if (lastNewImageRef.current) {
      lastNewImageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, []);

  useEffect(() => {
    scrollToLastNewImage();
  }, [images, scrollToLastNewImage]);

  return (
    <ul className="ImageGallery">
      {images.map((image, index) => (
        <ImageGalleryItem
          key={image.id}
          imageUrl={image.webformatURL}
          imageTags={image.tags}
          onImageClick={() => onImageClick(image.largeImageURL)}
          forwardRef={index === images.length - 1 ? lastNewImageRef : null}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
