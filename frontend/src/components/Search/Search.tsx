import React from "react";
import styles from "./Search.module.css";

interface SearchProps {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ searchTerm, handleSearchChange }) => {
  return (
    <div className={styles.container}>
      <img src="/assets/img/search-icon.svg" alt="search" className={styles.searchIcon} />
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="What test are you looking for?"
        className={styles.inputField}
      />
      <span className={styles.testCount}>0 tests</span>
    </div>
  );
};

export default Search;
