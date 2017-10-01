import React, { Component } from 'react';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
]


const isSearched = searchTerm => item => !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list,
      searchTerm: ''
    }
    this.onDismiss = this.handleDismiss.bind(this)

    this.onSearchChange = this.handleOnSearch.bind(this)
  }

  handleDismiss (id) {
    // console.log(id)
    // function isNotId(item) {
    //   return item.objectID !== id
    // }

    // ES6
    const isNotId = item => item.objectID !== id

    const updatedList = this.state.list.filter(isNotId)
    this.setState({  list: updatedList })
  }

  handleOnSearch (e) {
    this.setState({
      searchTerm: e.target.value
    })
  }
  render() {
    const { list, searchTerm } = this.state
    return (
      <div className="App">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
          >
          Search
        </Search>
        <Table
          list={list}
          searchTerm={searchTerm}
          onDismiss={this.onDismiss}
          />
      </div>
    );
  }
}

// search
const Search = ({ value, onChange, children }) =>
  <form>
    {children}
    <input 
      type="text"
      onChange={onChange}
      value={value}
      />
  </form>



// table
const Table = ({ list, searchTerm, onDismiss }) =>
  <div>
    {
      list.filter(isSearched(searchTerm)).map((item) => {
        return (
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <Button onClick={() => onDismiss(item.objectID)}>Dismiss</Button>
            </span>
          </div>
        )
      })
    }
  </div>

// BUtton
class Button extends Component {
  render () {
    const { onClick, className = '', children } = this.props
    return (
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>
    )
  }
}

export default App;
