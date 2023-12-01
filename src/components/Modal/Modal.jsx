import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ imageUrl, onCloseModal }) => {
  const handleModalBackgroundClick = event => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  const handleEscapeClick = event => {
    if (event.key === 'Escape') {
      onCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeClick);

    return () => {
      document.removeEventListener('keydown', handleEscapeClick);
    };
  }, [handleEscapeClick]);

  return (
    <div className="Overlay" onClick={handleModalBackgroundClick}>
      <div className={css.Modal}>
        <img src={imageUrl} alt="Bigger size" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export { Modal };
