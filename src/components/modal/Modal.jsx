import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ toggleModal, alt, modalImages }) => {

  useEffect(() => {
    const escCloseModal = e => {
      if (e.code === 'Escape') toggleModal();
    };
    document.addEventListener('keydown', escCloseModal);
    return () => {
      document.removeEventListener('keydown', escCloseModal);
    };
  }, [toggleModal]);


  const closeModal = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <>
      <div className="Overlay" onClick={closeModal}>
        <div className="ModalStyle">
          <img src={modalImages} alt={alt} />
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  modalImages: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
