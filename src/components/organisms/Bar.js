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

  handleChange = ({ target: { value } }) => {
    this.props.onSearch(value);
  }

  handleKeyDown = ({ keyCode, target: { value } }) => {
    if (keyCode !== 13) return; // do nothing unless ENTER

    this.props.onSearch(value);
  }

  render() {
    return (
      <div className={`sw-Bar ${this.props.className}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
              <div className="input-group">
                <input
                  autoFocus
                  type="text"
                  className="form-control"
                  placeholder="Type for search..."
                  aria-label="query"
                  defaultValue={this.props.query}
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                />

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
