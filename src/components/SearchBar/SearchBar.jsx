import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcSearch } from 'react-icons/fc';
import {
  SearchHeader,
  SearchForm,
  SearchButton,
  SearchLabel,
  SearchInput,
} from './SeachBar.styled';

export default function SeachBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.warn(
        `I can't find anything... Write at least some familiar word there!`
      );
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <SearchLabel>Search</SearchLabel>
          <FcSearch style={{ width: 30, height: 30 }} />
        </SearchButton>
        <SearchInput
          type="text"
          value={query}
          onChange={handleChange}
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos..."
        />
      </SearchForm>
    </SearchHeader>
  );
}

SeachBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
