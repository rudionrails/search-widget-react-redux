import React from 'react';

import './Search.css';
import Bar from 'src/components/organisms/Bar';
import Results from 'src/components/organisms/Results';

const Search = ({
  isLoading = false,
  query = '',
  results = [],
  onSearch,
  onClose,
}) => (
  <div className="Search">
    <div className="Search-close" onClick={onClose}>
      <i className="material-icons">clear</i>
    </div>

  <Bar
    className="Search-top"
    isLoading={isLoading}
    query={query}
    onSearch={onSearch}
  />

  <Results
    className="Search-bottom"
    results={results}
  />
  </div>
);

export default Search;
