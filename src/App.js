import React, { Component } from 'react';

const DEFAULT_QUERY = 'redux'
const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='

const DEFAULT_PAGE = 0
const PARAM_PAGE = 'page='
const DEFAULT_HPP = '100'
const PARAM_HPP = 'hitsPerPage='

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
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY
    }

    this.setSearchTopstories = this.setSearchTopstories.bind(this)
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this)
    this.onDismiss = this.handleDismiss.bind(this)
    this.onSearchChange = this.handleOnSearch.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
  }

  componentDidMount () {
    const { searchTerm } = this.state
    this.setState({ searchKey: searchTerm })
    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE)
  }

  setSearchTopstories (result) {
    const { hits, page } = result
    const { searchKey, results } = this.state

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : []

    const updatedHits = [
      ...oldHits,
      ...hits
    ]
    
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    })
  }

  fetchSearchTopstories (searchTerm, page) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
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
  
  onSearchSubmit (e) {
    e.preventDefault()
    const { searchTerm } = this.state
    this.setState({ searchKey: searchTerm })
    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE)
  }

  render() {
    const {
      searchTerm,
      results,
      searchKey
    } = this.state

    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || []

    return (
      <div className="App">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
          >
          Search
        </Search>
        {
          results &&
          <Table
          list={list}
          onDismiss={this.onDismiss}
          />
        }
        <div className="interactions">
          <button onClick={() => this.fetchSearchTopstories(searchKey, page + 1)}>
            More
          </button>
        </div>
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
const Search = ({ value, onChange, onSubmit, children }) =>
  <form onSubmit={onSubmit}>
    {children}
    <input 
      type="text"
      onChange={onChange}
      value={value}
      />
    <button type="submit">
      {children}
    </button>
  </form>



// table
const Table = ({ list, onDismiss }) =>
  <div>
    {
      list.map((item) => {
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
