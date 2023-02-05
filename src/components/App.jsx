import React, { useState, useEffect, useCallback } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';

import { getGalleryItems } from './utils/galleryApi';

const App = () => {
  const perPage = 12;
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [imgModal, setImgModal] = useState('');

  const searchImage = search => {
    setSearch(search);
    setItems([]);
    setPage(1);
  };

  useEffect(() => {
    if (!search) {
      return;
    }

    const fetchImage = async () => {
      try {
        setLoading(true);
        const { hits, totalHits } = await getGalleryItems(
          search,
          page,
          perPage
        );
        getTotalPages(totalHits);
        setItems(prevItems => [...prevItems, ...hits]);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();

    console.log('Update App');
  }, [search, page]);

  const getTotalPages = totalHits => {
    let pages = Math.floor(totalHits / 12);
    pages = totalHits % perPage ? pages + 1 : pages;
    console.log(pages);
    setTotalPages(pages);
  };

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const openModal = useCallback(largeImageURL => {
    setImgModal(largeImageURL);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setImgModal('');
  }, []);

  return (
    <div className="AppWrapper">
      <Searchbar onSubmit={searchImage} />
      <ImageGallery items={items} openModal={openModal} />
      <Loader
        page={page}
        loading={loading}
        totalPages={totalPages}
        onBtnClick={loadMore}
      />
      {showModal && <Modal close={closeModal} bigImg={imgModal} />}
    </div>
  );
};

export default App;
