import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Bar from '../organisms/Bar';
import Results from '../organisms/Results';

// actions
import { actions } from '../../store/search/index';

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

    <Results className="Search-bottom" />
  </div>
);

Search.propTypes = {
  query: PropTypes.string.isRequired,
  results: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  query: state.search.query,
  results: state.search.results,
});

const mapDispatchToProps = (dispatch) => ({
  onSearch: (query) => dispatch(actions.search(query)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
