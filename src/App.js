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

class App extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   list: list
    // }

    // es6
    // when the property name in your object is the same as your variable name
    this.state = {
      list
    }
  }

  render() {
    return (
      <div className="App">
        {
          this.state.list.map((item) => {
            {/* don't use index of array as key because isn't stable */}
            return (
              <div key={item.objectID}>
                <span>
                  <a href={item.url}>{item.title}</a>
                </span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.points}</span>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default App;



// // ES5
// var userService = {
//   getUserName: function (user) {
//     return user.firstname + ' ' + user.lastnamne
//   }
// }

// var user = {
//   name: 'Robin'
// }

// // ES6

// const userService = {
//   getUsername(user) {
//     return user.firstname + ' ' + user.lastnamne
//   }
// }

// const key = 'name'
// const user = {
//   [key]: 'Robin'
// }



