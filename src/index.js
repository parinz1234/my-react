import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

if (module.hot){
  module.hot.accept()
}

// const tick = () => ReactDOM.render(<App />, document.getElementById('root'))

// setInterval(tick, 1000)
ReactDOM.render(<App />, document.getElementById('root'))
