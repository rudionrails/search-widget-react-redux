import { connect } from 'react-redux';

import { actions } from 'src/store/redux/search';
import Search from 'src/components/pages/Search';

const mapStateToProps = state => ({
  isLoading: state.loading.isLoading,
  query: state.search.query,
  results: state.search.results,
});

const mapDispatchToProps = dispatch => ({
  onSearch: query => dispatch(actions.search(query)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
