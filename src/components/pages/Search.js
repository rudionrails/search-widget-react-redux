import React from 'react';
import PropTypes from 'prop-types';
import Bar from '../organisms/Bar';
import Results from '../organisms/Results';

import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({ value: target.value });
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
          onChange={this.handleChange}
        />

        <Results className="Search-bottom" />
      </div>
    );
  }
}

Search.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Search;
