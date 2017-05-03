import React from 'react';

import Bar from 'src/components/organisms/Bar';
import Results from 'src/components/organisms/Results';

import './Search.css';

const Search = ({
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
