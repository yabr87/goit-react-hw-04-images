import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ close, bigImg }) => {
  // const closeModal = ({ target, currentTarget, code }) => {
  //   if (target === currentTarget || code === 'Escape') {
  //     close();
  //   }
  // };

  /*тепер тут 2 фінкції а була одна не зрощумів навіщо*/

  const closeModalonClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      close();
    }
  };

  useEffect(() => {
    const closeModalOnKeypress = ({ code }) => {
      if (code === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', closeModalOnKeypress);
    return () => {
      window.removeEventListener('keydown', closeModalOnKeypress);
    };
  }, [close]);

  return createPortal(
    <div className={s.overlay} onClick={closeModalonClick}>
      <div className={s.modal}>
        <img src={bigImg} alt="modalimage" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  bigImg: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default Modal;
