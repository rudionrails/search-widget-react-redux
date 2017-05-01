import { connect } from 'react-redux';

import { actions } from 'src/store/search/index';
import Search from 'components/pages/Search';

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
