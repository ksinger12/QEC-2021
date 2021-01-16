import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";

class App extends Component{
  constructor(props) {
    super(props);

    this.data = {};

    this.state = {
      date: "",
      homeMoney: "",
      loans: "",
      scholarships: "",
      salary: ""
    }
  }

  sendData(event) {
    fetch('/', {
      method: 'POST',
      headers: {}
    })
    .then(res => res.json)
    .then(data => {
      this.data = data;
    })
    event.preventDefault();
  } 

  render() {
    return (    
    <div className="App">
      <div className="form">
        <form onSubmit={this.sendData}>
          <fieldset className="today-info">
            <label>Date:
              <input type="text" placeholder="Example: 11/01/21" onChange={(e)=>{this.setState({date: e.target.value})}}></input>
            </label>
          </fieldset>
          <fieldset className="income">
            <label>Money (from home):
              <input type="number" placeholder="Example: 420000" onChange={(e)=>{this.setState({homeMoney: e.target.value})}}></input>
            </label>
            <label>Loans:
              <input type="number" placeholder="Example: 420000" onChange={(e)=>{this.setState({loans: e.target.value})}}></input>
            </label>
            <label>Scholarship Amounts (total):
              <input type="number" placeholder="Example: 420000" onChange={(e)=>{this.setState({scholarships: e.target.value})}}></input>
            </label>
            <label>Job Salary:
              <input type="number" placeholder="Example: 420000" onChange={(e)=>{this.setState({salary: e.target.value})}}></input>
            </label>
          </fieldset>
        </form>
      </div>
    </div>
);
  }
}

export default App;