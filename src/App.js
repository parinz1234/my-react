import React, { Component } from 'react';


// const Clock = props => (
//   <div>
//     <h1>Hello, World!</h1>
//     <h2>It is {props.date.toLocaleTimeString()}</h2>
//   </div>
// )



class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }

  componentDidMount () {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }

  componentWillUnmount () {
    clearInterval(this.timeID)
  }

  tick () {
    this.setState({date: new Date()})
  }

  render () {
    return (
      <div>
        <h1>Hello, World!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <Clock />
    );
  }
}

export default App;
