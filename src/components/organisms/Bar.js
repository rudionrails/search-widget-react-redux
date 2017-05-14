import React from 'react';
import PropTypes from 'prop-types';

import Loading from 'src/components/atoms/Loading';
import './Bar.css';

class Bar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    isLoading: PropTypes.bool,
    query: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  render() {
    return (
      <div className={`Bar ${this.props.className}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type for search..."
                  ref={input => this.searchInput = input}
                  value={this.props.query}
                  onChange={event => this.props.onSearch(event.target.value)} />

                <span className="input-group-addon">
                  {this.props.isLoading &&
                    <Loading />}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Bar;
