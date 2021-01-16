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
        type: ""
      },
      loans: {
        value: "",
        type: ""
      },
      scholarships: {
        value: "",
        type: ""
      },
      salary: {
        value: "",
        type: ""
      },
    }
  }

  sendData(event) {
    fetch('/', {
      method: 'POST',
      headers: {},
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      this.data = data;
    })
    .then(() => window.plot)
    event.preventDefault();
  } 

  render() {

    return (    
    <div className="App">
      <div className="form">
        <header></header>
        <form onSubmit={this.sendData}>
          <fieldset className="today-info">
            <label>Date:
              <input type="text" placeholder="Example: 11/01/21" onChange={(e)=>{this.setState({date: e.target.value})}}></input>
            </label>
          </fieldset>
          <fieldset className="income">
            <label className="money">Money (from home):
              <input type="number" placeholder="Example: 420000" onChange={(e)=>{this.state.homeMoney.value = e.target.value}}></input>
            </label>
            <label className="money">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={(e)=>{this.state.homeMoney.type = e.target.value}}></input>
            </label>
            <label className="loan">Loans:
              <input type="number" placeholder="Example: 420000" onChange={(e)=>{this.state.loans.value = e.target.value}}></input>
            </label>
            <label className="loan">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={(e)=>{this.state.loans.type = e.target.value}}></input>
            </label>
            <label className="scholarship">Scholarship Amounts (total):
              <input type="number" placeholder="Example: 420000" onChange={(e)=>{this.state.scholarships.value = e.target.value}}></input>
            </label>
            <label className="scholarship">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={(e)=>{this.state.scholarships.type = e.target.value}}></input>
            </label>
            <label className="salary">Job Salary:
              <input type="number" placeholder="Example: 420000" onChange={(e)=>{this.state.salary.value = e.target.value}}></input>
            </label>
            <label className="salary">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={(e)=>{this.state.salary.type = e.target.value}}></input>
            </label>
          </fieldset>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    </div>
   
);
  }
}

export default App;
