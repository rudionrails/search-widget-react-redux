import React from 'react';
import './Bar.css';

class Bar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  handleChange({ target }) {
    this.setState({ value: target.value });
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
                value={this.state.value}
                ref={(input) => { this.searchInput = input; }}
                onChange={this.handleChange} />
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

// bar.propTypes = {
//   value: 
// };

export default Bar;
