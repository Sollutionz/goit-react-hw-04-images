import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ onLoadMore }) => {
  return (
    <button className="Button" type="button" onClick={onLoadMore}>
      Load More
    </button>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};