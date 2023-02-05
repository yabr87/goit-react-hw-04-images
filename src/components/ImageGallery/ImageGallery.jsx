import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import s from './ImageGallery.module.css';

// id, webformatURL, largeImageURL, tags, previewURL

const ImageGallery = ({ items, openModal }) => {
  const elements = items.map(({ id, tags, webformatURL, largeImageURL }) => (
    <ImageGalleryItem
      key={id}
      tags={tags}
      webformatURL={webformatURL}
      openModal={() => openModal(largeImageURL)}
    />
  ));

  return <ul className={s.ImageGallery}>{elements}</ul>;
};

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};

ImageGallery.defaultProps = {
  items: [],
};

export default ImageGallery;
