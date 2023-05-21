import { useState } from 'react';
import { Header, Form, SearchInput, SearchBtn } from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

Notiflix.Notify.init({
  position: 'right-top',
});

const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    const { value } = e.currentTarget;

    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!query.trim()) {
      Notiflix.Notify.failure('Sorry, incorect query. Please try again.');
      return;
    }

    onSearch(query);
  };

  return (
    <Header>
      <a href="https://pixabay.com/" target="_blank" rel="noreferrer">
        <img
          src="https://pixabay.com/static/img/logo.svg"
          alt="logo"
          width="200"
        />
      </a>
      <Form onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          name="query"
          autoComplete="off"
          value={query}
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
        <SearchBtn type="submit">
          <FaSearch />
        </SearchBtn>
      </Form>
    </Header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
