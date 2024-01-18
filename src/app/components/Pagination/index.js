import React from 'react';

const Pagination = ({ currentPage, perPage, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / perPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
            aria-disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>

        <li className="page-item">
          <span className="page-link">
            Page {currentPage} of {totalPages}
          </span>
        </li>

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
