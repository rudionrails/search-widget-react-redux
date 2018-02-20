import React from 'react';
import PropTypes from 'prop-types';

import Clear from 'src/components/atoms/Clear';
import Loading from 'src/components/atoms/Loading';
import './Bar.css';

class Bar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    query: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
  }

  handleChange = ({ target: { value } }) => {
    this.props.onSearch(value);
  }

  handleClear = () => {
    this.handleChange({ target: { value: '' } });
    this.input.focus();
  }

  handleKeyDown = ({ keyCode, target: { value } }) => {
    if (keyCode !== 13) return; // do nothing unless ENTER

    this.props.onSearch(value);
  }

  // componentDidMount() {
  //   this.input.focus();
  // }

  render() {
    const hasQuery = this.props.query !== '';

    return (
      <div className={`sw-Bar ${this.props.className}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
              <div className="input-group">
                <Loading show={this.props.isLoading} />

                <input
                  autoFocus
                  type="text"
                  className="form-control"
                  placeholder="Type for search..."
                  aria-label="query"
                  ref={(input) => { this.input = input; }}
                  value={this.props.query}
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                />

              {hasQuery && <Clear onClick={this.handleClear} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Bar;
