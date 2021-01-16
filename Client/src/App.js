import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";

class App extends Component{
  constructor(props) {
    super(props);

    this.data = {};

    this.state = {
      date: ""
    }
  }

  sendData() {
    fetch('/', {
      method: 'POST',
      headers: {}
    })
    .then(res => res.json)
    .then(data => {
      this.data = data;
    })
  } 

  render() {
    return (    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <label>Date:
            <input type="text"></input>
          </label>
        </form>
      </div>
    </div>
);
  }
}

export default App;
