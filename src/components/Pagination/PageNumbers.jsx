import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import { IconChoice } from "../../utils/IconChoice";

export function PageNumbers({ currentPage, totalPages, onPageChange }) {
  const createPageArray = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(i);
    }
    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pageList}>
      {currentPage !== 1 && (
        <IconChoice icon="arrowdown" onClick={handlePrevious} />
      )}

      {createPageArray().map((page) => (
        <span
          key={page}
          className={`${styles.pageItem} ${
            page === currentPage ? styles.active : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </span>
      ))}
      {totalPages !== currentPage && (
        <IconChoice icon="arrowdown" onClick={handleNext} />
      )}
    </div>
  );
}

PageNumbers.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
