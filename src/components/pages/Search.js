import React from 'react';
import PropTypes from 'prop-types';
import Bar from '../organisms/Bar';
import Results from '../organisms/Results';

import './Search.css';

function filter(query, results) {
  const filtered = {};
  const terms = query.trim().split(/\s+/).map(term => term.toLowerCase());

  return new Promise(resolve => {
    Object.keys(results).forEach(key => {
      filtered[key] = results[key].filter(name => {
        return terms.every(term => name.toLowerCase().includes(term));
      });
    });

    resolve(filtered);
  });
}

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      results: props.store,
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch({ target }) {
    this.setState({ value: target.value });

    filter(target.value, this.props.store).then(results => {
      this.setState({ results });
    })
  }

  render() {
    return (
      <div className="Search">
        <div className="Search-close" onClick={this.props.onClose}>
          <i className="material-icons">clear</i>
        </div>

        <Bar
          className="Search-top"
          value={this.state.value}
          handleSearch={this.handleSearch}
        />

        <Results
          className="Search-bottom"
          {...this.state.results}
        />
      </div>
    );
  }
}

Search.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Search;
