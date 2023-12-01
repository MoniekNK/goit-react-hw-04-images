import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imageUrl, imageTags, onImageClick }) => {
  const itemRef = React.useRef();

  return (
    <li className={css.ImageGalleryItem} ref={itemRef}>
      <img
        className={css.ImageGalleryItemImage}
        src={imageUrl}
        alt={imageTags}
        onClick={onImageClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageTags: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
