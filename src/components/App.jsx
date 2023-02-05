import React, { useState, useEffect, useCallback } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import ErrorMessage from './ErrorMessage';
import Spiner from './Spiner';

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

  const openModal = useCallback(largeImageURL => {
    //useCallback щоб не перерендерювати галерею підчас відкриттся мадалки
    setImgModal(largeImageURL);
    setShowModal(true);
  }, []);

  const closeModal = () => {
    setShowModal(false);
    setImgModal('');
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showLoadMore = () => {
    if (loading) {
      return false;
    }
    if (page !== totalPages && Boolean(totalPages)) {
      return true;
    }
    return false;
  };

  return (
    <div className="AppWrapper">
      <Searchbar onSubmit={searchImage} />
      <ImageGallery items={items} openModal={openModal} />
      {showLoadMore() && <Loader onBtnClick={loadMore} />}
      {loading && <Spiner loading={loading} />}
      {!totalPages && <ErrorMessage />}
      {showModal && <Modal close={closeModal} bigImg={imgModal} />}
    </div>
  );
};

export default App;
