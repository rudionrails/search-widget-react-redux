import { connect } from 'react-redux';

import { actions } from 'src/store/search';
import Search from 'src/components/pages/Search';

const mapStateToProps = (state, props) => ({
  isLoading: state.search.isLoading,
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
