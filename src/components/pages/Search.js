import React from 'react';
import PropTypes from 'prop-types';
import Bar from '../organisms/Bar';
import Results from '../organisms/Results';

import './Search.css';

const Search = ({
  onClose,
}) => (
  <div className="Search">
    <div
      className="Search-close"
      onClick={onClose}
    >
      <i className="material-icons">clear</i>
    </div>

    <Bar />

    <div className="Search-results">
      <Results />
    </div>
  </div>
);

Search.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Search;
