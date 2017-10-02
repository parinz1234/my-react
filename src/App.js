import React, { Component } from 'react';

const DEFAULT_QUERY = 'redux'
const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='

const isSearched = searchTerm => item => !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())


/*
  mounting process lifecycle

  (first)
  1.constructor

  2.componentWillMount()
  4.componentDidMount()

  (was called when component was updated)
  3.render()

  update lifecycle

  componentWillReceiveProps()
  shouldComponentUpdate()
  componentWillUpdate()
  render()
  componentDidUpdate()


  unmounting lifecycle
  componentWillUnmount()
*/


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    }

    this.setSearchTopstories = this.setSearchTopstories.bind(this)
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this)
    this.onDismiss = this.handleDismiss.bind(this)
    this.onSearchChange = this.handleOnSearch.bind(this)
  }

  componentDidMount () {
    const { searchTerm } = this.state
    this.fetchSearchTopstories(searchTerm)
  }

  setSearchTopstories (result) {
    this.setState({ result })
  }

  fetchSearchTopstories (searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result))
      .catch(e => e);
  }

  handleDismiss (id) {
    // console.log(id)
    // function isNotId(item) {
    //   return item.objectID !== id
    // }

    // ES6
    const isNotId = item => item.objectID !== id

    const updatedList = this.state.result.hits.filter(isNotId)
    // ES5
    // this.setState({  result: Object.assign({}, this.state.result, { hits: updatedList }) })
    // ES6 Spread
    this.setState({ result: { ...this.state.result, hits: updatedList } })
  }

  handleOnSearch (e) {
    this.setState({
      searchTerm: e.target.value
    })
  }
  
  render() {
    const { result, searchTerm } = this.state


    return (
      <div className="App">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
          >
          Search
        </Search>
        {
          result &&
          <Table
          list={result.hits}
          searchTerm={searchTerm}
          onDismiss={this.onDismiss}
          />
        }
      </div>
    );
  }
}

// const result = true && 'Hello World'
// console.log(result)
//  'Hello World'

// const result = false && 'Hello World'
// console.log(result)
// false


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
