import React from "react";
import styles from "./Search.module.css";

interface SearchProps {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredTestsCount: number;
}

const Search: React.FC<SearchProps> = ({ searchTerm, handleSearchChange, filteredTestsCount }) => {
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
      <span className={styles.testCount}>
        {filteredTestsCount > 1 ? `${filteredTestsCount} tests` : `${filteredTestsCount} test`}
      </span>
    </div>
  );
};

export default Search;
