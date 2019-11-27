import React from "react";

const SearchFilter = ({
  pageSize,
  handleFilterChange,
  handlePageSizeChange
}) => {
  return (
    <React.Fragment>
      <form className="search-filter">
        <select
          value={pageSize}
          className=" page-size form-control form-control-sm"
          onChange={handlePageSizeChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>

        <input
          type="text"
          className="filter form-control form-control-sm form-control-stretch"
          placeholder="Fliter results..."
          onChange={handleFilterChange}
        />
      </form>
    </React.Fragment>
  );
};

export default SearchFilter;
