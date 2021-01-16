import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";

class App extends Component{
  constructor(props) {
    super(props);

    this.data = {};

    this.state = {
      date: "",
      homeMoney: {
        value: "",
        type: "" //M, S, Y
      },
      loans: {
        value: "",
        type: "" //M, S, Y
      },
      scholarships: {
        value: "",
        type: "" //M, S, Y
      },
      salary: {
        value: "",
        type: "" //M, S, Y
      },
    }
  }

  sendData(event) {
    fetch('http://kingston.andrewfryer.ca:3000/data', {
      method: 'POST',
      headers: {},
      body: JSON.stringify(this.state)
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
              <input type="number" placeholder="Example: 420000" onChange={(e)=>{this.state.homeMoney.value = e.target.value}}></input>
            </label>
            <label>Units: </label>
            <label>Loans:
              <input type="number" placeholder="Example: 420000" onChange={(e)=>{this.state.loans.value = e.target.value}}></input>
            </label>
            <label>Scholarship Amounts (total):
              <input type="number" placeholder="Example: 420000" onChange={(e)=>{this.state.scholarships.value = e.target.value}}></input>
            </label>
            <label>Job Salary:
              <input type="number" placeholder="Example: 420000" onChange={(e)=>{this.state.salary.value = e.target.value}}></input>
            </label>
          </fieldset>
        </form>
      </div>
    </div>
);
  }
}

export default App;
