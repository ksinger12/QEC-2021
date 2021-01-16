import './App.css';
import React, {Component} from "react";
import About from "./Components/About";


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

  render() {
    const sendData = event => {
      event.preventDefault();
      fetch('http://kingston.andrewfryer.ca:3000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state)
      })
      .then(res => res.json())
      .then(data => {
        this.data = data;
      })
      .then(() => {
        const graph = document.getElementById('tester');
        
        let rent = [655, 655, 655, 655, 655, 655, 655, 655, 655, 655, 655, 655];
        let utils = [100, 100, 100, 65, 65, 65, 65, 65, 65, 65, 100, 100, 100];
        let groceries = [300, 390, 300, 220, 70, 150, 120, 100, 370, 250, 290, 350];
        let entertainment = [100, 120, 90, 50, 370, 1000, 300, 100, 200, 90, 50, 500,];
        let tuition = [6700, 0, 0, 0, 500, 0, 0, 0, 6700, 0, 0, 0];

        let expenses = [rent, utils, groceries, entertainment, tuition];
        let expenses_tot = expenses.reduce(function (r, a) {
          a.forEach(function (b, i) {
              r[i] = (r[i] || 0) + b;
          });
          return r;
        }, []);

        let income = [100, 100, 100, 100, 3000, 3000, 3000, 3000, 130, 130, 130, 75];;
        let scholarships = [0, 0, 0, 0, 0, 0, 0, 0, 5000, 0, 0, 0];
        let loans = [6540, 0, 0, 0, 0, 0, 0, 0, 6540, 0, 0, 0];

        let money = [income, scholarships, loans];
        let money_tot = money.reduce(function (r, a) {
          a.forEach(function (b, i) {
              r[i] = (r[i] || 0) + b;
          });
          return r;
        }, []);

        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        var expensesTrace = {
          x: months,
          y: expenses_tot,
          name: 'Expenses',
          type: 'bar'
        };
        
        var incomeTrace = {
          x: months,
          y: money_tot,
          name: 'Income',
          type: 'bar'
        };
        
        var data = [expensesTrace, incomeTrace];
        
        var layout = {barmode: 'group'};
        
        window.Plotly.newPlot(graph, data, layout);
      });
    }

    return (    
      <div className="App">
      <div className="form">
        <div className="topping">
        <header>
          <h1>Name of Website</h1>
          <p>This will be the header</p>
        </header>
        </div>
        <About/>
        <form onSubmit={sendData}>
          <fieldset className="today-info">
            <label>Date:
              <input type="text" placeholder="Example: 11/01/21" onChange={(e)=>{this.setState({date: e.target.value})}}></input>
            </label>
          </fieldset>
          <fieldset className="income">
          <div>
            <label className="money">Money (from home):
              <input type="number" placeholder="Example: $500" onChange={(e)=>{this.state.homeMoney.value = e.target.value}}></input>
            </label>
            <label className="money">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={(e)=>{this.state.homeMoney.type = e.target.value}}></input>
            </label>
          </div>
          <div>
            <label className="loan">Loans:
              <input type="number" placeholder="Example: 420000" onChange={(e)=>{this.state.loans.value = e.target.value}}></input>
            </label>
            <label className="loan">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={(e)=>{this.state.loans.type = e.target.value}}></input>
            </label>
          </div>
          <div>
            <label className="scholarship">Scholarship Amounts (total):
              <input type="number" placeholder="Example: 420000" onChange={(e)=>{this.state.scholarships.value = e.target.value}}></input>
            </label>
            <label className="scholarship">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={(e)=>{this.state.scholarships.type = e.target.value}}></input>
            </label>
          </div>
          <div>
            <label className="salary">Job Salary:
              <input type="number" placeholder="Example: 420000" onChange={(e)=>{this.state.salary.value = e.target.value}}></input>
            </label>
            <label className="salary">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={(e)=>{this.state.salary.type = e.target.value}}></input>
            </label>
          </div>
          </fieldset>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    </div>
   
);
  }
}

export default App;
