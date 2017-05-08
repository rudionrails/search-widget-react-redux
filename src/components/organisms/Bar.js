import React from 'react';
import PropTypes from 'prop-types';

import Loading from 'src/components/atoms/Loading';
import './Bar.css';

class Bar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    query: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  render() {
    return (
      <div className={`Bar container-fluid ${this.props.className}`}>
        <div className="row align-items-center">
          <div className="col col-10 offset-1 col-md-8 offset-md-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                ref={(input) => { this.searchInput = input; }}
                value={this.props.query}
                onChange={event => this.props.onSearch(event.target.value)} />

              {this.props.isLoading &&
                <span className="input-group-addon">
                  <Loading />
                </span>}
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Bar;
