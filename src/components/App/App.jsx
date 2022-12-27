import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { Container, ContainerText } from './App.styled';
import SearchBar from '../SearchBar/SearchBar';
import Button from '../Button';
import Loader from '../Loader';
import Error from '../Error';
import api from '../pixabayApi/pixabay-api';
import ImageGallery from '../ImageGallery';

export function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);

  const handleFormSubmit = newQuery => {
    if (newQuery === query) {
      return;
    }
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const renderImages = () => {
      api
        .fetchImages(query, page)
        .then(response => {
          setImages(prevState => [...prevState, ...response.hits]);

          if (response.hits.length === 0) {
            return toast.error(
              `We haven't come up with pictures yet for this query - ${query}! Try again something from "Kobzar"`
            );
          }
        })
        .catch(error => setError(error))
        .finally(() => setIsLoading(false));
    };
    renderImages();
    setIsLoading(true);
  }, [query, page]);

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Container>
      <SearchBar onSubmit={handleFormSubmit}></SearchBar>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {!query && (
        <ContainerText>
          Let's go to search all what you want! <b /> Just enter a word and we
          will show a picture!
        </ContainerText>
      )}
      {isLoading && <Loader />}
      {error && <Error />}
      <>
        <ImageGallery images={images} />
        {images.length >= 12 && <Button onClick={onLoadMore} />}
      </>
    </Container>
  );
}
