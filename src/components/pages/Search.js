import React from 'react';
import PropTypes from 'prop-types';

import Bar from 'src/components/organisms/Bar';
import Results from 'src/components/organisms/Results';

import './Search.css';

const Search = ({
  query,
  results,
  onSearch,
  onClose,
}) => (
  <div className="Search">
    <div className="Search-close" onClick={onClose}>
      <i className="material-icons">clear</i>
    </div>

    <Bar
      className="Search-top"
      query={query}
      onSearch={onSearch}
    />

    <Results
      className="Search-bottom"
      results={results}
    />
  </div>
);

Search.propTypes = {
  query: PropTypes.string.isRequired,
  results: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Search;
