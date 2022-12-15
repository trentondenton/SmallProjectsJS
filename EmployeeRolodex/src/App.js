import { Component } from 'react';

import './App.css';
import Cards from './components/cards/cards';
import Search from './components/search/search';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      staff: [],
      searchField: ''
    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data =>
        this.setState({ staff: data }))
  }

  handleSearch(event) {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    });
  }
  render() {
    const filteredStaff = this.state.staff.filter(staff => {
      return staff.name.toLocaleLowerCase().includes(this.state.searchField);
    });
    return (
      <div className="App" >
        <h1 className="app-title">Staff Rolodex</h1>
        <Search handleSearch={this.handleSearch} />
        <Cards staff={filteredStaff} />

      </div >
    );
  }
}
