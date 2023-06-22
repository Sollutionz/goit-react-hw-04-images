import React from "react"
import { ImageGalleryItem } from "components/imageGalleryItem/ImageGalleryItem"
import PropTypes from 'prop-types';

export const ImageGallery = ({
  data,
  openModal,
  getModalImg,
}) => {
  return (
    <ul className="ImageGallery">
      {data.map(item => (
        <ImageGalleryItem
          key={item.id}
          image={item}
          openModal={openModal}
          getModalImg={getModalImg}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired),
  openModal: PropTypes.func.isRequired,
  getModalImg: PropTypes.func.isRequired,
};
