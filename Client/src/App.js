import './App.css';
import React, {Component} from "react";
import About from "./Components/About";

class Unit extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <select onChange={this.props.handler}>
        <option value="Monthly">Monthly</option>
        <option value="Semester">Semester</option>
        <option value="Yearly">Yearly</option>
      </select>
    );
  }
}


class App extends Component{
  constructor(props) {
    super(props);

    this.state = {
      income: {
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
      },
      expenses: {
        rent: {
          value: "",
          type: ""
        },
        food: {
          value: "",
          type: ""
        },
        tuition: {
          value: "",
          type: ""
        },
        savings: {
          value: "",
          type: ""
        },
        carPayments: {
          value: "",
          type: ""
        },
        carInsurance: {
          value: "",
          type: ""
        },
        utilities: {
          value: "",
          type: ""
        },
        internet: {
          value: "",
          type: ""
        },
        entertainment: {
          value: "",
          type: ""
        }
      },
    }
  }

  render() {
    console.log(this.state)

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
        console.log(data);
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

    const dispatch = (props, value) => {
      this.setState(prevState => {
        let obj = prevState;
        while(props.length > 1) {
          obj = obj[props.shift()];
        }
        obj[props.pop()] = value;
        return prevState;
      });
    }

    const buildHandler = props => (e => dispatch(props, e.target.value));

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
          <fieldset className="income">
          <div>
            <label className="money">Money (from home):
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["income", "homeMoney", "value"])}></input>
            </label>
            <label className="money">Units: 
              <Unit handler={buildHandler(["income", "homeMoney", "type"])} />
            </label>
          </div>
          <div>
            <label className="loan">Loans:
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["income", "loans", "value"])}></input>
            </label>
            <label className="loan">Units: 
              <Unit handler={buildHandler(["income", "loans", "type"])} />
            </label>
          </div>
          <div>
            <label className="scholarship">Scholarship Amounts (total):
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["income", "scholarships", "value"])}></input>
            </label>
            <label className="scholarship">Units: 
              <Unit handler={buildHandler(["income", "scholarships", "type"])} />
            </label>
          </div>
          <div>
            <label className="salary">Job Salary:
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["income", "salary", "value"])}></input>
            </label>
            <label className="salary">Units: 
              <Unit handler={buildHandler(["income", "salary", "type"])} />
            </label>
          </div>
          </fieldset>
          <fieldset>
            <label className="rent">Rent:
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["expenses", "rent", "value"])}></input>
            </label>
            <label className="rent">Units: 
              <Unit handler={buildHandler(["expenses", "rent", "type"])} />
            </label>
            <label className="food">Food (average):
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["expenses", "food", "value"])}></input>
            </label>
            <label className="food">Units: 
              <Unit handler={buildHandler(["expenses", "food", "type"])} />
            </label>
            <label className="tuition">Tutition:
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["expenses", "tuition", "value"])}></input>
            </label>
            <label className="tuition">Units: 
              <Unit handler={buildHandler(["expenses", "tuition", "type"])} />
            </label>
            <label className="savings">Savings:
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["expenses", "rent", "value"])}></input>
            </label>
            <label className="savings">Units: 
              <Unit handler={buildHandler(["expenses", "rent", "type"])} />
            </label>
            <label className="car">Car Payments:
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["expenses", "carPayments", "value"])}></input>
            </label>
            <label className="car">Units: 
              <Unit handler={buildHandler(["expenses", "carPayments", "type"])} />
            </label>
            <label className="insurance-car">Car Insurance:
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["expenses", "carInsurance", "value"])}></input>
            </label>
            <label className="insurance-car">Units: 
              <Unit handler={buildHandler(["expenses", "carInsurance", "type"])} />
            </label>
            <label className="utilities">Utilities (average):
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["expenses", "utilities", "value"])}></input>
            </label>
            <label className="utilities">Units: 
              <Unit handler={buildHandler(["expenses", "utilities", "type"])} />
            </label>
            <label className="internet">Internet:
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["expenses", "internet", "value"])}></input>
            </label>
            <label className="internet">Units: 
              <Unit handler={buildHandler(["expenses", "internet", "type"])} />
            </label>
            <label className="rent">Entertainment:
              <input type="entertainment" placeholder="Example: 420000" onChange={buildHandler(["expenses", "entertainment", "value"])}></input>
            </label>
            <label className="entertainment">Units: 
              <Unit handler={buildHandler(["expenses", "entertainment", "type"])} />
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
