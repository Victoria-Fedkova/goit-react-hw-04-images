import { createPortal } from 'react-dom';
import { Backdrop, ModalContent } from './Modal.styled';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ src, alt, handleModalClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleModalClose);
    return () => {
      window.removeEventListener('keydown', handleModalClose);
    };
  }, [handleModalClose]);

  return createPortal(
    <Backdrop onClick={handleModalClose}>
      <ModalContent>
        <img src={src} alt={alt} />
      </ModalContent>
    </Backdrop>,
    modalRoot
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  handleModalClose: PropTypes.func,
};

export default Modal;
