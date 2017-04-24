import React from 'react';
import PropTypes from 'prop-types';
import './Bar.css';

class Bar extends React.Component {
  componentDidMount() {
    this.searchInput.focus();
  }

  render() {
    return(
      <div className={`Bar container-fluid ${this.props.className}`}>
        <div className="row align-items-center">
          <div className="col col-10 offset-1 col-md-8 offset-md-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={this.props.value}
                ref={(input) => { this.searchInput = input; }}
                onChange={this.props.handleSearch} />
            </div>

            <small className="Bar-hint">
              Type for search or hit ESC to close
            </small>
          </div>
        </div>
      </div>
    )
  }
};

Bar.propTypes = {
  value: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Bar;
