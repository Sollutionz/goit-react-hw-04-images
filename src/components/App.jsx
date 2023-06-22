import { Searchbar } from './searchbar/Searchbar';
import { Component, React } from 'react';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Loader } from './loader/Loader';
import { Button } from './button/Button';
import { fetchImages } from 'api/imageFinder';
import { Modal } from './modal/Modal';

export class App extends Component {
  state = {
    isLoading: false,
    query: '',
    modalImages: null,
    alt: '',
    data: [],
    page: 1,
    isModal: false,
  };

  onSubmit = async query => {
    await this.setState({ query, page: 1 });
    this.setState({
      isLoading: true,
    });
    try {
      await fetchImages(this.state.query, this.state.page).then(
        ({ images }) => {
          this.setState({
            data: images,
            modalImages: images.modalImages,
            page: 1,
          });
        }
      );
    } catch (error) {
      alert(error.message);
    }
    this.setState({
      isLoading: false
    });
  };
  onLoadMore = async () => {
    await this.setState(prevState => ({ page: prevState.page + 1 }));
    this.setState({
      isLoading: true,
    });
    try {
      await fetchImages(this.state.query, this.state.page).then(
        ({ images }) => {
          this.setState(prev => ({
            data: [...prev.data, ...images],
            modalImages: images.modalImages,
          }));
        }
      );
    } catch (error) {
      alert(error.message);
    }
    this.setState({
      isLoading: false,
    });
  };


  toggleModal = () => {
    this.setState(prevState => ({ isModal: !prevState.isModal }));
  };

  getModalImg = (modalImages, alt) => {
    this.setState({ modalImages, alt });
  };

  render() {
    const { data, loading, modalImages, alt, isModal } = this.state;

    return (
      <>
        <div className="App">
          <Searchbar onSubmit={this.onSubmit} />
          {loading && <Loader />}
          <ImageGallery
            modalImages={modalImages}
            data={data}
            openModal={this.toggleModal}
            getModalImg={this.getModalImg}
          />
          {isModal && (
            <Modal
              modalImages={modalImages}
              alt={alt}
              toggleModal={this.toggleModal}
            />
          )}
          {data.length > 11 && <Button onLoadMore={this.onLoadMore} />}
        </div>
      </>
    );
  }
}
