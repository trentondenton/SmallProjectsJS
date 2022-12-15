import React, { Component } from 'react';

import './search.css';

export default class Search extends Component {
  render(props) {
    return (
      <input
        className={`search-box ${this.props.className}`}
        type='search'
        onChange={this.props.handleSearch}
        placeholder='Search employees'
      />
    )
  }
}
