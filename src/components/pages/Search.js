import React from 'react';
import PropTypes from 'prop-types';

import './Search.css';
import Bar from 'src/components/organisms/Bar';
import Results from 'src/components/organisms/Results';

class Search extends React.Component {
  componentDidMount() {
    this.props.onSearch(this.props.query);
  }

  render() {
    return (
      <div className="Search">
        <div className="Search-close" onClick={this.props.onClose}>
          <i className="material-icons">clear</i>
      </div>

      <Bar
        className="Search-top"
        query={this.props.query}
        onSearch={this.props.onSearch}
      />

      <Results
        className="Search-bottom"
        results={this.props.results}
      />
      </div>
    );
  }
}


Search.propTypes = {
  query: PropTypes.string.isRequired,
  // results: PropTypes.array.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Search;
