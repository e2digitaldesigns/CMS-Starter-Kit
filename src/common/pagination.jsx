import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount <= 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav className="m-3">
      <ul className="pagination pagination-sm">
        <li className={currentPage <= 1 ? "page-item disabled" : "page-item"}>
          <span
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
          >
            {" "}
            Previous
          </span>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <span className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </span>
          </li>
        ))}
        <li
          className={
            currentPage === pagesCount ? "page-item disabled" : "page-item"
          }
        >
          <span
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </span>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
