import React from 'react';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, openModal, getModalImg }) => {
   const { img, alt, modalImages } = image;
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={img}
        alt={alt}
        onClick={() => {
          getModalImg(modalImages, alt);
          openModal();
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  getModalImg: PropTypes.func.isRequired,
};