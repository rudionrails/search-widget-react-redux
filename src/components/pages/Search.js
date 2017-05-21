import React from 'react';
import PropTypes from 'prop-types';

import Bar from 'src/components/organisms/Bar';
import Results from 'src/components/organisms/Results';
import './Search.css';

class Search extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    query: PropTypes.string,
    results: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  static childContextTypes = {
    onClick: PropTypes.func.isRequired,
  };

  getChildContext() {
    return {
      onClick: this.props.onClick,
    };
  }

  render() {
    const {
      isLoading,
      query,
      onClose,
      onSearch,
      onClick,
      results,
    } = this.props;

    return (
      <div className="sw-Search">
        <div className="sw-Search-close" onClick={onClose}>
          <i className="material-icons">clear</i>
      </div>

      <Bar
        className="sw-Search-top"
        isLoading={isLoading}
        query={query}
        onSearch={onSearch}
      />

      <Results
        className="sw-Search-bottom"
        onClick={onClick}
        results={results}
      />
      </div>
    );
  }
}

export default Search;
