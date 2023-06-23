import { Searchbar } from './searchbar/Searchbar';
import { React, useEffect, useState } from 'react';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Loader } from './loader/Loader';
import { Button } from './button/Button';
import { fetchImages } from 'api/imageFinder';
import { Modal } from './modal/Modal';

export const App = () => {
  const [isloading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [modalImages, setModalImages] = useState(null);
  const [alt, setAlt] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (!search) return;
    const getImg = async () => {
      try {
        setIsLoading(true);
        const { images } = await fetchImages(search, page);
        if (page === 1) {
          setData(images);
          setModalImages(images.modalImages);
        } else {
          setData(prev => [...prev, ...images]);
          setModalImages(images.modalImages);
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getImg();
  }, [search, page]);

  function onSubmit(query) {
    setSearch(query);
    setPage(1);
  }

  function onLoadMore() {
    setPage(prev => prev + 1);
  }

  // const onSubmit = async query => {
  //   await setPage(1);
  //   await setSearch(query)
  //   setIsLoading(true);
  //   setSearch(query);
  //   try {
  //     await fetchImages(search, page).then(({ images }) => {
  //       setData(images);
  //       setModalImages(images.modalImages);
  //     });
  //   } catch (error) {
  //     alert(error.message);
  //   }
  //   setIsLoading(false);
  // };
  // const onLoadMore = async () => {
  //   await setPage(prev => prev + 1);
  //   setIsLoading(true);
  //   try {
  //     await fetchImages(search, page).then(({ images }) => {
  //       setData(prevState => [...prevState, ...images]);
  //       setModalImages(images.modalImages);
  //     });
  //   } catch (error) {
  //     alert(error.message);
  //   }
  //   setIsLoading(false);
  // };

  const toggleModal = () => {
    setIsModal(prevState => !prevState);
  };

  const getModalImg = (modalImages, alt) => {
    setModalImages(modalImages);
    setAlt(alt);
  };

  return (
    <>
      <div className="App">
        <Searchbar onSubmit={onSubmit} />
        {isloading && <Loader />}
        <ImageGallery
          modalImages={modalImages}
          data={data}
          openModal={toggleModal}
          getModalImg={getModalImg}
        />
        {isModal && (
          <Modal
            modalImages={modalImages}
            alt={alt}
            toggleModal={toggleModal}
          />
        )}
        {data.length > 11 && <Button onLoadMore={onLoadMore} />}
      </div>
    </>
  );
};
