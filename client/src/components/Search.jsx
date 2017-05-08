import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  onSearch() {
    console.log(this.state.query);
    this.props.onSearch(this.state.query);
  }

  render() {
    return (
      <div>
        <input 
          type='text' 
          placeholder="Search for podcasts"
          onChange={this.onChange}
        />
        <button onClick={this.onSearch}>Go!</button>
      </div>
    );
  }
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired
}

export default Search;