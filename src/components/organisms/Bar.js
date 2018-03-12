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
      <div className={`sw-Bar bg-dark ${this.props.className}`}>
        <div className="container-fluid">
          <div className="row justify-content-sm-center">
            <div className="col col-xs-10 col-sm-8">
              <div className="input-group">
                <Loading show={this.props.isLoading} />

                <input
                  autoFocus
                  type="text"
                  className="form-control"
                  placeholder="Type for search..."
                  aria-label="Query (the term you want to get a result)"
                  ref={(input) => { this.input = input; }}
                  value={this.props.query}
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                />

                <Clear show={hasQuery} onClick={this.handleClear} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Bar;
